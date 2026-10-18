export type PartBuyerEvidence = {
  title: string;
  metaDescription: string;
  imageAlt: string;
  imageCaption: string;
  rfqContext: string;
  facts: { label: string; value: string; source: string }[];
  sources: { id: string; title: string; url: string }[];
};

const mann = 'https://www.mann-filter.com/en/catalog/search-results/product.html/wd1374/5_mann-filter.html';
const oemCatalog = 'https://resources.kohler.com/power/kohler/industrial/pdf/tp6549.pdf';
const reviewed = '2026-10-10';
export const buyerEvidenceReviewed = reviewed;

// These references establish only the stated product/document context, not
// present stock, a measured offered unit or universal interchangeability.
export const partBuyerEvidence: Record<string, PartBuyerEvidence> = {
  '0031845201': {
    title: '0031845201 MTU 机油滤清器 | 螺纹参考与报价',
    metaDescription: '0031845201 MTU 机油滤清器。比对 MANN WD 1374/5 螺纹与尺寸参考，核查所装滤清器头，并申请价格与供货情况。',
    imageAlt: '目录参考照片中的 0031845201 机油滤清器与带零件号的包装',
    imageCaption: '参考照片：标有 0031845201 的滤清器与包装。这不是当前库存或批次来源照片。',
    rfqContext: '0031845201 机油滤清器：请报所供品牌、螺纹/密封适配、数量与交货期',
    facts: [
      { label: '制造商交叉引用', value: 'MANN-FILTER 将 MTU 003 184 52 01 列于 WD 1374/5 之下。这标识的是制造商所列的替代品，并非声称所供件为原厂 MTU。', source: 'mann' },
      { label: '螺纹参考', value: 'WD 1374/5：1 1/2-16 UN-2B。请对照所装滤清器头与所报确切滤清器品牌确认。', source: 'mann' },
      { label: '尺寸参考', value: 'WD 1374/5：壳体直径 136 mm、高度 177 mm、垫片内外径 100/111 mm。这些是替代产品尺寸，不是对 MTU 库存的测量。', source: 'mann' },
      { label: '制造商应用清单', value: 'WD 1374/5 列有 10V 2000 M72、10V 2000 M92/M93 与 8V 2000 M92/M93。其他型号需单独核查。', source: 'mann' },
      { label: '照片识别', value: '滤清器壳体与包装箱显示所申请的 MTU 号码。接受供货前，请索取所供批次的新标签与安装底座照片。', source: 'photo' },
    ],
    sources: [
      { id: 'mann', title: 'MANN-FILTER WD 1374/5：尺寸、应用与 MTU 原厂参考', url: mann },
      { id: 'photo', title: '0031845201 目录参考照片', url: '/images/mtu-catalog-parts/0031845201-oil-filter-spin-on.jpg' },
    ],
  },
  X00E50203659: {
    title: 'X00E50203659 MTU 液位监测器 | 识别与报价',
    metaDescription: 'X00E50203659 MTU 液位监测器。核查探头、连接器与早期参考号 0005355103。申请单元照片、规格确认与报价。',
    imageAlt: '参考照片中带探头与电气连接器的 X00E50203659 液位监测器包装箱',
    imageCaption: '参考照片：标有 X00E50203659 的包装箱，带探头与连接器。本照片不确定探头长度与引脚定义。',
    rfqContext: 'X00E50203659 液位监测器：核查旧标记、探头安装、连接器与电气规格',
    facts: [
      { label: '部件识别', value: '照片中的包装箱标识为液位监测器（NIVEAUWAECHTER）；可见一根带螺纹的探头与一个电气连接器。它不是机油压力传感器。', source: 'photo' },
      { label: '公开采购参考', value: '一份已公布的巡逻艇备件申请（MTU 16V4000M90）在第 13 行列有 X00031104 或 X00E50203659，作为水量测量传感器。这是采购背景，不是制造商对每次替换的认可。', source: 'request' },
      { label: '尺寸与信号', value: '这些参考未提供受控的探头长度图、引脚定义或电气输出。请就所供单元索取，而不要从外观推断。', source: 'photo' },
    ],
    sources: [
      { id: 'photo', title: 'X00E50203659 目录参考照片', url: '/images/mtu-catalog-parts/x00e50203659-level-monitor.webp' },
      { id: 'request', title: '已公布的巡逻艇备件申请：PDF 第 2 页，第 13 行', url: 'https://www.phdcci.in/wp-content/uploads/2021/12/Spare-Parts-for-Turkmenistan.pdf#page=2' },
    ],
  },
  X57508300091: {
    title: 'X57508300091 MTU 燃油滤清器 | X59408300151 参考',
    metaDescription: '申请 X57508300091 燃油滤清器价格，已核查后续参考号 X59408300151。查看一单已交付订单示例，并确认所供号码。',
    imageAlt: '标有 X59408300151 的燃油滤清器——X57508300091 的目录后续参考号',
    imageCaption: '本参考照片中的罐体标有 X59408300151，而非 X57508300091。请确认您的滤清器头所供的确切号码。',
    rfqContext: 'X57508300091 燃油滤清器：经滤清器头与发动机核查后，说明 X59408300151 是否可接受',
    facts: [
      { label: '照片中可见的号码', value: '罐体上印有 X59408300151。图片展示的是后续参考号产品，不是旧号的实物库存。', source: 'photo' },
      { label: '已交付订单背景', value: '一单经客户授权、由国晁动力确认交付的订单，包含以 X57508300091 询价的 10 只滤清器，按 16V4000G14F 以 X59408300151 报价。该应用仅限该次申请。', source: 'order' },
      { label: '重量区别', value: '历史报价中 X59408300151 为 1.208 kg。旧号目录列 1.288 kg。两者都不得用作包装发运重量，也不得假定两个参考号同重。', source: 'order' },
      { label: '海关参考', value: '报价对后续号燃油滤清器使用 HS 参考 8421.23.00。新订单请确认目的地分类与毛/净发运重量。', source: 'order' },
    ],
    sources: [
      { id: 'photo', title: '目录参考照片中展示的后续号滤清器', url: '/images/mtu-catalog-parts/x57508300091-fuel-filter-spin-on.webp' },
      { id: 'order', title: '匿名处理的已完成发电机保养订单；报价日期 2026-10-08', url: '/case-studies/#generator-service-filters' },
    ],
  },
  X52808100004: {
    title: 'X52808100004 MTU 低压燃油输送泵',
    metaDescription: 'X52808100004 MTU 低压燃油输送泵。查看 20V4000G83 目录位置、联接件与密封件参考号，然后申请经适配核查的报价。',
    imageAlt: 'X52808100004 目录参考照片中的燃油输送泵壳体与安装法兰',
    imageCaption: '输送泵壳体与法兰的参考照片。请索取可读的标识牌，以及所供油泵的新驱动/接口照片。',
    rfqContext: 'X52808100004 低压燃油输送泵：确认完整油泵、驱动/联接杆、密封件、所供后继号与状态',
    facts: [
      { label: '燃油系统功能', value: 'MTU 零件目录将 X52808100004 归入低压燃油泵组，而非高压喷射泵组。', source: 'oem' },
      { label: '有记录的安装', value: '20V4000G83，示例发动机出厂编号 528100707；BOM X00040005，图纸 08100172d，第 50 项。这是一个有记录的发动机构型，不是通用 4000 系列适配。', source: 'oem' },
      { label: '单独的图纸项', value: '联接杆 X52408100002（第 150 项）与 O 型圈 700429083000（第 250 项）有单独的目录号码。它们不自动包含在油泵报价中。', source: 'oem' },
      { label: '安装五金', value: '挡圈 X52607700008 与螺钉 000933010116 在本图纸中单独列出。询价时请注明裸泵还是逐项列明的总成。', source: 'oem' },
    ],
    sources: [{ id: 'oem', title: 'KOHLER 上的 MTU 零件目录：PDF 第 115 页，印页 87/1', url: `${oemCatalog}#page=115` }],
  },
  X00E50214075: {
    title: 'X00E50214075 MTU 压力传感器 | 参考与报价',
    metaDescription: 'X00E50214075 MTU 压力传感器。查看采购参考号 0035352231；申请报价前确认压力范围、螺纹、连接器与信号。',
    imageAlt: '目录照片中，标有 X00E50214075 的包装箱旁是带早期参考号的压力传感器',
    imageCaption: '包装箱标有 X00E50214075；照片中的传感器带早期参考号。单凭包装不能确认所供单元的标记或规格。',
    rfqContext: 'X00E50214075 压力传感器：确认范围/单位、电气输出、连接器、螺纹与旧号 0035352231 标记',
    facts: [
      { label: '独立采购记录', value: '一份日期为 2025 年 8 月 27 日的 BSP 招标公告，将其压力传感器行从 0035352231 改为 X00E50214075。这佐证了一次真实的采购参考号变更，而非与每台发动机兼容。', source: 'bulletin' },
      { label: '照片与所供号码', value: '请同时核查包装箱与传感器壳体标记。壳体上的早期号码需要明确批准，即使包装上出现后续号码。', source: 'photo' },
      { label: '电气兼容性', value: '该公告不确定引脚定义、电压、压力范围或输出信号。批准替换前，请索取所供单元的数据表并确认测量位置。', source: 'bulletin' },
    ],
    sources: [
      { id: 'bulletin', title: 'BSP 招标公告第 1 号，2025-0481：PDF 第 1 页，压力传感器修订', url: 'https://www.bsp.gov.ph/Lists/Procurement09/Attachments/26965/BB1-2025-0481-Replacement%20of%20Genset%20Parts-DGS.pdf#page=1' },
      { id: 'photo', title: 'X00E50214075 包装与传感器目录照片', url: '/images/mtu-catalog-parts/x00e50214075-pressure-sensor.webp' },
    ],
  },
  '5410180233': {
    title: '5410180233 MTU 油水分离器膜片 | 报价',
    metaDescription: '5410180233 MTU 油水分离器膜片，不是完整分离器。查看 20V4000G83 图纸，并申请带壳体与数量核查的报价。',
    imageAlt: '带可见零件号标签的 5410180233 油水分离器膜片包装',
    imageCaption: '参考照片：标有 5410180233 的包装膜片。完整的油水分离器壳体与滤芯未显示为所含项。',
    rfqContext: '5410180233 油水分离器膜片：确认仅供膜片、壳体参考号，以及任何另行需要的嵌件/垫片',
    facts: [
      { label: '部件范围', value: 'MTU 图纸将 5410180233 列为第 5 项的油水分离器膜片。它是保养部件，不是完整的油水分离器。', source: 'oem' },
      { label: '有记录的安装', value: '20V4000G83，示例发动机出厂编号 528100707；油水分离器 BOM 0000187135，第 5 项。其他发动机构型请单独确认。', source: 'oem' },
      { label: '单独保养件', value: '同一图纸在第 10 项列有嵌件 5410100080，第 15 项列有垫片 0000180680。需要时请另行申请；膜片号码不确定保养包。', source: 'oem' },
      { label: '尺寸', value: '所引图纸未公布膜片尺寸或材料。请确认壳体、就位型面与所供膜片，而不要照搬未经核验的零售尺寸。', source: 'oem' },
    ],
    sources: [{ id: 'oem', title: 'KOHLER 上的 MTU 零件目录：PDF 第 36 页，印页 20/1', url: `${oemCatalog}#page=36` }],
  },
};
