/**
 * Customer supply cases. RED LINE: only real, customer-authorized cases go here.
 * Never invent a case, a customer name, a quote, or a result figure.
 *
 * Workflow:
 * 1. Get written authorization at order/contract time (article-backed: retroactive
 *    permission succeeds far less often; named cases convert 60-80% better than anonymous).
 * 2. Add an entry below with status: 'draft' and collect the real details.
 * 3. Switch to status: 'published' only after the customer confirms the final text.
 * 4. Pages, sitemap inclusion, and index listing appear automatically on next build.
 *
 * Empty published list = /case-studies/ stays noindex and out of the sitemap.
 */
export type CaseStudy = {
  slug: string;
  status: 'draft' | 'published';
  title: string;
  summary: string;
  industry: string;
  /** Country or region, only as precise as the customer allows. */
  region: string;
  engineModel: string;
  /** The operational problem, in the customer's terms. */
  challenge: string[];
  /** What we supplied and how it was verified. */
  solution: string[];
  /** Measurable outcome — only figures the customer confirmed. */
  outcome: string[];
  /** Customer's own words, with written permission. Optional. */
  quote?: { text: string; person: string; role: string; company: string };
  /** Part numbers actually supplied (links to part pages). */
  suppliedParts: { partNumber: string; slug: string; name: string }[];
  datePublished: string; // ISO date
  /** Real reviewer on our side (E-E-A-T). */
  reviewerName: string;
  reviewerJobTitle: string;
};

export const caseStudies: CaseStudy[] = [
  // Example structure (keep commented until a real case exists):
  // {
  //   slug: 'marine-fleet-16v4000-overhaul-parts',
  //   status: 'draft',
  //   title: '16V 4000 Overhaul Parts for a Marine Fleet Operator',
  //   summary: '...',
  //   industry: 'Marine',
  //   region: '...',
  //   engineModel: 'MTU 16V 4000',
  //   challenge: ['...'],
  //   solution: ['...'],
  //   outcome: ['...'],
  //   suppliedParts: [{ partNumber: '...', slug: '...', name: '...' }],
  //   datePublished: '2026-01-01',
  //   reviewerName: 'Lisa Huang',
  //   reviewerJobTitle: 'Parts Verification Lead',
  // },
];

export const publishedCaseStudies = caseStudies.filter((study) => study.status === 'published');
