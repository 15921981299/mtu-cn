type ApplicationItem = {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  summary: string;
  productSlugs: string[];
  content: {
    partOne: string;
    partTwo: string;
  };
};

const inquiryCta =
  '<p><a href="/contact/" style="display:inline-block;background:#146ef5;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:600;">发送零件询价</a></p>';

export const applications: ApplicationItem[] = [
  {
    slug: 'marine-propulsion-engines',
    title: 'MTU 船用发动机零件',
    seoTitle: 'MTU 船用发动机零件 | 游艇与船舶柴油机零件',
    h1Title: 'MTU 船用发动机零件',
    summary:
      'MTU 船用发动机零件，覆盖游艇、船舶、渡轮、工作船、商船与船厂，报价前经型号与出厂编号核验。',
    productSlugs: ['mtu-spare-parts', 'mtu-2000-series-parts', 'mtu-4000-series-parts', 'mtu-series-8000-engines', 'detroit-diesel-parts'],
    content: {
      partOne:
        '<h2>MTU 船用柴油发动机零件</h2><p>船用推进停机以时间计。柴油零件源 为游艇、船舶、渡轮、工作船、近海与船厂保养供应 MTU 船用发动机零件。我们支持现行与老式发动机家族，包括 MTU 2000、4000、396、595、956、1163 及相关船用配置。</p><h3>船用发动机系列与型号</h3><ul><li><a href="/products/mtu-2000-series-parts/16v-2000-engine-parts/">MTU 16V 2000 船用发动机零件</a></li><li><a href="/products/mtu-2000-series-parts/mtu-m96l-engine-parts/">MTU 16V 2000 M96L 游艇发动机零件</a></li><li><a href="/products/mtu-4000-series-parts/12v-4000-engine-parts/">MTU 12V 4000 船用发动机零件</a></li><li><a href="/products/mtu-4000-series-parts/16v-4000-engine-parts/">MTU 16V 4000 船用发动机零件</a></li><li><a href="/part-products/catalog/mtu-396-series/">老式 MTU 396 船用零件</a></li></ul><h3>常见游艇与船舶发动机零件</h3><ul><li>燃油泵、喷油器、压力阀、燃油管与控制部件</li><li>机油滤清器、燃油滤清器、空气滤清器、垫片、密封件与保养包</li><li>海水泵、冷却水泵、叶轮、节温器与热交换部件</li><li>涡轮增压器、润滑、排气、传感器与电气部件</li><li>活塞、缸套、轴承、气门与船厂大修零件</li></ul><p>浏览 <a href="/part-products/">MTU 零件号目录</a>，或发送 Excel 清单逐行核查。</p>',
      partTwo:
        `<h2>我们如何核验船用适配性</h2><p>请提供完整发动机型号、出厂编号、零件号、数量、船舶或船厂位置及要求交货日期。喷油器、涡轮增压器、泵与电气部件，还请随附部件铭牌或钢印参考号及发动机资料。</p><h3>船用询价信息</h3><ul><li>船舶类型与发动机用途：推进、辅助或发电</li><li>发动机型号、功率等级、出厂编号与铭牌照片</li><li>准确零件号、旧件照片、数量与保养期限</li><li>目的港或城市，以及偏好的快递、空运或海运方式</li></ul><p>报价会标明可用的 OEM、OEM 替代、再制造或替换路线，而不是把未经确认的选项当作可互换。</p>${inquiryCta}`,
    },
  },
  {
    slug: 'auxiliary-generator-engines',
    title: '辅助与发电发动机',
    seoTitle: '发电发动机零件 | MTU、Cummins、DEUTZ',
    h1Title: '辅助与发电发动机零件',
    summary:
      '面向船用、商用、工业与备用电源应用中辅助发动机与发电机组的保养与维修零件。',
    productSlugs: ['mtu-2000-series-parts', 'mtu-4000-series-parts', 'cummins-parts', 'deutz-parts'],
    content: {
      partOne:
        '<h2>发电发动机零件</h2><p>发电发动机需要可靠的保养件，以保障计划保养与应急电源就绪。我们支持用于船舶、设施、电站与工业现场的 MTU、Cummins 与 DEUTZ 发电发动机零件询价。</p><h3>典型零件</h3><ul><li>滤清器、皮带、垫片、密封件与保养包</li><li>燃油喷射、冷却、润滑与电气传感器</li><li>涡轮增压器、泵、气门与大修部件</li></ul>',
      partTwo:
        `<h2>快速供货核查</h2><p>发送零件号、发动机出厂编号、发电机组型号（如有）、数量与目的地。我们将核查供货情况与发运选项。</p>${inquiryCta}`,
    },
  },
  {
    slug: 'industrial-equipment-engines',
    title: '工业设备发动机',
    seoTitle: '工业设备柴油发动机零件 | 柴油零件源',
    h1Title: '工业设备发动机零件',
    summary:
      '面向泵、压缩机、重型机械、油田装置、工程设备与工业动力系统的柴油发动机零件。',
    productSlugs: ['cummins-parts', 'deutz-parts', 'mtu-spare-parts'],
    content: {
      partOne:
        '<h2>工业发动机零件</h2><p>工业设备业主需要务实的采购渠道，覆盖用于泵、压缩机、工程机械、油田装置与动力包的发动机。我们帮助买方从发动机铭牌、旧件照片与零件清单识别零件。</p><h3>支持的需求</h3><ul><li>故障维修与紧急更换件</li><li>计划保养包与滤清器</li><li>燃油、冷却、润滑与控制部件</li><li>大修清单核查与合并发运</li></ul>',
      partTwo:
        `<h2>减少停机</h2><p>紧急故障时，请在首条消息中发送故障件照片、发动机型号、出厂编号、目的地与期限。</p>${inquiryCta}`,
    },
  },
  {
    slug: 'rail-engine-parts',
    title: '轨交发动机零件',
    seoTitle: '轨交柴油发动机零件 | MTU 发动机零件供应商',
    h1Title: '轨交柴油发动机零件',
    summary:
      '为轨交维护团队、机车服务商与轨道交通运营方提供 MTU 及柴油发动机零件支持。',
    productSlugs: ['mtu-spare-parts', 'mtu-4000-series-parts', 'detroit-diesel-parts'],
    content: {
      partOne:
        '<h2>轨交发动机零件支持</h2><p>轨交维护日程要求正确的零件与可靠的物流。柴油零件源 为轨交设备、机车服务与轨交维护计划提供 MTU 及柴油发动机零件询价支持。</p><h3>常见轨交询价</h3><ul><li>燃油系统、冷却、润滑与过滤件</li><li>传感器、控制部件与电气件</li><li>保养包与大修部件</li></ul>',
      partTwo:
        `<h2>计划保养清单</h2><p>请提前发送零件清单，以便逐行核查供货情况、确认替换件并规划发运。</p>${inquiryCta}`,
    },
  },
  {
    slug: 'shipyard-repair-overhaul',
    title: '船厂维修与大修',
    seoTitle: '船厂发动机零件与大修支持 | 柴油零件源',
    h1Title: '船厂维修与大修零件',
    summary:
      '为船厂与船用维修公司提供清单核查、合并发运与紧急寻源支持。',
    productSlugs: ['mtu-spare-parts', 'mtu-2000-series-parts', 'mtu-4000-series-parts'],
    content: {
      partOne:
        '<h2>船厂零件协调</h2><p>船厂维修工作常涉及长零件清单、变动的期限与多种发动机构型。我们支持 MTU 及相关发动机零件的逐行核查，涵盖例行保养件与大修部件。</p><h3>我们如何帮助</h3><ul><li>零件号与出厂编号核验</li><li>完整大修清单的供货核查</li><li>出口包装与发运协调</li><li>缺失或延迟件的紧急跟进</li></ul>',
      partTwo:
        `<h2>发送 Excel 清单</h2><p>大修工作请以 Excel 或邮件形式发送清单，注明零件号、数量、发动机型号与期限。不明确的件可附照片。</p>${inquiryCta}`,
    },
  },
  {
    slug: 'energy-power-plant-engines',
    title: '能源与电站发动机',
    seoTitle: '电站柴油发动机零件 | 柴油零件源',
    h1Title: '能源与电站发动机零件',
    summary:
      '面向能源供应商、备用电源系统、独立电站与工业发电运营的柴油发动机零件。',
    productSlugs: ['mtu-4000-series-parts', 'cummins-parts', 'deutz-parts'],
    content: {
      partOne:
        '<h2>电站发动机零件</h2><p>能源与发电用户需要可靠的备件规划，以保持备用与连续运行发动机的可用性。我们支持 MTU、Cummins 与 DEUTZ 零件在发电与电站应用中的询价。</p><h3>常见需求</h3><ul><li>保养包、滤清器、皮带与消耗件</li><li>传感器、泵、喷油器与燃油系统件</li><li>冷却、润滑、涡轮增压与大修部件</li></ul>',
      partTwo:
        `<h2>保养规划</h2><p>请提前分享保养日程与零件清单，以便在保养窗口前规划供货与发运。</p>${inquiryCta}`,
    },
  },
] as const;
