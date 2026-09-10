/**
 * CONTENIDO EN CHINO SIMPLIFICADO.
 *
 * Traducción completa desde `en.ts`, la fuente. Solo texto visible: la
 * estructura —slugs, duraciones, coordenadas, rutas, fotografías— no se
 * duplica, vive en `src/data/structure/`.
 *
 * Si en el inglés se añade un safari, un día de itinerario o una FAQ y aquí
 * no se traduce, `tsc` falla: no existe fallback silencioso al inglés.
 *
 * NO se traduce: "Maisha Quest", los nombres del equipo, los nombres de las
 * colecciones (Explorer/Escape/Enrich), correos, teléfonos y las siglas de
 * organizaciones.
 *
 * ⚠️ INTERNO: traducción completa a nivel técnico, PENDIENTE de revisión
 * final por un hablante nativo antes de publicar en producción. No se
 * presenta como traducción jurada ni certificada.
 */

import type { ContentDictionary } from "./en";

/**
 * 几乎所有 18 个真实行程共用的「已含费用/不含费用」文字。
 *
 * 这并非偷懒的做法：maishaquest.com 本身就在全部 18 个行程页面上，
 * 几乎逐字重复这一段。有两点，源网站在任何一个行程中都未予确认，
 * 因此这里也不作添加：六个 Escape 系列行程是否包含飞往桑给巴尔的
 * 内陆航班，以及可自选的热气球游猎是否含在价格内、还是需另行付费。
 * 这两点在相关行程的 `practicalInfo` 中都标注为需向客户确认的
 * 未决问题，而非任何一种假设。
 */
const STANDARD_INCLUDED = [
  "抵达与离开时的机场接送",
  "配备敞篷车顶的四驱陆地巡洋舰（Land Cruiser）游猎车",
  "英语向导，全天候提供支持",
  "全部国家公园门票及政府规费",
  "已预订的住宿",
  "游猎期间一日三餐",
  "瓶装水及无酒精饮料",
];
const STANDARD_NOT_INCLUDED = [
  "国际航班与坦桑尼亚签证",
  "旅行与医疗保险",
  "给向导的小费",
  "游猎前后的酒店餐食",
];

