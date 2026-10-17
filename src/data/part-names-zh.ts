/**
 * Chinese designations for catalog part names, categories, series and engine
 * types — the zh-CN counterpart of part-names.ts (English normaliser) and
 * part-names-de.ts (German layer).
 *
 * Why this exists: the Chinese site (mtu-cn) serves domestic procurement desks
 * that search by Chinese part name as well as by part number. Part numbers,
 * MTU model codes, HS/NATO numbers and slugs are never translated — only the
 * human-readable name layer is.
 *
 * How it works (and its limits):
 * - The full-name dictionary (PART_NAMES_ZH) is keyed on the *normalised*
 *   English name (standardPartName output), longest coverage first.
 * - Unknown names fall back to the single-word dictionary (WORD_ZH), joined
 *   without spaces when every token is CJK. Unknown words are kept in English:
 *   an invented Chinese word is worse than an honest English one (same rule as
 *   the German layer).
 * - Numbers, hyphens, slashes and model codes pass through untouched.
 *
 * Terminology is governed by tmp/glossary-zh.md; keep both in sync.
 */

import { standardPartName } from './part-names';

/** Whole-name translations, keyed on the normalised English name. */
export const PART_NAMES_ZH: Record<string, string> = {
  // ── A ──
  '12-Point Head Screw': '12 角头螺钉',
  '2/2-Way Solenoid Valve': '二位二通电磁阀',
  '4/2-Way Solenoid Valve': '二位四通电磁阀',
  'Actuating Cylinder': '作动缸',
  'Actuating Element': '作动元件',
  'Actuator': '执行器',
  'Adapter': '接头',
  'Adapter for HP Line': '高压油管接头',
  'Adhesive': '粘合剂',
  'Adjusting Screw': '调整螺钉',
  'Air Cleaner with Adapter Fitting': '带适配接头的空气滤清器',
  'Air Filter': '空气滤清器',
  'Air Filter Element': '空气滤芯',
  'Air Filter Restriction Indicator': '空气滤清器阻力指示器',
  'Air Hose': '空气软管',
  'Alternator': '交流发电机',
  'Angular-Contact Ball Bearing': '角接触球轴承',
  // ── B ──
  'Ball Cock': '球形旋塞阀',
  'Banjo Bolt A12': '空心螺栓 A12',
  'Banjo Screw': '空心螺钉',
  'Barring Device': '盘车装置',
  'Barring Gear': '盘车齿轮',
  'Barring Tool': '盘车工具',
  'Bearing': '轴承',
  'Bearing Body': '轴承体',
  'Bearing Bushing': '轴承衬套',
  'Bearing Housing': '轴承座',
  'Bearing Pin': '轴承销',
  'Bellows': '波纹管',
  'Bellows with 3.1 Test Certificate': '波纹管（附 3.1 检测证书）',
  'Belt Pulley for Generator': '发电机皮带轮',
  'Bleed Valve': '放气阀',
  'Boot': '防尘套',
  'Bracket': '支架',
  'Buffer': '缓冲器',
  'Burner': '燃烧器',
  'Bushing': '衬套',
  // ── C ──
  'Cable Conduit': '线缆护套',
  'Camshaft Bearing': '凸轮轴轴承',
  'Camshaft Bearing, Standard': '凸轮轴轴承，标准级',
  'Carbon Scraper Ring': '刮碳环',
  'Ce Ring': 'Ce 环',
  'Centrifugal Oil Filter Assembly': '离心式机油滤清器总成',
  'Charge-Air Line': '增压空气管',
  'Circlip Kit': '卡簧组',
  'Clamp': '卡箍',
  'Collared Bushing': '带肩衬套',
  'Complete Rotor': '转子总成',
  'Composite Piston': '组合式活塞',
  'Compression Pressure Recorder': '气缸压力记录仪',
  'Compression Ring': '压缩环',
  'Compressor Wheel': '压气机叶轮',
  'Conn Fuel Rail Rear': '燃油轨后连接管',
  'Connecting Piece': '连接件',
  'Connecting Rod': '连杆',
  'Connection Interface': '连接接口',
  'Conrod': '连杆',
  'Conrod Bearing': '连杆轴承',
  'Conrod Bearing Size 0-0': '连杆轴承，规格 0-0',
  'Conrod Bearing Size 0-1': '连杆轴承，规格 0-1',
  'Conrod Bearing Upper Half': '连杆轴承上瓦',
  'Conrod Bolt': '连杆螺栓',
  'Conrod Bushing': '连杆衬套',
  'Conrod Bushing Size 0': '连杆衬套，规格 0',
  'Conrod Bushing Size 1': '连杆衬套，规格 1',
  'Conrod Bushing Size 3': '连杆衬套，规格 3',
  'Coolant Pump': '冷却水泵',
  'Coolant Pump Shaft': '冷却水泵轴',
  'Cooler Plate': '冷却板',
  'Copper Sealing Ring': '铜密封环',
  'Copper Washer Form A': '铜垫圈 A 型',
  'Counterring': '对口环',
  'Coupling': '联轴器',
  'Cover': '盖板',
  'Crankshaft Bearing Aux PTO End': '曲轴轴承（辅助 PTO 端）',
  'Crankshaft Bearing Driving': '曲轴轴承（驱动端）',
  'Crankshaft Bearing Lower Half': '曲轴轴承下瓦',
  'Crankshaft Bearing Size 0-0': '曲轴轴承，规格 0-0',
  'Crankshaft Bearing Size 0-1': '曲轴轴承，规格 0-1',
  'Crankshaft Front Seal Ring': '曲轴前密封环',
  'Crankshaft Rear Seal': '曲轴后油封',
  'Crankshaft Rear Seal Ring': '曲轴后密封环',
  'Cylinder Head': '气缸盖',
  'Cylinder Head Cover': '气门室盖',
  'Cylinder Head Gasket': '气缸盖垫片',
  'Cylinder Head with Valve': '气缸盖（带气门）',
  'Cylinder Liner': '气缸套',
  'Cylinder Liner Size 0': '气缸套，规格 0',
  'Cylinder Liner Size 0 C23': '气缸套，规格 0 C23',
  'Cylinder Liner Stage 0': '气缸套，0 级',
  'Cylindrical Roller Bearing': '圆柱滚子轴承',
  // ── D ──
  'Damper Ring for Injector': '喷油器阻尼环',
  'Damper Strip': '阻尼条',
  'Deep-Groove Ball Bearing': '深沟球轴承',
  'Delivery Valve': '出油阀',
  'Diaphragm': '膜片',
  'Diaphragm for Oil Separator': '油气分离器膜片',
  'Dowel Pin': '定位销',
  'Drain Valve': '排放阀',
  'Drive Shaft': '驱动轴',
  // ── E ──
  'Elbow': '弯管接头',
  'Electric Starter': '起动机',
  'Electric Valve Block': '电动阀块',
  'Engine Speed Tachometer': '发动机转速表',
  'Exhaust Diffuser': '排气扩压器',
  'Exhaust Manifold Ring': '排气歧管密封环',
  'Exhaust Rocker Arm': '排气摇臂',
  'Exhaust Turbocharger': '废气涡轮增压器',
  'Exhaust Valve': '排气门',
  'Exhaust Valve Seat Insert': '排气门座圈',
  // ── F ──
  'Feeler Gauge': '塞尺',
  'Filter Cartridge': '滤清器滤芯',
  'Filter Cartridge for Coolant': '冷却液滤芯',
  'Filter Element': '滤芯',
  'Fitting/Removal Device': '拆装工具',
  'Flange': '法兰',
  'Flow Restrictor Valve': '流量限制阀',
  'Fuel Delivery Pump': '输油泵',
  'Fuel Filter Element': '燃油滤芯',
  'Fuel Hand Pump': '手摇燃油泵',
  'Fuel Line': '燃油管',
  'Fuel Prefilter': '燃油预滤器',
  // ── G ──
  'Gaiter': '波纹护套',
  'Gasket': '垫片',
  'Gasket Kit': '垫片包',
  'Gasket Right Side': '右侧垫片',
  'Gasket for Cylinder Head': '气缸盖垫片',
  'Gasket for Exhaust Manifold': '排气歧管垫片',
  'Gasket for Exhaust Pipe': '排气管垫片',
  'Gasket for Fuel': '燃油系统垫片',
  'Gear No. 11': '11 号齿轮',
  'Generator': '发电机',
  'Governor': '调速器',
  'Grommet': '橡胶护圈',
  'Grub Screw': '紧定螺钉',
  'Guard Plate': '防护板',
  'Guide Bushing': '导向衬套',
  'Guide Sleeve': '导向套',
  // ── H ──
  'HP Fuel Line': '高压油管',
  'HP Line Adapter': '高压油管接头',
  'Heat Shield': '隔热罩',
  'Hex Cap Bolt': '六角头螺栓',
  'Hex Flange Bolt': '六角法兰螺栓',
  'Hex Nut': '六角螺母',
  'Hex Screw': '六角头螺钉',
  'Hex Socket Head Bolt': '内六角圆柱头螺栓',
  'High-Temperature Water Pump': '高温水泵',
  'Hole-Type Nozzle': '孔式喷嘴',
  'Hose': '软管',
  'Hose for Air Compressor': '空气压缩机软管',
  'Housing and Rotating Assembly': '壳体与旋转总成',
  'Hydraulic Lash Adjuster': '液压间隙调节器',
  'Hydraulic Pressure Spindle': '液压压装芯轴',
  // ── I ──
  'Idler Gear': '惰轮',
  'Illuminated Pushbutton': '带灯按钮',
  'Impeller': '叶轮',
  'Injector': '喷油器',
  'Inlet Rocker Arm': '进气摇臂',
  'Inlet Valve': '进气门',
  'Inlet Valve Guide, Size 1': '进气门导管，规格 1',
  'Inlet Valve Head': '进气门头部',
  'Inlet Valve Seat Insert': '进气门座圈',
  'Inner Sealing Plate': '内密封板',
  'Inner Valve Spring': '内气门弹簧',
  'Insulating Mat for Exhaust Pipe': '排气管隔热垫',
  'Insulation': '隔热层',
  'Intake Manifold': '进气歧管',
  'Jacketed Adapter': '夹套式接头',
  // ── K ──
  'Keystone Compression Ring': '梯形压缩环',
  'Knocking Module': '爆震传感器模块',
  // ── L ──
  'Lamellar Ring': '叠片式密封环',
  'Lamp': '指示灯',
  'Leaf Spring': '钢板弹簧',
  'Level Monitor': '液位监测器',
  'Link': '连杆',
  'Locking Plate': '锁片',
  'Low-Pressure Fuel Pump': '低压燃油泵',
  'Lube Oil Full-Flow Filter': '全流式机油滤清器',
  // ── M ──
  'Magnetic Nut': '磁性螺母',
  'Main Bearing': '主轴承',
  'Memory Module': '存储模块',
  'Milling Cutter': '铣刀',
  'Molykote G-N Plus Paste': 'Molykote G-N Plus 装配膏',
  'Multiple-Disc Clutch': '多片离合器',
  // ── N ──
  'Non-Return Valve with Baffle': '带挡板止回阀',
  'Nozzle': '喷嘴',
  'Nozzle Element': '喷嘴芯',
  'Nozzle Holder with Nozzle': '喷嘴座（含喷嘴）',
  'Nut': '螺母',
  // ── O ──
  'O-Ring': 'O 型圈',
  'Oil Control Ring': '油环',
  'Oil Cooler': '机油冷却器',
  'Oil Filter Element': '机油滤芯',
  'Oil Filter Wrench': '机油滤清器扳手',
  'Oil Line': '油管',
  'Oil Nozzle': '机油喷嘴',
  'Oil Pump': '机油泵',
  'Oil Seal': '油封',
  'Oil Separator': '油气分离器',
  'Oil Spray Nozzle': '机油喷射喷嘴',
  'Oil Thermostat': '机油温控阀',
  'Outer Gasket Plate': '外垫片板',
  'Outer Valve Spring': '外气门弹簧',
  'Overflow Valve': '溢流阀',
  // ── P ──
  'Paper Insert': '纸质滤芯',
  'Pin': '销',
  'Pipe': '管',
  'Piston': '活塞',
  'Piston Compression Ring': '活塞压缩环',
  'Piston Crown': '活塞顶',
  'Piston Pin': '活塞销',
  'Piston Ring': '活塞环',
  'Piston Ring Kit': '活塞环组',
  'Piston Ring for Turbocharger': '涡轮增压器活塞环',
  'Piston Skirt': '活塞裙部',
  'Plate Control Washer': '控制垫圈',
  'Plug': '螺塞',
  'Plug-In Board': '插件板',
  'Plug-In Pipe': '插入式接管',
  'Prefilter': '预滤器',
  'Pressure Limiting Valve': '压力限制阀',
  'Pressure Monitor': '压力监测器',
  'Pressure Reducing Valve Assembly': '减压阀组件',
  'Pressure Relief Valve': '压力释放阀',
  'Pressure Sensor': '压力传感器',
  'Pressure Sleeve': '压力衬套',
  'Pressure Spring': '压力弹簧',
  'Profile Gasket': '异形垫片',
  'Profile Gasket for Cylinder': '气缸异形垫片',
  'Protective Sleeve': '防护套',
  'Puller': '顶拔器',
  'Pump': '泵',
  'Pump Timing Piston': '喷油泵正时活塞',
  'Pushrod': '推杆',
  // ── R ──
  'Radial-Lip Shaft Seal': '径向轴唇形密封件',
  'Radial-Lip Shaft Seal Aux PTO': '径向轴唇形密封件（辅助 PTO）',
  'Ratchet with Extension': '带接杆棘轮扳手',
  'Rectangular-Section Ring': '矩形截面环',
  'Relief Valve': '溢流阀',
  'Relief Valve for 4-Cylinder HP Pump': '四缸高压泵溢流阀',
  'Repair Kit': '维修包',
  'Restrictor': '限流器',
  'Restrictor for Cooling System': '冷却系统限流器',
  'Retainer': '保持架',
  'Retaining Ring': '挡圈',
  'Ring': '环',
  'Ring Carrier': '活塞环座',
  'Ring Seal': '密封环',
  'Rivet Nut': '拉铆螺母',
  'Rocker Shaft Support': '摇臂轴支座',
  'Roller Size 0': '滚轮，规格 0',
  'Roller Tappet': '滚轮挺柱',
  'Rotary Pump Seal': '旋转泵密封件',
  'Rotary Seal': '旋转密封件',
  'Rubber Grommet': '橡胶护圈',
  'Rubber Hose': '橡胶软管',
  'Rubber Ring': '橡胶环',
  'Rubber Seal': '橡胶密封件',
  'Rubber Sleeve': '橡胶护套',
  'Rubber Sleeve Charge-Air Line': '增压空气管橡胶护套',
  // ── S ──
  'Safety Valve': '安全阀',
  'Screw': '螺钉',
  'Screw-Fitting Union': '螺纹连接件',
  'Screwed Plug': '螺纹螺塞',
  'Seal': '密封件',
  'Seal Carrier': '密封件座',
  'Seal Ring': '密封环',
  'Sealing Block': '密封块',
  'Sealing Cone': '密封锥',
  'Sealing Ring': '密封环',
  'Sealing Sleeve': '密封套',
  'Sealing Washer': '密封垫圈',
  'Seawater Pump': '海水泵',
  'Setting Mandrel': '定位心轴',
  'Shaft Seal': '轴密封件',
  'Shaft Seal Ring': '轴密封环',
  'Shaft Water Pump': '水泵轴',
  'Shim': '调整垫片',
  'Sight Glass': '视液镜',
  'Silicone Rubber (Loctite)': '硅橡胶（Loctite）',
  'Sleeve': '衬套',
  'Sleeve Wear Front CR Shaft': '曲轴前磨损衬套',
  'Slide Valve': '滑阀',
  'Slotted Nut': '开槽螺母',
  'Slotted Nut Driver': '开槽螺母扳手',
  'Snap Ring': '卡环',
  'Solenoid Valve': '电磁阀',
  'Spacer Bushing': '间隔衬套',
  'Spacer Plate': '间隔板',
  'Spacer Ring': '间隔环',
  'Spacer Sleeve': '间隔衬套',
  'Sparkplug': '火花塞',
  'Speed Sensor': '转速传感器',
  'Speed Transmitter': '转速发送器',
  'Spin-On Fuel Filter': '旋装式燃油滤清器',
  'Spin-On Oil Filter': '旋装式机油滤清器',
  'Spiral Housing': '蜗壳',
  'Spring Retainer': '弹簧座',
  'Spring Washer B10': '弹簧垫圈 B10',
  'Spring Washer B12': '弹簧垫圈 B12',
  'Standpipe': '立管',
  'Strainer': '滤网',
  'Strainer Filter': '网式滤清器',
  'Suction Restrictor Valve': '吸入限制阀',
  'Supply Pipe': '供油管',
  'Support Plate': '支撑板',
  'Support Ring': '支撑环',
  'Switch': '开关',
  // ── T ──
  'Tab Washer': '止动垫圈',
  'Taper Face Comp Ring': '锥面压缩环',
  'Tappet': '挺柱',
  'Temperature Monitor': '温度监测器',
  'Temperature Sensor': '温度传感器',
  'Thermal Actuator': '热执行器',
  'Thread Plug': '螺纹螺塞',
  'Threaded Plug': '螺纹螺塞',
  'Threaded Ring': '螺纹环',
  'Three-Phase Generator': '三相发电机',
  'Thrust Bearing': '推力轴承',
  'Thrust Bearing, Size 0-1, LO/SPT': '推力轴承，规格 0-1，LO/SPT',
  'Thrust Bearing, Size 0-1, UP/RIL': '推力轴承，规格 0-1，UP/RIL',
  'Thrust Member': '推力件',
  'Thrust Ring': '推力环',
  'Thrust Screw': '推力螺钉',
  'Thrust Washer': '推力垫圈',
  'Tool Kit': '工具包',
  'Transistor Regulator': '晶体管调节器',
  'Travel Sensor': '行程传感器',
  'Tube Injector': '管式喷油器',
  'Turbine Wheel': '涡轮叶轮',
  'Turbocharger Oil Supply Hose': '涡轮增压器供油管',
  // ── V ──
  'V-Band Clamp': 'V 型卡箍',
  'V-Ribbed Belt': '多楔带',
  'Vacuum Gauge': '真空表',
  'Valve': '阀门',
  'Valve Assembly Oil Press Relief': '油压释放阀组件',
  'Valve Collet': '气门锁夹',
  'Valve Guide': '气门导管',
  'Valve Guide Inlet, Size 0': '进气门导管，规格 0',
  'Valve Head': '气门头部',
  'Valve Housing': '阀体',
  'Valve Keeper Wedge': '气门锁片',
  'Valve Piston': '阀活塞',
  'Valve Rotator': '气门旋转器',
  'Valve Spring': '气门弹簧',
  'Valve Spring Retainer': '气门弹簧座',
  'Valve Spring Washer': '气门弹簧垫圈',
  'Valve Stem Seal': '气门杆油封',
  'Valve Trim': '气门内件',
  // ── W ──
  'Washer': '垫圈',
  'Wheel': '叶轮',
  'Wiring Harness for Sensor': '传感器线束',
  'Wiring Harness to Injector': '喷油器线束',
  // ── Kept in English (brand product / uncertain catalog term — do not guess) ──
  'Rotocap': 'Rotocap 旋转密封件',
  'Stress Bolt': '拉伸螺栓（Stress Bolt）',
  'Tombak Ring': 'Tombak 合金环',
};

