export const site = {
  name: 'Diesel Part Source',
  company: {
    legalName: 'Shanghai Diesel Part Source Co., Ltd.',
    legalNameEn: 'Shanghai Diesel Part Source Co., Ltd.',
    /**
     * Registered / correspondence address (Pudong New Area, Shanghai).
     * SINGLE SOURCE OF TRUTH: the three schema.org PostalAddress blocks, the
     * visible NAP text on /about/ and /contact/, and public/llms.txt all read
     * from here, so an address change can never leave the site half-updated.
     */
    address: {
      streetAddress: 'Room 401, No. 655 Jialin Road, Pudong New Area',
      addressLocality: 'Shanghai',
      addressRegion: 'Shanghai',
      postalCode: '201206',
      addressCountry: 'CN',
      /** One-line form for visible NAP text. */
      singleLine: 'Room 401, No. 655 Jialin Road, Pudong New Area, Shanghai, 201206, China',
    },
  },
  url: 'https://dieselpartsource.com',
  email: 'sales@dieselpartsource.com',
  phone: '+8615921981299',
  whatsapp: '+8615921981299',
  tagline: '配件核验 | 快速交付',
  logo: {
    default: '/images/dieselpartsource-logo.svg',
    compact: '/images/dieselpartsource-logo.svg',
    icon: '/images/dieselpartsource-logo.svg',
    width: 258,
    height: 40,
  },
  /** Set your GA4 Measurement ID (e.g. G-XXXXXXXX) to enable analytics. Leave empty to disable. */
  gaMeasurementId: 'G-WPLNY49ZJV',
  /** Paste the content value from Google Search Console HTML verification. Leave empty to skip. */
  googleSiteVerification: 'RqNtSOYc73P2ni6Y1FZl1tsK9INXgsi5qOE2HtyIdIY',
  /** Google Tag Manager container ID (e.g. GTM-XXXXXXX). Leave empty to disable GTM. */
  gtmContainerId: '',
  social: {
    /** Company LinkedIn — set here or via PUBLIC_LINKEDIN_URL in .env */
    linkedin:
      (typeof import.meta.env.PUBLIC_LINKEDIN_URL === 'string' && import.meta.env.PUBLIC_LINKEDIN_URL.trim()) ||
      '',
    /** Factory tour video — matches quality.inspectionMedia.youtubeVideoId. */
    youtube: 'https://www.youtube.com/watch?v=M7uJEbDD-_8',
  },
  /** Author external profiles — fill URLs when live; used in Person schema sameAs */
  authorSocial: {
    weiChenLinkedIn:
      (typeof import.meta.env.PUBLIC_AUTHOR_WEI_CHEN_LINKEDIN === 'string' &&
        import.meta.env.PUBLIC_AUTHOR_WEI_CHEN_LINKEDIN.trim()) ||
      '',
    lisaHuangLinkedIn:
      (typeof import.meta.env.PUBLIC_AUTHOR_LISA_HUANG_LINKEDIN === 'string' &&
        import.meta.env.PUBLIC_AUTHOR_LISA_HUANG_LINKEDIN.trim()) ||
      '',
  },
  /**
   * Visible author/reviewer identity for guides & case studies.
   * RED LINE: fill with a REAL, verifiable person only (Google AI-Slop method 6 —
   * fictional authors with stock photos are a high-risk signal; Organization
   * authorship is the honest default and is perfectly acceptable).
   * Leave `name` empty → pages emit Organization author. Set name + jobTitle +
   * linkedin → pages switch to Person author with sameAs.
   */
  author: {
    name: '',
    jobTitle: '',
    /** Public LinkedIn profile URL of the named person (sameAs evidence). */
    linkedin:
      (typeof import.meta.env.PUBLIC_AUTHOR_LINKEDIN === 'string' &&
        import.meta.env.PUBLIC_AUTHOR_LINKEDIN.trim()) ||
      '',
  },
  /**
   * Quality claims shown on site — keep wording accurate.
   * Set iso9001CertNumber / iso9001CertBody when you hold a direct certificate;
   * otherwise we state partner-facility ISO 9001 (default).
   */
  quality: {
    iso9001Label: 'ISO 9001 合作工厂',
    iso9001Description:
      '发动机配件均经审核的供应商与制造合作伙伴供货。我们对合格的询价订单记录零件号核对、供应商沟通、包装要求与发货信息。',
    iso9001CertNumber: '',
    iso9001CertBody: '',
    /** Shown on certifications when no direct cert number is on file. */
    iso9001VerificationNote:
      '合格的配件询价可索取供应商资质文件与质量说明。',
    /** Industry workflows we support — link to /certifications/ pages, not cert claims we cannot verify. */
    industryPrograms: [
      { label: '船用发动机服务', href: '/industries/marine/' },
      { label: '发电机组配件', href: '/industries/power-generation/' },
      { label: '工业发动机维修', href: '/industries/industrial-engines/' },
      { label: '轨交发动机配件', href: '/industries/rail/' },
      { label: '船厂维修支持', href: '/industries/shipyards-repair/' },
    ],
    /** Optional YouTube tour (fills VideoObject on proof pages). */
    inspectionMedia: {
      /** YouTube video ID only (not full URL). Leave empty to hide embed. */
      youtubeVideoId: 'M7uJEbDD-_8',
    },
  },
  defaultDescription:
    '柴油零件源（Diesel Part Source）为船用、工业、轨交与发电应用提供经核验的 MTU、Detroit Diesel、Cummins 与 DEUTZ 发动机配件采购服务，自上海全球交付。',
};

