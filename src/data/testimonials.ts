/**
 * Buyer feedback published with customer permission, summarised in our own
 * words (not quoted). Do not add Review/AggregateRating schema for it
 * (self-serving reviews are not eligible for Google review snippets).
 */
export type Testimonial = {
  summary: string;
  name: string;
  role: string;
  country: string;
  scope: string;
};

export const testimonials: Testimonial[] = [
  {
    summary:
      '通过供应合同向我方团队采购 MTU 2000 与 4000 系列备件。反馈集中于交货日期、与合同条款相符的零件质量，以及未来数年继续供应关系。',
    name: 'Ramazan',
    role: '船队运营方',
    country: '土耳其',
    scope: '供应合同项下的 MTU 2000 与 4000 船用备件',
  },
  {
    summary:
      '自 2019 年起通过我方团队为商船采购 MTU 船用柴油发动机备件。快速交货、原厂件与售后服务被列为保留我们为供应商的原因。',
    name: 'David Joe',
    role: '轮机工程师',
    country: '马来西亚',
    scope: '2019 年以来的 MTU 船用柴油发动机备件',
  },
  {
    summary:
      'MTU 备件的老买方，现独家通过我们订购。他强调了原厂件、可靠的交货时间与直接顺畅的合作关系。',
    name: 'Luis López Palancar',
    role: '经理',
    country: '西班牙',
    scope: '重复订购的 MTU 备件',
  },
];

/** Named sales contact shown on contact/about pages. */
export const salesContact = {
  name: 'Leo',
  role: 'MTU 与柴油发动机零件出口销售',
  languages: '英语与中文',
};