/** Single-word fallback for names not covered above. */
const WORD_ZH: Record<string, string> = {
  adapter: '接头',
  air: '空气',
  assembly: '总成',
  bearing: '轴承',
  belt: '皮带',
  bolt: '螺栓',
  bushing: '衬套',
  camshaft: '凸轮轴',
  clamp: '卡箍',
  clutch: '离合器',
  coolant: '冷却液',
  compressor: '压气机',
  conrod: '连杆',
  connecting: '连接',
  cooling: '冷却',
  cover: '盖',
  crankshaft: '曲轴',
  cylinder: '气缸',
  delivery: '输油',
  diaphragm: '膜片',
  differential: '差速',
  drive: '驱动',
  element: '元件',
  engine: '发动机',
  exhaust: '排气',
  feed: '供给',
  filter: '滤清器',
  flange: '法兰',
  fuel: '燃油',
  gasket: '垫片',
  gear: '齿轮',
  generator: '发电机',
  governor: '调速器',
  guide: '导向',
  harness: '线束',
  head: '头',
  high: '高压',
  holder: '座',
  hose: '软管',
  housing: '壳体',
  impeller: '叶轮',
  injector: '喷油器',
  inlet: '进气',
  line: '管',
  liner: '缸套',
  low: '低压',
  lubrication: '润滑',
  main: '主',
  manifold: '歧管',
  module: '模块',
  monitor: '监测器',
  nozzle: '喷嘴',
  nut: '螺母',
  oil: '机油',
  piston: '活塞',
  plate: '板',
  plug: '螺塞',
  prefilter: '预滤器',
  pressure: '压力',
  pump: '泵',
  rear: '后',
  relief: '释放',
  repair: '维修',
  restrictor: '限流器',
  ring: '环',
  rocker: '摇臂',
  rod: '杆',
  rotor: '转子',
  seal: '密封件',
  sealing: '密封',
  sensor: '传感器',
  series: '系列',
  shaft: '轴',
  shim: '垫片',
  sleeve: '套',
  solenoid: '电磁',
  spare: '配件',
  speed: '转速',
  spring: '弹簧',
  starter: '起动机',
  strainer: '滤网',
  supply: '供油',
  tachometer: '转速表',
  temperature: '温度',
  thermostat: '节温器',
  thrust: '推力',
  tool: '工具',
  turbo: '涡轮',
  turbocharger: '涡轮增压器',
  valve: '阀',
  washer: '垫圈',
  water: '水',
  wheel: '叶轮',
  wiring: '线束',
};

