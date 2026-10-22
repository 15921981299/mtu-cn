/** Session storage carries article → part → quote; blocked storage falls back to this page only. */
const KEY = "mtu_content_context_v1";
export type ContentContext = { article: string; batch: string; part?: string };
let memoryContext: ContentContext | null = null;

export function contentSlug(path: string): string | null {
  return /^\/insights\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/.exec(path)?.[1] ?? null;
}

export function rememberContent(context: ContentContext): void {
  memoryContext = context;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(context));
  } catch {
    /* Context still works for this page. */
  }
}

export function readContent(): ContentContext | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ContentContext;
      if (
        typeof parsed?.article === "string" &&
        typeof parsed?.batch === "string" &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(parsed.article) &&
        /^P[012]$/.test(parsed.batch) &&
        (parsed.part === undefined || typeof parsed.part === "string")
      )
        return parsed;
    }
  } catch {
    /* Corrupt or unavailable storage; fall back to this page's context. */
  }
  return memoryContext;
}

export function contentLeadParams(): Record<string, string> {
  const context = readContent();
  return context
    ? {
        content_article: context.article,
        content_batch: context.batch,
        content_part: context.part ?? "",
      }
    : {};
}
