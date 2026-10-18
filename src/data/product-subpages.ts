const cta = (label: string) =>
  `<p style="margin-top:20px;"><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">${label}</a></p>`;

export const productSubpages = [
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-part-number-lookup',
    title: 'MTU 零件号查询与识别支持',
    seoTitle: 'MTU 零件号查询 | 国晁动力',
    h1Title: 'MTU 零件号查询',
    summary:
      '请提供您的 MTU 零件号、发动机型号、出厂编号或铭牌照片。国晁动力会在报价前帮助核验正确的原厂件或 OEM 制造商更换件。',
    content: {
      partOne: `<h2>如何识别 MTU 零件</h2><p>最快的 MTU 零件报价方式是提供准确的零件号与发动机出厂编号。如零件号缺失或已被替代，请发送旧件、铭牌、安装位置的照片，以及任何铸造或标签标记。</p><h3>从现有信息入手</h3><ul><li>准确零件号：检索 <a href="/part-products/">MTU 发动机零件在线目录</a></li><li>发动机系列：浏览 <a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a>、<a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a> 或 <a href="/part-products/catalog/mtu-396-series/">MTU 396 零件</a></li><li>部件类型：浏览 <a href="/part-products/catalog/mtu-injectors/">喷油器</a>、<a href="/part-products/catalog/mtu-fuel-pumps/">燃油泵</a>、<a href="/part-products/catalog/mtu-filters/">滤清器</a> 或 <a href="/part-products/catalog/mtu-turbocharger-parts/">涡轮增压器零件</a></li><li>标记不清：发送发动机铭牌与旧件照片以便识别</li><li>按功率档次：<a href="/products/mtu-spare-parts/mtu-genset-parts-by-power/">MTU 发电机组零件（按功率）</a></li><li>大修范围：<a href="/products/mtu-spare-parts/mtu-overhaul-kits/">MTU 大修套件</a></li><li>新型构型：<a href="/products/mtu-spare-parts/mtu-1600-series-parts/">1600 系列与 F 构型型号</a></li><li>老旧与燃气发动机：<a href="/products/mtu-spare-parts/mtu-legacy-gas-engine-parts/">老旧与燃气覆盖范围</a></li></ul><h3>有助于询价的信息</h3><ul><li>零件号与数量</li><li>发动机系列、型号与出厂编号</li><li>铭牌照片与旧件照片</li><li>船舶、发电、轨道交通或工业应用</li><li>目的国与要求的交货日期</li></ul>`,
      partTwo: `<h2>更换与替代号核查</h2><p>许多 MTU 备件存在更新或更换后的零件号。我们会在报价前比对原始零件号、更换历史、发动机应用与安装细节，避免买家在紧急维护中收到错误的备件。</p><h3>使用现有目录或零件清单</h3><p>您可以发送 Excel 清单、PDF 保养清单、目录截图或标注图纸。请尽可能提供发动机出厂编号；仅凭 PDF 参考无法确认跨生产批次的适配性。</p>${cta('核验 MTU 零件号')}`,
    },
  },
  {
    productSlug: 'mtu-spare-parts',
    slug: 'mtu-engine-series-guide',
    title: 'MTU 柴油发动机系列与零件指南',
    seoTitle: 'MTU 柴油发动机 | 系列与零件指南',
    h1Title: 'MTU 柴油发动机系列与零件指南',
    summary:
      'MTU 柴油发动机系列与零件支持指南，覆盖 183、396、595、956、1163、2000、4000 与 8000 系列的船用、发电、轨道交通与工业应用。',
    content: {
      partOne: `<h2>MTU 柴油发动机系列</h2><p>MTU 柴油发动机广泛应用于船用推进、发电机组、轨道交通牵引、工业动力与重型车辆领域。系列名称标识发动机范围，但完整的型号、功率、应用与出厂编号才决定正确的备件。</p><h3>当前高需求系列</h3><ul><li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000</a> —— 用于船用、发电、轨道交通与工业领域的紧凑高速发动机</li><li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000</a> —— 用于船用推进、发电、机车与重工业的高输出发动机</li><li><a href="/products/mtu-series-8000-engines/">MTU 8000</a> —— 需按型号核验零件的大功率船用发动机</li></ul><h3>老旧 MTU 发动机系列</h3><ul><li><a href="/part-products/catalog/mtu-396-series/">MTU 396</a> —— 成熟的船用与发电平台，老旧零件号仍有持续需求</li><li><a href="/part-products/catalog/mtu-595-series/">MTU 595</a> —— 重型船用与工业发动机零件</li><li><a href="/part-products/catalog/mtu-956-series/">MTU 956</a> 与 <a href="/part-products/catalog/mtu-1163-series/">MTU 1163</a> —— 船用与重型应用，零件历史随出厂编号而异</li><li>MTU 183、331、493 与 538 —— 通过准确零件号与更换核查支持的老旧发动机系列</li></ul><h3>常用 MTU 发动机零件</h3><ul><li>保养滤清器、密封件、垫片、皮带与保养套件</li><li>燃油泵、喷油器、压力阀、传感器与控制部件</li><li>冷却泵、叶轮、恒温器、涡轮增压器与润滑零件</li><li>气门、缸盖部件、活塞、缸套、活塞环与轴承</li></ul>`,
      partTwo: `<h2>如何解读 MTU 发动机型号代码</h2><p>发动机数据铭牌上的型号代码包含的信息远不止系列。MTU 使用两套命名体系，一套用于老旧大缸径系列，一套用于现行系列，两者都可以从左向右读取。</p><h3>现行系列：2000、4000、1800 与 8000</h3><p>以 <strong>12V 4000 M93L</strong> 为例：</p><ul><li><strong>12</strong> 为缸数</li><li><strong>V</strong> 为气缸布置形式；R 代表直列发动机</li><li><strong>4000</strong> 为系列</li><li><strong>M</strong> 为应用代码：M 船用、G 柴油发电机组、L 燃气发电机组、R 轨道交通、S 工业（变速）、P 油气、C 矿用</li><li><strong>9</strong> 为应用子组，船用发动机上反映负荷特性</li><li><strong>3</strong> 为构型代次，因此 M93 是比 M90 更新的构型</li><li><strong>L</strong> 表示附加选项，通常为功率提升</li></ul><h3>老旧系列：396、595、956 与 1163</h3><p>以 <strong>16V 396 TE74L</strong> 为例。在缸数与系列之后，字母描述增压与增压空气冷却方式：<strong>TB</strong> 与 <strong>TE</strong> 为采用不同增压空气冷却布置的涡轮增压版本。第一位数字为应用组，例如 3 表示恒速发电机组，5、6、7 或 9 表示船用；第二位数字为构型。结尾的 L 同样表示功率提升。</p><h3>为何对零件重要</h3><p>零件通常随应用字母与构型数字而变。同一系列的 G 版与 M 版发动机可能共用滤清器与密封件，但喷油器、涡轮增压器、冷却部件与发动机控制不同。较新的构型可能使用与旧构型不同的活塞或燃油系统零件。因此我们要求提供完整的型号代码与出厂编号，而不只是"MTU 4000"。</p><h2>如何识别正确的 MTU 发动机零件</h2><p>同一系列的两台发动机，依应用、功率、生产批次与排放配置的不同，可能使用不同的喷油器、泵、传感器、涡轮增压器、冷却部件与大修分级。</p><h3>请提供以下信息</h3><ul><li>完整的发动机型号与出厂编号</li><li>准确的零件号、旧件标记或目录位置</li><li>发动机铭牌与部件标签照片</li><li>数量、目的地与要求的交货日期</li></ul><p>已掌握零件号时，请使用 <a href="/part-products/">MTU 发动机零件目录</a>。船用应用请参阅 <a href="/applications/marine-propulsion-engines/">MTU 船用发动机零件指南</a>。</p>${cta('询价 MTU 柴油发动机零件')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: '16v-2000-engine-parts',
    title: 'MTU 16V 2000 发动机零件',
    seoTitle: 'MTU 16V 2000 发动机零件供应商 | 国晁动力',
    h1Title: 'MTU 16V 2000 发动机零件',
    summary:
      '面向船用推进、发电、轨道交通与工业应用的 MTU 16V 2000 发动机零件，提供出厂编号核验与全球交付。',
    content: {
      partOne: `<h2>MTU 16V 2000 发动机零件支持</h2><p>MTU 16V 2000 系列包含多种功率与应用变型，用于高速船舶、发电机组、轨道交通设备与工业装置。仅凭气缸配置不足以确认适配性，因此每次询价都会对照完整的型号名称、发动机出厂编号、应用与现有零件号进行核验。</p><h3>MTU 16V 2000 常用零件询盘</h3><ul><li>喷油器、泵、压力阀与燃油管路</li><li>计划保养用机油、燃油与空气滤清器</li><li>冷却泵、叶轮、恒温器与密封部件</li><li>缸盖垫片、气门、轴承、活塞与缸套</li><li>转速、压力、温度与液位传感器</li></ul><p>船用 M96L 变型请参阅 <a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L 发动机零件</a>。可使用 <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 零件目录</a>，浏览 <a href="/part-products/catalog/mtu-injectors/">MTU 喷油器</a>，或按部件标签与发动机出厂编号查询 <a href="/part-products/catalog/mtu-fuel-pumps/">MTU 燃油泵</a>。</p>`,
      partTwo: `<h2>我们如何核验 16V 2000 适配性</h2><p>请提供完整的发动机型号、出厂编号、零件号、数量与目的地。如零件号不清或已被替代，请附铭牌、旧件标签、接头、安装位置或目录图纸。我们会回复可行的 OEM、OEM 替代件、再制造件或更换件路线，并清楚注明交货期与运输选项。</p><h3>典型保养场景</h3><ul><li>船用或发电计划保养清单</li><li>喷油器不均衡、传感器故障、冷却泄漏或滤清器补给</li><li>缸盖或上部组件维修</li><li>大修零件合并为一次询盘</li></ul>${cta('询价 MTU 16V 2000 零件')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: 'mtu-m96l-engine-parts',
    title: 'MTU 16V 2000 M96L 发动机零件',
    seoTitle: 'MTU M96L 发动机零件 | 16V 2000 M96L',
    h1Title: 'MTU 16V 2000 M96L 发动机零件',
    summary:
      '面向 16V 2000 船用推进应用的 MTU M96L 发动机零件，提供完整型号、出厂编号与部件零件号核验。',
    content: {
      partOne: `<h2>MTU 16V 2000 M96L 零件</h2><p>MTU 16V 2000 M96L 与高性能船用推进及游艇应用相关。由于邻近的 2000 系列变型可能使用不同的零件号，其燃油、增压、冷却、控制与保养部件必须对照完整的发动机出厂编号与安装情况进行核验。</p><h3>M96L 常用零件询盘</h3><ul><li>喷油器、泵、压力控制阀与高压管路</li><li>游艇与船舶计划保养用机油、燃油与空气滤清器</li><li>海水泵、冷却水泵、叶轮、恒温器与密封件</li><li>涡轮增压器部件、传感器、线束与发动机控制件</li><li>垫片、气门、活塞、缸套、轴承与大修部件</li></ul><p>请浏览 <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 零件号目录</a>、<a href="/part-products/catalog/mtu-injectors/">MTU 喷油器零件号</a>、<a href="/part-products/catalog/mtu-fuel-pumps/">MTU 燃油泵</a> 与 <a href="/part-products/catalog/mtu-2000-cooling-system-parts/">2000 系列冷却系统零件</a>。</p>`,
      partTwo: `<h2>M96L 适配与询价核查</h2><p>请提供发动机铭牌、完整型号与出厂编号、准确的零件号、数量、船舶或船厂所在地以及保养期限。喷油器、涡轮增压器、泵、传感器与控制模块的部件标签尤为重要。</p><h3>典型 M96L 保养场景</h3><ul><li>游艇或船舶保养套件的计划性补充</li><li>燃油压力、喷油器均衡、传感器或控制故障</li><li>冷却泄漏、海水泵磨损或过热排查</li><li>涡轮增压器保养与大修零件计划</li></ul><p>我们会在核验型号与零件号后，明确可行的供货路线与运输选项。</p>${cta('询价 MTU M96L 发动机零件')}`,
    },
  },
  {
    productSlug: 'mtu-2000-series-parts',
    slug: 'marine-generator-service-parts',
    title: 'MTU 2000 系列船用与发电保养零件',
    seoTitle: 'MTU 2000 系列船用发电零件 | 国晁动力',
    h1Title: 'MTU 2000 船用与发电零件',
    summary:
      '面向 MTU 2000 系列船用推进、辅助发电与工业动力应用的保养与大修零件。',
    content: {
      partOne: `<h2>MTU 2000 系列应用</h2><p>MTU 2000 系列广泛应用于船用推进、辅助动力、发电机组与工业动力装置。计划保养通常包括滤清器、皮带、密封件、冷却部件、燃油系统零件与电气传感器。</p><h3>船用版与发电版不可互换</h3><p>型号代码中的应用字母表明发动机的制造方式。M 版发动机（如 12V 2000 M72 或 16V 2000 M84）按推进配置，通常配海水泵、热交换器与船用专用增压。G 版发动机（如 12V 2000 G65）恒速驱动发电机，多采用散热器冷却。两者的许多保养件通用，但冷却、排气、燃油喷射与控制部件往往不同，因此我们会在报价前确认完整型号。</p><h3>典型询盘清单</h3><ul><li>船队维护用日常保养套件，以 <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 机油滤清器</a> 与 <a href="/part-products/x57508300091-fuel-filter-spin-on/">X57508300091 燃油滤清器</a> 等旋装件为核心</li><li>燃油喷射、增压、冷却与润滑零件</li><li>传感器、线束、控制部件与更换总成</li><li>船用发动机的海水泵叶轮与密封件</li><li>计划性机舱作业用大修零件</li></ul><p>请按系统浏览 <a href="/part-products/catalog/mtu-2000-filters-parts/">2000 系列滤清器</a>、<a href="/part-products/catalog/mtu-2000-cooling-system-parts/">冷却系统</a>、<a href="/part-products/catalog/mtu-2000-fuel-system-parts/">燃油系统</a> 与 <a href="/part-products/catalog/mtu-2000-sensors-and-electrical-parts/">传感器与电气</a> 目录。</p>`,
      partTwo: `<h2>紧急停机支持</h2><p>如遇船舶或发电机组停机，请提供目标交货日期与目的港或城市。我们会在确认订单前核查库存与可行的运输路线。</p><h3>组建船上或现场备件包</h3><p>长途航行的船舶与偏远场站的发电机组，适合在发动机旁配备一个小型备件包。2000 系列发动机的典型起点为：一套完整的机油、燃油与空气滤清器，船用机的海水泵叶轮与密封件套件，驱动皮带，恒温器，以及最常引发报警的压力与温度传感器。请提供发动机型号、出厂编号与运行小时数，我们会推荐一份可供调整的备件包。</p><h3>相关页面</h3><ul><li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 发动机零件</a></li><li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L 零件</a></li><li><a href="/applications/auxiliary-generator-engines/">辅助发电机发动机零件</a></li><li><a href="/products/mtu-spare-parts/mtu-genset-parts-by-power/">MTU 发电机组零件（按功率）</a></li><li><a href="/part-number-index/">零件号索引（EN · DE）</a></li></ul>${cta('查询 MTU 2000 零件')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: 'overhaul-parts',
    title: 'MTU 4000 系列大修零件',
    seoTitle: 'MTU 4000 系列大修零件 | 国晁动力',
    h1Title: 'MTU 4000 系列大修零件',
    summary:
      '面向船用、发电、轨道交通与工业领域 MTU 4000 系列发动机的经核验 OEM、OEM 替代件、再制造件与更换件大修路线。',
    content: {
      partOne: `<h2>MTU 4000 大修零件</h2><p>MTU 4000 系列发动机用于可靠性与开机率要求高的场合。国晁动力为维护团队提供缸盖作业、活塞与缸套更换、配气机构保养、轴承、垫片、密封件、冷却与燃油系统所需零件。</p><h3>常用大修类别</h3><ul><li>活塞、缸套、活塞环、轴承与垫片</li><li>气门、导管、座圈与缸盖部件</li><li>燃油泵、喷油器、传感器与控制件</li><li>冷却、润滑、增压与过滤部件</li></ul>`,
      partTwo: `<h2>编制合并零件清单</h2><p>请以 Excel 或邮件形式发送计划大修清单。我们可以逐行核对零件号供货情况，并协助国际发运的合并出口包装。</p><h3>上部作业或大型大修</h3><p>上部大修聚焦缸盖、气门、喷油器与涡轮增压器，零件清单相对可预测。大型大修则进一步涉及活塞、缸套、轴承与曲轴作业，最终清单取决于发动机解体后取得的测量值。对于大型作业，我们建议分两阶段报价：对必然更换的项目（如垫片套件、密封件与活塞环）报实价，对有尺寸分级的零件待检查结果确认后再报价。</p><h3>有助于加快报价的信息</h3><ul><li>完整的发动机型号（如 16V 4000 M93L 或 20V 4000 G63）与出厂编号</li><li>大修范围与大修时的运行小时数</li><li>缸套、活塞与轴承的尺寸代码或测量记录</li><li>零件抵达修理厂的目标日期</li></ul><p>请在 <a href="/part-products/catalog/mtu-4000-pistons-and-liners-parts/">4000 系列活塞与缸套</a>、<a href="/part-products/catalog/mtu-4000-bearings-parts/">轴承</a>、<a href="/part-products/catalog/mtu-4000-gaskets-and-seals-parts/">垫片与密封件</a> 与 <a href="/part-products/catalog/mtu-4000-valve-train-parts/">配气机构</a> 目录中查阅零件号。</p>${cta('询价 MTU 4000 大修零件')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: '12v-4000-engine-parts',
    title: 'MTU 12V 4000 发动机零件',
    seoTitle: 'MTU 12V 4000 发动机零件供应商 | 国晁动力',
    h1Title: 'MTU 12V 4000 发动机零件',
    summary:
      '面向船用、发电、轨道交通与工业领域的 MTU 12V 4000 发动机零件，涵盖燃油、冷却、过滤、传感器与大修部件。',
    content: {
      partOne: `<h2>MTU 12V 4000 零件供应</h2><p>MTU 12V 4000 发动机用于大功率发电、船用、轨道交通与工业装置。型号后缀、功率、排放配置与出厂编号都可能改变正确的喷油器、传感器、冷却与大修零件号，因此我们会在报价前核验完整的发动机身份信息。</p><h3>常用询盘零件</h3><ul><li>共轨喷油器、高压泵、阀与燃油管路</li><li>机油滤清器、燃油滤清器、空气滤清器与计划保养件</li><li>冷却水泵、叶轮、恒温器与热交换部件</li><li>缸套、活塞、活塞环组、轴承与垫片套件</li><li>涡轮增压器、起动机、发电机、传感器与控制部件</li></ul><p>请浏览 <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 零件目录</a>、<a href="/part-products/catalog/mtu-fuel-pumps/">MTU 燃油泵</a>、<a href="/part-products/catalog/mtu-4000-filters-parts/">4000 滤清器零件号</a> 或 <a href="/part-products/catalog/mtu-starter-motors-alternators/">MTU 起动机与发电机</a>。</p>`,
      partTwo: `<h2>12V 4000 询价清单</h2><p>请提供完整的 12V 4000 型号与出厂编号、准确的零件号、数量、目的地与保养期限。有尺寸分级的缸套、活塞与轴承，请提供尺寸代码或测量记录。喷油器与涡轮增压器请附部件铭牌或压印零件号。</p><h3>常见故障与保养场景</h3><ul><li>燃油压力故障或喷油器回油不均衡</li><li>冷却泄漏、泵磨损或恒温器失灵</li><li>机油消耗、缸套磨损或计划大修</li><li>传感器引发的降功率与停机事件</li></ul>${cta('询价 MTU 12V 4000 零件')}`,
    },
  },
  {
    productSlug: 'mtu-4000-series-parts',
    slug: '16v-4000-engine-parts',
    title: 'MTU 16V 4000 发动机零件',
    seoTitle: 'MTU 16V 4000 发动机零件供应商 | 国晁动力',
    h1Title: 'MTU 16V 4000 发动机零件',
    summary:
      '面向船用推进、发电、机车与重型工业应用的 MTU 16V 4000 发动机零件，经型号与出厂编号核验。',
    content: {
      partOne: `<h2>MTU 16V 4000 发动机零件</h2><p>MTU 16V 4000 平台服务于停机运营成本高的场合，包括高速船舶、关键任务发电机组、机车与重型工业设备。零件随型号后缀、功率、生产批次与排放配置而异，因此完整的出厂编号核验必不可少。</p><h3>16V 4000 零件类别</h3><ul><li>喷油器、高压燃油泵、共轨阀与燃油管</li><li>涡轮增压器涡轮叶轮、壳体、隔热罩与密封件</li><li>缸套、活塞、轴承、气门与缸盖垫片</li><li>冷却泵、叶轮、恒温器、滤清器与润滑零件</li><li>起动机、发电机、压力、转速与温度传感器</li></ul><p>请参阅 <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 零件号目录</a>、<a href="/part-products/catalog/mtu-fuel-pumps/">MTU 燃油泵</a>、<a href="/part-products/catalog/mtu-4000-turbocharging-parts/">4000 涡轮增压器部件</a>、<a href="/part-products/catalog/mtu-starter-motors-alternators/">起动机与发电机</a> 以及 <a href="/products/mtu-4000-series-parts/overhaul-parts/">MTU 4000 大修零件指南</a>。</p>`,
      partTwo: `<h2>16V 4000 订单核验</h2><p>请提供完整的发动机型号、出厂编号、当前零件号、数量与目的地。对于大型大修，Excel 清单有助于我们逐行核查替代号、尺寸分级、供货情况、估算发运重量与交货期。</p><h3>典型询价场景</h3><ul><li>船舶、机车或发电机紧急停机</li><li>喷油器、涡轮增压器、传感器或冷却系统故障</li><li>上部保养与缸盖作业</li><li>含尺寸分级内部件的计划大修</li></ul>${cta('询价 MTU 16V 4000 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'service-kits-and-overhaul-parts',
    title: 'Cummins 保养套件与大修零件',
    seoTitle: 'Cummins 保养套件与大修零件 | 国晁动力',
    h1Title: 'Cummins 保养套件与大修零件',
    summary:
      '面向发电、船用与工业柴油发动机的 Cummins 保养件、维护套件与大修部件。',
    content: {
      partOne: `<h2>Cummins 零件询价清单</h2><p>对于 Cummins 零件，型号、CPL 与发动机出厂编号有助于确认正确的选项。请提供零件号、数量，并说明订单属于日常保养、紧急维修还是大修计划。</p><h3>我们常报的零件</h3><ul><li>滤清器、皮带、密封件、垫片与维护套件</li><li>燃油喷射、冷却、润滑与涡轮增压器零件</li><li>传感器、控制部件与更换总成</li><li>发电与工业应用发动机的大修部件</li></ul>`,
      partTwo: `<h2>请提供 CPL 与出厂编号</h2><p>Cummins 的 CPL 与出厂数据可降低错配风险，尤其是在同一发动机型号存在多个版本时。</p><h3>在哪里找到这些号码</h3><p>发动机数据铭牌通常位于齿轮箱壳体或摇臂室盖上，上面标有发动机出厂编号（ESN）、型号与控制零件清单（CPL）号。CPL 定义该发动机的具体构型，因此两台同型号发动机（如两台 QSK19 或两台 KTA38），若 CPL 不同，所需的喷油器、涡轮增压器或燃油泵零件号也可能不同。拍摄清晰的数据铭牌照片是避免错配零件最快的方式。</p><h3>保养套件与大修套件的区别</h3><ul><li><strong>保养套件</strong> 覆盖计划项目：机油、燃油与冷却液滤清器、皮带，以及日常作业中需拆动的垫片</li><li><strong>上部套件</strong> 增加缸盖垫片、气门油封与拆卸缸盖所需的密封件</li><li><strong>就车大修套件</strong> 包括活塞、缸套、活塞环、连杆与主轴承及全套垫片</li><li><strong>离车大修</strong> 视检查结果，可能还需要曲轴、凸轮轴与机油泵部件</li></ul><p>请告知计划的作业级别，我们将按发动机报对应套件；如您希望自行组套，也可逐项列价。更多 Cummins 内容请参阅 <a href="/products/cummins-parts/">Cummins 零件</a> 与 <a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a> 页面。</p>${cta('查询 Cummins 零件')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'industrial-equipment-parts',
    title: 'DEUTZ 工业设备零件',
    seoTitle: 'DEUTZ 工业设备零件 | 国晁动力',
    h1Title: 'DEUTZ 工业设备零件',
    summary:
      '面向工程机械、泵、压缩机、动力装置与工业设备维护的 DEUTZ 发动机零件。',
    content: {
      partOne: `<h2>面向设备船队的 DEUTZ 零件</h2><p>DEUTZ 发动机广泛用于工业设备、工程机械、压缩机、泵与动力装置。国晁动力帮助买家采购维护与维修零件，并在发货前进行兼容性核查。</p><h3>典型类别</h3><ul><li>滤清器、皮带、密封件、垫片与保养套件</li><li>燃油、冷却、润滑与电气部件</li><li>大修零件与更换总成</li><li>计划保养清单与紧急故障维修用零件</li></ul>`,
      partTwo: `<h2>请提供的信息</h2><p>请提供 DEUTZ 发动机型号、出厂编号、旧件零件号、数量与目的地。磨损或无标记零件附照片更有帮助。</p><h3>风冷与液冷发动机</h3><p>DEUTZ 既生产风冷发动机（如 FL912 与 BFL913 系列），也生产液冷发动机（如 BF4M1013 与 TCD 2013 系列）。风冷发动机依靠冷却风扇、风扇皮带与清洁的缸片散热，因此风扇驱动、皮带与机油冷却器部件是常见更换件。液冷发动机则增加水泵、恒温器与散热器软管。了解所属类型可立即缩小零件清单范围。</p><h3>发动机编号与设备制造商</h3><p>DEUTZ 发动机编号压印在曲轴箱上，并与型号一起打印在铭牌上。由于 DEUTZ 发动机由众多设备制造商配套，散热器、进气管与排气部件等零件往往随机器而异，而非随发动机。请同时提供机器品牌与型号以及发动机数据，以便我们区分哪些零件来自 DEUTZ 零件清单、哪些随设备制造商。</p><h3>常见故障件</h3><ul><li>燃油喷射泵、喷油器与输油泵</li><li>缸盖垫片与气门室盖垫片</li><li>机油冷却器及其密封件</li><li>起动机、发电机与断油电磁阀</li></ul><p>更多详情请参阅 <a href="/products/deutz-parts/">DEUTZ 零件</a> 总览与 <a href="/capabilities/deutz-engine-parts/">DEUTZ 发动机零件采购</a>。</p>${cta('询价 DEUTZ 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-ism-engine-parts',
    title: 'Cummins ISM 发动机零件',
    seoTitle: 'Cummins ISM 11L 发动机零件 | ISM / QSM11 备件',
    h1Title: 'Cummins ISM 发动机零件',
    summary:
      '面向重型卡车、客车、船用推进与发电机组所用 Cummins ISM / QSM11 直列六缸 10.8 L 发动机的零件，报价前经 ESN 与 CPL 核验。',
    content: {
      partOne: `<h2>ISM 覆盖范围</h2><p>ISM 是 Cummins 11 升直列六缸发动机的电子版本。同一平台以 QSM11 名称销售用于非道路工况：IS 代表公路规格，QS 代表非公路规格，因此 ISM 卡车发动机与 QSM11 船用或发电发动机共用平台，但按不同工况规格制造。询价时请提供完整型号与出厂编号，而非仅"ISM"。</p><h3>常见应用</h3><ul><li>8 级公路卡车与客车</li><li>房车与专用底盘</li><li>船用推进与辅助发电机组（QSM11）</li><li>消防泵、起重机与工业动力装置</li></ul><h3>常用询盘零件</h3><ul><li>喷油器、高压燃油管路与燃油泵部件</li><li>涡轮增压器总成与安装套件</li><li>EGR 与后处理部件，随年款与排放配置而异</li><li>水泵、机油冷却器与冷却液软管</li><li>缸盖垫片、气门室盖垫片与扭振减振器</li><li>轨压、凸轮轴转速与温度传感器</li></ul>`,
      partTwo: `<h2>我们如何核验 ISM 适配性</h2><p>Cummins 发动机按控制零件清单（CPL）制造，CPL 定义单台发动机的具体构型。两台同型号 ISM 发动机，若 CPL 不同，其喷油器、涡轮增压器、燃油系统与后处理零件号也可能不同。位于齿轮箱壳体或摇臂室盖上的发动机数据铭牌标有出厂编号（ESN）、型号与 CPL；拍摄清晰的铭牌照片是避免错配零件最快的方式。</p><h3>机械与电子两代</h3><p>较早的 M11 为机械发动机，ISM 为电子发动机。两者排量与平台相同，但燃油系统、传感器与控制部件不可互换。如您的发动机仅被描述为"Cummins 11"，请在下单前确认属于哪一代。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins 保养套件与大修零件</a></li><li><a href="/products/cummins-parts/">Cummins 零件总览</a></li></ul>${cta('询价 Cummins ISM 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-isl-engine-parts',
    title: 'Cummins ISL 发动机零件',
    seoTitle: 'Cummins ISL 8.9L 发动机零件 | ISL / ISLe / QSL 备件',
    h1Title: 'Cummins ISL 发动机零件',
    summary:
      '面向客车、卡车、消防车、船用与工业领域 Cummins ISL、ISLe 与 QSL 8.9 升直列六缸发动机的零件，经 CPL 与出厂编号核验。',
    content: {
      partOne: `<h2>ISL 覆盖范围</h2><p>ISL 是 Cummins L 系列的电子 8.9 升直列六缸发动机，自 20 世纪 90 年代末投产。ISLe 表示电子规格，QSL 为非公路与工业版本，后来的 L9 延续同一系列。这些发动机广泛用于客车与中重型卡车，保有量大，零件需求稳定。</p><h3>常见应用</h3><ul><li>城市客车与旅游客车</li><li>中重型卡车、消防车与房车</li><li>挖掘机、起重机及其他工程机械</li><li>船用推进与发电机组（QSL）</li></ul><h3>常用询盘零件</h3><ul><li>喷油器、燃油泵与燃油管路部件</li><li>水泵、风扇驱动与恒温器</li><li>空压机与空气系统部件</li><li>涡轮增压器与增压管路零件</li><li>缸盖与气门室盖垫片、密封件及安装紧固件</li><li>转速、压力与温度传感器</li></ul>`,
      partTwo: `<h2>我们如何核验 ISL 适配性</h2><p>请提供数据铭牌上的出厂编号与 CPL，以及零件号与数量。ISL 系列发动机涵盖多种排放与控制配置，因此同型号发动机的喷油器、传感器与后处理零件号可能不同。如零件号已被替代，我们会在报价前追溯目录沿革并确认方向。</p><h3>编制保养清单</h3><p>面向船队与车队运营商，我们可以逐行核对零件清单，并标出放行前需经出厂编号确认的零件号。这通常比逐项报价更快，且能在包装发运前及早发现替代号问题。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins 保养套件与大修零件</a></li></ul>${cta('询价 Cummins ISL 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk19-engine-parts',
    title: 'Cummins QSK19 / KTA19 发动机零件',
    seoTitle: 'Cummins QSK19 KTA19 19L 发动机零件 | 备件',
    h1Title: 'Cummins QSK19 / KTA19 发动机零件',
    summary:
      '面向船用、矿用、发电与油田领域 Cummins QSK19 与 KTA19 19 升直列六缸发动机的零件，含喷油器、缸套套件、轴承与涡轮增压器。',
    content: {
      partOne: `<h2>QSK19 覆盖范围</h2><p>QSK19 及其机械前身 KTA19 是 19 升直列六缸发动机。它们是船用推进、矿用设备、发电机组与油田泵的主力机型 —— 这些应用中，发动机两次大修之间可运行数千小时，零件按大修计划订购，而非应对单一故障。</p><h3>常见应用</h3><ul><li>船用推进与辅助动力</li><li>矿用卡车、装载机与钻机</li><li>常用与备用发电机组</li><li>油田泵与工业动力装置</li></ul><h3>常用询盘零件</h3><ul><li>喷油器、喷射泵与燃油管路部件</li><li>缸套、活塞与活塞环套件，含加大尺寸分级</li><li>连杆轴承与主轴承</li><li>涡轮增压器总成与中冷器芯</li><li>船用机的热交换器与海水侧部件</li><li>起动机、发电机与安装紧固件</li></ul>`,
      partTwo: `<h2>K 系列发动机的大修计划</h2><p>对于计划大修，请提供发动机出厂编号、运行小时数以及缸套、活塞与轴承的测量记录。有尺寸分级的零件需在发动机解体后确认，因此我们通常对必然更换的项目报实价，对分级项目暂报。这样既可避免缺件，也可避免收到尺寸错误的零件。</p><h3>核验</h3><p>KTA19 与 QSK19 发动机有机械与电子两代，燃油系统不同。数据铭牌上的 ESN 与 CPL 决定正确的喷油器、泵与传感器零件号。船用机如零件涉及传动系，请一并提供齿轮箱与安装细节。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li><li><a href="/products/cummins-parts/">Cummins 零件总览</a></li></ul>${cta('询价 Cummins QSK19 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk38-v12-engine-parts',
    title: 'Cummins QSK38 / KTA38 V12 发动机零件',
    seoTitle: 'Cummins QSK38 KTA38 V12 38L 发动机零件 | 备件',
    h1Title: 'Cummins QSK38 / KTA38 V12 发动机零件',
    summary:
      '面向矿用卡车、机车、船用推进与大型发电机组所用 Cummins QSK38 与 KTA38 V12 38 升发动机的零件。',
    content: {
      partOne: `<h2>QSK38 覆盖范围</h2><p>QSK38 与 KTA38 是 Cummins 大缸径系列顶端的 38 升 V12 发动机。它们驱动矿用卡车、机车、船舶与大型发电机组 —— 单台价值可达七位数，非计划停机以每小时损失产量计。</p><h3>常见应用</h3><ul><li>矿用自卸卡车与钻探设备</li><li>机车与轨道交通动力包</li><li>工作船与渡轮的船用推进</li><li>大型常用与备用发电机组</li></ul><h3>常用询盘零件</h3><ul><li>喷油器与燃油系统部件</li><li>缸套、活塞与活塞环套件</li><li>主轴承与连杆轴承</li><li>涡轮增压器、中冷器与管路</li><li>热交换器与冷却系统部件</li><li>电子构型的传感器、线束与控制部件</li></ul>`,
      partTwo: `<h2>高价值设备的采购</h2><p>对于 V12 设备，我们按发动机出厂编号与 CPL 报价；当零件影响冷却或传动系时，我们会索取安装与工况细节。船用与矿用订单常将 OEM、OEM 替代件与再制造件路线合并，我们会在每行标注供货路线，便于您逐项而非逐单决策。</p><h3>合并大修清单</h3><p>请尽可能发送 Excel 清单。我们会逐行核查供货情况、替代号、尺寸分级、估算发运重量与交货期，然后返回一份合并报价，并按目的地安排出口包装。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li></ul>${cta('询价 Cummins QSK38 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-qsk50-v16-engine-parts',
    title: 'Cummins QSK50 / KTA50 V16 发动机零件',
    seoTitle: 'Cummins QSK50 KTA50 V16 50L 发动机零件 | 备件',
    h1Title: 'Cummins QSK50 / KTA50 V16 发动机零件',
    summary:
      '面向矿用、船用、轨道交通与发电领域 Cummins QSK50 与 KTA50 V16 50 升发动机的零件，支持合并大修清单。',
    content: {
      partOne: `<h2>QSK50 覆盖范围</h2><p>QSK50 与 KTA50 是 50 升 V16 发动机 —— Cummins K 与 QS 系列中最大的成员。它们见于最大的矿用卡车、机车、大型船舶与兆瓦级发电机组。这一量级的发动机通常由计划维护项目支持，零件订单以合并清单而非单项形式到达。</p><h3>常见应用</h3><ul><li>超大型矿用自卸卡车</li><li>机车与轨道交通动力</li><li>大型船用推进装置</li><li>常用电源与电网支撑发电厂</li></ul><h3>常用询盘零件</h3><ul><li>喷油器、泵与高压燃油部件</li><li>带尺寸分级的缸套、活塞与活塞环套件</li><li>曲轴、连杆与主轴承</li><li>涡轮增压器与增压部件</li><li>机油泵、冷却器与过滤部件</li><li>传感器、线束与电控部件</li></ul>`,
      partTwo: `<h2>依据大修清单作业</h2><p>请提供发动机型号、出厂编号、运行小时数，以及 Excel 或 PDF 格式的计划清单。我们会对照目录沿革逐行确认、识别替代号、区分实价项与依赖测量项，并逐行注明交货期与发运重量。对于仍在机上的零件，拍摄部件标签照片通常比文字描述更快确定零件号。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li><li><a href="/products/cummins-parts/">Cummins 零件总览</a></li></ul>${cta('询价 Cummins QSK50 零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-6bt-engine-parts',
    title: 'Cummins 6BT / 4BT B 系列发动机零件',
    seoTitle: 'Cummins 6BT 5.9L 发动机零件 | B 系列备件',
    h1Title: 'Cummins 6BT / 4BT B 系列发动机零件',
    summary:
      '面向机械式 Cummins 6BT5.9 与 4BT3.9 B 系列发动机的零件：喷射泵、喷油器、涡轮增压器、水泵与大修部件，报价前进行代次核查。',
    content: {
      partOne: `<h2>B 系列覆盖范围</h2><p>6BT5.9 是 5.9 升机械直列六缸发动机，20 世纪 80 年代中期投产，至今仍有大量再制造。4BT3.9 是其四缸版本。命名从左向右读：<strong>6</strong> 缸、<strong>B</strong> 系列、<strong>T</strong> 涡轮增压、<strong>5.9</strong> 升排量。这些发动机遍布全球的皮卡、发电机、船舶、拖拉机与工业机械，使 B 系列零件成为长期需求而非一时热潮。</p><h3>常见应用</h3><ul><li>轻型与中型卡车，含 Dodge Ram 应用</li><li>发电机、泵与工业动力装置</li><li>船用改装与小工作船</li><li>农业与工程机械</li></ul><h3>常用询盘零件</h3><ul><li>转子式喷射泵、喷油器与燃油供给部件</li><li>涡轮增压器与增压管路</li><li>水泵、恒温器与软管</li><li>预热塞、起动机与发电机</li><li>缸盖垫片、气门室盖垫片与前齿轮系部件</li><li>大修部件：缸套、活塞、活塞环与轴承</li></ul>`,
      partTwo: `<h2>机械还是电子？下单前请确认</h2><p>6BT5.9 与 ISB5.9 都叫"Cummins 5.9"，但前者为机械式，后者为电子式。喷射系统、传感器及众多附属部件不可互换。当客户询问"5.9 零件"时，第一个问题永远是哪一代，然后是具体构型的 CPL 与出厂编号。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li><li><a href="/products/cummins-parts/service-kits-and-overhaul-parts/">Cummins 保养套件与大修零件</a></li></ul>${cta('询价 Cummins B 系列零件')}`,
    },
  },
  {
    productSlug: 'cummins-parts',
    slug: 'cummins-n14-engine-parts',
    title: 'Cummins N14 / NT855 发动机零件',
    seoTitle: 'Cummins N14 NT855 14L 发动机零件 | 备件',
    h1Title: 'Cummins N14 / NT855 发动机零件',
    summary:
      '面向重型卡车、发电机与工业领域 Cummins N14 与 NT855 14 升直列六缸发动机的零件，含 PT 燃油系统与大修部件。',
    content: {
      partOne: `<h2>N14 覆盖范围</h2><p>N14 是 14 升直列六缸发动机（855 立方英寸），在 Cummins 大凸轮系列中接替 NTC 与 NTA-855。它服务重型卡车、客车、发电机组与工业装置多年，至今仍常见于全球老旧船队与车队及固定式发电领域。</p><h3>常见应用</h3><ul><li>重型公路卡车与客车</li><li>常用与备用发电机组</li><li>工业与船用装置</li><li>依靠再制造发动机继续运行的老旧车队</li></ul><h3>常用询盘零件</h3><ul><li>PT 燃油系统部件：泵、喷油器与管路</li><li>缸套、活塞与活塞环套件</li><li>主轴承与连杆轴承</li><li>涡轮增压器与空气系统部件</li><li>空压机与附件</li><li>垫片、密封件与安装紧固件</li></ul>`,
      partTwo: `<h2>老旧车队的核验</h2><p>N14 发动机有多种构型，且长期服役意味着许多机器已经混件再制造。请提供发动机出厂编号，并尽可能附数据铭牌与燃油泵标签照片。对于 PT 燃油系统，我们会同时确认泵与喷油器零件号，因为不匹配的一对会引发运行故障，且故障原因常被误判到其他部件。</p><h3>相关页面</h3><ul><li><a href="/capabilities/cummins-engine-parts/">Cummins 发动机零件采购</a></li></ul>${cta('询价 Cummins N14 零件')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2012-series-parts',
    title: 'DEUTZ 2012 系列发动机零件',
    seoTitle: 'DEUTZ BF4M2012 BF6M2012 发动机零件 | 备件',
    h1Title: 'DEUTZ 2012 系列发动机零件',
    summary:
      '面向挖掘机、装载机、起重机、拖拉机与发电机组的 DEUTZ BF4M2012 与 BF6M2012 液冷直列发动机零件，经发动机编号核验。',
    content: {
      partOne: `<h2>2012 系列覆盖范围</h2><p>DEUTZ 2012 系列是液冷涡轮增压直列系列，有四缸与六缸版本：BF4M2012 排量 4.04 升，缸径×行程 101 × 126 mm；BF6M2012 排量 6.06 升。功率范围约 75 kW 至 155 kW，视版本与应用而定；发动机由 DEUTZ 及其他制造商授权生产。</p><h3>常见应用</h3><ul><li>挖掘机、轮式装载机与起重机</li><li>拖拉机与农业机械</li><li>发电机组与固定式发电</li><li>压缩机、泵及其他工业装置</li></ul><h3>常用询盘零件</h3><ul><li>活塞、缸套与活塞环套件</li><li>缸盖与气门室盖垫片</li><li>喷射泵与喷油器</li><li>水泵、恒温器与冷却系统零件</li><li>起动机、发电机与断油电磁阀</li><li>机油冷却器、滤清器与皮带</li></ul>`,
      partTwo: `<h2>2012 发动机的核验</h2><p>请提供压印在曲轴箱上并打印在铭牌上的 DEUTZ 发动机编号，以及机器品牌与型号。由于 2012 系列发动机由众多设备制造商配套且存在授权生产，决定适用零件清单的是发动机编号 —— 而非机器上的标牌。散热器、进气管与排气部件往往随设备制造商而非发动机。</p><h3>相关页面</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ 发动机零件采购</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ 工业设备零件</a></li><li><a href="/products/deutz-parts/">DEUTZ 零件总览</a></li></ul>${cta('询价 DEUTZ 2012 零件')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2013-series-parts',
    title: 'DEUTZ TCD 2013 系列发动机零件',
    seoTitle: 'DEUTZ TCD 2013 L6 发动机零件 | 共轨备件',
    h1Title: 'DEUTZ TCD 2013 系列发动机零件',
    summary:
      '面向船用、工程与发电领域 DEUTZ TCD 2013 共轨发动机系列（含 L6、L4 与 V8 变型）的零件，含 EMR 控制系统部件。',
    content: {
      partOne: `<h2>TCD 2013 覆盖范围</h2><p>TCD 2013 是 DEUTZ 中功率段的共轨系列。六缸 TCD 2013 L6 2V 缸径×行程 108 × 130 mm，采用 DEUTZ 共轨（DCR）喷射系统与电子发动机控制（EMR）。L4 与 V8 变型将系列扩展至四缸、六缸与八缸装置。该系列发动机服务于船用、工程与发电应用。</p><h3>常见应用</h3><ul><li>船用推进与辅助动力</li><li>工程与农业机械</li><li>发电机组与固定式发电</li><li>市政与专用车辆</li></ul><h3>常用询盘零件</h3><ul><li>共轨喷油器与高压泵</li><li>轨压传感器与燃油管路部件</li><li>水泵、恒温器与冷却零件</li><li>涡轮增压器与增压部件</li><li>EMR 控制单元、线束与传感器组</li><li>大修用垫片、密封件、活塞、缸套与轴承</li></ul>`,
      partTwo: `<h2>共轨发动机的核验</h2><p>共轨燃油部件与标定绑定：适用于一种构型的喷油器或泵零件号，对另一种构型可能便是错的。请提供发动机编号、机器信息，并尽可能提供部件本体上打印的零件号。对于 EMR 控制发动机，请附上存储的故障码 —— 它们通常直接指向失效的传感器或执行器。</p><h3>相关页面</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ 发动机零件采购</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ 工业设备零件</a></li></ul>${cta('询价 DEUTZ TCD 2013 零件')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-1011-series-parts',
    title: 'DEUTZ 1011 系列发动机零件',
    seoTitle: 'DEUTZ FL1011 BF1011 发动机零件 | 风冷/液冷备件',
    h1Title: 'DEUTZ 1011 系列发动机零件',
    summary:
      '面向工程、农业与发电领域 DEUTZ 1011 系列风冷与液冷直列发动机的零件，含冷却、喷射与大修部件。',
    content: {
      partOne: `<h2>1011 系列覆盖范围</h2><p>1011 系列是 DEUTZ 历史悠久的紧凑型系列，有风冷与液冷版本，直列三至六缸布局。风冷发动机依靠冷却风扇与清洁的缸片散热，液冷版本则增加水泵、恒温器与散热器。了解所属类型可立即缩小零件清单范围。</p><h3>常见应用</h3><ul><li>工程与农业机械</li><li>发电机组与压缩机</li><li>市政与专用设备</li><li>仍在日常服役的老旧机器</li></ul><h3>常用询盘零件</h3><ul><li>风冷版本的冷却风扇、风扇驱动与皮带</li><li>机油冷却器及其密封件</li><li>喷射泵与喷油器</li><li>液冷版本的水泵与恒温器</li><li>缸盖与气门室盖垫片</li><li>起动机、发电机与断油电磁阀</li></ul>`,
      partTwo: `<h2>1011 发动机的核验</h2><p>DEUTZ 发动机编号压印在曲轴箱上，并与型号一起打印在铭牌上。请将该编号与机器品牌、型号一并提供：风冷发动机在多尘环境中，风扇与皮带状态通常是首要检查项；液冷发动机的日常零件则多由冷却回路决定。</p><h3>相关页面</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ 发动机零件采购</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ 工业设备零件</a></li></ul>${cta('询价 DEUTZ 1011 零件')}`,
    },
  },
  {
    productSlug: 'deutz-parts',
    slug: 'deutz-2011-series-parts',
    title: 'DEUTZ 2011 系列发动机零件',
    seoTitle: 'DEUTZ BF4M2011 BF6M2011 发动机零件 | 备件',
    h1Title: 'DEUTZ 2011 系列发动机零件',
    summary:
      '面向工程、农业与发电领域 DEUTZ BF4M2011 与 BF6M2011 液冷直列发动机的零件，经发动机编号核验。',
    content: {
      partOne: `<h2>2011 系列覆盖范围</h2><p>DEUTZ 2011 系列涵盖液冷涡轮增压直列四缸与六缸发动机，用于工程机械、农业设备、发电机与工业动力装置。该系列尺寸上低于 2012 与 2013 系列，常见于紧凑型与中型机器。</p><h3>常见应用</h3><ul><li>挖掘机、装载机与紧凑型工程机械</li><li>拖拉机与农业设备</li><li>发电机组与固定式发电</li><li>泵、压缩机与工业驱动</li></ul><h3>常用询盘零件</h3><ul><li>活塞、缸套与活塞环套件</li><li>缸盖与气门室盖垫片</li><li>喷射泵与喷油器</li><li>水泵、恒温器与冷却部件</li><li>机油冷却器、滤清器与皮带</li><li>起动机、发电机与传感器</li></ul>`,
      partTwo: `<h2>2011 发动机的核验</h2><p>请提供曲轴箱压印与铭牌上的发动机编号，以及机器品牌与型号。如机器为授权或本地制造变型，发动机编号是可靠的钥匙：它标识零件清单所依据的构型，与机器上的标牌无关。</p><h3>相关页面</h3><ul><li><a href="/capabilities/deutz-engine-parts/">DEUTZ 发动机零件采购</a></li><li><a href="/products/deutz-parts/industrial-equipment-parts/">DEUTZ 工业设备零件</a></li></ul>${cta('询价 DEUTZ 2011 零件')}`,
    },
  },
  {
    productSlug: 'mtu-spare-parts',
    slug: 'regularly-sourced-parts',
    title: '常购 MTU 零件 —— 类别与系列',
    seoTitle: '常购 MTU 零件 | 类别与系列覆盖',
    h1Title: '常购 MTU 零件',
    summary:
      '我们最常采购的 MTU 零件类别与发动机系列，以及核验框架：供货情况逐询价确认，而非作为库存清单展示。',
    content: {
      partOne: `<h2>我们最常采购的零件</h2><p>我们的目录覆盖 791 个 MTU 零件号，横跨 14 个类别与主要发动机系列。下方清单显示各类别的深度，便于您快速判断询盘是否属于我们每周都在处理的类别。这是采购覆盖视图，而非库存报告：供货情况在核验零件号与发动机出厂编号后逐询价确认。</p><h3>按目录深度排列的类别</h3><ul><li>垫片与密封件 —— 227 个零件号</li><li>发动机部件 —— 182 个零件号</li><li>传动部件 —— 89 个零件号</li><li>轴承 —— 49 个零件号</li><li>传感器与电气 —— 47 个零件号</li><li>活塞与缸套 —— 44 个零件号</li><li>滤清器 —— 33 个零件号</li><li>配气机构 —— 32 个零件号</li><li>燃油系统 —— 27 个零件号</li><li>冷却系统 —— 23 个零件号</li><li>润滑、进气、增压与维修套件补全目录</li></ul>`,
      partTwo: `<h2>系列覆盖</h2><ul><li>MTU 4000 —— 173 个目录零件号</li><li>MTU 396 —— 159 个零件号</li><li>MTU 2000 —— 157 个零件号</li><li>MTU 538 —— 80 个零件号</li><li>MTU 956/1163 —— 61 个零件号</li><li>MTU 595 —— 48 个零件号</li><li>MTU 183 —— 38 个零件号</li><li>MTU 1163 与 MTU 956 —— 目录分开列示时分别列出</li></ul><h3>供货情况如何确认</h3><p>每份报价逐行注明供货路线：全新原厂件、原厂兑换件、OEM 品质替代件或再制造件。交货期与供货状态在放行前确认。如目录中没有某个零件号，我们会追溯替代历史，并对照您的发动机出厂编号报价可行路线。</p><h3>从零件号或清单开始</h3><ul><li><a href="/part-number-index/">检索全部零件号（EN · DE）</a></li><li><a href="/part-products/catalog/mtu-4000-series/">MTU 4000 零件目录</a></li><li><a href="/part-products/catalog/mtu-2000-series/">MTU 2000 零件目录</a></li><li><a href="/part-products/catalog/mtu-396-series/">MTU 396 零件目录</a></li><li><a href="/part-products/catalog/mtu-956-series/">MTU 956 零件目录</a></li><li><a href="/part-products/catalog/mtu-1163-series/">MTU 1163 零件目录</a></li><li><a href="/part-products/catalog/mtu-595-series/">MTU 595 零件目录</a></li><li><a href="/engine-models/">MTU 发动机型号零件清单</a></li></ul>${cta('为您的发动机询价')}`,
    },
  },
] as const;