/** Categories — keyed on the English category value used across the dataset. */
export const CATEGORY_NAMES_ZH: Record<string, string> = {
  'Air and intake': '进气系统',
  Bearings: '轴承',
  'Control components': '控制元件',
  'Cooling system': '冷却系统',
  'Cylinder heads': '气缸盖',
  'Drive components': '传动元件',
  'Engine components': '发动机组件',
  'Fasteners and retaining rings': '紧固件与卡环',
  Filters: '滤清器',
  'Fuel system': '燃油系统',
  'Gaskets and seals': '垫片与密封件',
  Lubrication: '润滑系统',
  'Pistons and liners': '活塞、缸套与活塞环',
  'Repair kits': '维修包',
  'Sensors and electrical': '传感器与电气',
  'Starting and charging': '启动与充电',
  'Tools and supplies': '专用工具与耗材',
  Turbocharging: '涡轮增压',
  'Valve train': '配气机构',
};

/** Engine-type labels, e.g. "MTU 956 ENGINE" → "MTU 956 发动机". */
export const ENGINE_TYPE_NAMES_ZH: Record<string, string> = {
  'MTU 956 ENGINE': 'MTU 956 发动机',
  'MTU 1163 ENGINE': 'MTU 1163 发动机',
  'MTU 4000 ENGINE': 'MTU 4000 发动机',
  'MTU 2000 ENGINE': 'MTU 2000 发动机',
  'MTU 396 ENGINE': 'MTU 396 发动机',
  'MTU 595 ENGINE': 'MTU 595 发动机',
  'MTU 538 ENGINE': 'MTU 538 发动机',
  'MTU 183 ENGINE': 'MTU 183 发动机',
  'MTU 493 ENGINE': 'MTU 493 发动机',
  'MTU 8000 ENGINE': 'MTU 8000 发动机',
  'MTU 1600 ENGINE': 'MTU 1600 发动机',
};

