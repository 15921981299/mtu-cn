export function isSubpageNoindex(_parentSlug: string, _subpageSlug: string): boolean {
  return false;
}

export function subpagePath(parentSlug: string, subpageSlug: string, cluster: 'products'): string {
  return `/${cluster}/${parentSlug}/${subpageSlug}/`;
}
