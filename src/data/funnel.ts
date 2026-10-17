/** Six-stage B2B inquiry funnel mapped to engine parts sourcing pages. */
export type FunnelStage =
  | 'awareness'
  | 'comparison'
  | 'selection'
  | 'quote'
  | 'signing'
  | 'service';

export type BlogPostLike = {
  slug: string;
  title: string;
  intent?: 'informational' | 'commercial' | 'transactional';
  tags?: readonly string[];
};

const comparisonSlugPattern = /-vs-|-versus-/;
const selectionSlugPattern = /^(how-to-choose|best-|top-|guide-to-)/;
const selectionTitlePattern = /\b(best|how to choose|top \d+|which .+ (?:for|to choose))\b/i;

export function getPostFunnelStage(post: BlogPostLike): FunnelStage {
  if (comparisonSlugPattern.test(post.slug) || /\bvs\.?\b/i.test(post.title)) {
    return 'comparison';
  }
  if (
    selectionSlugPattern.test(post.slug) ||
    selectionTitlePattern.test(post.title) ||
    post.intent === 'commercial'
  ) {
    return 'selection';
  }
  return 'awareness';
}

export type FunnelCtaConfig = {
  title: string;
  text: string;
  primaryLabel: string;
  primaryHref: string;
  primaryEvent: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryEvent?: string;
};

export const funnelCtaByStage: Record<FunnelStage, FunnelCtaConfig> = {
  awareness: {
    title: 'Have a Real Engine Part to Source?',
    text: 'Send the part number, engine model, serial number, quantity, and destination. We check availability and compatibility before quoting.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/?source=parts-inquiry',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: 'Inquiry Checklist',
    secondaryHref: '/contact/?source=parts-list',
    secondaryEvent: 'resource_download',
  },
  comparison: {
    title: 'Need Help Confirming the Right Part?',
    text: 'Send your part number and engine details. We review replacements, serial-number fit, and shipment requirements before you place the order.',
    primaryLabel: 'Request Parts Review',
    primaryHref: '/contact/?source=parts-review',
    primaryEvent: 'consultation_request',
    secondaryLabel: 'View Parts Catalog',
    secondaryHref: '/part-products/',
    secondaryEvent: 'parts_catalog_view',
  },
  selection: {
    title: 'Send a Complete Parts Inquiry',
    text: 'Tell us the engine brand, model, serial number, part number, quantity, and deadline so we can respond with a useful quote.',
    primaryLabel: 'Submit Parts Inquiry',
    primaryHref: '/contact/?source=selection',
    primaryEvent: 'selection_consult_request',
    secondaryLabel: 'Browse MTU Parts',
    secondaryHref: '/part-products/',
    secondaryEvent: 'parts_catalog_view',
  },
  quote: {
    title: 'Ready for a Professional Quote?',
    text: 'Send your engine details for parts verification and pricing. We prioritize clear specifications, serious buyers, and urgent downtime orders.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/',
    primaryEvent: 'rfq_cta_click',
  },
  signing: {
    title: 'Ready to Place a Parts Order?',
    text: 'Review quality scope, payment terms, and shipping options, then send the documentation requirements your team expects.',
    primaryLabel: 'Request Order Support',
    primaryHref: '/contact/?source=order-support',
    primaryEvent: 'sample_request',
    secondaryLabel: 'Payment & Shipping Terms',
    secondaryHref: '/terms/payment/',
    secondaryEvent: 'terms_view',
  },
  service: {
    title: 'Need Documentation Before Shipment?',
    text: 'Send your part number and document requirements. We confirm available supplier documents, packing photos, and shipment paperwork before dispatch.',
    primaryLabel: 'Request a Quote',
    primaryHref: '/contact/?source=resource',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: 'Quality & Certifications',
    secondaryHref: '/certifications/',
    secondaryEvent: 'certifications_view',
  },
};

/** GA4 event name per funnel stage (page-view tracking). */
export const funnelViewEventByStage: Record<FunnelStage, string> = {
  awareness: 'parts_info_view',
  comparison: 'parts_review_view',
  selection: 'selection_guide_view',
  quote: 'rfq_form_view',
  signing: 'order_support_view',
  service: 'resource_view',
};
