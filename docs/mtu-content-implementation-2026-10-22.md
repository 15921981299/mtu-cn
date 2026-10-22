# MTU 内容计划执行与验收（2026-10-22）

计划来源：`docs/mtu-content-plan-2026-10-22.md`。本次将 P0、P1、P2 全部实现为本地项目内容；没有向生产站部署、推送搜索引擎或发布微信公众号。

## 已交付

- 24 篇独立正文：P0 5 篇、P1 8 篇、P2 11 篇；每篇主文约 1200–1500 个汉字，开场 150–250 字。统计不含共用导航、页脚与目录数据。
- 每篇有分类比较表、5 节正文、3–5 个步骤、SVG 决策图、处置红线、询价清单、至少 3 个真实可索引零件记录和 3 条 FAQ。
- 4 张可复用 SVG 系统图：燃油、冷却、润滑与通风、增压与排气；另有 1 张电起动主回路与许可支路专用图。24 张逐篇决策图均含明确的“是／否”分流。逐篇引用现有零件图片并加核对提示。
- 专题索引 `/insights/`，接入 `/guides/`、`/news/`、HTML 与 XML 网站地图、两个 llms 文件。全部新文回链原有 8 篇基础指南，基础指南分别回链对应新文。
- Article 与面包屑结构化数据、真实组织署名和固定更新日期；未增加 FAQPage 或 HowTo 富结果承诺。
- 第 17 篇提供可修改的物流与停机成本演算器，明确不代表真实价格或交期。
- 24 份微信编辑草稿：`tmp/content-plan/wechat/index.md`，可用 `npm run content:wechat` 在构建后重新导出。草稿带原文链接及微信 UTM，未自动发布。

## 24 篇验收清单

所有行均已满足：表格／图／零件内链≥3／FAQ≥3／出处。P1 每篇标明可核对依据与适用边界。

| 序号 | 批次 | 文章 | 主文汉字数 | 本地路由 |
| --- | --- | --- | ---: | --- |
| 01 | P0 | MTU 起动机不转或转速太慢：从电瓶到起动机的 5 步 | 1491 | /insights/mtu-starter-not-turning-slow-cranking/ |
| 02 | P0 | MTU 起动机能转但发动机不来火：先查燃油进气与滤清器 | 1420 | /insights/mtu-cranks-but-will-not-start/ |
| 03 | P0 | MTU 转速不稳、游车、带载掉速：先分清供油、调速与 derate | 1359 | /insights/mtu-unstable-speed-hunting-load-drop/ |
| 04 | P0 | MTU 4000 共轨燃油压力下降：怠速正常、加速掉压 | 1396 | /insights/mtu-4000-common-rail-pressure-drop/ |
| 05 | P0 | MTU 排气温度高：气门间隙、气门卡滞与凸轮磨损 | 1356 | /insights/mtu-high-exhaust-temperature-valve-train/ |
| 06 | P1 | MTU 冷却液一直少但看不到漏：先分清三个维修方向 | 1337 | /insights/mtu-coolant-loss-no-visible-leak/ |
| 07 | P1 | MTU 机油消耗高：活塞环、涡轮油封还是油分离器 | 1330 | /insights/mtu-high-oil-consumption/ |
| 08 | P1 | MTU 曲轴箱窜气大、呼吸器冒烟：什么时候该安排大修 | 1369 | /insights/mtu-blow-by-overhaul-decision/ |
| 09 | P1 | MTU 中冷后温度高、增压压力低：空滤、中冷还是增压器 | 1313 | /insights/mtu-high-charge-air-temperature-low-boost/ |
| 10 | P1 | MTU 故障码与 derate：哪些报警可以继续跑，哪些必须停机 | 1342 | /insights/mtu-fault-codes-derate-stop-decision/ |
| 11 | P1 | MTU 发电机组长期低负载：积碳与湿堆积怎么处理 | 1366 | /insights/mtu-genset-low-load-wet-stacking/ |
| 12 | P1 | MTU 冬季冷启动：结蜡、预热与机油选择 | 1386 | /insights/mtu-winter-cold-start-fuel-preheat-oil/ |
| 13 | P1 | MTU 停航半年后如何恢复运行：启动前检查清单 | 1371 | /insights/mtu-recommission-after-long-storage/ |
| 14 | P2 | MTU 喷油器：换一支还是换一套 | 1409 | /insights/mtu-injector-replace-one-or-set/ |
| 15 | P2 | MTU 配件选购：原厂件、OEM 与副厂的成本和风险 | 1335 | /insights/mtu-genuine-oem-aftermarket-cost-risk/ |
| 16 | P2 | MTU 配件同号报价差三倍？先核对这五项 | 1349 | /insights/mtu-same-part-number-price-difference/ |
| 17 | P2 | MTU 备件交期与停机损失：紧急件三条路径怎么选 | 1305 | /insights/mtu-urgent-parts-lead-time-downtime-cost/ |
| 18 | P2 | MTU 大修预算怎么估：配件与维修费用分四档 | 1321 | /insights/mtu-overhaul-budget-four-scopes/ |
| 19 | P2 | MTU 备件库存怎么建：按故障率与交期分级 | 1333 | /insights/mtu-spares-inventory-failure-lead-time/ |
| 20 | P2 | MTU 配件怎么确认正品：供应商与到货核验 | 1361 | /insights/mtu-authentic-parts-supplier-verification/ |
| 21 | P2 | MTU 备件零件号被替代了：旧号还能不能订 | 1311 | /insights/mtu-superseded-part-number-can-order/ |
| 22 | P2 | 船用 MTU 备件验船与保险：零件文件要准备什么 | 1345 | /insights/mtu-marine-parts-class-insurance-documents/ |
| 23 | P2 | MTU 燃油硫含量与质量：对配件寿命的真实影响 | 1382 | /insights/mtu-fuel-sulfur-quality-parts-life/ |
| 24 | P2 | MTU 爆震、敲缸与轴承异响：哪些声音要立即停机 | 1401 | /insights/mtu-knocking-bearing-noise-stop/ |

