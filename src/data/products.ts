type ProductItem = {
  slug: string;
  brand?: 'MTU' | 'Cummins' | 'DEUTZ' | 'Detroit Diesel';
  generatedModel?: boolean;
  title: string;
  image: string;
  mainImage: string;
  secondImage: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  tolerance: string;
  leadTime: string;
  content: {
    partOne: string;
    partTwo: string;
  };

};


const confirmedModelBrands: Record<string, NonNullable<ProductItem['brand']>> = {
  'b125-33': 'Cummins',
  'eqb125-20': 'Cummins',
  'eqb140-20': 'Cummins',
};

function normalizeImportedModel(product: ProductItem): ProductItem {
  const brand = product.slug.startsWith('mtu-') ? 'MTU'
    : product.slug.startsWith('deutz-') ? 'DEUTZ'
      : confirmedModelBrands[product.slug];
  const model = confirmedModelBrands[product.slug] ? product.slug.toUpperCase() : product.title;
  const identity = brand ? `${brand} ${model.replace(/^(MTU|DEUTZ)\s+/i, '')}` : model;
  const support = brand ? `${brand} 备件` : '柴油发动机备件';
  return {
    ...product,
    brand,
    generatedModel: true,
    title: model,
    h1Title: `${identity} 零件识别`,
    seoTitle: `${identity} 零件识别 | 国晁动力`,
    summary: `${identity} 零件询价：请按完整标记、发动机出厂编号与需求数量识别所装部件；供货情况逐单确认。`,
    capabilitySlugs: brand === 'MTU' ? product.capabilitySlugs : ['industrial-engine-service'],
    content: {
      partOne: product.content.partOne.replaceAll(`MTU ${product.title}`, identity),
      partTwo: product.content.partTwo.replace('MTU 备件询价支持', `${support}询价支持`),
    },
  };
}

export function isProductPageNoindex(product: ProductItem): boolean {
  // Kept in the build for URL stability, but 301'd at the edge by
  // public/_redirects: each of these is thinner than the page that replaces it.
  const redirected = [
    'mtu-series-2000-gensets',
    'mtu-series-4000-engines',
    'mtu-series-4000-gensets',
    // 2026-10-10: the 396 TE74L shell had the cylinder count wrong (the
    // catalogue links 12V 396 TE74/TE74L, not 16V), and the 1163 series has a
    // family page listing every 1163 model present in the data.
    'mtu-16v-396-te74l',
    'mtu-series-1163-engines',
  ];
  return redirected.includes(product.slug) || Boolean(product.generatedModel && product.brand !== 'MTU');
}

