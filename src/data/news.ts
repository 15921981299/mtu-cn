export type NewsArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  h1: string;
  description: string;
  category: 'Engine Programs' | 'Emission Systems' | 'Sourcing Practice';
  datePublished: string;
  dateModified: string;
  image: string;
  /** Where the factual claims in this note come from. Every article must cite at least one. */
  sources: { label: string; url: string }[];
  keyFacts: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: 'mtu-series-4000-engine-generations',
    title: 'MTU 4000 系列发动机历代沿革',
    seoTitle: 'MTU 4000 系列发动机历代沿革：零件采购方需要了解的变化',
    h1: 'MTU 4000 系列发动机历代沿革：发生了什么变化，对零件意味着什么',
    description:
      '从 1996 年首台高速共轨 4000 系列问世，到现行的 M05：您运行的发动机代次决定了适用的零件参考。',
    category: 'Engine Programs',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    sources: [
      {
        label: 'mtu Solutions — 4000 系列（官方产品页）',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
      {
        label: 'The Maritime Executive — MTU 先进设计 4000 系列满足 IMO III 与 EPA Tier 4',
        url: 'https://maritime-executive.com/corporate/mtus-advanced-design-diesel-marine-engines-from-rolls-royce',
      },
    ],
    keyFacts: [
      '首台 MTU 4000 系列船用发动机于 1996 年汉堡 SMM 展会发布——这是首款采用共轨燃油喷射的高速柴油发动机。',
      '4000 系列发动机全球销量已超过 58,000 台，累计超过 3.45 亿运行小时反馈到产品开发中。',
      '自 2018 年起，先进设计 4000 系列面向 IMO III 与 EPA Tier 4 推出，涵盖 12 缸、16 缸及新的 20 缸版本，功率 1,380 至 3,220 kW。',
      '与上一代相比：NOx 较 IMO II 降低约 75%，颗粒物较 EPA Tier 3 降低约 65%，油耗降低约 5%。',
      '该家族现行商用船用成员为 4000 系列 M05，仅凭 SCR 即满足 IMO III 与 EPA Tier 4——无需柴油颗粒捕集器。',
    ],
    sections: [
      {
        heading: '为何代次比型号标牌更重要',
        paragraphs: [
          '一台仅被描述为“MTU 4000”的发动机，可能是 1990 年代的共轨机型、2010 年代的构型，也可能是 2018 年起销售、带 SCR 尾气后处理系统的先进设计发动机。这些发动机并不共用同一份零件清单。燃油系统、涡轮增压、发动机控制与排气硬件在各代之间发生过变化，零件号也随之改变。',
          '这是 4000 系列询价最常见回复“不适用于您的出厂编号”的唯一原因。型号标牌识别的是家族，发动机出厂编号识别的才是构型。我们按出厂编号报价。',
        ],
      },
      {
        heading: '2018 年先进设计变更带来了什么',
        paragraphs: [
          '先进设计 4000 系列将涡轮增压系统、燃烧过程与喷射系统的变更，与新开发的 MTU SCR 系统结合在一起。公布的数据为：NOx 较 IMO II 降低约 75%，颗粒物较 EPA Tier 3 降低约 65%，油耗较上一代降低约 5%，且无需额外的柴油颗粒捕集器。',
          '对零件采购方而言，这意味着早期发动机上根本不存在的零部件：SCR 箱体及其催化剂元件、DEF（柴油尾气处理液）计量单元，以及相关的传感器与控制硬件。因此，缸数相同的一台 1996 代与一台 2018 代发动机，排气侧的零件可能完全不同。',
        ],
      },
      {
        heading: '现行的 M05 代',
        paragraphs: [
          '4000 系列 M05 是该家族最新的商用船用成员。其公布的开发重点是全生命周期成本、性能与维护便利性：活塞环合金经过更改以降低磨损，燃油滤清器移位以改善保养接近性，空气滤清器集成到发动机包线内使布置更紧凑。燃烧过程的先进仿真降低了机内颗粒物，因此仅需 SCR 即可满足 IMO III 与 EPA Tier 4。',
          '保养接近性的变化不是表面文章。当滤清器移位时，其周围的软管、支架与保养包内容也随之改变。按“老号码”订购保养件而不核查代次，车间就会拿到与滤清器壳不再匹配的滤芯。',
        ],
      },
      {
        heading: '如何识别您拥有哪一代',
        paragraphs: [
          '请发送发动机出厂编号；涉及排气后处理时，再附一张 SCR 箱体及其型号铭牌的照片。有无 SCR 系统是区分 2018 年前后构型最快的直观办法。如果您不确定发动机符合 IMO II 还是 IMO III，答案几乎总决定排气侧零件。',
          '对发电与工业装置同样如此：先发动机出厂编号，再用途。同一代的 4000 系列发电机组与 4000 系列推进装置，冷却、安装与控制零件仍有差异。',
        ],
      },
    ],
    faqs: [
      {
        question: '4000 系列零件在各代发动机之间通用吗？',
        answer:
          '部分基础件通用，但燃油系统、涡轮增压、控制与排气零件通常不通用。1996 年问世带来了共轨喷射，2018 年先进设计又改变了涡轮增压、燃烧与喷射，并增加了 SCR 系统。报价请始终给出发动机出厂编号，而不是家族名称。',
      },
      {
        question: '如何知道我的 4000 系列是否需要 SCR 零件？',
        answer:
          '如果发动机按 IMO III 或 EPA Tier 4 制造，它将带有 MTU SCR 尾气后处理系统与 DEF 计量。SCR 箱体铭牌可识别该系统。装置照片加发动机出厂编号，通常足以让我们确认正确的参考号。',
      },
      {
        question: '符合 IMO III 的 4000 系列需要柴油颗粒捕集器吗？',
        answer:
          '据 MTU 说明，不需要。先进设计 4000 系列与现行 M05 仅凭 SCR 即满足 IMO III 与 EPA Tier 4；机内燃烧变化已充分降低颗粒物，无需额外的 DPF。',
      },
      {
        question: '我只有型号名，没有出厂编号，还能报价吗？',
        answer:
          '我们可以列出候选，但不会在没有出厂编号的情况下确认零件号。两台同型号名的发动机可能具有不同的构型状态，而有差异的恰恰是那些昂贵的零件。',
      },
    ],
    related: [
      { label: 'MTU 4000 零件目录', href: '/part-products/catalog/mtu-4000-series/' },
      { label: 'MTU 备件概览', href: '/products/mtu-spare-parts/' },
      { label: '原厂件、OEM 品质件与售后市场件路线', href: '/genuine-oem-parts/' },
      { label: '常规采购的 MTU 零件', href: '/products/mtu-spare-parts/regularly-sourced-parts/' },
    ],
  },
  {
    slug: 'imo-iii-epa-tier-4-scr-parts-list',
    title: 'IMO III 与 EPA Tier 4：SCR 为零件清单增添了什么',
    seoTitle: 'IMO III / EPA Tier 4 SCR 系统：它们为清单增添的零件',
    h1: 'IMO III 与 EPA Tier 4：SCR 系统为您的零件清单增添了什么',
    description:
      'SCR 尾气后处理为船用与工业发动机增添催化剂元件、DEF 计量单元与传感器硬件——也带来了一套多数零件清单尚未建立的保养模式。',
    category: 'Emission Systems',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/engine-parts-sensors-catalog.webp',
    sources: [
      {
        label: 'mtu Solutions — 带集成 SCR 系统的 4000 系列（官方产品页）',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
      {
        label: 'Rolls-Royce — 渡轮 Pyxis 上带 SCR 的 EPA Tier 4 MTU 4000 系列',
        url: 'https://rolls-royce.production.investis.com/media/our-stories/discover/2019/ship-of-the-year-2020.aspx',
      },
    ],
    keyFacts: [
      'MTU SCR 系统围绕一个紧凑的 SCR 箱体构建，箱体上的保养门用于更换催化剂元件。',
      '两个 DEF（柴油尾气处理液）计量单元内置于 SCR 箱体，无气助工作，并带一根集成混合管。',
      '排放在 SCR 系统上游与下游两侧测量，反应剂用量以闭环调节，从而在所有工况下防止氨逃逸。',
      'SCR 系统可调而非预设，因此船舶在排放控制区之间航行时可开关系统。',
      'EPA Tier 4 于 2016 年 1 月 1 日在美国生效，对 NOx、颗粒物与碳氢排放的要求远低于此前规定。',
    ],
    sections: [
      {
        heading: '老旧发动机家族上的新保养类别',
        paragraphs: [
          '排放后处理把柴油发动机的排气侧变成了一个带消耗件的系统。在 IMO II 或 EPA Tier 3 发动机上，排气路径只有管系与消音器；而在带 SCR 的 IMO III 或 EPA Tier 4 发动机上，它是催化剂箱、计量单元、混合管与一套传感器——各有寿命，各有零件号。',
          '围绕滤清器、皮带、喷油器与大修包规划保养的运营方，常常发现后处理是第一个让他们措手不及的系统，因为它从未出现在原始清单上。',
        ],
      },
      {
        heading: 'SCR 增添的零件',
        paragraphs: [
          '公布的 MTU 设计将两个 DEF 计量单元置于 SCR 箱体内，无气助工作，并配一根节省安装空间的集成混合管。催化剂元件通过保养门触及，这些门专为元件更换而设。排放在系统两侧测量，反应剂剂量以闭环调节。',
          '实际上，这带来了四组此前不存在的零件：催化剂元件、计量单元部件、为闭环供数的传感器组，以及固定箱体与管系的密封件、卡箍与波纹管。在排放控制区内外往返航行的船舶，其计量硬件的负荷高于始终在控制区内运行的船舶。',
        ],
      },
      {
        heading: '系统为何可调，这对备件意味着什么',
        paragraphs: [
          'MTU SCR 系统并非通常那样的预设值；它测量上下游排放并调节引入的反应剂量。它也可按需开关——例如船舶从一个排放控制区驶入另一个时。',
          '对备件规划而言，这意味着工况循环比日历时间更要紧。两套相同的发动机在不同航线上消耗计量硬件的速度并不相同。询价后处理时，请告诉我们实际运行工况，而不只是发动机型号。',
        ],
      },
      {
        heading: '后处理询价应随附的信息',
        paragraphs: [
          '请发送发动机出厂编号、SCR 箱体铭牌照片，以及船舶或装置的运行 profile。涉及催化剂元件时，箱体布置——立式、卧式或 cube——会影响零件。如果您有发动机控制或监控系统的故障码，请一并附上：它们通常能指出是哪个传感器或执行器失效。',
          '我们为后处理件报价时采用与机械件相同的供应路线标注：原厂、OEM 品质替代，或存在路线时的再制造。当催化剂或计量部件没有替代时，我们会如实说明，而不是提供替代品。',
        ],
      },
    ],
    faqs: [
      {
        question: '哪些 SCR 零件是消耗件，哪些是长寿命件？',
        answer:
          '催化剂元件与计量单元磨损件属于消耗侧；箱体、混合管与安装硬件属于长寿命侧。实际保养间隔取决于工况循环与系统运行频次，因此我们对照您的实际运行工况报价，而不是套用固定小时数。',
      },
      {
        question: 'IMO III 发动机不装 SCR 系统能运行吗？',
        answer:
          '系统可以开关，这在船舶于排放控制区之间移动时很有用。这是否允许您的装置如此运行，是船旗国与运营区域层面的法规问题，而非零件问题——我们供应硬件并确认参考号。',
      },
      {
        question: 'SCR 零件有售后市场替代件吗？',
        answer:
          '催化剂与计量部件比滤清器或垫片更依系统而定，因此替代市场很薄。我们为每一行标注供应路线，并在只有原厂件存在时直说。',
      },
      {
        question: '除发动机编号外还需要 SCR 序列号吗？',
        answer:
          '涉及箱体时需要。发动机出厂编号识别发动机；SCR 箱体铭牌识别后处理构型与布置。拍一张该铭牌照片是避免催化剂或计量参考号出错的最快方式。',
      },
    ],
    related: [
      { label: 'MTU 传感器与电气零件', href: '/part-products/catalog/mtu-sensors/' },
      { label: '船用发动机服务', href: '/capabilities/marine-engine-service/' },
      { label: 'MTU 4000 系列发动机历代沿革', href: '/news/mtu-series-4000-engine-generations/' },
      { label: '搜索全部零件号', href: '/part-number-index/' },
    ],
  },
  {
    slug: 'fuel-sulfur-limits-and-emission-system-parts',
    title: '燃油硫含量与排放系统',
    seoTitle: '燃油硫限值：订购发动机零件时为何 15 ppm 要紧',
    h1: '燃油硫含量与排放系统：订购零件时为何 15 ppm 要紧',
    description:
      'EGR 与 SCR 对燃油质量持相反立场。了解您的发动机使用哪套系统、承受什么硫含量，可避免一类通常被归错部件的故障。',
    category: 'Sourcing Practice',
    datePublished: '2026-10-17',
    dateModified: '2026-10-17',
    image: '/images/engine-parts-verification-desk.webp',
    sources: [
      {
        label: 'mtu Solutions — 4000 系列：EGR 燃油质量要求与 SCR 偏好（官方产品页）',
        url: 'https://www.mtu-solutions.com/eecis/en/applications/yacht/system-solutions/engines/mtu-series-4000.html',
      },
    ],
    keyFacts: [
      '采用 EGR（废气再循环）技术时，硫含量超过 15 ppm 的燃油会在 EGR 冷却过程中生成硫酸。',
      '由此生成的硫酸会随时间造成严重的发动机故障。',
      '由于许多船舶在全球运营——尤其是近海服务与供应——MTU 评估将 SCR 作为维持发动机可靠性的首选方案。',
      'SCR 技术允许使用比 EGR 要求更低的燃油质量运行。',
      'MTU 还指出，由绿色电力与捕集 CO2 生产的 power-to-X 电子燃料（e-methane、e-methanol、e-diesel）是更清洁内燃机的一条路线。',
    ],
    sections: [
      {
        heading: '同一法规的两条路线，相反的燃油要求',
        paragraphs: [
          'IMO III 与 EPA Tier 4 可以通过处理排气——SCR——或改变燃烧——EGR——来满足。两条路线对燃油的要求截然不同。在使用 EGR 的场合，硫含量超过 15 ppm 的燃油会在 EGR 冷却过程中形成硫酸，而这种酸会随时间造成严重的发动机故障。',
          'SCR 避免了这种依赖。由于许多船舶在全球航行，无法保证在每个加油港都获得低硫燃油，MTU 评估将 SCR 作为近海服务与供应运营的首选方案，因为它允许使用更低质量的燃油运行。',
        ],
      },
      {
        heading: '为何这会表现为零件问题',
        paragraphs: [
          '燃油引发的损坏很少主动暴露为燃油问题。EGR 回路中的酸生成会侵蚀冷却器、增压空气部件及其下游零件。症状是一个部件失效，病因却是燃油。只更换失效部件而不解决燃油质量，只是让计时重新开始。',
          '当您订购 EGR 回路冷却器、密封件或增压空气部件时，请告诉我们发动机实际承受的燃油硫含量。它改变的不只是零件号，还有我们能给出的建议。',
        ],
      },
      {
        heading: '订购前应记录什么',
        paragraphs: [
          '从构型数据记录发动机使用的排放路线——SCR、EGR 或两者皆无——而不是从型号假设。记录正常服役中的燃油规格；对跨区域航行的船舶，记录最差情况下的供应而非最好情况。再加上自上次后处理或 EGR 回路保养以来的运行小时数。',
          '这只需几分钟，却能避免最昂贵的一类零件错误：把正确的零件装进会再次毁掉它的发动机。',
        ],
      },
      {
        heading: '我们如何处理',
        paragraphs: [
          '我们为每一报价行标注供应路线，并对照发动机出厂编号确认参考号。当所订零件已知对燃油质量或工况循环敏感时，我们会在报价中说明，而不是静默发货。我们不会把目录列名当作库存报告：供货情况逐单确认。',
        ],
      },
    ],
    faqs: [
      {
        question: '我的发动机用 SCR 还是 EGR？',
        answer:
          '由构型数据与发动机出厂编号决定，而非型号名。直观上，SCR 发动机有带 DEF 计量的排气后处理箱；EGR 发动机把冷却后的废气引回进气。不确定时，请发送装置照片与出厂编号。',
      },
      {
        question: 'EGR 发动机烧高硫燃油会怎样？',
        answer:
          '据 MTU 说明，硫含量超过 15 ppm 的燃油会在 EGR 冷却过程中生成硫酸，随时间造成严重的发动机故障。损坏出现在冷却器、增压空气部件与下游零件上，因此通常被诊断为部件失效而非燃油问题。',
      },
      {
        question: '可以把 EGR 发动机改成 SCR 吗？',
        answer:
          '那是发动机制造商或船级社的工程改造问题，不是零件问题。我们为您发动机已有的配置供应零件，并对照出厂编号确认参考号。',
      },
      {
        question: '你们库存排放系统零件吗？',
        answer:
          '我们不会把目录列名当作库存报告。供货情况、交货期与供应状态在核查零件号与发动机出厂编号后逐单确认，每一报价行都标注供应路线。',
      },
    ],
    related: [
      { label: 'MTU 4000 系列发动机历代沿革', href: '/news/mtu-series-4000-engine-generations/' },
      { label: 'IMO III 与 EPA Tier 4 SCR 零件', href: '/news/imo-iii-epa-tier-4-scr-parts-list/' },
      { label: '原厂件、OEM 品质件与售后市场件路线', href: '/genuine-oem-parts/' },
      { label: '如何采购 MTU 零件', href: '/how-to-source-mtu-parts/' },
    ],
  },
];

export const getNewsArticle = (slug: string) => newsArticles.find((article) => article.slug === slug);
