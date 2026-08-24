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

  function renderIntro() {
    K.intro[lang].forEach(function (s, i) {
      var host = $("#intro" + i); if (!host) return;
      host.innerHTML = "";
      var left = el("div", "rv");
      left.appendChild(el("div", "eyebrow", s.eyebrow));
      left.appendChild(el("h2", null, s.title));
      host.appendChild(left);
      host.appendChild(el("p", "lead rv", s.body));
      if (s.specs) {
        var sp = el("div", "specs rv");
        s.specs.forEach(function (r, n) {
          var row = el("div", "spec");
          row.appendChild(el("b", null, "0" + (n + 1)));
          row.appendChild(el("h4", null, r[0]));
          row.appendChild(el("p", null, r[1]));
          sp.appendChild(row);
        });
        host.appendChild(sp);
      }
    });
  }

  function renderContact() {
    var c = K.contact;
    var rows = [
      [t("c_phone"), '<a href="tel:' + c.tel + '">' + c.phone + "</a>"],
      [t("c_inst"), '<a href="' + c.instagram_url + '" target="_blank" rel="noopener">' + c.instagram + "</a>"],
      [t("c_show"), "<p>" + t("c_show_v") + "</p>"],
      [t("c_ship"), "<p>" + t("c_ship_v") + "</p>"]
    ];
    $("#cInfo").innerHTML = rows.map(function (r) {
      return '<div class="info-row"><small>' + r[0] + "</small>" + r[1] + "</div>";
    }).join("");
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(function (n) { n.textContent = t(n.getAttribute("data-t")); });
    $("#heroSub").textContent = lang === "ru"
      ? "Не просто мебель — произведение искусства"
      : "Not furniture — a work of art";
    $("#contactH").innerHTML = lang === "ru"
      ? "Соберём вашу<br><em>кровать</em>"
      : "Let us build<br><em>your bed</em>";
    $("#footR").textContent = lang === "ru" ? "Мебель ручной работы" : "Handmade furniture";
    $$(".lang button").forEach(function (b) { b.classList.toggle("on", b.dataset.lang === lang); });
    renderIntro(); renderContact(); renderGrid();
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
  }

  /* грузим кадр и показываем кроссфейдом; onReady — когда пиксели готовы */
  function setShot(src, onReady) {
    ensureShots();
    var incoming = back_, outgoing = front;
    function reveal() {
      incoming.classList.add("show");
      outgoing.classList.remove("show");
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

  function showShot(onReady) {
    var L = list(open_) || [];
    if (L.length) setShot(L[Math.min(idx, L.length - 1)], onReady);
    else if (onReady) onReady();

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
    flipTimers.push(setTimeout(function () {
      buildShots(id); showShot(); renderPanel(id);
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
  function animFlip(ms, fadeAt) {
    var e = "cubic-bezier(.62,.03,.2,1)";
    flip.style.transition = "transform " + ms + "ms " + e + ",opacity 240ms linear " + fadeAt + "ms";
  }
  function resetFlip() {
    flip.style.transition = "none";
    flip.style.opacity = "0";
    flip.style.transform = "none";
    flip.style.width = "0px"; flip.style.height = "0px";
  }

  var busy = false;

  function openProduct(id, cell) {
    if (open_ || busy) return;
    clearTimers();
    open_ = id; mode = "nature"; idx = 0; srcCell = cell;

    var img = $("img", cell);
    var from = img.getBoundingClientRect();

    stage.classList.add("arming");
    stage.classList.remove("landing");
    buildShots(id); renderPanel(id);

    product.classList.remove("closing");
    product.classList.add("on");
    var to = stage.getBoundingClientRect();

    flipImg.src = img.currentSrc || img.src;
    placeFlip(to);
    applyDelta(delta(from, to));
    flip.style.opacity = "1";
    flip.getBoundingClientRect();          // один reflow, дальше только композитинг

    animFlip(820, 760);                    // гаснет уже после посадки
    flip.style.transform = "none";
    flip.style.opacity = "0";

    // настоящий кадр проявляется, только когда он реально загружен и клон почти долетел
    var landed = false, ready = false, armTimeDone = false;
    function land() {
      if (landed || !ready || !armTimeDone) return;
      landed = true;
      stage.classList.add("landing");
      stage.classList.remove("arming");
    }
    showShot(function () { ready = true; land(); });
    flipTimers.push(setTimeout(function () { armTimeDone = true; land(); }, 300));
    flipTimers.push(setTimeout(function () { armTimeDone = true; ready = true; land(); }, 1600));
    flipTimers.push(setTimeout(function () {
      stage.classList.remove("landing");
      resetFlip();
    }, 1150));

    cell.classList.add("hidden");

    document.documentElement.classList.add("lock");
    back.classList.add("on");
    hdr.classList.add("solid");
    history.pushState({ p: id }, "", "#" + id);
  }

  function closeProduct() {
    if (!open_ || busy) return;
    busy = true; clearTimers();
    var id = open_, cell = srcCell;
    var from = stage.getBoundingClientRect();
    var shownSrc = (front && (front.currentSrc || front.getAttribute("src"))) || M[id].tile;

    // сцена гаснет сразу, дальше живёт только клон
    product.classList.remove("on");
    product.classList.add("closing");
    back.classList.remove("on");
    open_ = null;
    document.documentElement.classList.remove("lock");

    // rect плитки меряем ПОСЛЕ снятия блокировки — иначе промах
    var to = cell ? $("img", cell).getBoundingClientRect() : null;

    if (to && to.width) {
      flipImg.src = shownSrc;
      placeFlip(from);
      flip.style.opacity = "1";
      flip.getBoundingClientRect();
      animFlip(660, 470);
      applyDelta(delta(to, from));
      flip.style.opacity = "0";
    } else {
      resetFlip();
    }

    flipTimers.push(setTimeout(function () {
      $$(".cell").forEach(function (c) { c.classList.remove("hidden"); });
    }, 360));
    flipTimers.push(setTimeout(function () {
      product.classList.remove("closing");
      stage.classList.add("arming");
      resetFlip();
      busy = false;
    }, 700));
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
  applyLang();
  onScroll();
  window.addEventListener("resize", function () { if (open_) showShot(); });
})();