// BEGIN IMPORTED SITEMAP PRODUCTS
const importedModelProducts: ProductItem[] = [
  {
    slug: 'mtu-16v-396-te74l',
    title: 'MTU 16V 396 Te74l',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 16V 396 Te74l 零件 | 国晁动力',
    h1Title: 'MTU 16V 396 Te74l 发动机零件',
    summary: 'MTU 16V 396 Te74l 发动机零件询价支持，覆盖保养、大修与更换计划。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: '按发动机型号、出厂编号与零件号核验',
    leadTime: '供货情况与运输路线询价后确认',
    content: {
      partOne: `
        <h2>MTU 16V 396 Te74l 零件支持</h2>
        <p>国晁动力为维护团队、经销商、服务公司与船队运营商提供 MTU 16V 396 Te74l 发动机零件询价支持。</p>
        <h3>典型询盘</h3>
        <ul>
          <li>滤清器、垫片、密封件、皮带、传感器与保养件</li>
          <li>燃油、冷却、润滑、增压与控制部件</li>
          <li>按发动机型号核验的大修零件与更换总成</li>
        </ul>
      `,
      partTwo: `
        <h2>请提供的信息</h2>
        <p>请提供发动机型号、出厂编号、零件号、数量、目的地与要求的交货日期。铭牌或旧件照片有助于我们确认正确的供货选项。</p>
        <p><a href="/contact/">询价 MTU 16V 396 Te74l 零件</a></p>
        <p><a href="/products/mtu-16v-396-te74l/">MTU 16V 396 Te74l</a> 收录于 MTU 备件询价支持。</p>
      `,
    },
  },
  {
    slug: 'mtu-series-1163-engines',
    title: 'MTU 1163 系列发动机',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 1163 系列发动机零件 | 国晁动力',
    h1Title: 'MTU 1163 系列发动机零件',
    summary: 'MTU 1163 系列发动机零件询价支持，覆盖保养、大修与更换计划。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: '按发动机型号、出厂编号与零件号核验',
    leadTime: '供货情况与运输路线询价后确认',
    content: {
      partOne: `
        <h2>MTU 1163 系列发动机零件支持</h2>
        <p>国晁动力为维护团队、经销商、服务公司与船队运营商提供 MTU 1163 系列发动机零件询价支持。</p>
        <h3>典型询盘</h3>
        <ul>
          <li>滤清器、垫片、密封件、皮带、传感器与保养件</li>
          <li>燃油、冷却、润滑、增压与控制部件</li>
          <li>按发动机型号核验的大修零件与更换总成</li>
        </ul>
      `,
      partTwo: `
        <h2>请提供的信息</h2>
        <p>请提供发动机型号、出厂编号、零件号、数量、目的地与要求的交货日期。铭牌或旧件照片有助于我们确认正确的供货选项。</p>
        <p><a href="/contact/">询价 MTU 1163 系列发动机零件</a></p>
        <p><a href="/products/mtu-series-1163-engines/">MTU 1163 系列发动机</a> 收录于 MTU 备件询价支持。</p>
      `,
    },
  },
  {
    slug: 'mtu-series-8000-engines',
    title: 'MTU 8000 系列零件',
    image: '/images/marine-diesel-engine-parts.webp',
    mainImage: '/images/marine-diesel-engine-parts.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 8000 发动机零件供应商 | 国晁动力',
    h1Title: 'MTU 8000 发动机零件',
    summary: 'MTU 8000 系列发动机零件支持，覆盖大功率船用推进，含保养、冷却、燃油、涡轮增压器、控制与大修询价。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service', 'genuine-oem-parts'],
    tolerance: '按发动机型号、出厂编号与零件号核验',
    leadTime: '供货情况与运输路线询价后确认',
    content: {
      partOne: `
        <h2>MTU 8000 系列发动机零件</h2>
        <p>MTU 8000 系列发动机服务于大功率船用推进领域，零件可追溯性与维护窗口计划在此尤为关键。国晁动力为船舶运营商、船厂、发动机服务公司与采购团队提供按型号核验的零件检查与国际交付计划支持。</p>
        <h3>MTU 8000 零件类别</h3>
        <ul>
          <li>燃油泵、喷射部件、阀、管路与控制件</li>
          <li>冷却泵、叶轮、恒温器、热交换与海水系统部件</li>
          <li>涡轮增压器、润滑、进气、排气、传感器与电气部件</li>
          <li>滤清器、垫片、密封件、O 型圈与计划保养件</li>
          <li>缸盖、配气机构、活塞、缸套、轴承与大修部件</li>
        </ul>
        <p>由于 8000 系列的配置随船舶、发动机功率与生产批次而异，我们不会将宽泛的系列匹配视为最终适配确认。</p>
        <p><a href="/applications/marine-propulsion-engines/">查看 MTU 船用发动机零件支持</a></p>
      `,
      partTwo: `
        <h2>MTU 8000 零件核验</h2>
        <p>请提供完整的发动机型号、出厂编号、零件号、数量、船舶或船厂所在地以及要求的交货日期。涡轮增压器、泵、喷油器、传感器与控制设备请附部件铭牌。</p>
        <h3>计划性大修</h3>
        <p>请以 Excel 格式发送零件清单，以便逐行核对更换零件号、数量、估算发运重量、供货情况与交货期。有尺寸分级的内部件需在报价前提供相应的尺寸或测量记录。</p>
        <p><a href="/contact/">询价 MTU 8000 发动机零件</a></p>
      `,
    },
  },
];
// END IMPORTED SITEMAP PRODUCTS

