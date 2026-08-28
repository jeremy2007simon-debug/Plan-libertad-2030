import type { Dictionary } from "./en";

/**
 * Diccionario de interfaz — chino simplificado.
 *
 * Traducción completa, pendiente de revisión por hablante nativo antes del
 * lanzamiento. Terminología según `src/i18n/glossary.ts`.
 *
 * Notas de criterio:
 * - "Safari" no se transcribe: se traduce como 野生动物之旅 / 野生动物观赏,
 *   porque el préstamo no se entiende en este mercado.
 * - "Lodge" se traduce (生态旅舍); dejarlo en inglés no comunica nada.
 * - El chino no tiene plural: las funciones de conteo devuelven la misma forma
 *   para cualquier número, con el clasificador correcto (天 días, 条 rutas,
 *   位 personas).
 * - Topónimos en su forma establecida: 塞伦盖蒂, 恩戈罗恩戈罗, 塔兰吉雷,
 *   桑给巴尔, 乞力马扎罗, 阿鲁沙.
 */
export const zhCN: Dictionary = {
  a11y: {
    skipToContent: "跳至主要内容",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    mainNav: "主导航",
    footerNav: "页脚导航",
    languageMenu: "切换语言",
    languageMenuLabel: "语言",
    currentLanguage: "当前语言",
    previous: "上一个",
    next: "下一个",
    required: "（必填）",
    externalLink: "将在新标签页中打开",
    whatsapp: "通过 WhatsApp 联系 Maisha Quest",
    callUs: "致电 Maisha Quest",
    emailUs: "发邮件给 Maisha Quest",
  },

  nav: {
    homeLabel: "Maisha Quest — 首页",
    mainNavLabel: "主导航",
    menu: "菜单",
    close: "关闭",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    siteMenu: "网站菜单",
    whatsappLabel: "通过 WhatsApp 联系 Maisha Quest",
    language: {
      buttonLabel: "切换语言",
      menuLabel: "语言",
      current: "当前",
    },
    items: {
      safaris: "野生动物之旅",
      allSafaris: "全部行程",
      explorer: "Explorer 系列",
      escape: "Escape 系列",
      enrich: "Enrich 系列",
      destinations: "目的地",
      experiences: "体验",
      about: "关于我们",
      ourStory: "我们的故事",
      team: "团队",
      impact: "公益行动",
      journal: "旅行手记",
      contact: "联系我们",
      faq: "常见问题",
      aboutUs: "关于我们",
      terms: "条款与条件",
      privacy: "隐私政策",
      cookies: "Cookie 政策",
      credits: "图片来源",
      sitemap: "网站地图",
    },
    descriptions: {
      safaris: "私人定制行程，按您偏好的旅行方式分类。",
      explorer: "荒野风景、探险与发现。",
      escape: "开阔、舒适，轻松放松。",
      enrich: "文化、饮食与当地社区。",
    },
    planCta: "定制我的行程",
    planShort: "定制行程",
    speakToExpert: "咨询当地专家",
    chat: "咨询",
    whatsappMessage:
      "您好 Maisha Quest，我想请你们帮忙规划一次坦桑尼亚野生动物之旅。",
  },

  footer: {
    navLabel: "页脚导航",
    blurb:
      "从阿鲁沙出发，为您设计并全程陪伴的坦桑尼亚私人行程。由坦桑尼亚引路，为您而设计。",
    groups: {
      travel: "旅行",
      company: "Maisha Quest",
      legal: "法律信息",
    },
    whatsapp: "通过 WhatsApp 联系我们",
    rights: "Maisha 意为「生命」——一生一次的旅程。",
  },

  collectionNames: {
    explorer: "Explorer",
    escape: "Escape",
    enrich: "Enrich",
  },

  safaris: {
    title: "我们设计的每一条行程",
    lede:
      "这里没有固定出发团。每一条都是我们验证过的行程结构，再依您的日期、节奏和同行的人重新搭建。",
    collection: "系列",
    aboutCollection: "了解这个系列",
    journeyCount: (n: number) => `${n} 条行程`,
    noneRightTitle: "都不太合适？",
    noneRightBody:
      "很好——通常就是从这里开始的。告诉我们您心里的想法，我们从零为您搭建。",
  },

  collections: {
    pageTitle: (name: string) => `${name} 系列`,
    typicalLength: "常见天数",
    journeysInCollection: (n: number) => `本系列共 ${n} 条行程`,
    notQuiteYou: "不太是您的风格？",
  },

  destinations: {
    title: "九个地方，一个国度",
    lede:
      "坦桑尼亚不是单一的风景。这些是我们穿行的地方、那里的动物，以及它们最好的季节。",
    whenToCome: "什么时候来",
    include: (place: string) => `把${place}加入行程`,
    journeysThrough: (place: string) => `途经${place}的行程`,
  },

  experiences: {
    singular: "体验",
    lede:
      "野生动物之旅不只是乘车观兽。这些是坦桑尼亚一天可以有的样子——想组合多少都可以。",
    whereYouDoThis: "在哪里体验",
    addToJourney: "加入我的行程",
    journeysIncluding: "包含此项的行程",
  },

  planner: {
    stepOf: "第 {n} 步，共 {total} 步",
    progress: "填写进度",
    draftRestored:
      "我们接着上次继续。之前的回答只保存在这台设备上。",
    back: "上一步",
    continue: "继续",
    send: "发送我的需求",
    sending: "发送中…",
    savedLocally: "填写过程中保存在本设备",

    steps: {
      trip: {
        label: "行程",
        title: "您想象中的旅行是什么样的？",
        help: "选最接近的一个。这里没有任何约束，只是告诉我们从哪里开始。",
      },
      destinations: {
        label: "地点",
        title: "您想去哪里？",
        help: "想选几个都可以，也可以交给我们安排。",
      },
      dates: {
        label: "日期",
        title: "什么时候去，去多久？",
        help: "大概即可。如果日期灵活请告诉我们，这通常对您有利。",
      },
      travellers: {
        label: "同行人",
        title: "谁同行，您希望住什么样的地方？",
        help: "",
      },
      budget: {
        label: "预算",
        title: "您的预算大约是多少？",
        help: "按人计算，不含国际机票。一个真实的区间让我们能提出可行的方案，而不是听起来很美的方案。",
      },
      contact: {
        label: "联系方式",
        title: "方案发送到哪里？",
        help: "",
      },
      review: { label: "确认", title: "这样对吗？", help: "" },
    },

    legends: {
      tripType: "行程类型",
      duration: "去多久？",
      travellers: "同行人",
      accommodation: "您希望住什么样的地方？",
      budget: "每人预算",
    },

    tripTypes: {
      wildlife: { label: "经典野生动物之旅", note: "乘车观兽与主要国家公园" },
      honeymoon: { label: "蜜月旅行", note: "私密、舒适与海岸" },
      family: { label: "家庭出行", note: "以孩子的节奏安排" },
      adventure: { label: "探险", note: "徒步、露营、偏远路线" },
      kilimanjaro: { label: "乞力马扎罗", note: "登山行程" },
      culture: { label: "文化与社区", note: "人、饮食与土地" },
      "safari-and-zanzibar": {
        label: "野生动物之旅与桑给巴尔",
        note: "先草原，后海洋",
      },
      "not-sure": { label: "还没想好", note: "让我们一起理清楚" },
    },

    durations: {
      "under-7": { label: "不到一周" },
      "7-9": { label: "7 – 9 天" },
      "10-14": { label: "10 – 14 天" },
      "15-plus": { label: "两周以上" },
      unsure: { label: "尚未确定" },
    },

    accommodationStyles: {
      camp: { label: "帐篷营地", note: "帆布之下，离动物很近" },
      lodge: { label: "生态旅舍", note: "舒适，有一张真正的床" },
      boutique: { label: "精品与设计", note: "小而有个性的住处" },
      mixed: { label: "混合搭配", note: "沿途尝试不同类型" },
      guidance: { label: "请为我推荐", note: "我们会给出合适的建议" },
    },

    budgets: {
      "under-3000": { label: "3,000 美元以下" },
      "3000-5000": { label: "3,000 – 5,000 美元" },
      "5000-8000": { label: "5,000 – 8,000 美元" },
      "8000-plus": { label: "8,000 美元以上" },
      open: { label: "不限——请为我推荐" },
    },

    fields: {
      month: "大约什么时候？",
      adults: "成人",
      children: "儿童",
      childrenHint: "18 岁以下",
      firstName: "名",
      lastName: "姓",
      email: "电子邮箱",
      phone: "电话或 WhatsApp",
      country: "国家或地区",
      replyIn: "请用以下语言回复",
      notes: "还有什么需要我们知道的吗？",
      notesPlaceholder:
        "纪念日、饮食需求、行动方面的考虑、摄影、希望看到的动物……",
    },

    errors: {
      tripType: "请选择您心里的行程类型，或选择「还没想好」。",
      travelMonth: "请给我们一个大概的月份，或勾选「我的日期灵活」。",
      durationDays: "您大概想旅行多少天？",
      adultsMin: "至少需要一位成人同行。",
      adultsMax: "二十人以上的团体请直接发邮件给我们，我们会用另一种方式安排。",
      accommodationStyle: "请选择一种住宿类型，或让我们为您推荐。",
      budgetPerPerson: "请选择一个区间，或选择「不限——请为我推荐」。",
      firstName: "我们需要一个称呼才能回复您。",
      emailMissing: "我们需要一个邮箱地址才能把方案发给您。",
      emailInvalid: "这个邮箱地址看起来不太对，请检查一下。",
      consent: "请确认我们可以使用这些信息回复您的咨询。",
    },

    review: {
      journey: "行程",
      destinations: "目的地",
      when: "时间",
      length: "天数",
      travellers: "同行人",
      stays: "住宿",
      budget: "预算",
      contact: "联系方式",
      notes: "备注",
      edit: "修改",
      flexible: "灵活",
      notGiven: "未填写",
      openToSuggestions: "接受推荐",
      adultCount: { other: "成人 {n} 位" },
      childCount: { other: "，儿童 {n} 位" },
    },

    summary: {
      heading: "行程咨询 — Maisha Quest",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      country: "国家或地区",
      replyIn: "回复语言",
      journeyType: "行程类型",
      budgetPerPerson: "每人预算",
    },

    status: {
      sentTitle: "我们已收到您的咨询。",
      sentBody:
        "谢谢您，{name}。阿鲁沙团队的同事会认真读完，并给您回复——不是模板，而是一条路线。",
      reference: "您的编号是",
      unconfiguredTitle: "差一步——这个表单还没有接通。",
      unconfiguredBody:
        "我们不会在没送出去的情况下告诉您已经送出。提交接口还没有连接到邮箱或 CRM，所以我们没有收到任何内容。您的回答就在下面，已经写好，一键即可发出。",
      sendByEmail: "通过邮件发送",
      sendOnWhatsApp: "通过 WhatsApp 发送",
      yourAnswers: "您的回答",
      sendFailed: "现在无法发送。",
      offline: "无法连接到我们的服务器。请检查网络后重试。",
      orEmailUs: "您也可以发邮件到",
      inTheMeantime: "在此期间",
    },
  },

  contact: {
    title: "与当地专家聊聊",
    lede:
      "我们在阿鲁沙，不是客服中心。无论您用哪种方式联系，都会由创始人之一亲自看到。",
    phone: "电话",
    email: "电子邮箱",
    hours: "工作时间",
    whereWeAre: "我们的位置",
    messageUs: "给我们留言",
    languagesBody:
      "我们以英语和斯瓦希里语规划与接待，同时也讲俄语和中文普通话。",
    planningTitle: "正在计划一次旅行？",
    planningBody:
      "填写只需几分钟，却能让我们拿到全部所需，用一条真实的路线回复您，而不是一本宣传册。",
  },

  plan: {
    lede:
      "没有约束，也没有自动报价。每一份咨询都由阿鲁沙的同事亲自阅读，并以一条路线回复。",
    customizeTitle: (name: string) => `定制：${name}`,
    customizeLede:
      "我们把这条行程作为起点带了过来。任何部分都可以改——路线、节奏、天数、住宿类型。",
    steps: [
      {
        title: "您告诉我们大致的想法",
        body: "七个简短步骤：时间、天数、同行的人，以及您希望从这趟旅行中得到什么。",
      },
      {
        title: "我们用一条路线回复您",
        body: "一份行程建议，附上关于花费与实际情况的诚实说明——由人撰写，不是自动生成。",
      },
      {
        title: "我们不断调整，直到合适",
        body: "需要几轮就几轮。在您满意之前，不确认也不付款。",
      },
    ],
  },

  legal: {
    eyebrow: "法律信息",
    notice: {
      before:
        "本页面正在与 Maisha Quest 的法律顾问一同定稿。在此之前，适用于您预订的是预订确认函中书面列出的条款。如需当前版本，请联系",
      after: "，我们会发送给您。",
    },
    pendingSection: "本节的完整措辞尚待法律审核。",
    terms: {
      title: "条款与条件",
      intro: "您向 Maisha Quest 预订行程时适用的条款。",
      sections: [
        {
          heading: "您预订的对象",
          body: [
            "Maisha Quest 是一家总部位于坦桑尼亚阿鲁沙的旅行运营商，在全国范围内安排私人野生动物之旅、登山行程与海岸住宿。",
            "公司注册信息与旅行运营牌照资料将在此公布。",
          ],
          pending: true,
        },
        {
          heading: "报价与确认",
          body: [
            "报价是建议，不是预订。价格、营地与可订情况会在任何预留之前以书面确认。",
          ],
          pending: true,
        },
        {
          heading: "付款",
          body: ["定金、尾款与付款方式的条款尚待确定。"],
          pending: true,
        },
        {
          heading: "变更与取消",
          body: [
            "取消条款取决于为您的行程预留的营地与国内航班，并将在预订确认函中完整列明。",
          ],
          pending: true,
        },
        {
          heading: "保险",
          body: [
            "所有旅客均须购买完善的旅行与医疗保险。保障范围应包含医疗撤离；攀登乞力马扎罗时，须涵盖至海拔 6,000 米的徒步。",
          ],
        },
        {
          heading: "护照、签证与健康",
          body: [
            "旅客须自行确保持有有效护照与正确签证，并符合入境健康要求。我们会指引您查阅官方来源，但无法就您的个人情况提供建议。",
          ],
        },
        {
          heading: "旅途中的安全",
          body: [
            "野生动物具有野性。客人须始终遵守向导的指示，营地内亦然，且不保证一定能看到某种动物。",
          ],
        },
        {
          heading: "责任与适用法律",
          body: ["适用法律与责任条款尚待法律审核。"],
          pending: true,
        },
      ],
    },
    privacy: {
      title: "隐私政策",
      intro: "您联系我们时我们收集什么、为什么收集，以及如何处理。",
      sections: [
        {
          heading: "我们收集什么",
          body: [
            "当您使用行程定制表单或写信给我们时，我们收集您提供的内容：姓名、邮箱、可选的电话与国家或地区，以及您考虑中的行程细节。",
            "本网站不会索取护照或支付信息。",
          ],
        },
        {
          heading: "为什么保留",
          body: [
            "为了回复您的咨询，以及在您预订后安排行程。仅此而已。我们不会出售或出租您的资料给任何人。",
          ],
        },
        {
          heading: "去向",
          body: [
            "咨询会送到我们在阿鲁沙的团队。为安排行程，我们只把必要信息提供给您行程中的营地、旅舍、航空公司与向导。",
          ],
        },
        {
          heading: "保留多久",
          body: ["保留期限尚待法律审核。"],
          pending: true,
        },
        {
          heading: "您的权利",
          body: [
            "您可以询问我们保存了您的哪些信息，要求更正或删除。写信到本页底部的邮箱地址，我们会处理。",
          ],
        },
        {
          heading: "保存在您浏览器中的草稿",
          body: [
            "行程定制表单会把您的回答保存在您自己的浏览器中，避免关闭标签页后丢失。该草稿留在您的设备上，直到您提交表单才会送到我们这里，并在提交时清除。",
          ],
        },
      ],
    },
    cookies: {
      title: "Cookie 政策",
      intro: "本网站会在您的浏览器中保存什么。",
      sections: [
        {
          heading: "本站不设置追踪 Cookie",
          body: [
            "按目前的构建方式，本网站不设置广告或分析类 Cookie，也不加载第三方追踪代码。字体由本站自行提供，而非外部服务商；地图由网站自己绘制，而非向地图服务请求。",
          ],
        },
        {
          heading: "本地保存的内容",
          body: [
            "行程定制表单会把您尚未完成的回答保存在浏览器的本地存储中，以免丢失。在您提交表单之前，这些内容不会离开您的设备，提交后即被移除。清除浏览器数据会立即删除它们。",
          ],
        },
        {
          heading: "若日后加入分析工具",
          body: [
            "若 Maisha Quest 日后加入分析或广告工具，本页面将更新，并在设置任何此类 Cookie 之前加入同意提示。",
          ],
          pending: true,
        },
      ],
    },
  },

  credits: {
    eyebrow: "图片来源",
    title: "摄影来源",
    lede:
      "本站图片为坦桑尼亚的临时纪实摄影，依 Creative Commons 许可使用，Maisha Quest 自有摄影正在准备中。",
    sourceAndLicence: "来源与许可",
    body:
      "下方每一张图片都是因为其来源记录同时确认了国家与拍摄对象才被选用——因此本站不会出现任何不属于坦桑尼亚的物种或风景。这些照片都不是 Maisha Quest 拍摄的，也没有一张出现我们的客人、向导、车辆或营地。",
    allOwn: "本站所有摄影现已全部为 Maisha Quest 自有。",
  },

  meta: {
    keywords: [
      "坦桑尼亚野生动物之旅",
      "坦桑尼亚私人定制之旅",
      "塞伦盖蒂野生动物观赏",
      "恩戈罗恩戈罗火山口",
      "乞力马扎罗登山",
      "野生动物之旅与桑给巴尔",
      "阿鲁沙定制行程",
    ],
    home: {
      title: "Maisha Quest · 坦桑尼亚私人定制之旅",
      description:
        "由当地专家带领、围绕您的故事设计的坦桑尼亚私人行程。塞伦盖蒂、恩戈罗恩戈罗、塔兰吉雷、乞力马扎罗与桑给巴尔，从阿鲁沙统筹安排。",
      ogTitle: "坦桑尼亚私人定制之旅 · Maisha Quest",
      ogDescription:
        "由当地专家带领，为您而设计。来自阿鲁沙团队的坦桑尼亚全境定制行程。",
    },
    safaris: {
      title: "全部行程",
      description:
        "我们在坦桑尼亚设计的所有私人行程，按您偏好的旅行方式分类。这里没有固定出发团。",
    },
    destinations: {
      title: "目的地",
      description:
        "坦桑尼亚的九个地方：北部环线、南部国家公园、乞力马扎罗与印度洋海岸。",
    },
    experiences: {
      title: "体验",
      description:
        "乘车观兽、徒步观兽、热气球、文化日、乞力马扎罗与桑给巴尔海岸——坦桑尼亚的一天可以这样度过。",
    },
    about: {
      title: "关于我们",
      description:
        "Maisha Quest 是一家总部位于阿鲁沙的坦桑尼亚旅行公司。Maisha 意为「生命」：我们围绕您是谁、您想怎样旅行来设计私人行程。",
    },
    team: {
      title: "团队",
      description:
        "Talisa Tufts、Frank Lyatuu 与 Tina Ngabo——Maisha Quest 的创始人，常驻坦桑尼亚阿鲁沙。",
    },
    impact: {
      title: "公益行动",
      description:
        "Maisha Quest Cares——当地向导按当地薪资聘用，社区探访直接付费，并支持行程沿线的教育与自然保护工作。",
    },
    journal: {
      title: "旅行手记",
      description:
        "来自阿鲁沙团队的行程建议：动物大迁徙逐月的位置、如何选择乞力马扎罗路线，以及绿季的坦桑尼亚。",
    },
    contact: {
      title: "联系我们",
      description:
        "联系位于坦桑尼亚阿鲁沙的 Maisha Quest。电话、邮件与 WhatsApp，由陪伴您行程的团队亲自回复。",
    },
    plan: {
      title: "定制我的行程",
      description:
        "七个简短步骤，每一步都由阿鲁沙的同事亲自阅读。没有自动报价，也没有约束。",
    },
    faq: {
      title: "常见问题",
      description:
        "何时来坦桑尼亚、提前多久预订、私人定制之旅意味着什么、签证、疫苗与行李——由我们在阿鲁沙的团队解答。",
    },
  },

  notFound: {
    title: "偏离了地图",
    body: "这个页面不存在——或者在我们重建网站时换了位置。试试下面这些。",
    contact: "联系我们",
  },

  about: {
    heroTitle: "由坦桑尼亚引路，为您而设计。",
    heroLede:
      "Maisha Quest 创立于梅鲁山脚下的阿鲁沙。我们是一支小而在地的团队，为不满足于固定出发团的旅行者设计私人行程。",
    lede:
      "Maisha Quest 大致可以译为「一生的旅程」——这正是全部的想法。野生动物之旅不是货架上的商品，而是您人生中一段在非凡之地度过的时光，理应这样去搭建。",
    compass:
      "创始人把它形容为「以指南针生活」：选择一个方向，而不是遵循一条既定路线。我们也这样规划——从您想抵达的地方出发，而不是从产品目录出发。",
    ground:
      "一切都在阿鲁沙就地安排。我们的向导、车辆与供应商都是坦桑尼亚本地的，回复您第一封邮件的人，就是在机场接您的人。",
    meetTeam: "认识团队",
    foundersSlot: "Maisha Quest 创始人在阿鲁沙",
    howWeWork: "我们如何工作",
    people: "我们的人",
    readStories: "读他们的故事",
    talkTitle: "聊聊吧",
    talkBody: (timezone: string, hours: string) =>
      `我们在阿鲁沙，${timezone}，${hours}。最快的开始方式，是告诉我们您大概想什么时候出发，以及什么对您最重要。`,
    contactDetails: "联系方式",
  },

  journal: {
    title: "来自阿鲁沙的手记",
    lede:
      "关于在坦桑尼亚旅行的实用文字——被问得最多的问题，认真作答，而不是一段话带过。",
    pendingTitle: "我们在阿鲁沙的团队正在撰写这篇文章，很快会在此发布。",
    pendingBody:
      "如果您现在就需要答案，直接问我们：这是我们每周都会为旅行者解答的问题，与其让您等一篇文章，不如把它讲清楚。",
    more: "更多手记",
  },

  faq: {
    title: "被问得最多的问题",
    lede:
      "直接的回答。凡是取决于您的护照、健康状况或出行日期的部分，我们会明说，并指向官方来源，而不是凭猜测。",
    stillTitle: "还是没有答案？",
    stillBefore: "请发邮件到",
    stillAfter: (phone: string, timezone: string) =>
      `或致电 ${phone}。我们在阿鲁沙，${timezone}。`,
  },

  impact: {
    noNumbers:
      "我们不会在这一页放上自己无法负责的数字。当每个项目产生可以佐证的成果——支持的学校、创造的就业、资助的项目——我们会连同依据一并公布。",
    askCta: "了解我们的项目",
  },

  regions: {
    northern: "北部环线",
    southern: "南部环线",
    coast: "海岸与岛屿",
    gateway: "门户城市",
  },
  accommodation: {
    "Mobile camp": "移动营地",
    "Tented camp": "帐篷营地",
    Lodge: "生态旅舍",
    "Boutique lodge": "精品旅舍",
    "Beach resort": "海滨度假村",
    "City hotel": "城市酒店",
  },
  meals: {
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
  },
  impactAreas: {
    education: "教育",
    conservation: "自然保护",
    community: "社区",
    employment: "本地就业",
  },
  faqTopics: {
    planning: "行前规划",
    travel: "交通与出行",
    safari: "野生动物之旅",
    health: "健康与安全",
    payment: "付款",
  },
  categories: {
    wildlife: "野生动物",
    adventure: "探险",
    luxury: "奢华",
    honeymoon: "蜜月",
    family: "家庭",
    culture: "文化",
    kilimanjaro: "乞力马扎罗",
    "safari-and-zanzibar": "野生动物之旅与桑给巴尔",
  },
  languageNames: {
    English: "英语",
    Swahili: "斯瓦希里语",
    Russian: "俄语",
    "Mandarin Chinese": "中文普通话",
    Spanish: "西班牙语",
    German: "德语",
    French: "法语",
  },

  video: {
    pause: "暂停",
    pending: "影片即将上线",
    filmToFollow: (poster: string) => `${poster} — 影片即将上线`,
  },

  team: {
    languages: "语言",
    specialty: "专长",
    favouritePlace: "在坦桑尼亚最喜欢的地方",
    portraitOf: (name: string) => `${name}的照片`,
    pageTitle: "为您筹划行程的人",
    crewTitle: "向导、司机与团队",
    crewBody:
      "每一次行程都由我们直接合作的坦桑尼亚向导和司机执行。在乞力马扎罗，挑夫的报酬与负重上限遵循 KPAP 的准则。团队其他成员的介绍将在此发布。",
    startPlanning: "开始规划",
  },

  safari: {
    itineraryPending:
      "我们在阿鲁沙的团队正在敲定这条行程的逐日安排。向我们索取，我们会把当前版本发给您。",
    stay: "住宿",
    stayPending: "随方案一同确认",
    meals: "餐食",
    time: "时长",
    collectionOf: (name: string) => `${name} 系列`,
    style: "类型",
    theJourney: "关于这条行程",
    dayByDay: "逐日安排",
    whereYouStay: "住在哪里",
    whereYouStayBody: (style: string) =>
      `这条行程以「${style}」为住宿基调。具体的营地与旅舍会随行程方案一并提出，依其在路线上的位置以及您日期内的可订情况来挑选，而不是在这里列出我们未必能保留的住处。`,
    accommodationIn: (place: string) => `${place}的住宿`,
    gallery: "图片",
    theRoute: "路线",
    included: "费用包含",
    notIncluded: "费用不含",
    practical: "实用信息",
    commonQuestions: "常见问题",
    whatTravellersSaid: "旅行者的评价",
    noReviews:
      "这条行程还没有公开的评价，我们也不会自己写。问我们，我们会把您和走过这条路线的旅行者联系上。",
    similarJourneys: "相似行程",
    askQuestion: "提出问题",
  },

  home: {
    hero: {
      headline: "坦桑尼亚私人定制之旅",
      subline: "由当地专家带领，围绕您的故事设计。",
      designCta: "定制我的行程",
      exploreCta: "浏览行程",
      pillars: ["当地专家", "私人定制", "负责任的旅行"],
      scroll: "向下滚动",
    },
    maisha: {
      eyebrow: "我们的名字",
      meansLife: "意为「生命」。",
      lede:
        "每一次旅行，都是发现、连接与更充分地活着的机会。我们围绕您是谁、您想怎样旅行，打造坦桑尼亚私人行程。",
      body:
        "Maisha Quest 创立于阿鲁沙，位于梅鲁山脚下、北部环线的起点。我们是一支小团队：回复您第一封邮件的人，就是在机场接您的人。",
      cta: "了解 Maisha Quest",
      teamSlot: "Maisha Quest 团队在阿鲁沙",
    },
    experiences: {
      eyebrow: "从这里开始",
      title: "您想怎样体验坦桑尼亚？",
      lede:
        "我们的每一条行程都从这个问题开始，而不是从一个套餐开始。选最像您的那一个——之后还可以组合。",
      carouselLabel: "体验坦桑尼亚的方式",
    },
    collections: {
      eyebrow: "Maisha 系列",
      title: "三种游历坦桑尼亚的方式",
      lede:
        "这不是三个价位，而是三种性格。大多数人读完第一行就知道哪一个属于自己。",
      explore: (name: string) => `了解 ${name}`,
    },
    featured: {
      eyebrow: "精选行程",
      title: "值得铭记的旅程",
      lede:
        "这些是起点，不是固定出发团。每一条都会依您的日期、节奏和同行的人重新搭建。",
    },
    map: {
      eyebrow: "地图",
      title: "在坦桑尼亚找到属于您的地方",
      lede:
        "九个地方、四条环线与一段海岸。选一个，看看何时前往、那里有什么动物，以及哪些行程会经过。",
      bestTime: "最佳季节",
      wildlife: "野生动物",
      experiences: "体验",
      journeysHere: "途经此地的行程",
      dayCount: (n: number) => `${n} 天`,
      moreOn: (place: string) => `了解更多：${place}`,
    },
    film: {
      eyebrow: "影片",
      title: "一个国度，无数种感受活着的方式。",
      watch: "观看影片",
      posterLabel: "三十六秒的坦桑尼亚",
      cta: "浏览体验",
      threads: [
        { label: "野生动物", note: "草原，以及在其上迁徙的一切。" },
        { label: "文化", note: "与住在这里的人共度的时间。" },
        { label: "探险", note: "徒步、水上、山间。" },
        { label: "海洋", note: "旅程慢下来的地方。" },
        { label: "连接", note: "让这一切有意义的原因。" },
      ],
    },
    why: {
      eyebrow: "为什么选择 Maisha Quest",
      title: "把行程交给可靠的人",
      lede:
        "我们是一家坦桑尼亚公司。这不是一句营销词：它决定了谁接电话、谁开车，以及钱流向哪里。",
      pillars: [
        {
          title: "扎根坦桑尼亚的团队",
          body: "我们在阿鲁沙生活和工作。路线来自我们亲自开过，而不是来自宣传册。",
        },
        {
          title: "量身定制的行程",
          body: "每一条行程都围绕您的节奏、兴趣与日期从零搭建。",
        },
        {
          title: "多语言服务",
          body: "我们以英语、斯瓦希里语、俄语和中文普通话规划与接待。",
        },
        {
          title: "精挑细选的住宿",
          body: "我们亲自住过的营地与旅舍，按位置、服务与性格挑选。",
        },
        {
          title: "负责任的在地旅行",
          body: "本地向导、本地供应商，让社区参与其中，而不是成为被拍摄的对象。",
        },
        {
          title: "从抵达到离开的支持",
          body: "从您的第一条讯息到回程航班，同一支团队全程可以联系到。",
        },
      ],
    },
    team: {
      eyebrow: "团队",
      title: "认识为您筹划行程的人",
      lede:
        "三位创始人在阿鲁沙。他们分别负责行程设计、地面运营，以及您抵达之后所感受到的一切。",
      cta: "查看完整团队",
    },
    impact: {
      eyebrow: "Maisha Quest Cares",
      watch: "观看",
      posterLabel: "Maisha Quest Cares，在现场",
      cta: "我们的公益如何运作",
      intro: {
        title: "回馈土地的旅行",
        lede: "您的旅行，应当让坦桑尼亚比您抵达时更好。",
        body:
          "Maisha Quest Cares 让这句话不只是口号。它依托于您所参加的同一批行程：当地向导按当地薪资聘用、供应商来自阿鲁沙而非海外，并将每次行程收入的一部分投入我们指得出来的工作。",
      },
    },
    testimonials: {
      eyebrow: "旅行者",
      title: "被带回家的故事",
      lede:
        "旅行者回来之后说的话，连同出处一并公布，方便您自行核对。",
      emptyTitle: "与其给您看我们自己写的东西，不如什么都不放。",
      emptyBody:
        "旅行者陆续寄来评价后，我们会在此发布，每一条都附上原始发布链接。在此之前，问我们一声，我们会把您和与我们同行过的人联系上。",
      emptyBodyWithSources:
        "旅行者陆续寄来评价后，我们会在此发布，每一条都附上原始发布链接。在此之前，可以在下方平台上查找我们，或者问我们一声，我们会把您和与我们同行过的人联系上。",
      speakDirectly: "直接与我们联系",
      askReferences: "索取推荐人",
      verified: "已验证评价",
      rated: (n: number) => `评分 ${n} / 5`,
    },
    planner: {
      eyebrow: "规划您的行程",
      title: "一起来设计您的旅程",
      lede:
        "七个简短步骤。没有约束，也没有自动报价——阿鲁沙的同事会逐一阅读，并以一条路线回复。",
      ratherTalk: "更想直接聊聊？",
    },
    closing: {
      title: "您的坦桑尼亚故事从这里开始。",
      concept: "由坦桑尼亚引路，为您而设计。",
    },
  },

  common: {
    priceOnRequest: "价格需询问",
    sampleItinerary: "参考行程",
    from: "起价",
    days: "天",
    day: "第",
    nights: "晚",
    readMore: "阅读更多",
    viewJourney: "查看行程",
    customize: "定制",
    customizeThis: "定制这条行程",
    backToCatalogue: "返回全部行程",
    exploreAll: "查看全部行程",
    suits: "适合",
    bestTime: "最佳季节",
    duration: "天数",
    route: "路线",
    accommodation: "住宿",
    wildlife: "野生动物",
    experiencesHere: "此地体验",
    minutesRead: "分钟阅读",
    dayCount: (n: number) => `${n} 天`,
    dayLabel: (n: number) => `第 ${n} 天`,
    durationRange: ([min, max]: [number, number]) =>
      min === max ? `${min} 天` : `${min}–${max} 天`,
    safariMeta: (style: string) => `私人定制之旅 · 住宿：${style}`,
    fromPerPerson: (price: string) => `每人 ${price} 起`,
    draftNotice: "参考行程——最终路线与日期将与您确认。",
    readingTime: (n: number) => `${n} 分钟阅读`,
  },
};
