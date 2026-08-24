/* KYE ROOM — content. Правьте тексты и цены здесь, разметку трогать не нужно.
   models — общее описание и прайс модели.
   items  — карточки каталога: одна карточка = один кадр = один вариант ткани. */

window.KYE = {

  ui: {
    ru: {
      nav_about: "Бренд", nav_craft: "Производство", nav_catalog: "Каталог", nav_contact: "Контакты",
      scroll: "Листайте", loading: "Загрузка",
      catalog_title: "Каталог",
      catalog_note: "Двадцать пять позиций. Один силуэт живёт в нескольких тканях — каждая со своим характером.",
      view_nature: "На природе", view_room: "В интерьере",
      back: "К каталогу",
      sizes: "Размеры и стоимость", details: "Характеристики",
      request: "Оставить заявку",
      custom: "Возможен индивидуальный подбор ткани и размеров.",
      no_mattress: "Стоимость указана без матраса. При необходимости матрас можно приобрести отдельно.",
      lift_yes: "Подъёмный механизм предусмотрен.",
      lift_no: "Подъёмный механизм для этой модели не предусмотрен.",
      other: "Другие ткани этой модели",
      form_name: "Имя", form_phone: "Телефон", form_msg: "Модель, размер, ткань",
      form_send: "Отправить", form_ok: "Спасибо. Мы свяжемся с вами в течение дня.",
      c_phone: "Телефон", c_inst: "Instagram", c_show: "Шоурум", c_ship: "Доставка",
      c_show_v: "По записи · ежедневно 11:00 — 20:00",
      c_ship_v: "Казахстан и СНГ · сборка на месте"
    },
    en: {
      nav_about: "Brand", nav_craft: "Craft", nav_catalog: "Catalogue", nav_contact: "Contact",
      scroll: "Scroll", loading: "Loading",
      catalog_title: "Catalogue",
      catalog_note: "Twenty-five pieces. One silhouette lives in several cloths — each with its own character.",
      view_nature: "In the wild", view_room: "In a home",
      back: "Catalogue",
      sizes: "Sizes and price", details: "Specification",
      request: "Make an enquiry",
      custom: "Custom fabrics and dimensions available on request.",
      no_mattress: "Price excludes the mattress. A mattress can be ordered separately.",
      lift_yes: "Storage lift mechanism included.",
      lift_no: "No storage lift mechanism for this model.",
      other: "Other fabrics of this model",
      form_name: "Name", form_phone: "Phone", form_msg: "Model, size, fabric",
      form_send: "Send", form_ok: "Thank you. We will be in touch within a day.",
      c_phone: "Phone", c_inst: "Instagram", c_show: "Showroom", c_ship: "Delivery",
      c_show_v: "By appointment · daily 11:00 — 20:00",
      c_ship_v: "Kazakhstan and CIS · assembled on site"
    }
  },

  intro: {
    ru: [
      {
        eyebrow: "Бренд",
        title: "Не просто мебель —<br><em>произведение искусства</em>",
        body: "KYE ROOM не выпускает партии. Каждая кровать рождается в единственном экземпляре: под размер комнаты, под характер света, под привычку хозяина просыпаться на правом боку. Мы делаем предметы, которые остаются в доме дольше, чем ремонт вокруг них."
      },
      {
        eyebrow: "Производство",
        title: "Ткани из Европы,<br><em>каркас на ЧПУ</em>",
        body: "Англия, Франция, Италия, Бельгия и лучшие турецкие мануфактуры. Только натуральный состав — лён и хлопок, высокая прочность и благородная фактура. Каркас режется на ЧПУ-станке с точностью до десятой миллиметра, обивку от первого шва до последнего ведёт один мастер.",
        specs: [
          ["Ткани", "Лён и хлопок из Европы, устойчивость к истиранию от 40 000 циклов Мартиндейла"],
          ["Каркас", "Раскрой на ЧПУ, берёзовая фанера и массив хвои камерной сушки"],
          ["Наполнение", "Многослойный ППУ разной плотности и холлофайбер — форма держится годами"],
          ["Сборка", "Ручная работа одного мастера, гарантия 5 лет на конструкцию"]
        ]
      }
    ],
    en: [
      {
        eyebrow: "Brand",
        title: "Not furniture —<br><em>a work of art</em>",
        body: "KYE ROOM does not run batches. Every bed is made once: to the size of the room, to the character of its light, to the habit of sleeping on your right side. We build pieces that outlast the renovation around them."
      },
      {
        eyebrow: "Craft",
        title: "European cloth,<br><em>CNC-cut frame</em>",
        body: "England, France, Italy, Belgium and the best Turkish mills. Natural fibres only — linen and cotton, high tensile strength and a noble hand. The frame is cut on a CNC machine to a tenth of a millimetre, and one craftsman carries the upholstery from the first seam to the last.",
        specs: [
          ["Fabrics", "European linen and cotton, abrasion resistance from 40,000 Martindale cycles"],
          ["Frame", "CNC-cut birch plywood and kiln-dried softwood"],
          ["Filling", "Layered foam of varying density with hollow fibre — the shape holds for years"],
          ["Assembly", "Handmade by a single craftsman, five-year structural warranty"]
        ]
      }
    ]
  },

  contact: { phone: "+7 702 199 09 95", tel: "+77021990995", instagram: "KYE.ROOM", instagram_url: "https://instagram.com/kye.room" },

  /* ---------- МОДЕЛИ: общее описание и прайс ---------- */
  models: {
    mona: {
      name: "MONA", lift: false,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Арка на вертикальных каналах",
            text: "Вертикальные каналы изголовья держат арку без единой складки, тонкий вишнёвый кант обводит её как рама картину, а округлый цоколь поднимает всю конструкцию над полом. Двойная царга — редкость: она берёт на себя вес и убирает любой скрип на годы вперёд." },
      en: { lead: "An arch on vertical channels",
            text: "Vertical channels hold the arch without a single crease, a thin cherry trim frames it like a painting, and a rounded plinth lifts the whole thing off the floor. The double side rail is rare: it takes the load and removes every creak for years ahead." }
    },
    queen: {
      name: "QUEEN", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Классика с полным рядом гвоздей",
            text: "Высокая арка, фигурный гребень и полный ряд мебельных гвоздей по всему периметру — та самая деталь, из-за которой кровать выглядит старше собственного возраста. Лён гасит свет, гвозди его собирают: рисунок изголовья меняется от утра к вечеру." },
      en: { lead: "A classic, studded all the way round",
            text: "A tall arch, a shaped crest and a full row of nailheads along the entire border — the detail that makes this bed look older than it is. Linen absorbs the light while the studs collect it, so the headboard reads differently at dawn and at dusk." }
    },
    tadj: {
      name: "TADJ", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","400 000"],["160 × 200","500 000"],["180 × 200","550 000"],["200 × 200","600 000"]],
      ru: { lead: "Сад с птицами во всю ширину",
            text: "Изголовье-облако шириной во всю кровать, а на нём — ветви, цветы и птицы, набитые на кремовый лён. Это не орнамент, а картина: рисунок ставится по центру и не режется по краям, поэтому каждая кровать раскраивается индивидуально." },
      en: { lead: "A garden with birds, full width",
            text: "A cloud-shaped headboard as wide as the bed, carrying branches, blossom and perched birds printed on cream linen. This is a picture, not a pattern: the print is centred and never cut at the edges, so every bed is laid out individually." }
    },
    blanca: {
      name: "BLANCA", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Фигурная арка с контрастным кантом",
            text: "Форма, которая одинаково хорошо держит и строгую полоску, и крупный цветок, и сепийный лист. Меняете ткань — меняется вся комната, при том что каркас остаётся тем же. Оборка по низу опциональна." },
      en: { lead: "A shaped arch with contrast piping",
            text: "A form that carries a quiet stripe, a large floral and a sepia leaf print equally well. Change the cloth and the whole room changes, while the frame stays exactly the same. The gathered skirt is optional." }
    },
    luma: {
      name: "LUMA", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Цвет, который держит комнату",
            text: "Тёмная бирюза с рассыпанным по ней цветком — редкий случай, когда насыщенная кровать не спорит со стенами, а собирает их вокруг себя. Фигурный гребень смягчает вес цвета, а светлое основание не даёт конструкции просесть визуально." },
      en: { lead: "A colour that holds the room",
            text: "Dark teal scattered with flowers — the rare case where a saturated bed does not argue with the walls but gathers them around itself. The shaped crest softens the weight of the colour, and the pale base keeps the whole piece from sitting heavy." }
    },
    moon: {
      name: "MOON", lift: true,
      prices: [["160 × 200","500 000"],["180 × 200","550 000"],["200 × 200","600 000"]],
      ru: { lead: "Валик на валике, ничего лишнего",
            text: "Самая тихая модель в каталоге: низкая широкая платформа, а вместо изголовья — два валика из вельвета, лежащие друг на друге. Никакой резьбы, никакого канта. Работает только фактура: рубчик ловит свет и рисует горизонтальную полосу через всю стену." },
      en: { lead: "Bolster on bolster, nothing else",
            text: "The quietest piece in the catalogue: a low wide platform and, instead of a headboard, two corduroy bolsters resting on one another. No carving, no piping. Only texture works here — the rib catches light and draws a horizontal line across the wall." }
    },
    ostin: {
      name: "OSTIN", lift: true,
      prices: [["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Сложная линия, простая посадка",
            text: "Самый рисованный контур в коллекции: гребень идёт волной, срывается в плечи и возвращается тонким кантом. При этом кровать остаётся низкой и удобной для подъёма — вся сложность ушла в силуэт, а не в габариты." },
      en: { lead: "A complex line, an easy sit",
            text: "The most drawn outline in the collection: the crest runs in a wave, breaks into shoulders and returns as a fine piping. The bed itself stays low and easy to get out of — all the complexity went into the silhouette, none into the bulk." }
    },
    west: {
      name: "WEST", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","380 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Полоска, которая тянет потолок вверх",
            text: "Высокая арка визуально поднимает потолок сантиметров на двадцать — приём, который работает даже в невысокой спальне. Основание намеренно занижено, чтобы весь вес читался наверху." },
      en: { lead: "A stripe that lifts the ceiling",
            text: "A tall arch visually raises the ceiling by twenty centimetres — a trick that works even in a low bedroom. The base is deliberately kept shallow so that all the weight reads at the top." }
    },
    san: {
      name: "SAN", lift: true,
      prices: [["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Мягкая волна вместо арки",
            text: "Гребень идёт ровной волной от края до края, обведённый тончайшим тёмным кантом — одна линия, которая делает всю работу. Такое изголовье не требует ни картин над кроватью, ни бра по бокам: стена вокруг него должна остаться пустой." },
      en: { lead: "A soft wave instead of an arch",
            text: "The crest runs edge to edge in an even wave, outlined by the finest dark piping — one line doing all the work. A headboard like this needs no pictures above it and no sconces beside it: the wall around it should stay empty." }
    },
    rumi: {
      name: "RUMI", lift: true,
      prices: [["140 × 200","400 000"],["160 × 200","450 000"],["180 × 200","500 000"],["200 × 200","550 000"]],
      ru: { lead: "Светлый верх, плотный низ",
            text: "Приём простой и безотказный: светлое изголовье в полоску и глубокое цветное основание. Кровать перестаёт быть мебелью и становится цветовым пятном, вокруг которого строится вся спальня." },
      en: { lead: "Pale above, dense below",
            text: "A simple, foolproof move: a pale striped headboard over a deep coloured base. The bed stops being furniture and becomes the block of colour the whole bedroom is built around." }
    },
    diva: {
      name: "DIVA", lift: true,
      prices: [["Высота на выбор","от 800 000"]],
      prices_en: [["Height to order","from 800 000"]],
      ru: { lead: "Две арки в чёрной раме",
            text: "Самая театральная вещь коллекции: две высокие арки в чёрной лакированной раме, затянутые гобеленом. Высота считается индивидуально, от неё же зависит цена. В спальне с низким потолком эта модель не работает — ей нужен воздух." },
      en: { lead: "Two arches in a black frame",
            text: "The most theatrical piece in the collection: two tall arches in a black lacquered frame, upholstered in tapestry. The height is calculated individually and the price follows it. This model does not work under a low ceiling; it needs air." }
    },
    love: {
      name: "LOVE", lift: true,
      prices: [["90 × 200","300 000"],["120 × 200","350 000"],["140 × 200","380 000"]],
      ru: { lead: "Пара, которая держит симметрию",
            text: "Односпальная модель, придуманная для того, чтобы стоять вдвоём: две одинаковые арки с гвоздями и тумба ровно по центру. Гостевая, детская, комната для родителей — везде, где нужна строгая ось. Берётся и поодиночке." },
      en: { lead: "A pair that holds the axis",
            text: "A single bed designed to stand in twos: two identical studded arches with a nightstand exactly on the centre line. Guest room, children's room, a room for parents — anywhere a strict axis is needed. Works alone as well." }
    },
    king: {
      name: "KING", lift: true,
      prices: [["90 × 200","380 000"],["120 × 200","450 000"],["140 × 200","500 000"]],
      ru: { lead: "Медовая полоска, обведённая зелёным",
            text: "Широкая волна гребня в медово-кремовой полоске, обведённая тёмно-зелёным кантом — сочетание, которое обычно встречается в старых английских домах, а не в мебельных салонах. Боковины подняты, поэтому кровать читается как дневная кушетка." },
      en: { lead: "A honey stripe outlined in green",
            text: "A wide wave of a crest in a honey-and-cream stripe, outlined in dark green — a combination usually found in old English houses rather than furniture showrooms. The sides are raised, so the piece reads as a daybed." }
    },
    pink: {
      name: "PINK", lift: true,
      prices: [["90 × 200","450 000"],["120 × 200","500 000"],["140 × 200","550 000"]],
      ru: { lead: "Первая взрослая вещь в детской",
            text: "Кушетка с фигурными боковинами и спинкой, в розово-белую полоску с белым кантом по каждому ребру. Сделана как взрослая мебель: тот же каркас, те же ткани, та же сборка — просто в другом масштабе. Бортики достаточно высокие, чтобы не ставить дополнительные." },
      en: { lead: "The first grown-up piece in a child's room",
            text: "A daybed with shaped sides and back in a pink-and-white stripe, piped in white along every edge. Built like adult furniture: same frame, same fabrics, same assembly — simply at another scale. The sides are high enough that no extra rail is needed." }
    },
    pouf: {
      name: "POUF", display: { ru: "ПУФЫ", en: "OTTOMANS" }, lift: null,
      prices: [["Пуфы и банкетки","80 000 — 150 000"]],
      prices_en: [["Ottomans and benches","80 000 — 150 000"]],
      ru: { lead: "Мелочь, которая держит характер",
            text: "Пуфы и банкетки собираются из остатков тех же европейских тканей, что идут на кровати, — поэтому один пуф почти никогда не повторяется. Бархат, букле, бахрома, деревянные и шаровые опоры. Стоимость зависит от размера, ткани и сложности." },
      en: { lead: "The small thing that sets the tone",
            text: "Ottomans and benches are made from the offcuts of the same European cloth that goes into the beds — which is why a stool is almost never repeated. Velvet, boucle, fringe, wooden and ball feet. Price depends on size, fabric and complexity." }
    },
    pillow: {
      name: "PILLOW", display: { ru: "ПОДУШКИ", en: "CUSHIONS" }, lift: null,
      prices: [["Декоративные подушки","10 000 — 30 000"]],
      prices_en: [["Decorative cushions","10 000 — 30 000"]],
      ru: { lead: "Последний слой",
            text: "Декоративные подушки и валики под конкретную кровать: подбираем рисунок, плотность и форму так, чтобы они не спорили с изголовьем, а продолжали его. Монограмма, кант, бахрома, круглые торцы — по вашему выбору." },
      en: { lead: "The final layer",
            text: "Decorative cushions and bolsters made for a specific bed: we choose the pattern, the density and the shape so that they continue the headboard rather than argue with it. Monogram, piping, fringe, round end caps — your call." }
    }
  },

  /* ---------- КАРТОЧКИ КАТАЛОГА: одна карточка = один кадр ---------- */
  items: [
    { id:"mona-ivory", model:"mona",
      ru:{ variant:"Слоновая кость", note:"Двойная царга, ореховый цоколь",
           scene:"Сухое плато в сентябре: закат делает орех почти красным, а канальную обивку — тёплой." },
      en:{ variant:"Ivory", note:"Double side rail, walnut plinth",
           scene:"A dry September plateau: the sunset turns the walnut almost red and warms the channelled cloth." } },

    { id:"mona-terra", model:"mona",
      ru:{ variant:"Терракота", note:"Бархатное основание, полосатое изголовье",
           scene:"Красный песчаник на закате — бархат основания и порода одного пигмента." },
      en:{ variant:"Terracotta", note:"Velvet base, striped headboard",
           scene:"Red sandstone at sunset — the velvet base and the rock share one pigment." } },

    { id:"queen", model:"queen",
      ru:{ variant:"Кремовый лён", note:"Полный ряд мебельных гвоздей",
           scene:"Берег горного озера в тумане на рассвете, где белое бельё светится само по себе." },
      en:{ variant:"Cream linen", note:"Full nailhead border",
           scene:"A misty mountain lakeshore at dawn, where white bedding glows on its own." } },

    { id:"tadj", model:"tadj",
      ru:{ variant:"Шинуазри", note:"Облачный гребень, ручная раскладка принта",
           scene:"Альпийское озеро в синий час — вода вытянула из принта весь синий." },
      en:{ variant:"Chinoiserie", note:"Cloud crest, hand-laid print",
           scene:"An alpine lake at blue hour — the water pulled every blue out of the print." } },

    { id:"blanca-terra", model:"blanca",
      ru:{ variant:"Терракота", note:"Полоска и бархатное основание",
           scene:"Глиняные бэдлендс на закате: жёсткий боковой свет лепит слоистые гряды и цоколь." },
      en:{ variant:"Terracotta", note:"Stripe with a velvet base",
           scene:"Clay badlands at sunset: hard side light sculpts the layered ridges and the plinth." } },

    { id:"blanca-powder", model:"blanca",
      ru:{ variant:"Пудровый цветок", note:"Персиковый принт, кант в тон",
           scene:"Поле пионов на рассвете — фон буквально продолжает рисунок ткани." },
      en:{ variant:"Powder floral", note:"Peach print, matching piping",
           scene:"A peony field at sunrise — the background is literally a continuation of the cloth." } },

    { id:"blanca-sepia", model:"blanca",
      ru:{ variant:"Сепия", note:"Крупный лист, оливковое бельё",
           scene:"Буковый лес в ноябре: медная подстилка и та же сепия, что на обивке." },
      en:{ variant:"Sepia", note:"Large leaf print, olive bedding",
           scene:"A beech forest in November: copper leaf litter in the same sepia as the upholstery." } },

    { id:"luma-teal", model:"luma",
      ru:{ variant:"Бирюза", note:"Цветочный принт по тёмному полю",
           scene:"Папоротниковый каньон с водопадом — мокрый камень держит ту же глубину, что и ткань." },
      en:{ variant:"Teal", note:"Floral print on a dark ground",
           scene:"A fern gorge with a waterfall — wet stone holds the same depth as the cloth." } },

    { id:"luma-night", model:"luma",
      ru:{ variant:"Ночная бирюза", note:"Красные акценты в принте",
           scene:"Тёмное лесное озеро на рассвете вытягивает из принта красное." },
      en:{ variant:"Night teal", note:"Red accents in the print",
           scene:"A dark forest lake at dawn draws the red out of the print." } },

    { id:"moon", model:"moon",
      ru:{ variant:"Оливковый вельвет", note:"Низкая платформа, два валика",
           scene:"Мшистая поляна в старом лесу, где горизонталь платформы читается лучше всего." },
      en:{ variant:"Olive corduroy", note:"Low platform, two bolsters",
           scene:"A mossy clearing in an old forest, where the platform's horizontal reads best." } },

    { id:"ostin-milk", model:"ostin",
      ru:{ variant:"Молочный", note:"Фигурный гребень, тёмный кант",
           scene:"Белый известняк в полдень: монохром, где работает только силуэт изголовья." },
      en:{ variant:"Milk", note:"Shaped crest, dark piping",
           scene:"White limestone at noon: a monochrome where only the silhouette works." } },

    { id:"ostin-mustard", model:"ostin",
      ru:{ variant:"Горчица", note:"Графичный цветок по жёлтому",
           scene:"Цветущий рапс на закате — один пигмент от переднего плана до горизонта." },
      en:{ variant:"Mustard", note:"Graphic floral on yellow",
           scene:"Rapeseed in flower at sunset — one pigment from foreground to horizon." } },

    { id:"west", model:"west",
      ru:{ variant:"Розовая полоска", note:"Высокая арка, заниженное основание",
           scene:"Альпийский луг на восходе, над морем тумана в долине." },
      en:{ variant:"Blush stripe", note:"Tall arch, shallow base",
           scene:"An alpine meadow at sunrise, above a sea of fog in the valley." } },

    { id:"san-dune", model:"san",
      ru:{ variant:"Дюна", note:"Терракотовый плед и валик",
           scene:"Дюна на закате: рябь песка повторяет ту же волну, что и гребень." },
      en:{ variant:"Dune", note:"Terracotta throw and bolster",
           scene:"A dune at sunset: the sand ripples repeat the same wave as the crest." } },

    { id:"san-salt", model:"san",
      ru:{ variant:"Соль", note:"Чистый кремовый, белое бельё",
           scene:"Солончак с зеркалом воды — минимализм, где волна изголовья единственный акцент." },
      en:{ variant:"Salt", note:"Plain cream, white bedding",
           scene:"A mirrored salt flat — minimalism where the wave is the only accent." } },

    { id:"rumi-wine", model:"rumi",
      ru:{ variant:"Винный", note:"Бархатное основание, полосатая арка",
           scene:"Осенний виноградник на закате: ряды лоз работают перспективными линиями к изголовью." },
      en:{ variant:"Wine", note:"Velvet base, striped arch",
           scene:"An autumn vineyard at sunset: the rows work as leading lines to the headboard." } },

    { id:"rumi-indigo", model:"rumi",
      ru:{ variant:"Индиго", note:"Синее основание, тональный рисунок",
           scene:"Мокрый песок у океана на закате — самый сильный цветовой контраст в коллекции." },
      en:{ variant:"Indigo", note:"Blue base, tonal pattern",
           scene:"Wet sand at the ocean's edge at sunset — the strongest colour contrast in the collection." } },

    { id:"diva-indienne", model:"diva",
      ru:{ variant:"Индиенна", note:"Красный гобелен, чёрная лакированная рама",
           scene:"Красный каньон: стены подпирают высокое изголовье, луч света работает как софит." },
      en:{ variant:"Indienne", note:"Red tapestry, black lacquered frame",
           scene:"A red canyon: the walls support the tall headboard and a shaft of light acts as a spotlight." } },

    { id:"diva-green", model:"diva",
      ru:{ variant:"Зелёный гобелен", note:"Ботанический рисунок, банкетка в тон",
           scene:"Еловая чаща с лучами сзади — зелёный гобелен и есть лес." },
      en:{ variant:"Green tapestry", note:"Botanical print, matching bench",
           scene:"A fir thicket with rays behind — the green tapestry is the forest." } },

    { id:"love", model:"love",
      ru:{ variant:"Пудровая пара", note:"Две односпальных и тумба по центру",
           scene:"Берёзовая роща на рассвете, где стволы задают тот же вертикальный ритм." },
      en:{ variant:"Blush pair", note:"Two singles with a nightstand on the axis",
           scene:"A birch grove at dawn, where the trunks set the same vertical rhythm." } },

    { id:"king", model:"king",
      ru:{ variant:"Медовая полоска", note:"Зелёный кант, поднятые боковины",
           scene:"Спелая пшеница на контровом свете, где медовый и зелёный сходятся сами собой." },
      en:{ variant:"Honey stripe", note:"Green piping, raised sides",
           scene:"Ripe wheat against the light, where honey and green meet on their own." } },

    { id:"pink", model:"pink",
      ru:{ variant:"Розовая полоска", note:"Кушетка с фигурными боковинами",
           scene:"Цветущий вишнёвый сад, где розовый есть и на ткани, и в воздухе." },
      en:{ variant:"Pink stripe", note:"Daybed with shaped sides",
           scene:"A cherry orchard in bloom, where the pink is in the cloth and in the air alike." } },

    { id:"pouf-set", model:"pouf",
      ru:{ variant:"Коллекция", note:"Бархат, букле, бахрома",
           scene:"Травяной склон на закате: пуфы расставлены как валуны, тени тянутся вправо." },
      en:{ variant:"The set", note:"Velvet, boucle, fringe",
           scene:"A grassy slope at golden hour: the stools stand like boulders, shadows raking right." } },

    { id:"pouf-poppy", model:"pouf",
      ru:{ variant:"Маковый", note:"Красное букле, шаровые опоры",
           scene:"Маковое поле: один цвет в двух фактурах, длинный фокус отделяет пуф от фона." },
      en:{ variant:"Poppy", note:"Red boucle, ball feet",
           scene:"A poppy field: one colour in two textures, a long lens separating stool from ground." } },

    { id:"pillow", model:"pillow",
      ru:{ variant:"Терракота", note:"Валики с бахромой и кантом",
           scene:"Лиственничный лес поздней осенью — ржавая хвоя повторяет цвет тканей." },
      en:{ variant:"Terracotta", note:"Bolsters with fringe and piping",
           scene:"A larch forest in late autumn — rust needles echo the colour of the cloth." } }
  ]
};
