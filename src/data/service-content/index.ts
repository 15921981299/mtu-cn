import p0 from "./p0.json";
import p1 from "./p1.json";
import p2 from "./p2.json";
import type { ServiceArticle } from "./types";
import { isPartPageIndexable, mtuParts } from "../mtu-parts";

export type { ServiceArticle } from "./types";
export const contentDate = "2026-10-22";
export const serviceArticles = [...p0, ...p1, ...p2] as ServiceArticle[];

export const contentSources: Record<string, { label: string; url: string }> = {
  starter: {
    label: "Delco Remy：起动主回路压降检查（通用电气原理）",
    url: "https://www.delcoremy.com/the-latest/2024/march-2024/tech-tip-voltage-drop-test",
  },
  commonRail: {
    label: "MTU：共轨喷射原理（2014，原理说明）",
    url: "https://www.mtu-solutions.com/seai/en/stories/technology/research-development/how-does-common-rail-injection-work.html",
  },
  s4000: {
    label: "Detroit Diesel／MTU：早期 S4000 原厂服务资料（镜像，DDEC 配置）",
    url: "https://manualmachine.com/detroitdieselengine/mtus4000/4537376-service-manual/",
  },
  filtration: {
    label: "MTU：4000 矿用燃油过滤升级说明（2016，勿跨用途套用套件）",
    url: "https://www.mtu-solutions.com/au/en/technical-articles/2016/new-mtu-fuel-filtration-upgrade-kit-ensures-optimal-performance-in-the-field-even-when-fuel-quality-standards-are-difficult-or-impossible-to-met.html",
  },
  technicalDocs: {
    label: "MTU：机型技术文档与操作资料取得方式",
    url: "https://www.mtu-solutions.com/trmea/en/technical-information/technical-documentation.html",
  },
  fluids: {
    label: "MTU：A001061/46E 油液与燃油规范（2026-01，按系列和用途核对）",
    url: "https://www.mtu-solutions.com/content/dam/mtu/download/technical-info/betriebsstoffvorschrift_en/A001061_46E.pdf/_jcr_content/renditions/original./A001061_46E.pdf",
  },
  overhaul: {
    label: "MTU：工厂大修的检查与验收范围",
    url: "https://www.mtu-solutions.com/na/en/service/reman-and-overhaul-solutions/overhaul.html",
  },
  g44: {
    label:
      "MTU：20V4000G44F 操作说明 ADEC 报警章节（原厂资料镜像，仅限对应配置）",
    url: "https://www.manualslib.com/manual/1517851/Mtu-20v4000g44f.html",
  },
  lowLoad: {
    label: "MTU：后处理热力学与负载测试（2025，测试示例非统一下限）",
    url: "https://www.mtu-solutions.com/eecis/en/technical-articles/2025/aftertreatment-thermodynamics-Impact-on-emission-reduction.html",
  },
  preservation: {
    label: "MTU：A001070/07E 封存、再封存与去封存（2025-03）",
    url: "https://www.mtu-solutions.com/content/dam/mtu/download/technical-info/A001070_07E.pdf/_jcr_content/renditions/original./A001070_07E.pdf",
  },
  reman: {
    label: "MTU：原厂再制造与芯件押金／抵扣流程",
    url: "https://www.mtu-solutions.com/na/en/service/reman-and-overhaul-solutions/remanufacture.html",
  },
  genuine: {
    label: "MTU：原厂备件与供货支持说明",
    url: "https://www.mtu-solutions.com/seai/en/service/genuine-spare-parts.html",
  },
  logistics: {
    label: "MTU：综合后勤支持与关键部件分析",
    url: "https://www.mtu-solutions.com/cn/en/service/integrated-logistic-support.html",
  },
  classDocuments: {
    label: "DNV：NOx 技术案卷、机械部件与 PSC 检查提醒（2024）",
    url: "https://www.dnv.com/news/2024/psc-focus-on-nox-technical-files-and-machinery-components/",
  },
  operating4000: {
    label:
      "MTU：MS150064/01E 操作说明，进气／中冷检查索引（2011，原厂资料镜像）",
    url: "https://en.tech-expo.ru/upload/iblock/9ab/4000_instructions_MTU_12V4000G21R.pdf",
  },
};

export const foundationGuides = [
  { slug: "mtu-engine-smoke-diagnosis-parts", label: "黑烟、蓝烟与白烟" },
  { slug: "mtu-low-oil-pressure-parts", label: "机油压力低" },
  { slug: "mtu-high-coolant-temperature-parts", label: "冷却水温高" },
  { slug: "mtu-maintenance-interval-parts-list", label: "保养周期与备件" },
  { slug: "mtu-4000-series-model-identification", label: "4000 机型识别" },
  { slug: "mtu-filter-cross-reference", label: "滤芯交叉参考" },
  { slug: "mtu-part-number-structure", label: "零件号结构" },
  { slug: "mtu-overhaul-interval", label: "大修周期与状态" },
];

/** Select real indexable catalog records; these are identification candidates, not diagnosis or fitment recommendations. */
export function articleParts(article: ServiceArticle) {
  const match = new RegExp(article.partMatch ?? ".", "i");
  const candidates = mtuParts.filter(
    (part) =>
      isPartPageIndexable(part) &&
      article.categories.includes(part.category) &&
      match.test(part.name) &&
      (!article.series || part.series.includes(article.series)),
  );
  // Prefer an actual component illustrating the article, then diversify related positions.
  const priorities: Record<number, string[]> = {
    1: ["X59417200010", "0035351731", "X00E50203659"],
    5: ["X52405400013", "5500500334", "5610105420"],
    6: ["X52404200037", "X00041552", "0002000001"],
    7: ["5410100163", "4220300124", "E0070960399"],
    8: ["5410100163", "5240384110", "4220300124"],
    9: ["5320900001", "X00041552", "E0070960399"],
    12: ["0020921901", "X59417200010", "0005356430"],
    13: ["0020921901", "0031845201", "0002000001"],
    15: ["0020921901", "EX52407500064", "X52404200037"],
    16: ["EX52407500064", "E0070960399", "X00009196"],
    18: ["X52404200037", "5240384110", "4220300124"],
    22: ["EX52407500064", "5610105420", "E0070960399"],
    24: ["5240384110", "4220300124", "X52405400013"],
  };
  const preferred = (priorities[article.id] ?? [])
    .map((pn) =>
      mtuParts.find(
        (part) => part.partNumber === pn && isPartPageIndexable(part),
      ),
    )
    .filter((part): part is (typeof mtuParts)[number] => Boolean(part));
  const different = candidates.filter(
    (part, index, all) => all.findIndex((p) => p.name === part.name) === index,
  );
  const ordered = [...preferred, ...different, ...candidates];
  return ordered
    .filter(
      (part, index) => ordered.findIndex((p) => p.slug === part.slug) === index,
    )
    .slice(0, 3);
}

export const batchLabels = {
  P0: "起动、供油与排温",
  P1: "运行、油液与停放",
  P2: "采购、售后与风险",
};

/** Editorial body count; excludes navigation, shared footer and catalog data. */
export function articleCharacterCount(article: ServiceArticle) {
  const {
    intro,
    table,
    steps,
    mistake,
    evidence,
    redlines,
    checklist,
    faqs,
    sourcing,
  } = article;
  return (
    JSON.stringify({
      intro,
      table,
      steps,
      mistake,
      evidence,
      redlines,
      checklist,
      faqs,
      sourcing: { text: sourcing.text, label: sourcing.label },
    }).match(/\p{Script=Han}/gu) ?? []
  ).length;
}
