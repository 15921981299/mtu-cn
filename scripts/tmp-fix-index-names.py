import io

p = 'src/pages/index.astro'
s = io.open(p, encoding='utf-8').read()

reps = [
    # 1. add zh helpers import (after mtu-parts import)
    ('from "../data/mtu-parts";',
     'from "../data/mtu-parts";\nimport { zhPartName, zhCategoryName } from \'../data/part-names-zh\';'),
    # 2. video schema name
    ('name: "Diesel Part Source 柴油机零件支持概览",',
     'name: "国晁动力柴油机零件支持概览",'),
    # 3. page title
    ('title="MTU 发动机零件供应商 | Diesel Part Source"',
     'title="MTU 发动机零件供应商 | 国晁动力"'),
    # 4. JSON-LD itemList name
    ('name: `${part.partNumber} ${part.name}`,',
     'name: `${part.partNumber} ${zhPartName(part.name)}`,'),
    # 5. body prose brand
    ('Diesel Part Source 是独立供应商。品牌名与零件号仅用于识别采购方的需求；最终报价会说明可行的采购路线与确认要求。',
     '国晁动力是独立供应商。品牌名与零件号仅用于识别采购方的需求；最终报价会说明可行的采购路线与确认要求。'),
    # 6. popular part name (has class — unique)
    ('<span class="popular-part-name">{part.name}</span>',
     '<span class="popular-part-name">{zhPartName(part.name)}</span>'),
    # 7. rfq context attribute
    ('data-rfq-context={`${part.partNumber} ${part.name} - homepage hot part`}',
     'data-rfq-context={`${part.partNumber} ${zhPartName(part.name)} - homepage hot part`}'),
    # 8. image alt
    ('alt={part.imageAlt ?? `${part.partNumber} ${part.name}`}',
     'alt={part.imageAlt ?? `${part.partNumber} ${zhPartName(part.name)}`}'),
    # 9. category dd (unique)
    ('<dd>{part.category}</dd>',
     '<dd>{zhCategoryName(part.category)}</dd>'),
    # 10. small category in part-number list (unique)
    ('<small>{part.category} · HS {part.hsCode}</small>',
     '<small>{zhCategoryName(part.category)} · HS {part.hsCode}</small>'),
]

for old, new in reps:
    n = s.count(old)
    if n != 1:
        print(f'WARN count={n} :: {old[:60]!r}')
    s = s.replace(old, new)

# 11. bare <span>{part.name}</span> (exactly two render sites: featured + part-number list)
bare_old = '<span>{part.name}</span>'
bare_new = '<span>{zhPartName(part.name)}</span>'
nb = s.count(bare_old)
print(f'bare span occurrences replaced: {nb}')
s = s.replace(bare_old, bare_new)

# idempotency guard: ensure import present exactly once
assert s.count("import { zhPartName, zhCategoryName } from '../data/part-names-zh';") == 1, 'import not added exactly once'

io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('index.astro fixed')