## 核查口径与内容取舍

技术依据以 MTU 原厂资料和原始技术说明为主，船级相关引用 DNV 原文；早期手册镜像明确标注年代与配置。不编造客户故事、工程师资格、故障概率、通用压力／间隙／消耗阈值。
以下做了必要的技术澄清：气门间隙过大与过小的影响不同；报警灯颜色不能单独批准继续运行；冬季燃油按批次浊点／冷滤点与本机许可核对；硫含量不等于润滑性；库存调拨与空海运并不互斥。
第 16、17 篇的金额与天数是清楚标记的演算输入；其他文章按工时、耗材、局部件、总成和大修层级比较，不伪造市场行情。零件卡片是识别候选，不承诺对当前发动机适配。

## KPI 实现与数据口径

| 事件／字段 | 触发条件 | 用途 |
| --- | --- | --- |
| `content_article_view` | 独立文章显示 | 按 `content_article` 统计阅读会话 |
| `content_part_click` | 文章页点击具体零件，图片与卡片指向同一件时单次页面内去重 | 到零件页会话数 |
| `content_quote_open` | 文章页打开询价或联系入口，单次页面内去重 | 询价意图；不作成功询盘 |
| `generate_lead` | 服务端返回有效询价 ID，沿用原有去重机制 | 按月统计成功询价 |
| `content_article / content_batch / content_part` | 文章→零件→询价会话内保留，同时写入表单和通知邮件 | 追踪后续页面发起的询价 |

点击率目标口径：同一时期、同一文章，有 `content_part_click` 的去重会话数 ÷ 有 `content_article_view` 的去重会话数，目标 ≥15%。分子分母统一使用会话，不能用点击总次数除浏览次数。按月统计带 `content_article` 的有效 `generate_lead`；通知邮件也保留文章与零件字段。
当前 `site.enableGa4=false`，GTM 与百度统计 ID 为空。遵循项目现有国内访问策略，没有擅自开启外部统计。事件和归因代码已就绪，但正式采集与自定义维度登记需要接通实际统计账户。归因保存最近阅读的文章；sessionStorage 被禁用时仅保证当前页上下文，不能保证跨页保留。当前没有基线或流量数据，不能宣称已达到 15%。
微信阅读与转发量须从实际公众号／搜一搜数据取得，站内 UTM 只标识链接进入，不能冒充微信平台阅读或转发数。

## 验证

- `ASTRO_TELEMETRY_DISABLED=1 npm run build:edgeone`：成功，1116 页面，83 条重定向同步校验通过。
- `npm run check`：0 errors、0 warnings；保留 12 条已有提示。
- `npm run check:links`：1116 HTML 页面无失效站内链接。
- `npm run test:content`：4 项内容／构建验收 + 3 项内容归因测试通过。
- 既有 `test-attribution.mjs`：4 项通过；EdgeOne 询价函数本地测试：10 项通过。
- `scripts/test-service-content-ui.mjs`：1440px 桌面与 390px 手机共 50 个页面检查通过；验证文章→零件→询价归因、模拟询价失败与计算器边界。API 在浏览器中拦截模拟，没有发送真实询价。
- 截图与逐页结果：`tmp/content-plan/ui/`。

## 配图及外部执行边界

现有目录图片已经复用；没有真实的 2–3 张铭牌、诊断仪和船厂现场素材，因此未制作或冒充真实照片。可按以下清单补拍后替换：
1. 铭牌正面与完整发动机环境各一张，型号清楚；公开前按授权遮蔽敏感编号。
2. 经许可的诊断屏幕，保留机型、工况、单位、代码与时间语义；遮蔽客户及船舶信息。
3. 与主题相关的机房整体及故障部位照片，不靠近运转／高温部件摆拍。
原计划第 1–16 周是编辑排期；本次按“全部执行”一次性交付三批本地内容，没有建立自动定时发布任务。上线、真实渠道发布、平台数据与拍摄属于尚未执行的外部事项。

## 附带修复

验收发现并修复了原有询价失败分支在浏览器内引用未导入 `site` 的问题；补齐三个既有机型页的询价链接属性、目录中文字段类型，并去掉三个值完全相同的翻译重复键，使类型检查通过。保留了任务开始时已有的品牌、联系与部署改动。

## 复现命令

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run content:diagrams
npm run build:edgeone
npm run check
npm run check:links
npm run test:content
npm run content:wechat
```

## 主关键词补充

24 篇已补齐 H1 品牌、开场主词、描述、独立采购段落和商业页内链。逐篇对应与核查口径见 [关键词布局记录](mtu-content-keywords-2026-10-22.md)。本次未改变文章 URL。
