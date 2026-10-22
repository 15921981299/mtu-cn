import {
  contentLeadParams,
  contentSlug,
  readContent,
  rememberContent,
} from "./content-attribution";

const article = document.querySelector<HTMLElement>("[data-content-article]");
if (
  article &&
  contentSlug(window.location.pathname) === article.dataset.contentArticle
) {
  rememberContent({
    article: article.dataset.contentArticle!,
    batch: article.dataset.contentBatch!,
  });
  window.gtag?.("event", "content_article_view", contentLeadParams());
  const clicked = new Set<string>();
  let openedQuote = false;
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest<HTMLAnchorElement>("a");
    if (!link) return;
    let url: URL;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (
      url.pathname.startsWith("/part-products/") &&
      !url.pathname.startsWith("/part-products/catalog/") &&
      url.pathname !== "/part-products/"
    ) {
      const context = readContent();
      if (!context) return;
      rememberContent({
        ...context,
        part: link.dataset.contentPart || url.pathname.split("/")[2],
      });
      // Count the photo link and card to the same part once per article view.
      if (clicked.has(url.pathname)) return;
      clicked.add(url.pathname);
      window.gtag?.("event", "content_part_click", {
        ...contentLeadParams(),
        destination_path: url.pathname,
      });
    }
    if (
      (link.hasAttribute("data-rfq-modal") || url.pathname === "/contact/") &&
      !openedQuote
    ) {
      openedQuote = true;
      window.gtag?.("event", "content_quote_open", contentLeadParams());
    }
  });
}