const productCatalog: ProductItem[] = [
  {
    slug: 'mtu-spare-parts',
    title: 'MTU 备件',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-hero.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 发动机零件与备件供应商 | 国晁动力',
    h1Title: 'MTU 发动机零件与备件',
    summary:
      '面向 183、396、595、956、1163、2000、4000 与 8000 系列发动机的独立 MTU 发动机零件供应商，提供零件号核验与全球交付。',
    materialSlugs: ['stainless-steel', 'carbon-steel', 'brass-copper'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service', 'genuine-oem-parts'],
    tolerance: '按零件号、发动机型号与出厂编号核验',
    leadTime: '供货情况与发货时间以报价为准',
    content: {
      partOne: `
        <h2>MTU 发动机零件供应</h2>
        <p>国晁动力是面向船用、工业、轨道交通与发电用户的独立 MTU 发动机零件与备件供应商。我们以零件号核验、库存核查以及自上海发出的全球交付，支持日常保养订单、大修清单与紧急停机询盘。</p>
        <h3>按零件类别浏览</h3>
        <ul>
          <li><a href="/part-products/catalog/mtu-filters/">MTU 滤清器 —— 机油、燃油、空气、冷却液</a></li>
          <li><a href="/part-products/catalog/mtu-injectors/">MTU 喷油器与喷嘴部件</a></li>
          <li><a href="/part-products/catalog/mtu-fuel-pumps/">MTU 燃油泵 —— 高压与低压</a></li>
          <li><a href="/part-products/catalog/mtu-turbocharger-parts/">MTU 涡轮增压器零件</a></li>
          <li><a href="/part-products/catalog/mtu-sensors/">MTU 传感器与电气部件</a></li>
          <li><a href="/part-products/catalog/mtu-starter-motors-alternators/">MTU 起动机与发电机</a></li>
          <li><a href="/part-products/catalog/mtu-gasket-kits/">MTU 垫片、密封件与 O 型圈</a></li>
          <li><a href="/part-products/catalog/mtu-pistons-liners/">MTU 活塞、缸套与活塞环</a></li>
          <li><a href="/part-products/catalog/mtu-valve-train/">MTU 配气机构部件</a></li>
          <li><a href="/part-products/catalog/mtu-bearings/">MTU 发动机轴承</a></li>
          <li><a href="/part-products/catalog/mtu-cooling-system/">MTU 冷却系统零件</a></li>
        </ul>
        <h3>按发动机系列浏览</h3>
        <ul>
          <li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000 系列零件</a></li>
          <li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000 系列零件</a></li>
          <li><a href="/part-products/catalog/mtu-396-series/">MTU 396 系列零件</a></li>
          <li><a href="/part-products/catalog/mtu-595-series/">MTU 595 系列零件</a></li>
          <li><a href="/part-products/catalog/mtu-956-series/">MTU 956 系列零件</a></li>
          <li><a href="/part-products/catalog/mtu-1163-series/">MTU 1163 系列零件</a></li>
          <li><a href="/products/mtu-series-8000-engines/">MTU 8000 系列发动机零件</a></li>
        </ul>
        <h3>高需求 MTU 发动机型号</h3>
        <ul>
          <li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 发动机零件</a></li>
          <li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 发动机零件</a></li>
          <li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 发动机零件</a></li>
        </ul>
        <h3>常询零件号</h3>
        <ul>
          <li><a href="/part-products/5240113410-cylinder-liner-size-0/">5240113410 —— 缸套（0 号尺寸）</a></li>
          <li><a href="/part-products/x53507500012-injector/">X53507500012 —— 喷油器</a></li>
          <li><a href="/part-products/ex52407500064-injector/">EX52407500064 —— 喷油器</a></li>
          <li><a href="/part-products/5110804420-turbine-wheel/">5110804420 —— 涡轮叶轮</a></li>
          <li><a href="/part-products/5410160920-cylinder-head-gasket/">5410160920 —— 缸盖垫片</a></li>
          <li><a href="/part-products/0020940204-filter-cartridge/">0020940204 —— 滤芯</a></li>
          <li><a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 —— 旋装式机油滤清器</a></li>
          <li><a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091 —— 旋装式燃油滤清器</a></li>
          <li><a href="/part-products/0005358233-speed-sensor/">0005358233 —— 转速传感器</a></li>
          <li><a href="/part-products/5240530301-inlet-valve/">5240530301 —— 进气门</a></li>
          <li><a href="/part-products/5240380471-conrod-bolt/">5240380471 —— 连杆螺栓</a></li>
          <li><a href="/part-products/5502003201-seawater-pump/">5502003201 —— 海水泵</a></li>
        </ul>
        <p><a href="/part-products/">MTU 零件号目录</a></p>
      `,
      partTwo: `
        <h2>我们如何核验 MTU 零件</h2>
        <p>请提供零件号、发动机系列、发动机出厂编号，并尽可能附照片。我们会在报价与发货前确认正确的物品 —— 包括被替代的零件号与尺寸分级。</p>
        <p>报价会明确准确的零件号、供货状态、供货路线、包含项目与运输条款。目录图片与历史参考不能证明当前库存。</p>
        <p><a href="/certifications/">质量文件</a> · <a href="/about/">公司信息</a> · <a href="/series/mtu-2000/">MTU 2000 型号识别</a></p>
        <p><a href="/contact/?source=mtu-spare-parts" data-rfq-modal data-rfq-context="MTU 备件询价" data-rfq-source="mtu-spare-parts">询价 MTU 备件</a></p>
      `,
    },
  },
  {
    slug: 'mtu-2000-series-parts',
    title: 'MTU 2000 系列零件',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/precision-micrometer-measurement.jpg',
    seoTitle: 'MTU 2000 系列零件供应商 | 国晁动力',
    h1Title: 'MTU 2000 系列零件供应商',
    summary:
      '面向船用推进、发电机组与工业动力装置中 MTU 2000 系列发动机的零件支持。',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'marine-engine-service'],
    tolerance: '型号与出厂编号核验',
    leadTime: '可提供库存与紧急交付选项',
    content: {
      partOne: `
        <h2>MTU 2000 系列零件</h2>
        <p>MTU 2000 系列广泛应用于船用、发电与工业领域。我们帮助维护团队为计划保养与故障维修评估 OEM、OEM 替代件、再制造件与更换件路线。</p>
        <h3>MTU 2000 型号覆盖</h3>
        <ul>
          <li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 发动机零件</a></li>
          <li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L 发动机零件</a></li>
          <li><a href="/part-products/catalog/mtu-2000-series/">按零件号检索的 MTU 2000 零件目录</a></li>
          <li><a href="/products/mtu-2000-series-parts/marine-generator-service-parts/">MTU 2000 船用与发电保养零件</a></li>
        </ul>
        <h3>零件类别</h3>
        <ul>
          <li>燃油喷射与发动机控制部件</li>
          <li>冷却、润滑、密封与过滤零件</li>
          <li>大修部件与磨损件</li>
        </ul>
      `,
      partTwo: `
        <h2>快速识别</h2>
        <p>请提供发动机型号、出厂编号与所需零件号。如仅有旧件，请发送清晰的照片与标记。</p>
        <p><a href="/series/mtu-2000/">MTU 2000 型号与变型识别</a> · <a href="/series/16v2000m96/">16V2000M96 识别</a> · <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 零件号目录</a></p>
        <p>对于大修清单，请按缸号与总成界定范围。报价会注明包含的零件号与供货状态；共用的系列名称不能确认每一次安装。</p>
        <p><a href="/contact/?source=mtu-2000-supply" data-rfq-modal data-rfq-context="MTU 2000 零件供货询价" data-rfq-source="mtu-2000-supply">查询 MTU 2000 系列供货情况</a></p>
      `,
    },
  },
  {
    slug: 'mtu-4000-series-parts',
    title: 'MTU 4000 系列零件',
    image: '/images/engine-parts-hero.webp',
    mainImage: '/images/engine-parts-verification-desk.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'MTU 4000 系列零件供应商 | 国晁动力',
    h1Title: 'MTU 4000 系列零件供应商',
    summary:
      'MTU 4000 系列发动机零件采购，覆盖船用、发电、轨道交通与工业发动机。请在报价中确认准确的供货零件号、出处与供货状态。',
    materialSlugs: ['stainless-steel', 'carbon-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    tolerance: '零件号与应用核验',
    leadTime: '视库存、紧急程度与运输目的地报价',
    content: {
      partOne: `
        <h2>MTU 4000 系列零件</h2>
        <p>我们为停机成本高昂的高要求船队与机舱提供 MTU 4000 系列备件。我们的团队帮助确认正确的更换件并协调出口物流。</p>
        <h3>MTU 4000 型号覆盖</h3>
        <ul>
          <li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 发动机零件</a></li>
          <li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 发动机零件</a></li>
          <li><a href="/part-products/catalog/mtu-4000-series/">按零件号检索的 MTU 4000 零件目录</a></li>
        </ul>
        <h3>常用零件</h3>
        <ul>
          <li>燃油系统部件、泵、传感器与控制件</li>
          <li>缸盖、配气机构、活塞、缸套与轴承零件</li>
          <li>增压、冷却、润滑与过滤部件</li>
        </ul>
        <h3>柴油与燃气构型</h3>
        <p>MTU 4000 系列既有柴油发动机也有燃气发动机（GS 变型）。两种构型的燃油供给、点火与控制部件不同，因此铭牌上的发动机类型代码与零件号同样重要。如您的发动机为燃气变型，询价时请予说明；我们会按燃气构型核验零件号，而非默认柴油版本可以通用。</p>
      `,
      partTwo: `
        <h2>面向船队维护</h2>
        <p>我们为船舶、电厂与工业维护项目支持重复订单与合并备件清单。</p>
        <p><a href="/series/mtu-4000-variants/">MTU 4000 型号变型</a> · <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 零件号目录</a> · <a href="/guides/mtu-4000-overhaul-parts/">大修范围与订购核查</a></p>
        <p>请在零件清单中保留完整的 X/EX 前缀与后缀。在接受更换路线前，请确认供货状态、包含的附件以及任何兑换或旧件返还条款。</p>
        <p><a href="/contact/?source=mtu-4000-supply" data-rfq-modal data-rfq-context="MTU 4000 零件供货询价" data-rfq-source="mtu-4000-supply">询价 MTU 4000 零件</a></p>
      `,
    },
  },
  {
    slug: 'detroit-diesel-parts',
    title: 'Detroit Diesel 零件',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/industrial-diesel-engine-parts.webp',
    seoTitle: 'Detroit Diesel 零件供应商 | 国晁动力',
    h1Title: 'Detroit Diesel 发动机零件',
    summary:
      '面向老旧发动机平台及相关 MTU 发动机应用的 Detroit Diesel 零件支持，覆盖维护与大修项目。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'industrial-engine-service'],
    tolerance: '按发动机与零件号核验',
    leadTime: '供货情况询价后确认',
    content: {
      partOne: `
        <h2>Detroit Diesel 零件</h2>
        <p>国晁动力为处理老旧发动机平台与 MTU 相关应用的维护团队提供 Detroit Diesel 零件询价支持。</p>
        <h3>询价所需信息</h3>
        <ul>
          <li>发动机型号与出厂编号</li>
          <li>零件号或旧件照片</li>
          <li>数量、目的地与目标交货日期</li>
        </ul>
      `,
      partTwo: `
        <h2>更换件确认</h2>
        <p>如存在被替代或更换的零件号，我们会在下单前帮助确认可行的选项。</p>
        <p><a href="/contact/">询价 Detroit Diesel 零件</a></p>
      `,
    },
  },
  {
    slug: 'cummins-parts',
    title: 'Cummins 零件',
    image: '/images/engine-parts-hero.webp',
    mainImage: '/images/engine-parts-sensors-catalog.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'Cummins 零件供应商 | 国晁动力',
    h1Title: 'Cummins 柴油发动机零件',
    summary:
      '面向发电、船用与工业发动机的 Cummins 保养件、大修部件与更换总成。',
    materialSlugs: ['carbon-steel', 'stainless-steel', 'brass-copper'],
    capabilitySlugs: ['cummins-engine-parts', 'industrial-engine-service'],
    tolerance: '按 CPL、型号与出厂编号核验',
    leadTime: '库存与寻源选项逐项报价',
    content: {
      partOne: `
        <h2>Cummins 零件</h2>
        <p>我们为服务公司、船队与车队所有者、发电运营商及工业维护团队采购 Cummins 发动机零件。</p>
        <h3>典型类别</h3>
        <ul>
          <li>滤清器、皮带、垫片、密封件与保养套件</li>
          <li>燃油喷射、增压、冷却与润滑零件</li>
          <li>电气传感器、控制部件与大修件</li>
        </ul>
      `,
      partTwo: `
        <h2>请提供的信息</h2>
        <p>为加快报价，请提供发动机型号、CPL、出厂编号、零件号、数量与交付国家。</p>
        <h3>Cummins 发动机系列页面</h3>
        <ul>
          <li><a href="/products/cummins-parts/cummins-ism-engine-parts/">Cummins ISM / QSM11 10.8 L 发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-isl-engine-parts/">Cummins ISL / ISLe / QSL 8.9 L 发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk19-engine-parts/">Cummins QSK19 / KTA19 19 L 发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk38-v12-engine-parts/">Cummins QSK38 / KTA38 V12 发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-qsk50-v16-engine-parts/">Cummins QSK50 / KTA50 V16 发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-6bt-engine-parts/">Cummins 6BT / 4BT B 系列发动机零件</a></li>
          <li><a href="/products/cummins-parts/cummins-n14-engine-parts/">Cummins N14 / NT855 发动机零件</a></li>
        </ul>
        <p><a href="/contact/">查询 Cummins 零件</a></p>
      `,
    },
  },
  {
    slug: 'deutz-parts',
    title: 'DEUTZ 零件',
    image: '/images/engine-parts-sensors-catalog.webp',
    mainImage: '/images/precision-grinding-service-capability.webp',
    secondImage: '/images/engine-parts-verification-desk.webp',
    seoTitle: 'DEUTZ 零件供应商 | 国晁动力',
    h1Title: 'DEUTZ 柴油发动机零件',
    summary:
      '面向工程机械、工业装置、泵与压缩机的 DEUTZ 更换件与维护支持。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['deutz-engine-parts', 'industrial-engine-service'],
    tolerance: '按型号与零件号核验',
    leadTime: '视供货情况与目的地报价',
    content: {
      partOne: `
        <h2>DEUTZ 零件</h2>
        <p>我们帮助买家为工业设备船队的计划保养、紧急维修与大修计划采购 DEUTZ 零件。</p>
        <h3>零件类别</h3>
        <ul>
          <li>保养套件、滤清器、皮带、密封件与垫片</li>
          <li>燃油、冷却、润滑与电气系统部件</li>
          <li>发动机大修部件与更换总成</li>
        </ul>
      `,
      partTwo: `
        <h2>来自上海的支持</h2>
        <p>请提供您的 DEUTZ 发动机型号、出厂编号与所需零件清单。我们将核查供货情况与运输选项。</p>
        <h3>DEUTZ 发动机系列页面</h3>
        <ul>
          <li><a href="/products/deutz-parts/deutz-2012-series-parts/">DEUTZ 2012 系列发动机零件</a></li>
          <li><a href="/products/deutz-parts/deutz-2013-series-parts/">DEUTZ TCD 2013 系列发动机零件</a></li>
          <li><a href="/products/deutz-parts/deutz-1011-series-parts/">DEUTZ 1011 系列发动机零件</a></li>
          <li><a href="/products/deutz-parts/deutz-2011-series-parts/">DEUTZ 2011 系列发动机零件</a></li>
        </ul>
        <p><a href="/contact/">询价 DEUTZ 零件</a></p>
      `,
    },
  },
  ...importedModelProducts.map(normalizeImportedModel),
];

function resolveProductImages(product: ProductItem): Pick<ProductItem, 'image' | 'mainImage' | 'secondImage'> {
  const searchText = `${product.slug} ${product.title} ${product.h1Title} ${product.summary}`.toLowerCase();
  let image = '/images/mtu-engine-parts-hero.webp';

  if (/\b(marine|vessel|yacht|ship|seawater|propulsion)\b/.test(searchText) || /船用|船舶|游艇|海水|推进/.test(searchText)) {
    image = '/images/marine-diesel-engine-parts.webp';
  } else if (/\b(generator|g-drive|genset|power|standby)\b/.test(searchText) || /发电|备用电源/.test(searchText)) {
    image = '/images/generator-engine-parts.webp';
  } else if (/\b(cummins|deutz|detroit|industrial|compressor|construction|pump)\b/.test(searchText) || /工业|工程机械|压缩机/.test(searchText)) {
    image = '/images/industrial-diesel-engine-parts.webp';
  } else if (/\b(4000|8000|overhaul|cylinder|piston|liner|bearing|valve|crankshaft|turbo)\b/.test(searchText) || /大修|缸体|活塞|缸套|轴承|气门|曲轴|涡轮/.test(searchText)) {
    image = '/images/mtu-4000-series-overhaul-parts.webp';
  } else if (/\b(2000|183|331|396|493|538|595|956|1163|injector|sensor|filter|gasket|seal)\b/.test(searchText) || /喷油器|传感器|滤清器|垫片|密封/.test(searchText)) {
    image = '/images/mtu-2000-series-parts.webp';
  }

  return {
    image,
    mainImage: image,
    secondImage:
      image === '/images/global-engine-parts-delivery.webp'
        ? '/images/mtu-part-number-verification.webp'
        : '/images/global-engine-parts-delivery.webp',
  };
}

export const products: ProductItem[] = productCatalog.map((product) => ({
  ...product,
  ...resolveProductImages(product),
}));

export function getProductCards() {
  return products.map((p) => ({ slug: p.slug, title: p.title, image: p.image, summary: p.summary }));
}
