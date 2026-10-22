import io, re, os, glob

# Protect the registered legal name; replace standalone brand with Chinese.
pattern = re.compile(r'(?<!Shanghai )Diesel Part Source')
target = '国晁动力'

files = []
for ext in ('*.astro', '*.ts'):
    files += glob.glob(f'src/**/{ext}', recursive=True)

total = 0
changed = []
for f in files:
    s = io.open(f, encoding='utf-8').read()
    new = pattern.sub(target, s)
    n = len(s) - len(new)
    # count actual replacements
    cnt = (len(re.findall(r'(?<!Shanghai )Diesel Part Source', s)))
    if cnt:
        io.open(f, 'w', encoding='utf-8', newline='').write(new)
        total += cnt
        changed.append((f, cnt))

# safety: ensure legal name untouched
legal = 0
for f in files:
    legal += io.open(f, encoding='utf-8').read().count('Shanghai Diesel Part Source Co., Ltd.')
print(f'replaced {total} standalone brand refs across {len(changed)} files')
print(f'legal-name occurrences still present: {legal}')
for f, c in changed:
    print(f'  {c:3d}  {f}')
