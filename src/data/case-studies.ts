/**
 * 客户供货案例。红线：此处只收录真实、经客户授权的案例。
 * 严禁虚构案例、客户名、报价或结果数据。
 *
 * 工作流：
 * 1. 在订单/合同阶段取得书面授权（有文章依据：事后追认成功率远低于事前授权；
 *    具名案例的转化率比匿名高 60–80%）。
 * 2. 在下方添加 status: 'draft' 的条目，收集真实细节。
 * 3. 仅在客户确认最终文本后切换为 status: 'published'。
 * 4. 页面、sitemap 收录与索引列表在下次构建时自动出现。
 *
 * published 列表为空 = /case-studies/ 保持 noindex 且不入 sitemap。
 */
export type CaseStudy = {
  slug: string;
  status: 'draft' | 'published';
  title: string;
  summary: string;
  industry: string;
  /** 国家或地区，精度以客户允许为限。 */
  region: string;
  engineModel: string;
  /** 客户所述的操作层面问题。 */
  challenge: string[];
  /** 我们供应了什么以及如何核验。 */
  solution: string[];
  /** 可量化的结果——仅客户确认过的数字。 */
  outcome: string[];
  /** 客户原话，经书面许可。可选。 */
  quote?: { text: string; person: string; role: string; company: string };
  /** 实际供应的零件号（链接至零件页）。 */
  suppliedParts: { partNumber: string; slug: string; name: string }[];
  datePublished: string; // ISO 日期
  /** 我方的真实审核人（E-E-A-T）。 */
  reviewerName: string;
  reviewerJobTitle: string;
};

export const caseStudies: CaseStudy[] = [
  // 示例结构（在真实案例出现前保持注释）：
  // {
  //   slug: 'marine-fleet-16v4000-overhaul-parts',
  //   status: 'draft',
  //   title: '为某船队运营方供应 16V 4000 大修零件',
  //   summary: '...',
  //   industry: '船用',
  //   region: '...',
  //   engineModel: 'MTU 16V 4000',
  //   challenge: ['...'],
  //   solution: ['...'],
  //   outcome: ['...'],
  //   suppliedParts: [{ partNumber: '...', slug: '...', name: '...' }],
  //   datePublished: '2026-01-01',
  //   reviewerName: 'Lisa Huang',
  //   reviewerJobTitle: '零件核验主管',
  // },
];

export const publishedCaseStudies = caseStudies.filter((study) => study.status === 'published');