const organizationLogoUrl = `${site.url}${site.logo.default}`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.company.legalNameEn,
  alternateName: [site.name, site.company.legalName],
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.defaultDescription,
  logo: organizationLogoUrl,
  areaServed: 'Worldwide',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.company.address.streetAddress,
    addressLocality: site.company.address.addressLocality,
    addressRegion: site.company.address.addressRegion,
    postalCode: site.company.address.postalCode,
    addressCountry: site.company.address.addressCountry,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      telephone: site.phone,
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Chinese'],
    },
  ],
  knowsAbout: [
    'MTU 发动机配件',
    'Detroit Diesel 配件',
    'Cummins 发动机配件',
    'DEUTZ 发动机配件',
    '船用发动机服务',
    '工业发动机服务',
  ],
  // sameAs is populated only with non-empty social URLs to avoid emitting empty links.
  ...(Object.values(site.social).some(Boolean)
    ? { sameAs: Object.values(site.social).filter(Boolean) }
    : {}),
};

/** schema.org Service markup for capability/service detail pages. */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.image ? { image: service.image } : {}),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    areaServed: 'Worldwide',
  };
}

/**
 * schema.org Product markup.
 * Google treats Product without a priced Offer (or reviews/ratings) as an invalid
 * product snippet, so quote-on-request items return null and emit no Product.
 */
export function productSchema(product: {
  name: string;
  description: string;
  url: string;
  image: string;
  material?: string;
  sku?: string;
  model?: string;
  brandName?: string;
  manufacturerName?: string;
  category?: string;
  /** Only emit availability when it has been checked for this specific item. */
  availability?: string;
  /** Public unit price in USD. Omit for quote-on-request items. */
  price?: number | string;
  /** ISO date the public price stays valid until. */
  priceValidUntil?: string;
}) {
  // Quote-on-request items (no public price) still emit a Product entity so the
  // part number (mpn/sku) and brand are associated with the page for part-number
  // search. Only the Offer node is withheld when there is no verifiable price —
  // an Offer without price is invalid, and inventing one is not an option.
  const hasPrice = product.price != null && product.price !== '';
  const description = product.material
    ? `${product.description} 参考组别：${product.material}。`
    : product.description;
  const sku = product.sku ?? product.model;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    url: product.url,
    image: product.image,
    ...(product.brandName
      ? {
          brand: {
            '@type': 'Brand',
            name: product.brandName,
          },
        }
      : {}),
    ...(product.category ? { category: product.category } : {}),
    ...(product.manufacturerName
      ? {
          manufacturer: {
            '@type': 'Organization',
            name: product.manufacturerName,
          },
        }
      : {}),
    ...(hasPrice
      ? {
          offers: {
            '@type': 'Offer',
            url: product.url,
            price: String(product.price),
            priceCurrency: 'USD',
            ...(product.priceValidUntil ? { priceValidUntil: product.priceValidUntil } : {}),
            ...(product.availability ? { availability: product.availability } : {}),
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              '@type': 'Organization',
              name: site.name,
              url: site.url,
            },
          },
        }
      : {}),
    ...(sku
      ? {
          sku,
          mpn: sku,
          model: product.model ?? sku,
        }
      : {}),
  };
}