export const zhCNContent: ContentDictionary = {
  safaris: {
    /* ======================== EXPLORER — 露营 ======================= */
    "manyara-ngorongoro-safari": {
      name: "曼雅拉湖与恩戈罗恩戈罗火山口游猎",
      summary: "为期两天的紧凑行程，带您认识坦桑尼亚的经典游猎路线：曼雅拉湖畔的爬树狮，随后整日探索恩戈罗恩戈罗火山口口底。",
      overview: "专为时间有限、却仍想体验真正游猎而非走马观花的旅客设计。全程露营住宿，与 maishaquest.com 上 Explorer 系列行程所列完全一致。",
      travellerProfile: "时间有限、想体验经典野生动物之旅的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "曼雅拉湖国家公园", route: "阿鲁沙 → 曼雅拉湖国家公园", activities: ["清晨从阿鲁沙出发", "曼雅拉湖游猎：爬树狮、大象与火烈鸟", "公园内野餐午餐", "傍晚转往卡拉图附近的营地"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "卡拉图 → 恩戈罗恩戈罗火山口 → 阿鲁沙", activities: ["清晨下到火山口底", "全天观兽，有较大机会见到犀牛与大型猫科动物", "在河马池旁野餐午餐", "傍晚返回阿鲁沙"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-ngorongoro-safari": {
      name: "塔兰吉雷、曼雅拉湖与恩戈罗恩戈罗火山口游猎",
      summary: "三天走遍坦桑尼亚三座最负盛名的公园：塔兰吉雷的大象与猴面包树、曼雅拉湖畔的裂谷断崖，以及恩戈罗恩戈罗火山口的半日游猎。",
      overview: "专为首次到访、想在不长的行程中体验三座标志性公园的旅客设计的入门游猎。全程露营住宿，与 maishaquest.com 上 Explorer 系列行程所列完全一致。",
      travellerProfile: "想体验三座标志性公园的首次游猎旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "塔兰吉雷国家公园", route: "阿鲁沙 → 塔兰吉雷国家公园", activities: ["游猎：象群与古老的猴面包树", "公园内野餐午餐", "露营过夜"], estimatedDuration: null },
        { title: "曼雅拉湖国家公园", route: "塔兰吉雷 → 曼雅拉湖国家公园", activities: ["上午沿裂谷断崖游猎：长颈鹿、大象与鸟类", "傍晚转往卡拉图附近的营地"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "卡拉图 → 恩戈罗恩戈罗火山口 → 阿鲁沙", activities: ["清晨下到火山口底，进行半日游猎", "火山口内野餐午餐", "返回阿鲁沙"], estimatedDuration: null },
      ],
    },
    "serengeti-ngorongoro-manyara-safari": {
      name: "塞伦盖蒂、恩戈罗恩戈罗与曼雅拉湖游猎",
      summary: "四天穿梭于曼雅拉湖、恩戈罗恩戈罗火山口与塞伦盖蒂之间，追寻大迁徙与随行的猛兽。",
      overview: "为期四天的露营环线，走访三大重要目的地，与 maishaquest.com 上 Explorer 系列行程所列完全一致。",
      travellerProfile: "想在四天内更全面体验北部环线的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "曼雅拉湖国家公园", route: "阿鲁沙 → 曼雅拉湖国家公园", activities: ["上午前往曼雅拉湖：爬树狮、大象与火烈鸟", "下午转往恩戈罗恩戈罗高地的营地"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "恩戈罗恩戈罗高地 → 恩戈罗恩戈罗火山口 → 塞伦盖蒂", activities: ["清晨在火山口游猎", "下午转往塞伦盖蒂，可选途经奥杜瓦伊峡谷", "日落时分游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["整日游猎，追寻猛兽与迁徙兽群", "野餐午餐", "露营过夜"], estimatedDuration: "全天" },
        { title: "返回阿鲁沙", route: "塞伦盖蒂 → 恩戈罗恩戈罗 → 卡拉图 → 阿鲁沙", activities: ["离开塞伦盖蒂前的晨间游猎", "经恩戈罗恩戈罗与卡拉图返回阿鲁沙"], estimatedDuration: null },
      ],
    },
    "northern-circuit-camping-safari": {
      name: "北部环线 5 天露营游猎",
      summary: "从容而均衡的露营游猎，穿越塔兰吉雷、曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗火山口。",
      overview: "适合想要均衡行程、不愿在公园间赶路的探险旅客。全程露营住宿，与 maishaquest.com 上 Explorer 系列行程所列完全一致。",
      travellerProfile: "想要均衡行程、不愿赶路的探险旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "塔兰吉雷国家公园", route: "阿鲁沙 → 塔兰吉雷国家公园", activities: ["抵达后游猎", "露营过夜"], estimatedDuration: null },
        { title: "从塔兰吉雷到塞伦盖蒂", route: "塔兰吉雷 → 塞伦盖蒂国家公园", activities: ["沿途观兽", "在塞伦盖蒂中部的营地过夜"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["上午与下午各一次游猎", "露营过夜"], estimatedDuration: null },
        { title: "从塞伦盖蒂到恩戈罗恩戈罗", route: "塞伦盖蒂 → 恩戈罗恩戈罗火山口边缘", activities: ["晨间游猎", "下午转往火山口边缘的营地"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "恩戈罗恩戈罗火山口 → 阿鲁沙", activities: ["清晨下到火山口底，进行半日游猎", "返回阿鲁沙"], estimatedDuration: null },
      ],
    },
    "six-day-camping-safari": {
      name: "坦桑尼亚 6 天露营游猎",
      // ⚠️ 在 maishaquest.com 自己的 Explorer 页面上，该行程的
      // 「EXPLORE SAFARI」按钮指向的页面，与上方 5 天行程完全相同——
      // 并不存在经确认、独立的第六天行程。第 1 至 5 天沿用已确认的
      // 5 天行程；第六天保持空缺，而非凭空编造。参见 `safaris.ts`
      // 开头的说明。
      summary: "在北部环线露营游猎的基础上增加第六天。此确切行程的原始页面在 maishaquest.com 上链接有误——详见关于第六天的说明。",
      overview: "第 1 至 5 天的已确认内容，与北部环线 5 天露营游猎相同。发布前，第六天需直接与 Maisha Quest 确认。",
      travellerProfile: "想要均衡行程、不愿赶路的探险旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" },
        { label: "待确认", value: "第六天的行程尚未确认——原始页面实际上链接到的是 5 天行程" },
      ],
      days: [
        { title: "塔兰吉雷国家公园", route: "阿鲁沙 → 塔兰吉雷国家公园", activities: ["抵达后游猎", "露营过夜"], estimatedDuration: null },
        { title: "从塔兰吉雷到塞伦盖蒂", route: "塔兰吉雷 → 塞伦盖蒂国家公园", activities: ["沿途观兽", "在塞伦盖蒂中部的营地过夜"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["上午与下午各一次游猎", "露营过夜"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["在公园另一区域进行更多游猎", "露营过夜"], estimatedDuration: null },
        { title: "从塞伦盖蒂到恩戈罗恩戈罗", route: "塞伦盖蒂 → 恩戈罗恩戈罗火山口边缘", activities: ["晨间游猎", "下午转往火山口边缘的营地"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口——行程待确认", route: "恩戈罗恩戈罗火山口 → 阿鲁沙", activities: ["尚未与 Maisha Quest 确认——详见实用信息"], estimatedDuration: null },
      ],
    },
    "extended-camping-safari": {
      name: "坦桑尼亚 7 天延伸露营游猎",
      summary: "沉浸式露营行程，穿越塔兰吉雷、曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗火山口，留出充裕时间真正追随大迁徙。",
      overview: "Explorer 系列中最长的露营行程，与 maishaquest.com 所列完全一致。返回阿鲁沙途中可自选参加一项文化活动作结。",
      travellerProfile: "想不慌不忙走完整个北部环线的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "露营——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "塔兰吉雷国家公园", route: "阿鲁沙 → 塔兰吉雷国家公园", activities: ["抵达后下午游猎"], estimatedDuration: null },
        { title: "曼雅拉湖国家公园", route: null, activities: ["上午探索曼雅拉湖", "在卡拉图附近过夜"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "卡拉图 → 恩戈罗恩戈罗（可自选停留奥杜瓦伊峡谷）→ 塞伦盖蒂", activities: ["抵达塞伦盖蒂后下午游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["整日追寻迁徙兽群与猛兽"], estimatedDuration: "全天" },
        { title: "从塞伦盖蒂到火山口边缘", route: "塞伦盖蒂 → 恩戈罗恩戈罗火山口边缘", activities: ["晨间游猎", "下午抵达火山口边缘"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "恩戈罗恩戈罗火山口 → 卡拉图", activities: ["全程游览火山口", "在卡拉图附近过夜"], estimatedDuration: null },
        { title: "返回阿鲁沙", route: "卡拉图 → 阿鲁沙", activities: ["沿途风光旖旎的返程", "途中可自选参加文化活动"], estimatedDuration: null },
      ],
    },

    /* ==================== ESCAPE — 旅馆 + 桑给巴尔 ===================== */
    "safari-zanzibar-escape": {
      name: "游猎与桑给巴尔度假",
      summary: "在塔兰吉雷与恩戈罗恩戈罗火山口游猎，随后飞往桑给巴尔，探索石头城与海滩。",
      overview: "为期七天的度假行程，将北部游猎环线与桑给巴尔的海岸假期结合，与 maishaquest.com 上 Escape 系列行程所列完全一致。",
      travellerProfile: "想在一次旅程中兼顾野生动物与海滩的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住旅馆，桑给巴尔入住海滩酒店——提供豪华、中档或经济等不同级别" },
        { label: "待确认", value: "前往桑给巴尔的内陆航班是否含在价格内，原始页面并未确认" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎：象群与猴面包树"], estimatedDuration: "全天" },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["全天探索火山口"], estimatedDuration: "全天" },
        { title: "前往桑给巴尔", route: "阿鲁沙 → 桑给巴尔", activities: ["返回阿鲁沙", "飞往桑给巴尔", "入住石头城"], estimatedDuration: null },
        { title: "石头城与香料农场", route: null, activities: ["徒步游览石头城", "参观香料农场"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["在海滩上悠闲一天", "可自选浮潜、潜水或风筝冲浪"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "serengeti-zanzibar": {
      name: "塞伦盖蒂与桑给巴尔",
      summary: "在塞伦盖蒂与恩戈罗恩戈罗追寻非洲五霸的游猎，随后前往石头城与桑给巴尔的白沙海滩。",
      overview: "为期八天的度假行程，将野生动物探索与海岛休闲结合，与 maishaquest.com 上 Escape 系列行程所列完全一致。",
      travellerProfile: "想在一次旅程中兼顾野生动物与海滩的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住豪华营地，桑给巴尔入住石头城或度假村" },
        { label: "待确认", value: "前往桑给巴尔的内陆航班是否含在价格内，原始页面并未确认" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 塞伦盖蒂", activities: ["抵达后下午游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["整日游猎", "丛林野餐午餐"], estimatedDuration: "全天" },
        { title: "从塞伦盖蒂到恩戈罗恩戈罗", route: "塞伦盖蒂 → 恩戈罗恩戈罗保护区", activities: ["晨间游猎", "转往火山口边缘的旅馆"], estimatedDuration: null },
        { title: "从恩戈罗恩戈罗火山口到桑给巴尔", route: "恩戈罗恩戈罗 → 桑给巴尔", activities: ["火山口游猎", "下午飞往桑给巴尔", "入住石头城"], estimatedDuration: null },
        { title: "石头城与监狱岛", route: null, activities: ["徒步游览石头城", "乘船前往监狱岛并浮潜"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["在海滩上悠闲一天", "可自选水上运动"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "big-three-zanzibar": {
      name: "三大公园 + 桑给巴尔",
      summary: "塔兰吉雷、塞伦盖蒂与恩戈罗恩戈罗火山口，随后前往石头城与桑给巴尔的海滩。",
      overview: "为期九天的度假行程，将坦桑尼亚三座最负盛名的公园与桑给巴尔的假期结合，与 maishaquest.com 上 Escape 系列行程所列完全一致。",
      travellerProfile: "想在一次旅程中兼顾野生动物与海滩的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住旅馆，桑给巴尔入住石头城或海滩度假村" },
        { label: "待确认", value: "前往桑给巴尔的内陆航班是否含在价格内，原始页面并未确认" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["机场接机", "傍晚行程说明"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎", "野餐午餐"], estimatedDuration: "全天" },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 恩戈罗恩戈罗高地 → 塞伦盖蒂", activities: ["驱车前往塞伦盖蒂中部"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["上午与下午各一次游猎"], estimatedDuration: null },
        { title: "从塞伦盖蒂到恩戈罗恩戈罗", route: "塞伦盖蒂 → 恩戈罗恩戈罗火山口边缘", activities: ["清晨游猎", "转往火山口边缘"], estimatedDuration: null },
        { title: "从恩戈罗恩戈罗火山口到桑给巴尔", route: "恩戈罗恩戈罗 → 桑给巴尔", activities: ["全程游览火山口", "傍晚飞往石头城"], estimatedDuration: null },
        { title: "石头城与香料农场", route: null, activities: ["徒步游览石头城", "参观香料农场"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["游泳、浮潜或潜水，任君选择"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "safari-culture-zanzibar": {
      name: "游猎、文化与桑给巴尔",
      summary: "穿越塔兰吉雷、塞伦盖蒂与恩戈罗恩戈罗游猎，在埃亚西湖与哈扎人及达托加社群共度一天，随后前往桑给巴尔。",
      overview: "为期十天的旅程，结合游猎、文化交流与海滩收尾，与 maishaquest.com 上 Escape 系列行程所列完全一致。",
      travellerProfile: "想在一次旅程中兼顾野生动物、文化与海滩的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住旅馆，桑给巴尔入住石头城或海滩度假村" },
        { label: "待确认", value: "埃亚西湖在本网站上尚未设有专属目的地页面——详见 Learn/地区板块审核" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["机场接机"], estimatedDuration: null },
        { title: "阿鲁沙市区游览", route: null, activities: ["市集、坦桑石博物馆与文化遗产中心"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎", "野餐午餐"], estimatedDuration: "全天" },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 恩戈罗恩戈罗高地 → 塞伦盖蒂", activities: ["抵达后下午游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["上午与下午各一次游猎"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["下到火山口观兽"], estimatedDuration: null },
        { title: "从埃亚西湖到桑给巴尔", route: "恩戈罗恩戈罗 → 埃亚西湖 → 桑给巴尔", activities: ["与哈扎狩猎采集者及达托加铁匠进行文化交流", "下午飞往桑给巴尔"], estimatedDuration: null },
        { title: "石头城与香料农场", route: null, activities: ["石头城导览游", "参观香料农场"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["可自选浮潜、风筝冲浪或三角帆船出海"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "luxury-safari-zanzibar": {
      name: "豪华游猎与桑给巴尔",
      summary: "穿越北部环线的完整游猎——塔兰吉雷、曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗，可自选热气球飞行——随后在桑给巴尔停留四晚。",
      overview: "为期十二天的度假行程，专为想兼得游猎与海岛时光的情侣、家庭与小团体设计，与 maishaquest.com 上 Escape 系列行程所列完全一致。",
      travellerProfile: "追求游猎刺激与海岛宁静的情侣、家庭与小团体",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "热气球游猎（可自选，第 5 天）"],
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住旅馆，桑给巴尔入住石头城或海滩度假村" },
        { label: "待确认", value: "前往桑给巴尔的内陆航班是否含在价格内，原始页面并未确认" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎：猴面包树、大象与非洲五霸"], estimatedDuration: "全天" },
        { title: "曼雅拉湖国家公园", route: null, activities: ["爬树狮与火烈鸟"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 恩戈罗恩戈罗高地 → 塞伦盖蒂", activities: ["驱车前往塞伦盖蒂中部"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["可自选日出热气球游猎，附赠丛林早餐", "车游游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["全天游猎，视季节追踪迁徙"], estimatedDuration: "全天" },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["下到火山口观兽"], estimatedDuration: null },
        { title: "前往桑给巴尔", route: "阿鲁沙 → 桑给巴尔", activities: ["返回阿鲁沙", "飞往桑给巴尔", "傍晚三角帆船日落巡游"], estimatedDuration: null },
        { title: "香料农场与监狱岛", route: null, activities: ["香料农场之旅", "前往监狱岛浮潜"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["悠闲一天", "可自选水上运动"], estimatedDuration: null },
        { title: "自由日", route: null, activities: ["自由活动", "海滩日落晚餐"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "grand-safari-zanzibar": {
      name: "盛大游猎与桑给巴尔",
      summary: "完整的北部环线，在埃亚西湖与哈扎人及达托加社群共度一天，随后在桑给巴尔度过一周，包含佐扎尼森林与基济姆卡齐。",
      overview: "maishaquest.com 上最长的 Escape 系列行程：十四天，结合深度游猎与在桑给巴尔的长时间停留。",
      travellerProfile: "追求从容而完整的坦桑尼亚之旅的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "游猎期间入住旅馆，桑给巴尔入住石头城或海滩度假村" },
        { label: "待确认", value: "埃亚西湖在本网站上尚未设有专属目的地页面——详见 Learn/地区板块审核" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎：象群与猴面包树"], estimatedDuration: "全天" },
        { title: "曼雅拉湖国家公园", route: null, activities: ["爬树狮与火烈鸟"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["视季节追踪迁徙"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["视季节观察渡河"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["在公园内进行更多游猎"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["下到火山口，进行全天游猎"], estimatedDuration: "全天" },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["在火山口内进行更多观兽"], estimatedDuration: null },
        { title: "从埃亚西湖到桑给巴尔", route: "恩戈罗恩戈罗 → 埃亚西湖 → 桑给巴尔", activities: ["探访哈扎与达托加社群", "下午飞往桑给巴尔"], estimatedDuration: null },
        { title: "石头城与香料农场", route: null, activities: ["徒步游览石头城", "参观香料农场", "日落三角帆船巡游"], estimatedDuration: null },
        { title: "海滩日", route: null, activities: ["悠闲一天", "可自选潜水、浮潜或风筝冲浪"], estimatedDuration: null },
        { title: "佐扎尼森林与基济姆卡齐", route: null, activities: ["佐扎尼森林中的红疣猴", "在基济姆卡齐邂逅海豚"], estimatedDuration: null },
        { title: "自由日", route: null, activities: ["悠闲一天", "海边告别晚餐"], estimatedDuration: null },
        { title: "离境", route: "桑给巴尔 → 机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },

    /* =============== ENRICH — 旅馆，野生动物 + 文化 ================= */
    "tarangire-serengeti-ngorongoro-enrich": {
      name: "塔兰吉雷、塞伦盖蒂与恩戈罗恩戈罗",
      summary: "塔兰吉雷古老的猴面包树与象群、塞伦盖蒂开阔的平原，以及常被称为「世界第八大奇迹」的恩戈罗恩戈罗火山口。",
      overview: "为期五天、入住旅馆的游猎行程，走访坦桑尼亚三座最重要的公园，与 maishaquest.com 上 Enrich 系列行程所列完全一致。",
      travellerProfile: "想以旅馆住宿方式初探北部环线的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的旅馆"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["游猎", "公园内野餐午餐"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 高地 → 塞伦盖蒂", activities: ["抵达后傍晚游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["日出游猎", "可自选造访马赛村庄", "转往恩戈罗恩戈罗方向"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: "恩戈罗恩戈罗火山口 → 阿鲁沙", activities: ["下到火山口", "半日游猎", "返回阿鲁沙"], estimatedDuration: null },
      ],
    },
    "manyara-serengeti-ngorongoro-enrich": {
      name: "曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗",
      summary: "多样的地貌与丰富的野生动物，包括非洲五霸：爬树狮、大迁徙，以及恩戈罗恩戈罗火山口密集的野生动物种群。",
      overview: "为期七天、入住旅馆的游猎行程，走访曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗，与 maishaquest.com 上 Enrich 系列行程所列完全一致。",
      travellerProfile: "想以旅馆住宿方式更全面体验北部环线的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "曼雅拉湖国家公园", route: null, activities: ["游猎", "野餐午餐"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "曼雅拉湖 → 恩戈罗恩戈罗火山口边缘 → 塞伦盖蒂中部", activities: ["沿途观兽的行程"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["全天游猎，追寻迁徙与猛兽"], estimatedDuration: "全天" },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["视季节，在塞伦盖蒂北部或南部进行晨间游猎"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["下到火山口", "半日游猎"], estimatedDuration: null },
        { title: "返回阿鲁沙", route: "恩戈罗恩戈罗 → 阿鲁沙", activities: ["转往机场"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-serengeti-ngorongoro-enrich": {
      name: "塔兰吉雷、曼雅拉湖、塞伦盖蒂与恩戈罗恩戈罗",
      summary: "塔兰吉雷猴面包树间的大象、曼雅拉湖畔的爬树狮与火烈鸟、塞伦盖蒂的平原，以及恩戈罗恩戈罗火山口。",
      overview: "为期八天、入住旅馆的游猎行程，走访四座公园，与 maishaquest.com 上 Enrich 系列行程所列完全一致。",
      travellerProfile: "想从舒适旅馆出发、走完整个北部环线的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" }],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["游猎：大象与猴面包树林"], estimatedDuration: null },
        { title: "曼雅拉湖国家公园", route: null, activities: ["爬树狮与火烈鸟"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["抵达后游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["全天探索，路线视迁徙季节而定"], estimatedDuration: "全天" },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["更多游猎"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["火山口边缘的半日游猎"], estimatedDuration: null },
        { title: "返回阿鲁沙", route: "恩戈罗恩戈罗 → 阿鲁沙", activities: ["转往机场"], estimatedDuration: null },
      ],
    },
    "cultural-safari-combo": {
      name: "文化 + 游猎组合",
      summary: "在游猎之余探索部落文化与真实的社群生活：阿鲁沙、塔兰吉雷、塞伦盖蒂、恩戈罗恩戈罗、埃亚西湖，以及一处马赛村庄。",
      overview: "为期十天的旅程，兼顾国家公园与传统社群走访，与 maishaquest.com 上 Enrich 系列行程所列完全一致。",
      travellerProfile: "想在观赏野生动物之余体验文化沉浸的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" },
        { label: "待确认", value: "埃亚西湖在本网站上尚未设有专属目的地页面——详见 Learn/地区板块审核" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["机场接送"], estimatedDuration: null },
        { title: "阿鲁沙市区游览", route: null, activities: ["市集与文化遗产中心"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎"], estimatedDuration: "全天" },
        { title: "前往塞伦盖蒂", route: "阿鲁沙 → 恩戈罗恩戈罗 → 塞伦盖蒂", activities: ["沿途游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["游猎", "可自选日落晚餐"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["追寻迁徙的探索行程"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["在火山口底观兽"], estimatedDuration: null },
        { title: "埃亚西湖", route: null, activities: ["探访哈扎狩猎采集者与达托加铁匠"], estimatedDuration: null },
        { title: "马赛村庄", route: null, activities: ["文化沉浸走访"], estimatedDuration: null },
        { title: "离境", route: null, activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "extended-safari-cultural-immersion": {
      name: "延伸游猎与文化沉浸",
      summary: "在四座公园探索野生动物，并结合社群交流：哈扎猎人、达托加铁匠与马赛村庄。",
      overview: "为期十一天的旅程，兼顾游猎活动与社群走访，与 maishaquest.com 上 Enrich 系列行程所列完全一致。",
      travellerProfile: "想在观赏野生动物之余进行更长时间文化交流的旅客",
      bestTime: "Maisha Quest 未标明",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" },
        { label: "待确认", value: "埃亚西湖在本网站上尚未设有专属目的地页面——详见 Learn/地区板块审核" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["机场接送"], estimatedDuration: null },
        { title: "阿鲁沙市区游览", route: null, activities: ["市集与坦桑石博物馆"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["游猎"], estimatedDuration: null },
        { title: "曼雅拉湖国家公园", route: null, activities: ["观兽"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["游猎，视季节观察迁徙"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["更多游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["更多游猎"], estimatedDuration: null },
        { title: "前往恩戈罗恩戈罗", route: "塞伦盖蒂 → 恩戈罗恩戈罗", activities: ["转场"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["全天游猎"], estimatedDuration: "全天" },
        { title: "埃亚西湖与马赛村庄", route: null, activities: ["与哈扎猎人一同参与传统狩猎与生火", "探访达托加铁匠与一处马赛村庄"], estimatedDuration: null },
        { title: "离境", route: null, activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
    "wildlife-leisure-culture": {
      name: "野生动物 + 休闲 + 文化",
      // ⚠️ maishaquest.com 上该行程自己的摘要承诺有桑给巴尔海滩阶段
      // （「冒险、放松与文化沉浸的完美结合」），但同一页面上的逐日行程
      // 从未离开大陆，并在乞力马扎罗机场结束。行程——这个可核实的
      // 部分——按原样发布；参见 `safaris.ts` 开头的说明。
      summary: "在北部各公园观赏野生动物，参观咖啡与坦桑石农场，并与哈扎人、达托加人及马赛社群进行文化交流。",
      overview: "为期十二天的 Enrich 系列行程。说明：maishaquest.com 上的行程描述还承诺有桑给巴尔的海滩时光，但已发布的逐日行程并未包含这部分——已标注，待客户确认哪个版本正确。",
      travellerProfile: "想将野生动物、休闲与文化结合的旅客",
      bestTime: "全年",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "热气球游猎（可自选，第 7 天）"],
      practicalInfo: [
        { label: "住宿", value: "旅馆——提供豪华、中档或经济等不同级别" },
        { label: "待确认", value: "行程描述承诺有桑给巴尔阶段，但逐日行程并未包含——需与客户确认哪个版本正确" },
      ],
      days: [
        { title: "抵达阿鲁沙", route: "乞力马扎罗国际机场 → 阿鲁沙", activities: ["转往您的酒店"], estimatedDuration: null },
        { title: "阿鲁沙市区游览", route: null, activities: ["坦桑石体验", "参观咖啡种植园并品鉴"], estimatedDuration: null },
        { title: "塔兰吉雷国家公园", route: null, activities: ["全天游猎：大象与猴面包树"], estimatedDuration: "全天" },
        { title: "曼雅拉湖国家公园", route: null, activities: ["爬树狮、河马与火烈鸟"], estimatedDuration: null },
        { title: "前往塞伦盖蒂", route: "恩戈罗恩戈罗高地 → 塞伦盖蒂中部", activities: ["风光旖旎的车程"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["全天游猎"], estimatedDuration: "全天" },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["可自选热气球游猎，附赠香槟早餐", "下午游猎"], estimatedDuration: null },
        { title: "塞伦盖蒂国家公园", route: null, activities: ["视迁徙季节，前往塞伦盖蒂北部或南部"], estimatedDuration: null },
        { title: "恩戈罗恩戈罗火山口", route: null, activities: ["下到火山口", "下午游猎"], estimatedDuration: null },
        { title: "埃亚西湖", route: null, activities: ["与哈扎猎人及达托加铁匠进行文化体验"], estimatedDuration: null },
        { title: "马赛村庄", route: "→ 阿鲁沙", activities: ["传统马赛村庄走访", "返回阿鲁沙"], estimatedDuration: null },
        { title: "离境", route: "阿鲁沙 → 乞力马扎罗国际机场", activities: ["转往机场搭乘返程航班"], estimatedDuration: null },
      ],
    },
  },

  destinations: {
    "serengeti": {
      name: "塞伦盖蒂",
      shortDescription: "无尽的草原，以及穿越它的大迁徙。",
      description: "塞伦盖蒂在马赛语中意为「无尽的平原」，这个名字并非修辞。它是一座辽阔而层次分明的国家公园——南部短草平原、中部花岗岩岛丘、北部河岸林——承载着让坦桑尼亚闻名的常年猛兽族群，以及每年缓慢绕行一圈、穿越其间的角马大迁徙。",
      bestTime: "全年皆宜，视迁徙所在位置而定",
      seasons: [
        {"label":"产犊期","months":"1月 – 3月","note":"兽群集中在南部短草平原，掠食行为高度集中。"},
        {"label":"西部走廊","months":"5月 – 7月","note":"迁徙向西、向北推进，格鲁美地河渡河。"},
        {"label":"北部渡河","months":"7月 – 10月","note":"北部马拉河渡河，一年中最抢手的几周。"},
      ],
      wildlife: ["狮","豹","猎豹","角马","斑马","非洲象","斑鬣狗"],
    },
    "tarangire": {
      name: "塔兰吉雷",
      shortDescription: "猴面包树，以及北部最大的象群。",
      description: "塔兰吉雷环绕着一条河展开——周边土地干涸时，这条河仍有水。旱季里，它把象群吸引到此处，密度之高在坦桑尼亚北部其他地方罕见，头顶是树龄数百年的猴面包树。这里比塞伦盖蒂安静，也常是北部环线的第一站。",
      bestTime: "6月 – 10月",
      seasons: [
        {"label":"旱季","months":"6月 – 10月","note":"动物沿塔兰吉雷河聚集，一年中观象的最佳时节。"},
        {"label":"绿季","months":"11月 – 5月","note":"车辆更少，天色壮阔，鸟类极为丰富；动物分布更分散。"},
      ],
      wildlife: ["非洲象","狮","长颈鹿","斑马","伊兰羚羊","长耳大羚羊"],
    },
    "lake-manyara": {
      name: "马尼亚拉湖",
      shortDescription: "地下水森林、碱湖与火烈鸟。",
      description: "一座狭长的公园，夹在东非大裂谷断崖与一片浅碱湖之间。从茂密的地下水森林到开阔的泛滥平原，只需几分钟车程——这让它成为全国变化最丰富的短途游猎之一，也是阿鲁沙与恩戈罗恩戈罗高地之间理所当然的半日停留。",
      bestTime: "6月 – 10月观兽，11月 – 4月观鸟",
      seasons: [],
      wildlife: ["非洲象","长颈鹿","河马","狒狒","火烈鸟","鹈鹕"],
    },
    "ngorongoro": {
      name: "恩戈罗恩戈罗",
      shortDescription: "一座塌陷的火山，容纳了一整个生态系统。",
      description: "恩戈罗恩戈罗火山口是世界上最大的完整火山破火山口，口底同时容纳草原、森林、碱湖，以及一群无需迁徙的常驻大型哺乳动物。天光初亮时，你从寒冷起雾的口缘一路下行。这里也是马赛社群与野生动物共享土地的保护区。",
      bestTime: "全年",
      seasons: [
        {"label":"旱季","months":"6月 – 10月","note":"火山口视野清晰、道路好走，也是口底最热闹的月份。"},
        {"label":"绿季","months":"11月 – 5月","note":"口底转绿，1月起邻近的恩杜图平原进入产犊期。"},
      ],
      wildlife: ["黑犀","狮","非洲象","非洲水牛","斑鬣狗","火烈鸟"],
    },
    "kilimanjaro": {
      name: "乞力马扎罗",
      shortDescription: "非洲最高点，从山脚一步步走到峰顶。",
      description: "乞力马扎罗是走上去的，不是开车上去的。五到九天里，你从农田穿过雨林、高山灌丛与高寒荒漠，抵达海拔 5,895 米的冰川峰顶——一周之内经历五种气候。路线选择、节奏与适应高度比体能更重要，这些我们都会围绕你来安排。",
      bestTime: "1月 – 3月与6月 – 10月",
      seasons: [],
      wildlife: ["疣猴","青长尾猴","铜绿花蜜鸟"],
    },
    "nyerere": {
      name: "尼雷尔",
      shortDescription: "在非洲最大的国家公园里，乘船游猎鲁菲吉河。",
      description: "尼雷尔国家公园由原塞卢斯禁猎区划出，由鲁菲吉河及其湖泊与水道网络所定义。这是坦桑尼亚少数几个可以上午徒步追踪、下午乘船观兽的地方，车辆数量仅为北部环线的一小部分。",
      bestTime: "6月 – 10月",
      seasons: [],
      wildlife: ["非洲象","河马","尼罗鳄","非洲野犬","非洲水牛","狮"],
    },
    "ruaha": {
      name: "鲁阿哈",
      shortDescription: "猴面包树之地，成群的野生动物，几乎不见他人。",
      description: "鲁阿哈位于南部非洲与东部非洲生态系统的交界处，因此大捻角羚与小捻角羚会出现在同一座公园里。它偏远、粗犷、游客极少——适合走完北部环线、想要它更野一面的旅人。",
      bestTime: "6月 – 10月",
      seasons: [],
      wildlife: ["非洲象","狮","大捻角羚","黑马羚","非洲野犬"],
    },
    "zanzibar": {
      name: "桑给巴尔",
      shortDescription: "印度洋、三角帆船与石头城。",
      description: "多数行程在桑给巴尔收尾：北岸与东岸是白沙与温暖的浅海，西侧则是石头城——联合国教科文组织世界遗产，珊瑚石巷弄、雕花木门，以及斯瓦希里、阿曼与印度交织的历史。住两晚是一次停顿，住五晚便自成一段假期。",
      bestTime: "6月 – 10月与12月 – 2月",
      seasons: [],
      wildlife: ["桑给巴尔红疣猴","海豚","珊瑚礁鱼类","绿海龟"],
    },
    "arusha": {
      name: "阿鲁沙",
      shortDescription: "每段旅程的起点——也是我们生活的地方。",
      description: "阿鲁沙坐落在梅鲁山脚下，是北部环线的起点。它是通往塞伦盖蒂与恩戈罗恩戈罗的门户，也是我们的家：办公室、向导与车辆都在这里。多数行程从在阿鲁沙住一晚开始，做一次完整的行前说明，再迎来一个不赶时间的清晨。",
      bestTime: "全年",
      seasons: [],
      wildlife: ["疣猴","青长尾猴","森林鸟类"],
    },
  },

  experiences: {
    "game-drives": {
      name: "乘车观兽",
      shortDescription: "专属车辆、可开顶棚，以及一位读得懂地面痕迹的向导。",
      description: "坦桑尼亚野生动物之旅的核心。您乘坐自己的车、由自己的向导带领，节奏由您决定：光线好的时候在一头豹旁边待上两小时，或者继续前行。清晨与傍晚是草原最热闹的时候。",
    },
    "great-migration": {
      name: "动物大迁徙",
      shortDescription: "跟随兽群，按它们真正所在的位置安排。",
      description: "近两百万头角马和斑马沿着一年一度的缓慢循环穿越塞伦盖蒂生态系统。并不存在单一的「迁徙季」——只有在您出行那个月兽群应当在的位置，我们围绕这一点安排路线，而不是套用固定行程。",
    },
    "mobile-camping": {
      name: "移动营地",
      shortDescription: "随动物迁徙而移动的营地，而不是与之相悖。",
      description: "帆布、一张真正的床、星空下的桶式淋浴，以及一座随时收起、跟着兽群走的营地。这最接近野生动物之旅最初的旅行方式，却没有您可能想象中的任何不适。",
    },
    "walking-safari": {
      name: "徒步观兽",
      shortDescription: "同一片风景，以每小时三公里的速度。",
      description: "由持枪护林员和徒步向导带领，步行让这趟旅程换了尺度：足迹、粪便、鸟鸣、灌木丛的气味。看到的动物更少，理解的东西多得多。可在塔兰吉雷、尼雷尔、鲁阿哈以及乞力马扎罗山麓进行。",
    },
    "balloon-safari": {
      name: "热气球之旅",
      shortDescription: "从三百米高空，看塞伦盖蒂的第一缕光。",
      description: "黎明升空，在草原上空近乎无声地漂浮一小时，然后在降落处的草地上用早餐。这是几乎没人后悔的一个加项——而且需要提前很久预订。",
    },
    "photographic-safari": {
      name: "摄影主题行程",
      shortDescription: "围绕光线、机位与耐心来安排。",
      description: "路线与每日时间围绕黄金时刻规划，车辆按太阳方向停位，用豆袋而非三脚架，向导也习惯与摄影师合作。节奏更慢、园区更少、画面更好。",
    },
    "beach-and-ocean": {
      name: "海滩与海洋",
      shortDescription: "草原的尘土之后，是印度洋。",
      description: "桑给巴尔与近海的小岛：温暖的浅水、夕阳下的三角帆船、可浮潜或深潜的珊瑚礁。这是野生动物之旅自然的下半程，也是多数情侣蜜月行程的核心。",
    },
    "family-safari": {
      name: "家庭出行",
      shortDescription: "按孩子的节奏安排，也不会让大人觉得无趣。",
      description: "更短的车程、家庭套房而非分开的房间、懂得抓住七岁孩子注意力的向导，以及彼此距离足够近的园区，让没有人需要在车上待一整天。各营地的最低年龄不同——我们会在提出任何建议之前先核实。",
    },
    "cultural-encounters": {
      name: "文化交流",
      shortDescription: "与当地社区相处，按他们的方式。",
      description: "探访由相关社区直接安排，时间由他们决定，您所付费用中有合理的一部分留在当地。恩戈罗恩戈罗高地附近的马赛与达托加社区、乞力马扎罗山坡上的查加村落，以及桑给巴尔的斯瓦希里石头城。",
    },
    "coffee-and-cuisine": {
      name: "咖啡与美食",
      shortDescription: "从种植与烹饪认识坦桑尼亚。",
      description: "在咖啡生长的山坡上喝咖啡、石头城外的香料农场、一间斯瓦希里厨房、阿鲁沙的市集。这些从容的半日行程，比再多一次乘车观兽更能让您认识这个国家。",
    },
    "kilimanjaro-trek": {
      name: "乞力马扎罗登山",
      shortDescription: "五种气候、一座山、一周时间。",
      description: "马查梅、莱莫绍、荣盖或马兰古——合适的路线取决于您有多少时间、如何适应海拔，以及您希望这段路走起来是什么感觉。额外的适应日我们按标准安排，而不是当作加价项目。",
    },
    "safari-and-zanzibar": {
      name: "野生动物之旅与桑给巴尔",
      shortDescription: "先草原，后海洋。经典组合。",
      description: "最常被要求的坦桑尼亚行程形态：先走北部环线，再向东短途飞行到海岸。两段各有足够天数，都不会显得匆忙，中间的衔接由同一支团队负责。",
    },
    "boat-safari": {
      name: "乘船观兽",
      shortDescription: "在鲁菲吉河上，从水面追踪动物。",
      description: "在尼雷尔，河流就是道路。傍晚的鲁菲吉河会带来河马、鳄鱼、下来饮水的大象，以及一份三位数的鸟类名单——在船上，与它们平视。",
    },
    "birdwatching": {
      name: "观鸟",
      shortDescription: "一千多个物种，以及听得懂鸟鸣的向导。",
      description: "坦桑尼亚的鸟类名录是非洲最长的之一。曼雅拉湖、东非大裂谷的湖泊，以及绿季的南部国家公园是最好的地点，十一月至四月还会迎来候鸟。",
    },
    "conservation": {
      name: "自然保护日",
      shortDescription: "与真正在做这件事的人待上一天。",
      description: "与护林员、研究人员和社区保护项目相处的时间——真正理解守护这些生态系统意味着什么，而不是从车里看着它发生。",
    },
  },

  collections: {
    "explorer": {
      tagline: "适合被荒野、探险与发现吸引的旅行者。",
      description: "坦桑尼亚活跃的一面。更长的野外时间、随动物迁徙的营地、除乘车外也用双脚丈量的行程，以及能抵达园区中少有车辆到达之处的路线。",
      travellerProfile: "喜欢活动的旅行者、摄影爱好者、再次前往的旅客",
      traits: ["移动营地","乘车观兽","徒步与登山","偏远路线"],
    },
    "escape": {
      tagline: "适合想要开阔、舒适与轻松放松的旅行者。",
      description: "更慢、更柔和，一切都被安排妥当。园区更少、每处停留更久，旅舍按位置和从中所见来挑选，最后收尾在印度洋。",
      travellerProfile: "情侣、蜜月旅客、第一次参加野生动物之旅的人",
      traits: ["旅舍与精品营地","情侣与蜜月","身心休憩","桑给巴尔"],
    },
    "enrich": {
      tagline: "适合想更深入认识坦桑尼亚的旅行者。",
      description: "游猎车之外的坦桑尼亚。与社群和保育团队共度的日子、在产地品尝的食物与咖啡，以及直接与接待方洽谈安排的私人接待。",
      travellerProfile: "好奇的旅行者、带大孩子的家庭、重复到访的旅客",
      traits: ["文化","饮食","社区","自然保护"],
    },
  },

  journal: {
    "when-to-see-the-great-migration": {
      title: "动物大迁徙究竟在哪里，逐月解答",
      excerpt: "并不存在所谓的「迁徙季」——只有在您出行那个月，兽群应当在的位置。每个月一个明确答案，以及它对住宿安排的影响。",
      category: "行前规划",
    },
    "choosing-a-kilimanjaro-route": {
      title: "如何选择乞力马扎罗路线",
      excerpt: "莱莫绍、马查梅、荣盖或马兰古。真正重要的是适应高度的节奏，以及您能给这座山多少天，而不是难度评级。",
      category: "乞力马扎罗",
    },
    "green-season-tanzania": {
      title: "为绿季说几句话",
      excerpt: "十一月到五月常被一句「雨季」打发。实际上您会遇到：空旷的园区、极好的天空、刚出生的幼崽，以及一年中最好的观鸟季节。",
      category: "行前规划",
    },
  },

  faq: {
    "best-time-to-visit": {
      question: "什么时候去坦桑尼亚最好？",
      answer: "没有唯一的最佳月份，只有最适合您想看之物的月份。6月至10月是旱季，观兽最为容易，7月起还有塞伦盖蒂北部的渡河。1月至3月是南部平原的产犊期，也是攀登乞力马扎罗天色最清朗的几个月。11月至5月是绿季：车辆更少、天色壮阔、鸟类极佳，动物分布也更分散。把您的日期告诉我们，我们会坦率地说明那段时间适合什么。",
    },
    "how-far-in-advance": {
      question: "需要提前多久预订？",
      answer: "值得入住的营地与酒店规模都不大，位置最好的最先订满——尤其是塞伦盖蒂北部渡河期，以及圣诞与新年期间的行程。若您的日期已定，请尽早开始沟通；若时间灵活，我们的调整空间会更大。",
    },
    "what-does-private-mean": {
      question: "「私人」游猎究竟意味着什么？",
      answer: "专属车辆、专属向导，以及只属于您这一行人的行程。早晨几点出发、在一头动物旁停留多久、何时停下用餐，都由您决定。您不会与陌生人同车，也无需迁就固定的团队发车时间。",
    },
    "single-travellers": {
      question: "接受单人旅客和小型团体吗？",
      answer: "接受。我们设计的每一段旅程都是私人行程，无论是一位旅客还是十口之家。多数营地与酒店会收取单人房差，我们会在您做出任何承诺之前把金额告诉您。",
    },
    "children": {
      question: "可以带孩子同行吗？",
      answer: "可以，家庭行程也是我们安排得最多的一类。部分营地设有最低年龄限制，某些活动——尤其是徒步游猎——也有年龄门槛。我们会在提出方案之前就对照您的家庭情况核实，而不是事后再说。",
    },
    "visa-and-entry": {
      question: "我们需要签证吗？",
      answer: "多数访客入境坦桑尼亚需要签证，许多国籍的旅客可通过坦桑尼亚移民局提前在线申请。具体要求取决于您所持护照，且会不时调整，因此请在临近出行时查阅贵国对应的官方移民网站。预订时我们会为您提供链接。",
    },
    "vaccinations": {
      question: "疫苗和疟疾方面要注意什么？",
      answer: "坦桑尼亚属疟疾流行区；若您从黄热病风险国家入境，需持黄热病接种证书。您具体需要什么，取决于健康状况、行程路线与出发地——请在出发前尽早咨询旅行医学门诊或您的医生。我们无法提供医疗建议。",
    },
    "languages": {
      question: "你们以哪些语言工作？",
      answer: "我们以英语和斯瓦希里语进行规划与接待，Talisa 还能讲俄语和普通话。其他语言我们会明确告知能安排到什么程度，而不会承诺一位我们无法提供的向导。",
    },
    "what-to-pack": {
      question: "应该带些什么？",
      answer: "中性色系衣物、能应对清晨寒冷与正午炎热的多层穿搭、一顶像样的帽子、一副双筒望远镜，以及比您预想更多的存储卡。园区之间的内陆航班行李限额严格，通常要求使用软质行李袋。我们会依据您的具体路线提供一份行李清单。",
    },
    "how-to-start": {
      question: "与你们一起规划旅程是怎样的流程？",
      answer: "您告诉我们大致的时间、大致的天数，以及您在意的事。我们会带着一条建议路线回来，并坦白说明费用与其中的取舍。您可以反复调整，次数不限。在您满意之前，任何内容都不会确认。",
    },
  },

  team: {
    "talisa-tufts": {
      role: "创始人",
      bio: "Talisa 在国际旅游与酒店业工作多年后创立了 Maisha Quest。她会四种语言——所以来自莫斯科、上海和马德里的旅客都能用自己的语言被照顾到，关于行程的第一次交流也几乎不需要翻译。",
      specialty: "行程设计与多语言客户沟通",
      favouritePlace: null,
    },
    "frank-lyatuu": {
      role: "联合创始人 — 运营",
      bio: "Frank 来自阿鲁沙，Maisha Quest 走的路线，都是他亲自开过因而熟悉的。他负责运营、接待以及组织一次行程的所有实际环节：车辆、时间安排，还有每一道园区大门后面的人。",
      specialty: "行程运营与在地经验",
      favouritePlace: null,
    },
    "tina-ngabo": {
      role: "联合创始人 — 客户体验",
      bio: "Tina 把国际酒店业的经验带到旅客感受最深的那一部分：被照顾的方式。您在邮件里随口提过一次的细节，是她负责让它在坦桑尼亚等着您。",
      specialty: "客户体验与服务标准",
      favouritePlace: null,
    },
  },

  impact: {
    "education": {
      title: "教育支持",
      description: "这些行程沿途社群附近的学校：课堂上短缺的实际物资，以及让孩子无法走进课堂的那些开销。",
      location: null,
    },
    "conservation": {
      title: "野生动物保护",
      description: "在这些行程所依赖的生态系统中工作的保育团队——以及与他们共度一天的机会，而不只是从文字里读到。",
      location: null,
    },
    "community": {
      title: "社区合作",
      description: "直接与接待者洽谈安排的社群走访，时间由他们决定，而不是迁就旅游巴士的时刻。",
      location: null,
    },
    "local-employment": {
      title: "本地就业",
      description: "向导、司机、厨师与办公室人员均在坦桑尼亚聘用。在乞力马扎罗，挑夫如何计酬、负重多少，是我们挑选登山团队时的一部分考量。",
      location: "坦桑尼亚阿鲁沙",
    },
  },
};
