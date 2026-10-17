import { products, isProductPageNoindex } from './products';
import { isPartPageIndexable, mtuParts } from './mtu-parts';
import { publishedCaseStudies } from './case-studies';
import { quotationExamples } from './quotation-examples';

/** Pathnames excluded from sitemap-index (must match trailingSlash: 'always'). */
const STATIC_EXCLUDES = new Set(['/401/', '/404/', '/thank-you/']);

/**
 * /case-studies/ is noindex while there are no published (customer-authorized)
 * cases; keep it out of the sitemap in that state. Individual case pages only
 * exist for published entries, so they need no exclusion here.
 */
const CASE_STUDIES_EXCLUDES = new Set(
  publishedCaseStudies.length === 0 && quotationExamples.length === 0 ? ['/case-studies/'] : [],
);

// NOTE: src/data/imported-pages.ts used to be filtered through a slug regex
// here (`isImportedPageNoindex`). After the engine-family shell pages were
// removed on 2026-10-10 that list is 12 hand-curated pages and the filter
// matched none of them — a second, stale copy of a one-off migration script's
// whitelist that would have silently re-excluded any page added later.
// If an imported page ever needs to be excluded again, mark it where it is
// generated. Do not reintroduce a slug regex here.

const NOINDEX_PRODUCT_PATHS = new Set(
  products.filter(isProductPageNoindex).map((product) => `/products/${product.slug}/`)
);

const NOINDEX_PART_PATHS = new Set(
  mtuParts
    .filter((part) => !isPartPageIndexable(part))
    .map((part) => `/part-products/${part.slug}/`)
);

export function isSitemapExcluded(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (
    STATIC_EXCLUDES.has(normalized) ||
    CASE_STUDIES_EXCLUDES.has(normalized) ||
    NOINDEX_PRODUCT_PATHS.has(normalized) ||
    NOINDEX_PART_PATHS.has(normalized)
  );
}

/** For build-time logging. */
export const sitemapExcludeStats = {
  static: STATIC_EXCLUDES.size,
  caseStudies: CASE_STUDIES_EXCLUDES.size,
  noindexProducts: NOINDEX_PRODUCT_PATHS.size,
  noindexParts: NOINDEX_PART_PATHS.size,
  total: STATIC_EXCLUDES.size + CASE_STUDIES_EXCLUDES.size + NOINDEX_PRODUCT_PATHS.size + NOINDEX_PART_PATHS.size,
};