/** schema.org FAQPage markup for pages with Q&A sections. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** schema.org AboutPage for the company / E-E-A-T landing page. */
export function aboutPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
    mainEntity: {
      '@type': 'Organization',
      name: site.company.legalNameEn,
      alternateName: [site.name, site.company.legalName],
      url: site.url,
      email: site.email,
      telephone: site.phone,
      description: site.defaultDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.company.address.streetAddress,
        addressLocality: site.company.address.addressLocality,
        addressRegion: site.company.address.addressRegion,
        postalCode: site.company.address.postalCode,
        addressCountry: site.company.address.addressCountry,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese'],
      },
    },
  };
}

/** schema.org ContactPage for the RFQ / contact landing page. */
export function contactPageSchema(page: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: page.name,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
    about: {
      '@type': 'Organization',
      name: site.company.legalNameEn,
      alternateName: [site.name, site.company.legalName],
      url: site.url,
      email: site.email,
      telephone: site.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.company.address.streetAddress,
        addressLocality: site.company.address.addressLocality,
        addressRegion: site.company.address.addressRegion,
        postalCode: site.company.address.postalCode,
        addressCountry: site.company.address.addressCountry,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: site.phone,
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Chinese'],
      },
    },
  };
}

/** schema.org HowTo for inquiry / fulfillment process steps. */
export function howToSchema(howto: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.name,
    description: howto.description,
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** schema.org ItemList for collection pages. */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** schema.org VideoObject for embedded factory / process videos. */
export function videoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : {}),
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
  };
}

/** schema.org Article markup for customer case study detail pages. */
export function caseStudySchema(study: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  industry: string;
  authorName: string;
  authorUrl: string;
  authorJobTitle: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.description,
    image: study.image,
    datePublished: study.datePublished,
    ...(study.dateModified ? { dateModified: study.dateModified } : {}),
    articleSection: study.industry,
    about: {
      '@type': 'Thing',
      name: `${study.industry}发动机配件`,
    },
    author: {
      '@type': 'Person',
      name: study.authorName,
      url: study.authorUrl,
      jobTitle: study.authorJobTitle,
      worksFor: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
    mainEntityOfPage: study.url,
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  authorJobTitle?: string;
  authorSameAs?: string[];
  authorType?: 'Person' | 'Organization';
}) {
  const authorType = article.authorType ?? 'Organization';
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    author: {
      '@type': authorType,
      name: article.authorName,
      ...(article.authorUrl ? { url: article.authorUrl } : {}),
      ...(authorType === 'Person' && article.authorJobTitle
        ? { jobTitle: article.authorJobTitle }
        : {}),
      ...(article.authorSameAs?.length ? { sameAs: article.authorSameAs } : {}),
      ...(authorType === 'Person'
        ? {
            worksFor: {
              '@type': 'Organization',
              name: site.name,
              url: site.url,
            },
          }
        : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
      },
    },
    mainEntityOfPage: article.url,
  };
}

export function personProfileSchema(person: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: person.name,
    description: person.description,
    url: person.url,
    mainEntity: {
      '@type': 'Person',
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      url: person.url,
      ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
      ...(person.knowsAbout?.length ? { knowsAbout: person.knowsAbout } : {}),
      worksFor: {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
      },
    },
  };
}
