export type QuotationExample = {
  id: string;
  title: string;
  date: string;
  context: string;
  lines: { number: string; name: string; quantity: number; model?: string; weightKg?: number; hsCode?: string }[];
  lesson: string;
};

// Owner confirms customer permission and completed delivery for these orders.
// Item details remain quotation-derived; selected options and delivery dates
// are not provided. Never expose prices, buyer contacts or original PDFs.
export const quotationExamples: QuotationExample[] = [
  {
    id: 'generator-service-filters',
    title: '发电机组保养：滤清器与发电机皮带',
    date: '2026-10-08',
    context: '一份真实报价将 10V1600G20F 与 16V4000G14F 发电机组的用件需求分开列示。下方的型号对应关系仅针对该次询盘，并非通用适配规则。',
    lines: [
      { number: 'X57508300028', name: '燃油滤清器滤芯', quantity: 4, model: '10V1600G20F', weightKg: 0.832, hsCode: '8421.99.90' },
      { number: 'X57518300024', name: '机油滤清器滤芯', quantity: 4, model: '10V1600G20F', weightKg: 0.131, hsCode: '8421.99.90' },
      { number: 'XP52718300060', name: '离心式机油滤清器纸滤芯', quantity: 8, model: '16V4000G14F', weightKg: 0.021, hsCode: '8421.91.00' },
      { number: 'X59408300151', name: '易换式（EasyChange）燃油滤清器；客户先前询价号 X57508300091', quantity: 10, model: '16V4000G14F', weightKg: 1.208, hsCode: '8421.23.00' },
      { number: 'X00042954', name: '多楔皮带 8PK，发电机驱动', quantity: 6, model: '16V4000G14F', weightKg: 0.143, hsCode: '4010.31.00' },
    ],
    lesson: '该报价区分了 OEM 规格滤清器与 MTU 原厂件两种供货选项，皮带仅提供原厂版本。报价中的发货与寻源周期各不相同，均不构成当前库存或交货承诺。',
  },
  {
    id: 'mixed-parts-list',
    title: '混合零件清单：套件、滤清器与缸盖部件',
    date: '2026-10-08',
    context: '一份 13 行的询盘按行保留了数量与供货版本差异。该文件未标明完整发动机型号，也未定义通用大修套件。',
    lines: [
      { number: 'XP56900600002', name: '备件包', quantity: 3, weightKg: 0.153, hsCode: '8481.90.00' },
      { number: 'X57508300028', name: '燃油滤清器滤芯', quantity: 4 },
      { number: 'X57518300024', name: '机油滤清器滤芯', quantity: 4 },
      { number: 'XP52718300060', name: '离心式机油滤清器纸滤芯', quantity: 8 },
      { number: 'X59408300151', name: '燃油滤清器；先前参考号 X57508300091', quantity: 10 },
      { number: 'X00042954', name: '发电机驱动多楔皮带 8PK', quantity: 6 },
      { number: 'X52404200052', name: '密封环', quantity: 2 },
      { number: 'X52404200043', name: '缸盖垫片', quantity: 2 },
      { number: '5249900701', name: '缸盖螺栓', quantity: 12 },
      { number: '5240110062', name: '止推垫圈，原询价第 10 行', quantity: 12 },
      { number: '5240160069', name: '缸盖六角螺栓', quantity: 2 },
      { number: '5240110062', name: '止推垫圈，原询价第 12 行', quantity: 2 },
      { number: 'X52405400013', name: '推杆', quantity: 4 },
    ],
    lesson: '两行止推垫使用同一零件号但数量不同。由于报价未能确认两者的安装位置相同，故仍分行列示。混合清单报价不能证明其中螺栓零件号之间可以互换。',
  },
  {
    id: 'cylinder-head-components',
    title: '缸盖部件：分开列示的供货选项',
    date: '2026-10-08',
    context: '七行报价涵盖了一份已确认交货订单的密封与缸盖部件。原始报价未提供完整发动机型号，也未包含客户使用结果。',
    lines: [
      { number: 'X52404200052', name: '密封环', quantity: 2, weightKg: 0.163, hsCode: '7318.22.00' },
      { number: 'X52404200043', name: '缸盖垫片', quantity: 2, weightKg: 0.120, hsCode: '8484.10.00' },
      { number: '5249900701', name: '缸盖螺栓', quantity: 12, weightKg: 0.758, hsCode: '7318.15.88' },
      { number: '5240110062', name: '止推垫圈，原询价第 4 行', quantity: 12, weightKg: 0.021, hsCode: '7318.22.00' },
      { number: '5240160069', name: '缸盖六角螺栓', quantity: 2, weightKg: 1.097, hsCode: '7318.15.88' },
      { number: '5240110062', name: '止推垫圈，原询价第 6 行', quantity: 2, weightKg: 0.021, hsCode: '7318.22.00' },
      { number: 'X52405400013', name: '推杆', quantity: 4, weightKg: 0.610, hsCode: '8409.99.00' },
    ],
    lesson: '本报价中仅前两行提供单独的 OEM 规格选项，其余行均按 MTU 原厂版本供货。该历史报价不能作为未来供货均为原厂出处的概括性证明。',
  },
  {
    id: 'spare-parts-kit',
    title: 'XP56900600002：准确的套件零件号',
    date: '2026-10-08',
    context: '一份三套套件的真实询盘按全新 MTU 原厂供货报价。报价注明了套件零件号，但未逐项列明套件内容，也未确认具体发动机型号。',
    lines: [{ number: 'XP56900600002', name: '备件包', quantity: 3, weightKg: 0.153, hsCode: '8481.90.00' }],
    lesson: '该报价采用 EXW 上海条款，并给出视情况而定的 6-8 周寻源周期。新的询盘仍需核验套件内容并重新确认交货期。在缺少物料清单的情况下，不得将套件描述为完整的发动机大修套件。',
  },
  {
    id: 'molded-tubing',
    title: '5062030282：成型软管批量询价',
    date: '2026-10-10',
    context: '一份真实报价为保加利亚客户提供了 50 件成型软管。按报价单品重量计算，该数量净重 37.2 kg；纸箱尺寸与毛重尚未确认。',
    lines: [{ number: '5062030282', name: '成型软管', quantity: 50, weightKg: 0.744, hsCode: '4009.31.00' }],
    lesson: '该报价区分了寻源时间与运输时间，并要求附带零件号标签的原厂包装。重量与 HS 编码仅为报价参考，并非经核验的当前库存测量值或海关归类裁定。',
  },
];

export const getQuotationExamplesForPart = (number: string) => quotationExamples.filter((example) =>
  example.lines.some((line) => line.number === number) || (number === 'X57508300091' && example.id === 'generator-service-filters'),
);
