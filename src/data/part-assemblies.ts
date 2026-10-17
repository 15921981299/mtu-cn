export type CatalogAssembly = {
  name: string;
  /** curated = hand-verified catalog drawing; derived = grouped from catalog text */
  kind?: 'curated' | 'derived';
  /** Provenance note shown on pages that render the group. */
  provenance?: string;
  parts: { partNumber: string; position?: string; description: string }[];
};

// Drawing relationships are catalog references, not confirmed installation kits.
export const catalogAssemblies: CatalogAssembly[] = [
  {
    name: 'MTU 20V4000G83 示例构型 528100707，低压燃油泵 BOM X00040005，图纸 08100172d',
    parts: [
      { partNumber: 'X52808100004', position: '50', description: '燃油输送泵' },
      { partNumber: 'X52408100002', position: '150', description: '联接杆' },
      { partNumber: '700429083000', position: '250', description: 'O 型圈' },
      { partNumber: '735151010100', position: '300 / 550', description: '垫圈' },
      { partNumber: 'X52607700008', position: '500', description: '挡圈' },
      { partNumber: '000933010116', position: '600', description: '六角螺钉' },
    ],
  },
  {
    name: 'MTU 20V4000G83 示例构型 528100707，油水分离器 BOM 0000187135',
    parts: [
      { partNumber: '5410180233', position: '5', description: '油水分离器膜片' },
      { partNumber: '5410100080', position: '10', description: '油水分离器嵌件' },
      { partNumber: '0000180680', position: '15', description: '垫片' },
    ],
  },
  {
    name: 'MTU 396 机油滤清器壳体参考',
    parts: [
      { partNumber: '5501800016', position: '11Z', description: '机油滤芯' },
      { partNumber: '700429126000', position: '02 / 09', description: 'O 型圈' },
      { partNumber: '5501840061', position: '07', description: '垫片' },
      { partNumber: '5561800811', position: '06', description: '滤清器杯' },
      { partNumber: '0011847225', position: '08', description: '机油滤芯参考号' },
    ],
  },
  {
    name: 'MTU 956/1163 高压燃油管参考',
    parts: [
      { partNumber: '5840780024', position: '25', description: '推力件' },
      { partNumber: '5840700632/87', position: '20', description: '高压燃油管' },
      { partNumber: '5840782802', position: '140', description: '供油管' },
      { partNumber: '700429020003', position: '50', description: 'O 型圈' },
      { partNumber: '700429017002', position: '90', description: 'O 型圈' },
    ],
  },
  {
    name: 'MTU 4000 节温器壳体参考',
    parts: [
      { partNumber: 'X52420300037', position: '200', description: '热执行器' },
      { partNumber: '05132155', position: '250', description: '密封环' },
      { partNumber: '700429072000', position: '550', description: 'O 型圈' },
      { partNumber: '5272030080', position: '1350', description: '垫片' },
      { partNumber: '700429070000', position: '1550', description: 'O 型圈' },
    ],
  },
];


// ---------------------------------------------------------------------------
// Derived assembly groups (generated, do not hand-edit).
// Source: parent-assembly names stated in the catalog descriptions of
// catalog-part-details.ts ("... engine original COOLANT PUMP parts IMPELLER").
// Parts sharing the same series string and parent name are grouped here.
// Drawing positions are not published in that text, so no position is claimed.
// ---------------------------------------------------------------------------
export const derivedCatalogAssemblies: CatalogAssembly[] = [
  {
    name: "MTU 956/1163 冷却水泵总成",
    kind: 'derived',
    provenance: "MTU 956/1163 发动机的目录描述将这些零件号列于冷却水泵之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "007603016105", description: "铜密封环" },
      { partNumber: "000910016002", description: "螺塞" },
      { partNumber: "000931012156", description: "六角螺钉" },
      { partNumber: "5802040290", description: "挡圈" },
      { partNumber: "000934012008", description: "六角螺母" },
      { partNumber: "000137012202", description: "B12 弹簧垫圈" },
      { partNumber: "000137010202", description: "B10 弹簧垫圈" },
      { partNumber: "000933010093", description: "六角螺钉" },
      { partNumber: "700429045000", description: "O 型圈" },
      { partNumber: "0002041116", description: "旋转密封件" },
      { partNumber: "700429178000", description: "O 型圈" },
      { partNumber: "5842040219", description: "轴承壳体" },
    ],
  },
  {
    name: "MTU 956 冷却水泵总成",
    kind: 'derived',
    provenance: "MTU 956 发动机的目录描述将这些零件号列于冷却水泵之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "5802040801", description: "蜗壳" },
      { partNumber: "5802040072", description: "螺母" },
      { partNumber: "5802040806", description: "叶轮" },
      { partNumber: "700429100000", description: "O 型圈" },
      { partNumber: "5842040257", description: "密封件座" },
      { partNumber: "5849900851", description: "螺母" },
    ],
  },
  {
    name: "MTU 396 冷却水泵总成",
    kind: 'derived',
    provenance: "MTU 396 发动机的目录描述将这些零件号列于冷却水泵之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "5502010276", description: "推力垫圈" },
      { partNumber: "5592010307", description: "叶轮" },
      { partNumber: "700386032000", description: "轴密封件" },
    ],
  },
  {
    name: "MTU 956/1163 放气阀总成",
    kind: 'derived',
    provenance: "MTU 956/1163 发动机的目录描述将这些零件号列于放气阀之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "X59699100286", description: "压力弹簧" },
      { partNumber: "X59699100285", description: "压力弹簧" },
      { partNumber: "X54514100028", description: "膜片" },
    ],
  },
  {
    name: "MTU 4000 喷油器总成",
    kind: 'derived',
    provenance: "MTU 4000 发动机的目录描述将这些零件号列于喷油器之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "XP52799101135", description: "密封环" },
      { partNumber: "0000160119", description: "密封环" },
    ],
  },
  {
    name: "MTU 956/1163 高压燃油管总成",
    kind: 'derived',
    provenance: "MTU 956/1163 发动机的目录描述将这些零件号列于高压燃油管之下。该分组依据目录文字；它不是经确认的包清单或图纸版本。",
    parts: [
      { partNumber: "5840780024", description: "推力件" },
      { partNumber: "5840782802", description: "供油管" },
    ],
  },
];

export const getCatalogAssemblies = (partNumber: string) =>
  [...catalogAssemblies, ...derivedCatalogAssemblies].filter(
    (assembly) => assembly.parts.some((part) => part.partNumber.toUpperCase() === partNumber.toUpperCase()),
  );

/** Curated drawings plus derived groups, for hub pages that list several groups. */
export const allCatalogAssemblies: CatalogAssembly[] = [...catalogAssemblies, ...derivedCatalogAssemblies];
