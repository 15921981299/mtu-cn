import { isPartPageIndexable, mtuCatalogHubs, mtuParts, type MtuPart } from './mtu-parts';

/**
 * Engine model codes parsed from catalog fitment lists, grouped into model
 * families that share (almost) the same parts list. Each family gets one
 * parts-list page, so models with identical lists never produce duplicate pages.
 */

const MODEL_RE = /\b(\d{1,2})\s?(V|R)\s?(\d{3,4})\s?([A-Z]{1,2})(\d)(\d)([A-Z]?)\b/g;
const OLD_SERIES = new Set(['183', '331', '396', '538', '595', '956', '1163']);

/** Application letters of the current naming system (2000, 4000, 1600, 8000 ...). */
const APPLICATION: Record<string, string> = {
  M: '船用（marine）',
  G: '柴油发电机组（diesel generator set）',
  L: '燃气发电机组（gas generator set）',
  R: '轨道交通（rail）',
  S: '工业（变速，industrial）',
  P: '油气（oil and gas）',
  C: '矿用（mining）',
  A: '农业（agricultural）',
};

export type EngineModel = {
  code: string;
  cylinders: number;
  arrangement: 'V' | 'R';
  series: string;
  letters: string;
  group: string;
  build: string;
  suffix: string;
};

export const parseModels = (text: string | undefined): EngineModel[] => {
  if (!text) return [];
  const found = new Map<string, EngineModel>();
  for (const m of text.toUpperCase().matchAll(MODEL_RE)) {
    const [, cyl, arrangement, series, letters, group, build, suffix] = m;
    const code = `${cyl}${arrangement} ${series} ${letters}${group}${build}${suffix}`;
    found.set(code, { code, cylinders: Number(cyl), arrangement: arrangement as 'V' | 'R', series, letters, group, build, suffix });
  }
  return [...found.values()];
};

export const modelApplication = (model: EngineModel): string | undefined => {
  if (!OLD_SERIES.has(model.series)) return APPLICATION[model.letters];
  const group = Number(model.group);
  return group === 3 ? '发电机组（generator sets）' : [5, 6, 7, 9].includes(group) ? '船用（marine）' : undefined;
};

/** Plain-language reading of a model code. Unknown letters are named, not guessed. */
export const describeModel = (model: EngineModel): string => {
  const layout = `${model.cylinders} 缸${model.arrangement === 'V' ? 'V 型' : '直列'}布置`;
  const bits = [layout, `${model.series} 系列`];
  if (OLD_SERIES.has(model.series)) {
    bits.push(model.letters.startsWith('T') ? `涡轮增压，增压空气代码 ${model.letters}` : `增压与冷却代码 ${model.letters}`);
    const group = Number(model.group);
    const use = group === 3 ? '（发电机组）' : [5, 6, 7, 9].includes(group) ? '（船用）' : '';
    bits.push(`应用组 ${model.group}${use}`, `构型 ${model.build}`);
  } else {
    const application = APPLICATION[model.letters];
    bits.push(application ? `${application}应用（${model.letters}）` : `应用代码 ${model.letters}`);
    bits.push(`子组 ${model.group}`, `构型代次 ${model.build}`);
  }
  if (model.suffix === 'L') bits.push('功率提升（L）');
  else if (model.suffix) bits.push(`功率变型 ${model.suffix}`);
  return bits.join('，');
};

/** Group/build column label for spec tables: old series encode the application in the group digit. */
export const modelBuildLabel = (model: EngineModel): string =>
  OLD_SERIES.has(model.series) ? `构型 ${model.build}` : `子组 ${model.group}，构型 ${model.build}`;

export type ModelGroup = {
  slug: string;
  title: string;
  series: string;
  models: EngineModel[];
  parts: MtuPart[];
};

const MIN_PARTS = 10;
const MERGE_OVERLAP = 0.75;

