from pathlib import Path

p = Path(r"e:\mtu-cn\src\data\mtu-parts.ts")
raw = p.read_bytes()
print("bom", raw[:3])
text = raw.decode("utf-8")
lines = text.splitlines()
print("linecount", len(lines))
line = lines[2576]
print("len chars", len(line))
print("len utf8 bytes", len(line.encode("utf-8")))
print(repr(line))
print("--- around col 244 ---")
print(repr(line[220:270] if len(line) > 220 else line))
print("ord around 240-250")
for i, c in enumerate(line):
    if i >= 230 and i <= 260:
        print(i, hex(ord(c)), c)

odd = []
for n, l in enumerate(lines, 1):
    if l.count("'") % 2 != 0:
        odd.append((n, l.count("'"), l[:160]))
print("odd quote lines", len(odd))
for item in odd[:50]:
    print(item[0], item[1], repr(item[2]))
