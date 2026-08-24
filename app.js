/* KYE ROOM — logic: preloader, i18n, grid of items, FLIP card transition, gallery */
(function () {
  "use strict";

  var K = window.KYE, M = window.KYE_MEDIA;
  var lang = (localStorage.getItem("kye-lang") === "en") ? "en" : "ru";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  function item(id) { for (var i = 0; i < K.items.length; i++) if (K.items[i].id === id) return K.items[i]; }
  function modelOf(it) { return K.models[it.model]; }
  function title(m) { return (m.display && m.display[lang]) || m.name; }

  /* ---------------- PRELOAD ---------------- */
  var boot = K.items.map(function (it) { return M[it.id].tile; });
  boot.push("media/hero-poster.jpg");

  var loaded = 0, total = boot.length + 1;
  var lb = $("#lb"), lp = $("#lp"), loader = $("#loader");
  document.documentElement.classList.add("lock");

  function bump() {
    loaded++;
    var p = Math.min(100, Math.round(loaded / total * 100));
    lb.style.width = p + "%"; lp.textContent = p + "%";
    if (loaded >= total) finish();
  }
  var finished = false;
  function finish() {
    if (finished) return; finished = true;
    setTimeout(function () {
      loader.classList.add("done");
      document.documentElement.classList.remove("lock");
      onScroll();
    }, 300);
  }
  boot.forEach(function (src) { var im = new Image(); im.onload = bump; im.onerror = bump; im.src = src; });

  var hv = $("#hv"), vDone = false;
  function vOk() { if (!vDone) { vDone = true; bump(); } }
  hv.addEventListener("canplaythrough", vOk);
  hv.addEventListener("loadeddata", vOk);
  hv.addEventListener("error", vOk);
  setTimeout(vOk, 6000);
  setTimeout(finish, 14000);

  /* ---------------- i18n ---------------- */
  function t(k) { return K.ui[lang][k] || k; }

  function renderStory() {
    K.story.forEach(function (blk, i) {
      var host = $("#storyRow" + i); if (!host) return;
      var L = blk[lang];
      host.id = "storyRow" + i;
      host.innerHTML = "";

      // левая (или правая) колонка — две плашки под фото
      var media = el("div", "st-media rv");
      ["a", "b"].forEach(function (cls, n) {
        var src = (blk.photos && blk.photos[n]) || "";
        var slot = el("div", "ph-slot " + cls + (src ? "" : " empty"));
        if (src) {
          var im = el("img"); im.src = src; im.alt = L.eyebrow; im.loading = "lazy"; im.decoding = "async";
          slot.appendChild(im);
        } else {
          slot.appendChild(el("div", "hint", t("photo_hint")));
        }
        media.appendChild(slot);
      });
      host.appendChild(media);

      // текстовая колонка
      var txt = el("div", "st-text");
      txt.appendChild(el("h2", "rv", L.title));
      txt.appendChild(el("p", "lead rv", L.body));
      var a = el("a", "st-cta rv",
        "<span>" + L.cta + "</span>" +
        '<i><svg viewBox="0 0 24 24"><path d="M5 12h13M13 6l6 6-6 6"/></svg></i>');
      a.href = blk.cta || "#catalog";
      txt.appendChild(a);
      host.appendChild(txt);

      // якорь для пункта меню
      if (blk.id === "craft") host.id = "storyRow1";
    });
  }

  function renderContact() {
    var c = K.contact;
    // без подписей: телефон и ник говорят сами за себя,
    // а строки про шоурум и доставку названы прямо внутри текста
    $("#cInfo").innerHTML =
      '<div class="info-row lead-row"><a href="tel:' + c.tel + '">' + c.phone + "</a></div>" +
      '<div class="info-row lead-row"><a href="' + c.instagram_url + '" target="_blank" rel="noopener">' + c.instagram + "</a></div>" +
      '<div class="info-row"><p>' + t("c_show_v") + "</p></div>" +
      '<div class="info-row"><p>' + t("c_ship_v") + "</p></div>";
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(function (n) { n.textContent = t(n.getAttribute("data-t")); });
    $("#contactH").innerHTML = lang === "ru"
      ? "Соберём вашу<br><em>кровать</em>"
      : "Let us build<br><em>your bed</em>";
    $("#footR").textContent = lang === "ru" ? "Мебель ручной работы" : "Handmade furniture";
    $$(".lang button").forEach(function (b) { b.classList.toggle("on", b.dataset.lang === lang); });
    renderStory(); renderContact(); renderGrid();
    if (open_) renderPanel(open_);
    revealInit();
  }

  $$(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang; localStorage.setItem("kye-lang", lang); applyLang();
    });
  });

  /* ---------------- GRID ---------------- */
  var grid = $("#grid");

  /* Плитка должна повторять пропорцию сцены карточки: тогда клон летит
     чистым равномерным масштабом и кадрирование не меняется по дороге. */
  function syncCellAspect() {
    var r = stage.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      document.documentElement.style.setProperty("--cell-ar", r.width + " / " + r.height);
    }
  }
  /* держим декодированные кадры в кэше: клик не должен упираться в распаковку webp */
  var warmCache = {};
  function warmUp(id) {
    if (warmCache[id]) return;
    var im = new Image();
    warmCache[id] = im;
    im.decoding = "async";
    im.src = M[id].nature[0];
    if (im.decode) im.decode().catch(function () {});
  }
  function renderGrid() {
    grid.innerHTML = "";
    K.items.forEach(function (it) {
      var m = modelOf(it);
      var c = el("div", "cell"); c.dataset.id = it.id;
      var im = el("img");
      im.src = M[it.id].tile; im.alt = title(m) + " — " + it[lang].variant;
      im.loading = "lazy"; im.decoding = "async";
      c.appendChild(im);
      c.appendChild(el("div", "tag", it[lang].variant));
      c.appendChild(el("div", "lbl", title(m)));
      function warm() { warmUp(it.id); }
      c.addEventListener("mouseenter", warm);
      c.addEventListener("touchstart", warm, { passive: true });
      c.addEventListener("click", function () { openProduct(it.id, c); });
      grid.appendChild(c);
    });
  }

  /* ---------------- PRODUCT VIEW ---------------- */
  var product = $("#product"), stage = $("#stage"), panel = $("#panel"),
      flip = $("#flip"), flipImg = $("#flip img"), back = $("#back"),
      dotsBox = $("#dots"), hdr = $("#hdr"), modesBox = $("#modes");
  var open_ = null, mode = "nature", idx = 0, srcCell = null, shots = [];

  function list(id) { return M[id][mode] || []; }

  var shotA = null, shotB = null, front = null, back_ = null;

  function ensureShots() {
    if (shotA) return;
    shotA = el("img", "shot"); shotB = el("img", "shot");
    shotA.alt = ""; shotB.alt = "";
    shotA.decoding = "async"; shotB.decoding = "async";
    stage.insertBefore(shotB, stage.firstChild);
    stage.insertBefore(shotA, stage.firstChild);
    front = shotA; back_ = shotB;
  }

  function buildShots(id) {
    ensureShots();
    front.removeAttribute("src"); back_.removeAttribute("src");
    front.classList.remove("show"); back_.classList.remove("show");
    front.style.transition = "none"; back_.style.transition = "none";
    front.style.opacity = "0"; back_.style.opacity = "0";
  }

  /* Показ кадра. Прозрачность ставим inline с принудительным reflow —
     на классах переход не запускался, если элемент в этот момент ещё скрыт. */
  function paint(node, to, ms) {
    node.style.transition = "none";
    node.getBoundingClientRect();
    node.style.transition = ms ? ("opacity " + ms + "ms cubic-bezier(.22,1,.36,1)") : "none";
    node.style.opacity = to;
  }

  function setShot(src, onReady, ms) {
    ensureShots();
    var incoming = back_, outgoing = front;
    function reveal() {
      incoming.classList.add("show");
      outgoing.classList.remove("show");
      if (ms === 0) {
        paint(incoming, "1", 0);
        paint(outgoing, "0", 0);
      } else {
        var d = ms || 500;
        incoming.style.transition = "none";
        incoming.style.opacity = "0";
        incoming.getBoundingClientRect();
        paint(incoming, "1", d);
        paint(outgoing, "0", d);
      }
      var t = front; front = back_; back_ = t;
      if (onReady) onReady();
    }
    if (incoming.getAttribute("src") === src && incoming.complete) { reveal(); return; }
    incoming.onload = null; incoming.onerror = null;
    incoming.src = src;
    if (incoming.complete && incoming.naturalWidth) { reveal(); return; }
    incoming.onload = reveal;
    incoming.onerror = reveal;
  }

  function showShot(onReady, ms) {
    var L = list(open_) || [];
    if (L.length) setShot(L[Math.min(idx, L.length - 1)], onReady, ms);
    else if (onReady) onReady();
    syncNav();
  }

  function syncNav() {
    var L = list(open_) || [];
    dotsBox.innerHTML = "";
    if (L.length > 1) {
      for (var i = 0; i < L.length; i++) {
        (function (i) {
          var d = el("i"); if (i === idx) d.className = "on";
          d.addEventListener("click", function () { idx = i; showShot(); });
          dotsBox.appendChild(d);
        })(i);
      }
    }
    $$(".arrows").forEach(function (a) { a.style.visibility = L.length > 1 ? "visible" : "hidden"; });
    $$("button", modesBox).forEach(function (b) { b.classList.toggle("on", b.dataset.mode === mode); });
  }

  function step(n) {
    var L = list(open_).length; if (L < 2) return;
    idx = (idx + n + L) % L; showShot();
  }

  function renderPanel(id) {
    var it = item(id), m = modelOf(it), L = it[lang], ML = m[lang];
    panel.innerHTML = "";
    panel.scrollTop = 0;

    panel.appendChild(el("div", "pv-tag", L.variant + (L.note ? " · " + L.note : "")));
    panel.appendChild(el("h3", "pv-title", title(m)));
    panel.appendChild(el("p", "pv-lead", ML.lead));
    panel.appendChild(el("p", "pv-text", ML.text));
    panel.appendChild(el("p", "pv-scene", L.scene));

    // sibling fabrics of the same model
    var sibs = K.items.filter(function (s) { return s.model === it.model && s.id !== it.id; });
    if (sibs.length) {
      var box = el("div", "sibs");
      box.appendChild(el("div", "sibs-h", t("other")));
      var row = el("div", "sibs-row");
      sibs.forEach(function (s) {
        var b = el("button", "sib");
        var i2 = el("img"); i2.src = M[s.id].tile; i2.alt = s[lang].variant; i2.loading = "lazy";
        b.appendChild(i2);
        b.appendChild(el("span", null, s[lang].variant));
        b.addEventListener("click", function () { swapTo(s.id); });
        row.appendChild(b);
      });
      box.appendChild(row);
      panel.appendChild(box);
    }

    var prices = (lang === "en" && m.prices_en) ? m.prices_en : m.prices;
    var a1 = el("div", "acc");
    a1.appendChild(accHead(t("sizes")));
    var b1 = el("div", "acc-b"), b1i = el("div", "acc-b-in");
    prices.forEach(function (p) {
      b1i.appendChild(el("div", "prow", "<span>" + p[0] + "</span><b>" + p[1] + " ₸</b>"));
    });
    b1i.appendChild(el("p", "note", t("custom")));
    b1.appendChild(b1i); a1.appendChild(b1);
    panel.appendChild(a1);

    var a2 = el("div", "acc");
    a2.appendChild(accHead(t("details")));
    var b2 = el("div", "acc-b"), b2i = el("div", "acc-b-in");
    var det = [];
    if (m.lift === true) det.push(t("lift_yes"));
    if (m.lift === false) det.push(t("lift_no"));
    det.push(t("no_mattress"));
    det.forEach(function (d) { b2i.appendChild(el("p", "note", d)); });
    b2.appendChild(b2i); a2.appendChild(b2);
    panel.appendChild(a2);

    var cta = el("div", "pv-cta");
    var btn = el("button", "btn", t("request"));
    btn.addEventListener("click", function () {
      var label = title(m) + " · " + L.variant;
      closeProduct();
      setTimeout(function () {
        $("#fm").value = (lang === "ru" ? "Модель " : "Model ") + label;
        $("#contact").scrollIntoView({ behavior: "smooth" });
        setTimeout(function () { $("#fn").focus(); }, 700);
      }, 620);
    });
    cta.appendChild(btn);
    panel.appendChild(cta);
  }

  function accHead(label) {
    var h = el("button", "acc-h", "<span>" + label + '</span><span class="pl"></span>');
    h.addEventListener("click", function () {
      var acc = h.parentNode, body = $(".acc-b", acc);
      var isOpen = acc.classList.toggle("open");
      body.style.maxHeight = isOpen ? (body.scrollHeight + "px") : "0px";
    });
    return h;
  }

  /* swap between fabrics of one model without closing the card */
  function swapTo(id) {
    open_ = id; mode = "nature"; idx = 0;
    srcCell = $('.cell[data-id="' + id + '"]') || srcCell;
    $$(".cell").forEach(function (c) {
      c.classList.toggle("hidden", c.dataset.id === id);
    });
    stage.classList.add("swapping");
    product.scrollTop = 0; panel.scrollTop = 0;
    flipTimers.push(setTimeout(function () {
      buildShots(id); showShot(null, 420); renderPanel(id);
      stage.classList.remove("swapping");
      panel.classList.remove("restage"); void panel.offsetWidth; panel.classList.add("restage");
    }, 260));
    history.replaceState({ p: id }, "", "#" + id);
  }

  /* ---- FLIP на трансформах: никакого пересчёта лейаута ---- */
  var flipTimers = [];
  function clearTimers() { flipTimers.forEach(clearTimeout); flipTimers = []; }

  /* клон всегда сверстан по rect сцены — значит в конце он пиксель-в-пиксель
     совпадает с настоящим кадром, и его гашение не видно */
  function placeFlip(rect) {
    flip.style.transition = "none";
    flip.style.left = rect.left + "px";
    flip.style.top = rect.top + "px";
    flip.style.width = rect.width + "px";
    flip.style.height = rect.height + "px";
    flip.style.transform = "none";
  }
  /* равномерный масштаб: картинка не искажается, кадрирование не плывёт */
  function delta(from, to) {
    return {
      s: Math.max(from.width / to.width, from.height / to.height),
      dx: (from.left + from.width / 2) - (to.left + to.width / 2),
      dy: (from.top + from.height / 2) - (to.top + to.height / 2)
    };
  }
  function applyDelta(d) {
    flip.style.transform = "translate3d(" + d.dx + "px," + d.dy + "px,0) scale(" + d.s + ")";
  }
  /* радиус плитки берём вычисленным с самой плитки: в переменной лежит
     clamp(), из которого число не вытащить — раньше выходил ноль и углы
     на первый кадр становились острыми */
  function tileRadius() {
    var c = grid.querySelector(".cell");
    return c ? (parseFloat(getComputedStyle(c).borderTopLeftRadius) || 0) : 0;
  }
  /* с поправкой на масштаб: на уменьшенном клоне экранный радиус
     должен совпадать с радиусом соседних плиток */
  function radiusForScale(s) {
    return (tileRadius() / (s || 1)) + "px";
  }
  /* Клон летит в воздухе, поэтому скругление у него всегда круговое.
     К квадратным левым углам сцены он не идёт: они бы схлопнулись в ноль
     ещё в полёте и мигнули острыми. Под клоном уже лежит сцена со своей
     формой, так что на приземлении разницы не видно. */
  function stageRadius() {
    var cs = getComputedStyle(stage);
    return Math.max(
      parseFloat(cs.borderTopLeftRadius) || 0,
      parseFloat(cs.borderTopRightRadius) || 0,
      parseFloat(cs.borderBottomRightRadius) || 0,
      parseFloat(cs.borderBottomLeftRadius) || 0
    ) + "px";
  }
  function animFlip(ms) {
    flip.style.transition = "transform " + ms + "ms cubic-bezier(.62,.03,.2,1)" +
                            ",border-radius " + ms + "ms cubic-bezier(.62,.03,.2,1)";
  }
  function fadeFlipOut(ms) {
    flip.style.transition = flip.style.transition + ",opacity " + ms + "ms cubic-bezier(.22,1,.36,1)";
    flip.style.opacity = "0";
  }
  /* Каждый полёт — свежий <img>. Переиспользованный элемент продолжает
     рисовать прошлую картинку, пока грузится новая: на телефоне это
     видно как блик предыдущего кадра. */
  function armFlip(src, go) {
    var im = new Image();
    im.decoding = "async";
    im.alt = "";
    flip.innerHTML = "";
    flip.appendChild(im);
    flipImg = im;

    var fired = false;
    function ready() { if (fired) return; fired = true; go(); }
    im.src = src;
    if (im.complete && im.naturalWidth) { ready(); return; }
    if (im.decode) im.decode().then(ready).catch(ready);
    else { im.onload = ready; im.onerror = ready; }
    flipTimers.push(setTimeout(ready, 160));   // страховка от зависания
  }

  function resetFlip() {
    flip.style.transition = "none";
    flip.style.borderRadius = tileRadius() + "px";
    flip.style.opacity = "0";
    flip.style.transform = "none";
    flip.style.width = "0px"; flip.style.height = "0px";
  }

  var busy = false;

  function openProduct(id, cell) {
    if (open_ || busy) return;
    clearTimers();
    open_ = id; mode = "nature"; idx = 0; srcCell = cell;

    $$(".cell").forEach(function (c) { c.classList.remove("hidden"); });
    var img = $("img", cell);
    var from = img.getBoundingClientRect();

    buildShots(id); renderPanel(id); syncNav();

    product.classList.remove("closing");
    product.classList.remove("ready");
    product.classList.add("on");
    // на мобильном карточка — скроллируемый контейнер: без сброса прокрутки
    // сцена меряется в смещённых координатах и клон летит мимо
    product.scrollTop = 0; panel.scrollTop = 0;
    var to = stage.getBoundingClientRect();

    cell.classList.add("hidden");
    document.documentElement.classList.add("lock");
    hdr.classList.add("solid");
    history.pushState({ p: id }, "", "#" + id);

    /* Во время полёта видна ровно одна картинка — клон. Кадр в сцене
       включается мгновенно ПОД ним в момент посадки: тот же прямоугольник,
       то же кадрирование, поэтому подмены не видно. */
    var flightDone = false, shotReady = false, handed = false;
    function handOver() {
      if (handed || !flightDone || !shotReady) return;
      handed = true;
      showShot(null, 0);
      // кнопки появляются только теперь: до этого на экране был лишь летящий кадр
      product.classList.add("ready");
      back.classList.add("on");
      fadeFlipOut(360);
      flipTimers.push(setTimeout(resetFlip, 460));
    }

    // большой кадр грузим сразу, но не показываем
    var pre = new Image();
    pre.decoding = "async";
    pre.onload = function () { shotReady = true; handOver(); };
    pre.onerror = function () { shotReady = true; handOver(); };
    pre.src = (M[id].nature[0] || M[id].tile);
    if (pre.complete && pre.naturalWidth) shotReady = true;

    flip.style.opacity = "0";
    armFlip(img.currentSrc || img.src, function () {
      var d = delta(from, to);
      placeFlip(to);
      applyDelta(d);
      flip.style.borderRadius = radiusForScale(d.s);
      flip.style.opacity = "1";
      flip.getBoundingClientRect();
      animFlip(760);
      flip.style.transform = "none";
      flip.style.borderRadius = stageRadius();
      // отсчёт от реального старта полёта, а не от клика
      flipTimers.push(setTimeout(function () { flightDone = true; handOver(); }, 620));
      flipTimers.push(setTimeout(function () { shotReady = true; flightDone = true; handOver(); }, 3000));
    });
  }

  function closeProduct() {
    if (!open_ || busy) return;
    busy = true; clearTimers();
    var id = open_, cell = srcCell;
    open_ = null;
    back.classList.remove("on");
    product.classList.remove("ready");
    product.scrollTop = 0; panel.scrollTop = 0;

    var from = stage.getBoundingClientRect();
    var shownSrc = (front && (front.currentSrc || front.getAttribute("src"))) || M[id].tile;

    /* Зеркало открытия. Карточку уводим только после того, как клон
       реально готов — иначе на телефоне будет пустой кадр или блик. */
    armFlip(shownSrc, function () {
      placeFlip(from);
      flip.style.borderRadius = stageRadius();
      flip.style.opacity = "1";
      flip.getBoundingClientRect();

      // кадр сцены прячем в том же кадре, что показываем клон
      if (front) paint(front, "0", 0);
      if (back_) paint(back_, "0", 0);

      product.classList.remove("on");
      product.classList.add("closing");
      document.documentElement.classList.remove("lock");

      // rect плитки меряем после снятия блокировки, иначе промах
      var to = cell ? $("img", cell).getBoundingClientRect() : null;

      if (to && to.width) {
        var dc = delta(to, from);
        flip.style.transition = "transform 700ms cubic-bezier(.8,0,.38,.97)" +
                                ",border-radius 700ms cubic-bezier(.8,0,.38,.97)";
        applyDelta(dc);
        flip.style.borderRadius = radiusForScale(dc.s);
        flipTimers.push(setTimeout(function () {
          if (cell) cell.classList.remove("hidden");
          fadeFlipOut(220);
          flipTimers.push(setTimeout(resetFlip, 300));
        }, 640));
      } else {
        $$(".cell").forEach(function (c) { c.classList.remove("hidden"); });
        resetFlip();
      }

      flipTimers.push(setTimeout(function () {
        product.classList.remove("closing");
        busy = false;
      }, 430));
    });

    if (location.hash) history.pushState({}, "", location.pathname);
  }

  back.addEventListener("click", closeProduct);
  $("#prev").addEventListener("click", function () { step(-1); });
  $("#next").addEventListener("click", function () { step(1); });
  $$("button", modesBox).forEach(function (b) {
    b.addEventListener("click", function () {
      if (mode === b.dataset.mode) return;
      mode = b.dataset.mode; idx = 0; showShot();
    });
  });
  stage.addEventListener("click", function (e) {
    if (e.target.closest(".pv-nav")) return;
    step(1);
  });
  document.addEventListener("keydown", function (e) {
    if (!open_) return;
    if (e.key === "Escape") closeProduct();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  window.addEventListener("popstate", function () { if (open_) closeProduct(); });

  /* ---------------- SCROLL ---------------- */
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle("solid", y > window.innerHeight * .82);
    hdr.classList.toggle("hide", y > lastY + 6 && y > window.innerHeight * 1.4 && !open_);
    $("#hs").classList.toggle("gone", y > 60);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .1, rootMargin: "0px 0px -6% 0px" });
  function revealInit() {
    $$(".rv").forEach(function (n, i) {
      if (n.classList.contains("in")) return;
      n.style.transitionDelay = (i % 3) * 90 + "ms";
      io.observe(n);
    });
  }

  /* ---------------- FORM ---------------- */
  $("#f").addEventListener("submit", function (e) {
    e.preventDefault();
    $("#ok").style.display = "block";
    setTimeout(function () { e.target.reset(); }, 100);
  });

  /* ---------------- GO ---------------- */
  syncCellAspect();
  applyLang();
  onScroll();
  window.addEventListener("resize", function () { syncCellAspect(); if (open_) syncNav(); });
})();
