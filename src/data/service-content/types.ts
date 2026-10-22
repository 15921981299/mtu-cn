export type ServiceArticle = {
  id: number;
  slug: string;
  title: string;
  description: string;
  batch: "P0" | "P1" | "P2";
  audience: string;
  intro: string;
  sourcing: {
    keyword: string;
    topic: string;
    text: string;
    href: string;
    label: string;
  };
  table: { caption: string; headers: string[]; rows: string[][] };
  diagram: {
    system: "fuel" | "cooling" | "lubrication" | "boost";
    caption: string;
    nodes: string[];
  };
  steps: { title: string; text: string }[];
  mistake: string;
  evidence: { text: string; source: string };
  redlines: string[][];
  checklist: string[];
  faqs: { question: string; answer: string }[];
  categories: string[];
  partMatch?: string;
  series?: string;
  hubs: { href: string; label: string }[];
  related: number[];
};
