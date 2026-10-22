import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(
  new URL("../public/images/service-diagrams/", import.meta.url),
);
mkdirSync(output, { recursive: true });
const systems = {
  fuel: {
    title: "燃油系统概念流向",
    nodes: [
      "油箱与吸油管",
      "水分离器",
      "粗滤",
      "精滤",
      "低压供油",
      "高压泵／控制阀",
      "共轨／压力反馈",
      "喷油器",
    ],
    note: "回油返回低压侧／油箱；粗精滤和低压泵顺序随机型配置变化。高压侧禁止松管试油。",
  },
  cooling: {
    title: "冷却系统概念回路",
    nodes: [
      "膨胀箱／冷态液位",
      "冷却泵",
      "机体与缸盖",
      "节温与分流",
      "换热器／散热器",
      "冷却液返回",
      "低温回路（如有）",
      "中冷器（按构型）",
    ],
    note: "图示高低温支路的检查位置，不代表两条回路串联；海水侧与封闭冷却液侧需分别核对。",
  },
  lubrication: {
    title: "润滑与曲轴箱通风概念路径",
    nodes: [
      "油底壳／油位",
      "油泵",
      "滤清／冷却",
      "主油道／压力",
      "轴承等摩擦副",
      "增压器供回油",
      "曲轴箱气体",
      "油分离器／通风",
    ],
    note: "实线为润滑检查路径，虚线为通风支路；回油汇回油底壳。通风出口禁止封堵。",
  },
  boost: {
    title: "增压空气与排气概念流向",
    nodes: [
      "空气滤清器",
      "压气机",
      "中冷器",
      "进气门",
      "气缸／燃烧",
      "排气门",
      "涡轮",
      "排气管路",
    ],
    note: "温度与压力必须注明测点及表压／绝压；多级增压、旁通和冷却结构以本机图纸为准。",
  },
};
const escape = (text) =>
  text.replace(
    /[&<>]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char],
  );
for (const [key, system] of Object.entries(systems)) {
  const boxes = system.nodes
    .map((label, i) => {
      const row = i < 4 ? 0 : 1;
      const col = i % 4;
      const x = 24 + col * 232;
      const y = 94 + row * 145;
      return `<g><rect x="${x}" y="${y}" width="208" height="74" rx="10" fill="${row ? "#eaf4f1" : "#edf5fc"}" stroke="#98b4c9"/><text x="${x + 104}" y="${y + 26}" text-anchor="middle" font-size="13" fill="#526c83">${i + 1}</text><text x="${x + 104}" y="${y + 52}" text-anchor="middle" font-size="16" fill="#17324a">${escape(label)}</text></g>`;
    })
    .join("");
  // Cooling is drawn as two separately labeled branches; lubrication has a distinct ventilation branch.
  let paths = "";
  const arrow = (d, dashed = false) =>
    `<path d="${d}" fill="none" stroke="${dashed ? "#977035" : "#31759d"}" stroke-width="2" ${dashed ? 'stroke-dasharray="6 4"' : ""} marker-end="url(#arrow)"/>`;
  for (let row = 0; row < 2; row++)
    for (let col = 0; col < 3; col++) {
      if (key === "lubrication" && row === 1 && col === 1) continue;
      paths += arrow(
        `M${232 + col * 232} ${131 + row * 145}h22`,
        key === "lubrication" && row === 1 && col === 2,
      );
    }
  if (key === "fuel" || key === "boost") paths += arrow("M824 168v34H128v35");
  if (key === "fuel") paths += arrow("M824 313v31H12V78H128v14", true);
  if (key === "cooling") {
    // Main circuit continues through the heat exchanger and return, independently of the low-temperature branch.
    paths = [
      arrow("M232 131h22"),
      arrow("M464 131h22"),
      arrow("M696 131h22"),
      arrow("M824 168v34H128v35"),
      arrow("M232 276h22"),
      arrow("M360 313v31H12V78H360v14"),
      arrow("M696 276h22", true),
    ].join("");
  }
  if (key === "lubrication")
    paths +=
      arrow("M592 168v30H128v39") +
      arrow("M360 313v31H12V78H128v14") +
      arrow("M592 198v39", true);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="410" viewBox="0 0 960 410" role="img" aria-labelledby="title desc"><title id="title">${escape(system.title)}</title><desc id="desc">${escape(system.nodes.join("；"))}。${escape(system.note)}</desc><rect width="960" height="410" rx="14" fill="#fff"/><g font-family="Microsoft YaHei, PingFang SC, sans-serif"><text x="24" y="40" font-size="23" font-weight="700" fill="#17324a">${escape(system.title)}</text><text x="24" y="65" font-size="14" fill="#597083">识别与信息整理示意；不是装配图，不含设定值。</text><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="#31759d"/></marker></defs>${paths}${boxes}<text x="24" y="378" font-size="13" fill="#52667a">${escape(system.note)}</text></g></svg>`;
  writeFileSync(`${output}/${key}.svg`, svg, "utf8");
}
console.log(`Wrote ${Object.keys(systems).length} reusable SVG diagrams.`);
