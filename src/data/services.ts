type ServiceItem = {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  image: string;
  mainImage: string;
  secondImage: string;
};

export const services: ServiceItem[] = [
  {
    slug: 'mtu-engine-parts',
    title: 'MTU 发动机零件',
    seoTitle: 'MTU 发动机零件供应商 | 国晁动力',
    h1Title: '经核验的 MTU 发动机零件供应',
    summary:
      '覆盖 183、331、396、493、538、595、956、1163、2000、4000 与 8000 系列发动机的 MTU 全系列备件，采购路线经核验，全球交付。',
    image: '/images/mtu-engine-parts-hero.webp',
    mainImage: '/images/mtu-2000-series-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'cummins-engine-parts',
    title: 'Cummins 发动机零件',
    seoTitle: 'Cummins 发动机零件供应商 | 国晁动力',
    h1Title: 'Cummins 柴油发动机零件',
    summary:
      'Cummins 柴油发动机供应支持，及面向工业、船用、发电与设备维护计划的经核验替换路线。',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'deutz-engine-parts',
    title: 'DEUTZ 发动机零件',
    seoTitle: 'DEUTZ 发动机零件供应商 | 国晁动力',
    h1Title: 'DEUTZ 柴油发动机零件',
    summary:
      'DEUTZ 替换件与发动机支持，面向工程机械、动力装置、泵、压缩机与工业机群。',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/mtu-part-number-verification.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'industrial-engine-service',
    title: '工业发动机服务',
    seoTitle: '工业柴油发动机服务与零件 | 国晁动力',
    h1Title: '工业发动机服务与支持',
    summary:
      '面向用于泵、压缩机、重型设备、油田装置与工业动力系统的发动机的零件采购与技术支持。',
    image: '/images/industrial-diesel-engine-parts.webp',
    mainImage: '/images/generator-engine-parts.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
  {
    slug: 'marine-engine-service',
    title: '船用发动机服务',
    seoTitle: '船用柴油发动机零件与服务 | 国晁动力',
    h1Title: '船用发动机零件与服务',
    summary:
      '为渡轮、工作船、游艇、船厂与近海发动机运营方提供经核验的 MTU 备件采购，支持紧急全球发运。',
    image: '/images/marine-diesel-engine-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/global-engine-parts-delivery.webp',
  },
  {
    slug: 'genuine-oem-parts',
    title: '经核验 OEM 采购',
    seoTitle: '经核验的 OEM 柴油发动机零件采购 | 国晁动力',
    h1Title: '经核验的 OEM 零件采购',
    summary:
      'OEM、OEM 替代、再制造与替换采购路线，从 O 型圈到曲轴，为保养、大修与车队运营清晰标注。',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    mainImage: '/images/mtu-engine-parts-hero.webp',
    secondImage: '/images/mtu-part-number-verification.webp',
  },
];

export function getServiceDetailHtml(title: string) {
  const details: Record<string, { partOne: string; partTwo: string }> = {
    'MTU 发动机零件': {
      partOne: `
        <h2>MTU 全系列备件</h2>
        <p>国晁动力专注于供应 MTU 发动机零件，覆盖经典与现行发动机家族，包括 183、331、396、493、538、595、956、1163、2000、4000 与 8000 系列。我们支持需要清晰识别、明确标注采购路线与快速发运的维护团队。</p>
        <h3>典型 MTU 零件</h3>
        <ul>
          <li>滤清器、密封件、O 型圈、垫片与大修包</li>
          <li>燃油泵、喷油器、压力传感器与控制部件</li>
          <li>气门导管、活塞、缸套、轴承、曲轴与气缸盖</li>
          <li>冷却、涡轮增压、排气与电气部件</li>
        </ul>
      `,
      partTwo: `
        <h2>识别支持</h2>
        <p>发送您的发动机型号、出厂编号、零件号、铭牌照片或旧件照片。我们的团队帮助在发运前确认正确的 MTU 零件，避免因备件不匹配造成停机。</p>
        <h3>读懂 MTU 零件号格式</h3>
        <p>MTU 使用多种零件号格式，认识它们可加快识别：</p>
        <ul>
          <li><strong>十位数字</strong>，如 <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201</a> 或 5240530830，是新老系列中最常见的格式。</li>
          <li><strong>带 X 前缀的号码</strong>，如 <a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091</a>，出现在许多较新零件上。</li>
          <li><strong>带 EX 前缀的号码</strong>，如 <a href="/part-products/ex52407500064-injector/">EX52407500064</a>，通常表示换件或再制造单元。</li>
          <li><strong>700 系列标准件</strong>，如 700429100000，覆盖标准 O 型圈及类似件。</li>
          <li><strong>带 F 前缀的号码</strong>通常为专用工具，见 <a href="/part/mtu-specialized-tools/">MTU 专用工具</a>。</li>
        </ul>
        <p>斜杠后缀（如 /29 或 /00）标识特定版本，询价时应始终包含。</p>
        <h3>从哪里开始</h3>
        <p>在 <a href="/part-products/">MTU 零件目录</a>中按号码搜索，或按系列浏览 <a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a>、<a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a> 与 <a href="/part-products/catalog/mtu-396-series/">MTU 396</a> 目录。</p>
        <h3>全球交付</h3>
        <p>我们从上海安排全球快递与货运发运。紧急船舶、发电与工业停机需求优先处理。</p>
        <p><a href="/contact/">发送您的 MTU 零件询价</a></p>
      `,
    },
    'Cummins 发动机零件': {
      partOne: `
        <h2>Cummins 柴油发动机零件</h2>
        <p>我们为工业机械、发电机组、船用设备与需要可靠零件采购和快速报价支持的现场维护团队供应 Cummins 柴油发动机零件。</p>
        <h3>我们寻源的范围</h3>
        <ul>
          <li>例行保养件与保养包</li>
          <li>燃油、进气、冷却与润滑系统部件</li>
          <li>电气传感器、控制单元与替换总成</li>
        </ul>
      `,
      partTwo: `
        <h2>报价要求</h2>
        <p>请提供 Cummins 发动机型号、CPL 号、出厂编号与需求数量。我们将确认供货情况、交货期与发运选项。</p>
        <h3>最常被问到的发动机系列</h3>
        <ul>
          <li>紧凑型发电机、泵与机械中的 B 与 C 系列发动机</li>
          <li>工业与船用辅助中的 L 与 M 系列发动机</li>
          <li>N14 与 K 系列发动机（含 KTA19、KTA38、KTA50），用于大型发电机组与矿用设备</li>
          <li>高输出发电机与重型设备中的 QSK 系列发动机</li>
        </ul>
        <h3>滤清器与交叉引用</h3>
        <p>许多 Cummins 发动机使用 Fleetguard 滤清器，保养清单常混合 Cummins 零件号、Fleetguard 号与其他滤清器品牌。请发送您手头的任何号码；我们将其匹配到发动机，并为每个位置报一个一致的参考号，避免同一滤清器以不同号码重复订购。</p>
        <h3>多品牌订单</h3>
        <p>同时运行 Cummins 与 MTU 或 DEUTZ 机组的现场可发送一份合并清单。每一行对照其自身发动机数据核查，零件一起发运。包级别与 CPL 指导见 <a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins 保养包与大修零件</a>。</p>
        <p><a href="/contact/">查询 Cummins 零件供货</a></p>
      `,
    },
    'DEUTZ 发动机零件': {
      partOne: `
        <h2>DEUTZ 发动机零件</h2>
        <p>国晁动力支持用于工程机械、压缩机、泵与工业设备的 DEUTZ 柴油发动机。我们帮助买方识别零件，并合并计划保养或紧急维修的订单。</p>
        <h3>供应范围</h3>
        <ul>
          <li>滤清器、皮带、密封件、垫片与保养包</li>
          <li>燃油喷射、冷却、润滑与电气件</li>
          <li>计划保养计划的大修部件</li>
        </ul>
      `,
      partTwo: `
        <h2>可靠寻源</h2>
        <p>发送您的 DEUTZ 发动机型号与零件号。我们核验适配性，并为您的目的地提供切实可行的发运选项。</p>
        <h3>读懂 DEUTZ 型号称号</h3>
        <p>DEUTZ 型号代码描述发动机构型。以 BF6M1013 为例：“B”表示涡轮增压，“F”表示四冲程车用型发动机，“6”为缸数，“M”表示液冷，“1013”为系列。风冷发动机在同一位置用“L”，如 F4L912。较新发动机对增压并中冷的发动机使用 TCD 前缀，如 TCD 2013。认识这些字母有助于我们在核查出厂编号前缩小零件清单范围。</p>
        <h3>常见 DEUTZ 家族</h3>
        <ul>
          <li>老式机械与泵中的 912、913 与 914 风冷发动机</li>
          <li>紧凑型设备中的 1011 与 2011 发动机</li>
          <li>工程与工业机械中的 1012、1013 与 2012、2013 发动机</li>
          <li>现行设备中的 TCD 2012、2013 及后续 TCD 系列</li>
        </ul>
        <p>机型层面的建议（含风冷与液冷件之别）见 <a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ 工业设备零件</a>。</p>
        <p><a href="/contact/">索取 DEUTZ 零件支持</a></p>
      `,
    },
    '工业发动机服务': {
      partOne: `
        <h2>工业发动机支持</h2>
        <p>工业设备不能等待不明的采购渠道。我们帮助维护团队寻找用于泵、压缩机、钻机、重型机械与发电机组的发动机零件。</p>
        <h3>支持领域</h3>
        <ul>
          <li>从发动机铭牌与旧件标记识别零件</li>
          <li>库存核查、替换建议与订单合并</li>
          <li>出口包装与国际物流协调</li>
        </ul>
      `,
      partTwo: `
        <h2>围绕停机而建</h2>
        <p>告知发动机型号、故障件与目标交货日期。我们将优先安排关键备件，并帮助您选择最快的可行物流路线。</p>
        <h3>本服务涵盖什么</h3>
        <p>国晁动力是零件供应商。我们的服务工作发生在订单前后，而不是在现场：识别零件、理顺清单，并把正确的件送到您的车间。维修由您自己的技术人员或当地服务伙伴执行，我们确保开工时他们有所需的零件与专用工具。</p>
        <h3>一次典型的故障询价</h3>
        <ol>
          <li>您发送发动机数据铭牌照片、故障件或其号码，以及现场位置。</li>
          <li>我们确认参考号，并核查该件是现货、伙伴库存还是需要寻源。</li>
          <li>报价逐行显示供货情况、发运方式与预计到达时间。</li>
          <li>付款后，我们包装、按需拍照，并带跟踪信息发货。</li>
        </ol>
        <h3>减少下一次故障</h3>
        <p>紧急订单之后，许多客户请我们就同一发动机提出一个小型现场备件包。该包通常包含一个保养周期的滤清器、皮带、最可能失效的传感器与水泵密封。另见我们的 <a href="/industries/industrial-engines/">工业发动机零件</a>页面与 <a href="/support-services/">支持服务</a>。</p>
        <p><a href="/contact/">咨询工业发动机支持</a></p>
      `,
    },
    '船用发动机服务': {
      partOne: `
        <h2>船用发动机零件与服务</h2>
        <p>我们为渡轮、工作船、游艇、船厂与近海设备支持经核验的 MTU 零件采购。MTU 2000、4000、595、956、1163 及相关系列是常见询价领域。</p>
        <h3>我们服务的船用买方</h3>
        <ul>
          <li>渡轮、工作船与商用船舶运营方</li>
          <li>游艇维护团队与船厂</li>
          <li>近海、港口与船用服务提供商</li>
        </ul>
      `,
      partTwo: `
        <h2>紧急发运支持</h2>
        <p>船用故障以时间计。我们帮助快速确认正确零件，并协调出口文件、快递或货运至船舶或维修船厂。</p>
        <h3>面向机构与车队买方的文件</h3>
        <p>车队与机构采购常需要的不仅是商业报价。在信息可得的情况下，我们可以在报价单上提供：</p>
        <ul>
          <li>每行的零件号、描述与发动机应用</li>
          <li>每行的 HS 编码、净重与原产国</li>
          <li>所报号码被替代时的替代说明</li>
          <li>按您采购指示的包装与唛头</li>
        </ul>
        <p>我们的零件页面在确认处带有 HS 编码与包装数据，例如 <a href="/part-products/catalog/mtu-956-series/">MTU 956</a> 与 <a href="/part-products/catalog/mtu-1163-series/">MTU 1163</a> 目录中的垫片与密封件。</p>
        <h3>招标与框架订单</h3>
        <p>招标请发送完整品项清单、数量与所需文件。我们返回可粘贴进招标格式的逐行报价。框架协议下，我们可以为重复订单保持相同参考号与包装格式。船厂与船舶工作流见我们的 <a href="/industries/marine/">船用行业页面</a>。</p>
        <p><a href="/contact/">发送船用零件询价</a></p>
      `,
    },
    '经核验 OEM 采购': {
      partOne: `
        <h2>OEM 与替换路线评估</h2>
        <p>从 O 型圈到曲轴，国晁动力帮助买方比较 MTU、Detroit Diesel、Cummins 与 DEUTZ 发动机的切实供应路线。适用时，报价会标明 OEM、OEM 替代、再制造、修复或替换路线。</p>
        <h3>为何路线清晰要紧</h3>
        <ul>
          <li>正确的配合与可靠的使用寿命</li>
          <li>降低大修与车队维护期间的风险</li>
          <li>付款或发货前更清晰的替换决策</li>
        </ul>
      `,
      partTwo: `
        <h2>我们报价上的供应路线</h2>
        <ul>
          <li><strong>原厂（OEM）。</strong>由发动机制造商或以制造商零件号为其供应的零件。保修作业与关键部件的首选。</li>
          <li><strong>OEM 替代。</strong>由部件制造商按同一规格生产，常与为发动机厂商代工原件的同一供应商。常见于滤清器、密封件、垫片与轴承。</li>
          <li><strong>再制造换件。</strong>旧芯件（如喷油器、泵、涡轮增压器）按规格重建并测试。MTU 换件通常带 EX 前缀。</li>
          <li><strong>修复或替换。</strong>仅在其他路线不可用时提供，并始终如此标注。</li>
        </ul>
        <h3>选择路线</h3>
        <p>对于仍在制造商保修期内的发动机，可能只接受原厂件。对于每年只运行数小时的备用发电机，OEM 替代滤清器可能是合理的选择。对于老旧发动机的喷油器组，再制造换件可能是最快的选项。我们列出选项与取舍；决定权在您。</p>
        <h2>如何申请零件</h2>
        <p>请提供零件号、发动机型号、铭牌照片、旧件照片与数量。如合同要求特定路线，请告知。我们核查库存、核验替换选项，并随清晰路线说明报价发运。买方到货核查清单见 <a href="/genuine-oem-parts/">如何检查原厂 MTU 零件</a>。</p>
        <p><a href="/contact/">申请经核验的零件采购</a></p>
      `,
    },
  };

  return details[title] || {
    partOne: `<h2>${title}</h2><p>国晁动力为全球船用与工业用户供应柴油发动机零件与服务支持。</p>`,
    partTwo: `<h3>获取支持</h3><p><a href="/contact/">请告知您的发动机型号与零件号，联系我们</a>。</p>`,
  };
}
