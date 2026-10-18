type IndustryItem = {
  slug: string;
  title: string;
  icon: string;
  image: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  materialSlugs: string[];
  capabilitySlugs: string[];
  content: {
    partOne: string;
    partTwo: string;
  };
};

export const industries: IndustryItem[] = [
  {
    slug: 'marine',
    title: '船用',
    icon: '/images/marine-diesel-engine-parts.webp',
    image: '/images/marine-diesel-engine-parts.webp',
    seoTitle: '船用柴油发动机零件供应商 —— 面向船厂与船队 | 国晁动力',
    h1Title: '船用柴油发动机零件 —— 面向船厂与船队',
    summary:
      '为船厂、船舶运营方、船用服务公司、游艇、渡轮、工作船与近海船队提供零件采购与合并询价支持。',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>面向维护团队的船用零件供应</h2>
        <p>国晁动力为船厂、船舶运营方与船用服务公司提供经核验的柴油发动机零件、合并报价、出口包装，以及送货到港口、船厂或维修仓库的服务。</p>
        <h3>我们支持的客户</h3>
        <ul>
          <li>渡轮、工作船与商用船舶船队</li>
          <li>渡轮、游艇、船厂与维修公司</li>
          <li>近海与港口服务船舶</li>
        </ul>
        <h3>典型采购工作</h3>
        <ul>
          <li>涵盖滤清器、密封件、传感器、泵与燃油件的混合保养清单</li>
          <li>船舶或船厂有固定期限的紧急故障询价</li>
          <li>计划中的缸头维修与大修报价</li>
          <li>船队补库合并为可出口发货的批次</li>
        </ul>
        <p>MTU 专属型号与部件覆盖请见我们的 <a href="/applications/marine-propulsion-engines/">MTU 船用发动机零件指南</a>。</p>
        <h3>读懂船用发动机称号</h3>
        <p>在 MTU 发动机上，型号码中的用途字母与系列号同样重要。诸如 16V 2000 M72 或 12V 4000 M93L 的“M”称号表示船用功率等级；船用等级的喷油器、海水泵、热交换器与涡轮增压器参考号，常与同系列按发电或轨交用途制造的发动机不同。因此我们要求提供数据铭牌上的完整型号码与出厂编号，而不是只给系列。</p>
      `,
      partTwo: `
        <h2>从零件清单到船用交付</h2>
        <p>我们对照发动机型号与出厂编号核查零件号、识别替代参考号、逐行反馈供货情况，并安排出口发运至维修船厂、船舶运营方或维修仓库。</p>
        <h3>发货至船舶或船厂</h3>
        <ul>
          <li>故障订单空运至最近国际机场，货运单据注明船名与代理信息</li>
          <li>坞修清单与年度保养库存的海运或空运合并发货</li>
          <li>按行项标注包装，使机舱船员能将每箱对应到采购单</li>
          <li>为目的港清关准备商业发票、装箱单与原产地文件</li>
        </ul>
        <p>交付条款、付款方式与样品政策见我们的 <a href="/terms/shipping/">运输条款</a>与 <a href="/terms/payment/">付款条款</a>页面。</p>
        <p><a href="/contact/">发送船用零件询价</a></p>
      `,
    },
  },
  {
    slug: 'industrial-engines',
    title: '工业发动机',
    icon: '/images/industrial-diesel-engine-parts.webp',
    image: '/images/industrial-diesel-engine-parts.webp',
    seoTitle: '工业发动机零件 | 国晁动力',
    h1Title: '工业发动机零件',
    summary:
      '为用于泵、压缩机、重型机械、油田装置与工业动力系统的柴油发动机提供零件采购。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'cummins-engine-parts', 'deutz-engine-parts'],
    content: {
      partOne: `
        <h2>面向工业发动机机群的零件供应</h2>
        <p>用于泵、压缩机、钻机、矿用设备与工程机械的柴油发动机，通常运行在远离经销商柜台的地方。当其中一台停机时，维护团队需要快速识别正确零件，并送到可能距最近城市数小时的现场。国晁动力与为这类设备采购 MTU、Cummins、DEUTZ 与 Detroit Diesel 零件的设备维护部门、设备租赁车队和发动机服务承包商合作。</p>
        <h3>我们经常报价的设备</h3>
        <ul>
          <li>消防泵、排水泵与灌溉泵组</li>
          <li>空气与燃气压缩机，含橇装机组</li>
          <li>钻探、压裂与油田动力装置</li>
          <li>矿用自卸车、装载机、破碎机与筛分设备</li>
          <li>工程机械与移动动力包</li>
        </ul>
        <h3>为何设备制造商要紧</h3>
        <p>工业发动机通常由泵、压缩机或机械制造商安装，并由其加装散热器、进气、线束与控制盘。发动机制造商的零件号只覆盖发动机本身，而软管、支架与冷却包等由成套方供应的部件遵循设备制造商的参考号。请同时告诉我们发动机型号与设备品牌型号，以便我们在报价前区分发动机件与成套件。</p>
      `,
      partTwo: `
        <h2>报价所需信息</h2>
        <p>发送发动机型号、出厂编号、零件号、照片、数量与要求交货日期，以获得快速响应。</p>
        <h3>典型工业询价</h3>
        <ul>
          <li>为同型机群补充滤清器与保养包，按每台发动机套报价</li>
          <li>喷油器、传感器、水泵或起动机等故障零件</li>
          <li>含活塞、缸套、轴承与垫片包的机体内/机体外大修清单</li>
          <li>仍在服役的老旧发动机的难找参考号</li>
        </ul>
        <p>保养件方面，旋装式 <a href="/part-products/0031845201-oil-filter-spin-on/">0031845201 机油滤清器</a>可直接在 <a href="/part-products/">零件目录</a>中查询。品牌覆盖见 <a href="/products/cummins-parts/">Cummins 零件</a>、<a href="/products/deutz-parts/">DEUTZ 零件</a>与 <a href="/applications/industrial-equipment-engines/">工业设备发动机指南</a>。</p>
        <h3>送达偏远现场</h3>
        <p>我们按您指定的地址报价，或在现场无法由快递到达时代为发至货代或集拼点。气缸盖与曲轴部件等重件打木箱，并按毛重与尺寸报价，使运费在下单前清晰明了。</p>
        <p><a href="/contact/">索取工业发动机零件</a></p>
      `,
    },
  },
  {
    slug: 'power-generation',
    title: '发电',
    icon: '/images/generator-engine-parts.webp',
    image: '/images/generator-engine-parts.webp',
    seoTitle: '发电发动机零件 | 国晁动力',
    h1Title: '发电发动机零件',
    summary:
      '为发电机组、备用电源、常用电源与电站维护计划提供柴油发动机备件。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'cummins-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>发电发动机零件</h2>
        <p>我们为发电运营方提供 MTU、Cummins、DEUTZ 及相关柴油发动机的保养件与大修部件。我们的客户包括负责医院与数据中心备用机组的设施经理、运行常用电源车队的租赁公司，以及按年度合同维护发电机组的服务承包商。</p>
        <h3>备用与常用电源的零件需求不同</h3>
        <p>备用发电机组可能只在测试与断电时运行，因此其零件计划由日历周期驱动：滤清器、冷却液、皮带、软管与蓄电池即使运行小时数很低也会老化。常用或连续运行的机组小时数积累很快，喷油器、涡轮增压器、水泵与缸头部件会更早达到保养极限。告诉我们负荷类型与年运行小时数，有助于我们提出合理的备件清单，而不是逐件报价。</p>
        <h3>典型需求</h3>
        <ul>
          <li>例行保养包、机油与燃油滤清器、空气滤芯</li>
          <li>燃油、冷却、润滑与控制部件</li>
          <li>触发报警或停机的压力、温度、转速与液位传感器</li>
          <li>备用与常用电源发动机的现场关键备件</li>
          <li>MTU 2000 与 4000 发电发动机的大修零件</li>
        </ul>
      `,
      partTwo: `
        <h2>计划保养还是故障停机</h2>
        <p>无论您是在备库保养仓库还是应对断电，我们都帮助对正确的零件与运输路线报价。</p>
        <h3>正确识别发电发动机</h3>
        <p>在 MTU 发电发动机上，型号码中的“G”（如 16V 4000 G63 或 12V 2000 G65）表示发电功率等级。机组铭牌显示成套方与 kVA 等级，发动机数据铭牌显示发动机型号与出厂编号。请发送两块铭牌的照片：发动机铭牌决定喷油器、涡轮增压器与传感器参考号，机组铭牌有助于散热与控制件。</p>
        <h3>常见故障驱动订单</h3>
        <ul>
          <li>机油压力低或冷却水温高报警，追溯到 <a href="/part-products/0035352231-pressure-sensor/">压力传感器</a>或 <a href="/part-products/0005356430-temperature-sensor/">温度传感器</a>等失效传感器</li>
          <li>需要更换 <a href="/part-products/0005357633-speed-sensor/">转速传感器</a>的转速信号故障</li>
          <li>水泵或热交换器密封引起的冷却液泄漏</li>
          <li>启动困难或冒烟导致更换喷油器</li>
        </ul>
        <p>发动机级详情见 <a href="/applications/auxiliary-generator-engines/">发电发动机零件指南</a>与 <a href="/applications/energy-power-plant-engines/">电站发动机指南</a>。</p>
        <p><a href="/contact/">咨询发电发动机支持</a></p>
      `,
    },
  },
  {
    slug: 'rail',
    title: '轨交',
    icon: '/images/mtu-4000-series-overhaul-parts.webp',
    image: '/images/mtu-4000-series-overhaul-parts.webp',
    seoTitle: '轨交柴油发动机零件 | 国晁动力',
    h1Title: '轨交柴油发动机零件',
    summary:
      '为轨交牵引、机车辅助系统与车队维护计划提供发动机零件支持。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['mtu-engine-parts', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>轨交发动机零件</h2>
        <p>国晁动力为处理计划车队保养与紧急维修的运营方和维护承包商提供轨交相关发动机零件询价支持。典型客户是机务段维护团队、车辆大修厂，以及运行柴油机车、柴油动车、调车机车与轨行机械的线路维修承包商。</p>
        <h3>支持范围</h3>
        <ul>
          <li>MTU 2000 与 4000 系列轨交发动机，含 PowerPack 安装</li>
          <li>仍在老车队中运行的老式 MTU 396 与 Detroit Diesel 发动机</li>
          <li>保养件、传感器与辅助传动部件</li>
          <li>计划机务段工作的大修部件</li>
          <li>老旧发动机平台的零件号确认</li>
        </ul>
        <h3>为何轨交零件需要额外核查</h3>
        <p>轨交发动机带“R”用途代码，例如 12V 4000 R43 或 16V 4000 R84，且常按车辆制造商的特定底架或动力车布置安装。两台系列号相同的发动机，可能因排放阶段、功率等级与安装方式不同，而在涡轮增压器、冷却与控制参考号上存在差异。我们对照发动机出厂编号逐行匹配，相关时并对照车型。</p>
      `,
      partTwo: `
        <h2>车队维护与大修计划</h2>
        <p>轨交运营方通常按里程或小时检修，零件以可预测的批次需求。我们可按每台发动机报一份完整检修包，再对车队中每台重复相同配置，使采购简单并方便机务段库存管理。</p>
        <h3>应发送的信息</h3>
        <ul>
          <li>每台发动机的型号与出厂编号，或车队清单</li>
          <li>发动机装于动力包内时的车辆制造商与车型</li>
          <li>零件手册或以往订单上的零件号</li>
          <li>检修类型、每台件数与机务段收货地址</li>
        </ul>
        <p>发动机级覆盖见我们的 <a href="/applications/rail-engine-parts/">轨交发动机零件指南</a>，单个参考号可在 <a href="/part-products/catalog/mtu-4000-series/">MTU 4000 零件目录</a>与 <a href="/part-products/catalog/mtu-2000-series/">MTU 2000 零件目录</a>中搜索。</p>
        <p><a href="/contact/">索取轨交发动机零件</a></p>
      `,
    },
  },
  {
    slug: 'shipyards-repair',
    title: '船厂与维修',
    icon: '/images/marine-diesel-engine-parts.webp',
    image: '/images/mtu-part-number-verification.webp',
    seoTitle: '船厂柴油发动机零件 | 国晁动力',
    h1Title: '船厂与维修发动机零件',
    summary:
      '为船厂、发动机维修公司与大修承包商提供合并备件采购。',
    materialSlugs: ['stainless-steel', 'brass-copper'],
    capabilitySlugs: ['marine-engine-service', 'genuine-oem-parts'],
    content: {
      partOne: `
        <h2>船厂零件支持</h2>
        <p>维修日程推进很快。我们帮助船厂与发动机服务公司合并紧急备件清单并确认正确的替换件。坞修或改装窗口提前固定，船舶每多待在船厂一天，船东就多一天损失，因此零件清单必须在开缸前完整且正确。</p>
        <h3>适用于</h3>
        <ul>
          <li>发动机大修与维修项目</li>
          <li>坞修保养零件清单</li>
          <li>主机与辅机的多发动机备件合并</li>
          <li>同时为不同船东多艘船舶作业的船厂</li>
        </ul>
        <h3>我们如何处理船厂零件清单</h3>
        <p>船厂通常发送取自船东工作说明的表格，有时混合了不同手册与版本的零件号。我们对照发动机型号与出厂编号逐行审核，标注被替代或重复的参考号，并标出应先检查旧件的位置，如带尺寸等级的缸套与轴承。报价逐行返回供货情况、交货期与供应路线，使船厂能迅速决定哪些立即订购、哪些留待开缸检查后。</p>
      `,
      partTwo: `
        <h2>一次询价，多类零件</h2>
        <p>发送您的完整零件清单与数量。我们将报价供货情况、相关时的替代方案与发运时间。</p>
        <h3>项目中常见的追加件</h3>
        <ul>
          <li>拆下缸头或缸盖后出现的垫片与密封件包，见 <a href="/part-products/catalog/mtu-gasket-kits/">MTU 垫片包</a></li>
          <li>检查中发现磨损的配气机构件，见 <a href="/part-products/catalog/mtu-valve-train/">MTU 配气机构零件</a></li>
          <li>测量后按所需尺寸的活塞、缸套与轴承，见 <a href="/part-products/catalog/mtu-pistons-liners/">活塞与缸套</a></li>
          <li>压力测试后的海水泵与热交换器部件</li>
        </ul>
        <p>由于这些件在开缸后才出现，我们尽量保持原报价开放，并将后续行项加入同一订单与发货。发动机级大修详情见 <a href="/applications/shipyard-repair-overhaul/">船厂维修与大修指南</a>与 <a href="/products/mtu-4000-series-parts/overhaul-parts/">MTU 4000 大修零件</a>页面。</p>
        <p><a href="/contact/">发送船厂零件清单</a></p>
      `,
    },
  },
  {
    slug: 'energy-suppliers',
    title: '能源供应商',
    icon: '/images/generator-engine-parts.webp',
    image: '/images/global-engine-parts-delivery.webp',
    seoTitle: '能源供应商发动机零件 | 国晁动力',
    h1Title: '能源供应商发动机零件',
    summary:
      '为在偏远、备用、近海与工业动力环境中运行柴油发动机的能源公司提供备件采购。',
    materialSlugs: ['carbon-steel', 'stainless-steel'],
    capabilitySlugs: ['industrial-engine-service', 'mtu-engine-parts', 'cummins-engine-parts'],
    content: {
      partOne: `
        <h2>能源运营发动机零件</h2>
        <p>能源供应商需要可靠的备件渠道，覆盖偏远现场、备用系统与工业动力装置。我们帮助寻源并全球发运正确部件。该领域客户包括独立发电商、拥有自有电站的矿业与油气运营方、为孤岛或离网供电的公用工程承包商，以及需要新厂调试与首年备件的 EPC 公司。</p>
        <h3>常见询价</h3>
        <ul>
          <li>MTU、Cummins 与 DEUTZ 发动机的关键备件</li>
          <li>发电机保养与大修部件</li>
          <li>按现场发动机数量配置的运行备件包</li>
          <li>更换传感器、执行器与控制系统件</li>
          <li>面向偏远项目目的地的出口包装</li>
        </ul>
        <h3>为偏远现场规划备件</h3>
        <p>当最近的机场要数天才能到达时，等待单个失效零件不是选项。务实的做法是备足一个完整保养周期的消耗件现场库存，再加少量易损件，如传感器、喷油器、皮带与水泵密封。我们可按发动机数量、运行小时数与保养间隔提出起始清单，再由您的工程师按当地经验调整。</p>
      `,
      partTwo: `
        <h2>全球发运协调</h2>
        <p>告知现场位置、紧迫程度与所需文件。我们将零件与物流一起报价。</p>
        <h3>项目发货的文件</h3>
        <ul>
          <li>按您采购单行项列明的商业发票与装箱单</li>
          <li>目的地要求时的原产地证书</li>
          <li>带项目名称、PO 号与收货人的箱唛</li>
          <li>每箱毛重与尺寸，以便提前订舱</li>
        </ul>
        <p>大额订单通常海运或空运集拼至项目货代，紧急故障件走快递。电站的发动机级详情见 <a href="/applications/energy-power-plant-engines/">电站发动机指南</a>，付款与交付选项见 <a href="/terms/payment/">付款条款</a>与 <a href="/terms/shipping/">运输条款</a>页面。</p>
        <p><a href="/contact/">索取能源发动机零件</a></p>
      `,
    },
  },
];