const CJK = /[\u4e00-\u9fff]/;

/** Join translated tokens: no space between CJK tokens, space around Latin. */
const joinTokens = (tokens: string[]): string => {
  let out = '';
  for (const token of tokens) {
    if (!token) continue;
    if (!out) {
      out = token;
      continue;
    }
    const prev = out[out.length - 1];
    const needsSpace = !CJK.test(prev) && !CJK.test(token[0]);
    out += needsSpace ? ` ${token}` : token;
  }
  return out;
};

/**
 * Chinese display name for a (raw or normalised) catalog part name.
 * Falls back to word-by-word translation, then to the normalised English name.
 */
export const zhPartName = (raw: string): string => {
  const name = standardPartName(raw);
  const whole = PART_NAMES_ZH[name] ?? PART_NAMES_ZH[name.toLowerCase()];
  if (whole) return whole;

  const translated = name
    .split(/([\s/-]+)/)
    .map((token) => {
      if (/^[\s/-]+$/.test(token)) return token;
      return WORD_ZH[token.toLowerCase()] ?? token;
    })
    .join('');
  return joinTokens(translated.split(/([\s/-]+)/).filter((t) => t !== ''));
};

/** Chinese category name; falls back to the English value. */
export const zhCategoryName = (category: string): string =>
  CATEGORY_NAMES_ZH[category] ?? category;

/** Chinese series label, e.g. "MTU 2000" → "MTU 2000 系列". */
export const zhSeriesName = (series: string): string =>
  /系列$/.test(series) ? series : `${series} 系列`;

/** Chinese engine-type label; "MTU 956 ENGINE" → "MTU 956 发动机". */
export const zhEngineType = (engineType: string): string => {
  const known = ENGINE_TYPE_NAMES_ZH[engineType] ?? ENGINE_TYPE_NAMES_ZH[engineType.toUpperCase()];
  if (known) return known;
  return engineType.replace(/\s+ENGINES?$/i, ' 发动机');
};

/**
 * Bilingual display for spec tables: 「中文名（English）」 when a translation
 * exists and differs, otherwise the English name unchanged.
 */
export const zhPartNameBilingual = (raw: string): string => {
  const name = standardPartName(raw);
  const zh = zhPartName(name);
  return zh && zh !== name ? `${zh}（${name}）` : name;
};
