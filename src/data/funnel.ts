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
    title: '有实际的发动机零件要采购？',
    text: '请提供零件号、发动机型号、出厂编号、数量与目的地。我们在报价前核查供货情况与适配性。',
    primaryLabel: '获取报价',
    primaryHref: '/contact/?source=parts-inquiry',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: '询价清单',
    secondaryHref: '/contact/?source=parts-list',
    secondaryEvent: 'resource_download',
  },
  comparison: {
    title: '需要帮助确认正确的零件？',
    text: '请发送您的零件号与发动机资料。我们会在下单前审核替换件、出厂编号适配与发运要求。',
    primaryLabel: '申请零件审核',
    primaryHref: '/contact/?source=parts-review',
    primaryEvent: 'consultation_request',
    secondaryLabel: '查看零件目录',
    secondaryHref: '/part-products/',
    secondaryEvent: 'parts_catalog_view',
  },
  selection: {
    title: '发送完整的零件询价',
    text: '请告知发动机品牌、型号、出厂编号、零件号、数量与期限，以便我们回复有实际意义的报价。',
    primaryLabel: '提交零件询价',
    primaryHref: '/contact/?source=selection',
    primaryEvent: 'selection_consult_request',
    secondaryLabel: '浏览 MTU 零件',
    secondaryHref: '/part-products/',
    secondaryEvent: 'parts_catalog_view',
  },
  quote: {
    title: '准备获取专业报价？',
    text: '发送您的发动机资料以进行零件核验与计价。我们优先处理规格明确、意向明确与紧急停机的订单。',
    primaryLabel: '获取报价',
    primaryHref: '/contact/',
    primaryEvent: 'rfq_cta_click',
  },
  signing: {
    title: '准备下达零件订单？',
    text: '请审核质量范围、付款条款与发运选项，然后发送您团队期望的文件要求。',
    primaryLabel: '申请订单支持',
    primaryHref: '/contact/?source=order-support',
    primaryEvent: 'sample_request',
    secondaryLabel: '付款与运输条款',
    secondaryHref: '/terms/payment/',
    secondaryEvent: 'terms_view',
  },
  service: {
    title: '发货前需要文件？',
    text: '请发送零件号与文件要求。我们在发货前确认可得的供应商文件、包装照片与发运单据。',
    primaryLabel: '获取报价',
    primaryHref: '/contact/?source=resource',
    primaryEvent: 'rfq_cta_click',
    secondaryLabel: '质量与认证',
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