const jaccard = (a: Set<string>, b: Set<string>) => {
  let shared = 0;
  for (const value of a) if (b.has(value)) shared += 1;
  return shared / (a.size + b.size - shared);
};

const buildGroups = (): ModelGroup[] => {
  const partsByModel = new Map<string, { model: EngineModel; slugs: Set<string> }>();
  for (const part of mtuParts) {
    for (const model of parseModels(part.applicableEngines)) {
      const entry = partsByModel.get(model.code) ?? { model, slugs: new Set<string>() };
      entry.slugs.add(part.slug);
      partsByModel.set(model.code, entry);
    }
  }

  type Draft = { series: string; models: EngineModel[]; slugs: Set<string> };
  const drafts: Draft[] = [];
  const bySet = new Map<string, Draft>();
  for (const { model, slugs } of partsByModel.values()) {
    const key = `${model.series}|${[...slugs].sort().join(',')}`;
    const draft = bySet.get(key);
    if (draft) draft.models.push(model);
    else {
      const created = { series: model.series, models: [model], slugs: new Set(slugs) };
      bySet.set(key, created);
      drafts.push(created);
    }
  }

  drafts.sort((a, b) => b.slugs.size - a.slugs.size);
  const merged: Draft[] = [];
  for (const draft of drafts) {
    const target = merged.find((group) => group.series === draft.series && jaccard(group.slugs, draft.slugs) >= MERGE_OVERLAP);
    if (target) {
      target.models.push(...draft.models);
      for (const slug of draft.slugs) target.slugs.add(slug);
    } else merged.push({ series: draft.series, models: [...draft.models], slugs: new Set(draft.slugs) });
  }

  const bySlug = new Map(mtuParts.map((part) => [part.slug, part]));
  const usedSlugs = new Set<string>();
  return merged
    .filter((group) => group.slugs.size >= MIN_PARTS)
    .map((group) => {
      const models = [...group.models].sort((a, b) => a.cylinders - b.cylinders || a.code.localeCompare(b.code));
      const cylinders = [...new Set(models.map((model) => `${model.cylinders}${model.arrangement}`))];
      const codes = [...new Set(models.map((model) => `${model.letters}${model.group}${model.build}${model.suffix}`))].sort();
      const prefix = cylinders.length === 1 ? `${cylinders[0]} ` : '';
      const codeLabel = codes.length <= 3 ? codes.join(', ') : `${codes[0]} 至 ${codes[codes.length - 1]}`;
      let slug = `mtu-${prefix.trim() ? `${prefix.trim()}-` : ''}${group.series}-${codes.length <= 3 ? codes.join('-') : `${codes[0]}-to-${codes[codes.length - 1]}`}-parts`.toLowerCase();
      while (usedSlugs.has(slug)) slug = `${slug}-${group.models.length}`;
      usedSlugs.add(slug);
      const parts = [...group.slugs].map((slug) => bySlug.get(slug)!).filter(Boolean)
        .sort((a, b) => a.category.localeCompare(b.category) || a.partNumber.localeCompare(b.partNumber));
      return { slug, title: `MTU ${prefix}${group.series} ${codeLabel} 零件清单`, series: group.series, models, parts };
    })
    .sort((a, b) => Number(a.series) - Number(b.series) || b.parts.length - a.parts.length);
};

export const modelGroups: ModelGroup[] = buildGroups();

const groupsByPartSlug = new Map<string, ModelGroup[]>();
for (const group of modelGroups) {
  for (const part of group.parts) {
    groupsByPartSlug.set(part.slug, [...(groupsByPartSlug.get(part.slug) ?? []), group]);
  }
}

export const getModelGroupsForPart = (part: MtuPart) => groupsByPartSlug.get(part.slug) ?? [];

export const getSeriesCatalogHub = (series: string) =>
  mtuCatalogHubs.find((hub) => new RegExp(`(^|-)${series}(-|$)`).test(hub.slug));

export const isListedPart = (part: MtuPart) => isPartPageIndexable(part);
