/* ==========================================================
   Minecraft Hub — app logic
   (Normally yahan kuch badalne ki zaroorat nahi. Settings: js/config.js, listings: js/listings.js)
   ========================================================== */
(function () {
  "use strict";

  const CFG = window.SITE_CONFIG || {};
  const CATS = Array.isArray(CFG.categories) ? CFG.categories : [];
  const $ = (sel) => document.querySelector(sel);

  /* ---------------------------------------------------------
     tiny DOM helper (builds elements safely, no innerHTML for content)
     --------------------------------------------------------- */
  function h(tag, props) {
    const el = document.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === "class") el.className = v;
        else if (k === "dataset") Object.assign(el.dataset, v);
        else if (k === "style") for (const s in v) el.style.setProperty(s, v[s]);
        else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? "" : v);
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      const kids = [].concat(arguments[i]);
      for (const kid of kids) if (kid != null && kid !== false) el.append(kid);
    }
    return el;
  }

  /* ---------------------------------------------------------
     icons
     --------------------------------------------------------- */
  const BRAND = {
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
    telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
  };
  const STROKE = {
    search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    close:    '<path d="M6 6l12 12M18 6 6 18"/>',
    download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/>',
    volume:   '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    mute:     '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
    back:     '<path d="m15 18-6-6 6-6"/>',
    next:     '<path d="m9 18 6-6-6-6"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    share:    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/>',
    info:     '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6v.01"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    box:      '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    link:     '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    find:     '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8.5 11h5"/>'
  };

  function icon(name, size) {
    size = size || 20;
    const span = h("span", { class: "ico", "aria-hidden": "true" });
    if (BRAND[name]) {
      span.innerHTML = '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="currentColor"><path d="' + BRAND[name] + '"/></svg>';
    } else {
      span.innerHTML = '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (STROKE[name] || STROKE.link) + "</svg>";
    }
    return span;
  }
  function fillSlot(el, name, size) { el.replaceChildren(icon(name, size)); }

  /* ---------------------------------------------------------
     SOUND EFFECTS  (click / listing / download)
     --------------------------------------------------------- */
  const Sfx = (function () {
    const cfg = Object.assign({ enabled: true, volume: 0.55, click: "", listing: "", download: "" }, CFG.sounds || {});
    let ctx = null, master = null, muted = false;
    try { muted = localStorage.getItem("mh-sfx-muted") === "1"; } catch (e) {}

    function audio() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = Math.max(0, Math.min(1, cfg.volume));
        const comp = ctx.createDynamicsCompressor();
        master.connect(comp);
        comp.connect(ctx.destination);
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    // one soft synthesized note
    function tone(o) {
      const c = audio();
      if (!c) return;
      const t0 = c.currentTime + (o.delay || 0);
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = o.type || "sine";
      osc.frequency.setValueAtTime(o.f, t0);
      if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + o.dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(o.vol || 0.2, t0 + (o.attack || 0.008));
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
      osc.connect(g);
      g.connect(master);
      osc.start(t0);
      osc.stop(t0 + o.dur + 0.03);
    }

    const synth = {
      // general buttons: a short soft tick
      click: function () {
        tone({ f: 900, to: 520, type: "sine", dur: 0.07, vol: 0.16 });
      },
      // opening a listing: a gentle rising "whoosh-pop"
      listing: function () {
        tone({ f: 280, to: 640, type: "sine", dur: 0.17, vol: 0.2 });
        tone({ f: 640, to: 960, type: "triangle", dur: 0.14, vol: 0.09, delay: 0.05 });
      },
      // download: low thump + bright three-note chime
      download: function () {
        tone({ f: 150, to: 60, type: "sine", dur: 0.2, vol: 0.34 });
        tone({ f: 659, type: "triangle", dur: 0.2, vol: 0.17, delay: 0.02 });
        tone({ f: 880, type: "triangle", dur: 0.2, vol: 0.17, delay: 0.09 });
        tone({ f: 1319, type: "sine", dur: 0.34, vol: 0.2, delay: 0.16 });
      }
    };

    function playFile(src) {
      try {
        const a = new Audio(src);
        a.volume = Math.max(0, Math.min(1, cfg.volume));
        const p = a.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) {}
    }

    return {
      enabled: cfg.enabled !== false,
      isMuted: function () { return muted || cfg.enabled === false; },
      toggle: function () {
        muted = !muted;
        try { localStorage.setItem("mh-sfx-muted", muted ? "1" : "0"); } catch (e) {}
        return !muted;
      },
      play: function (name) {
        if (muted || cfg.enabled === false) return;
        if (cfg[name]) playFile(cfg[name]);
        else if (synth[name]) synth[name]();
      }
    };
  })();

  // one listener for the whole site: [data-sfx] decides which sound, everything clickable defaults to "click"
  document.addEventListener("click", function (e) {
    const t = e.target.closest("[data-sfx], a, button, [role='button']");
    if (!t) return;
    if (t.disabled || t.getAttribute("aria-disabled") === "true") return;
    const name = t.getAttribute("data-sfx") || "click";
    if (name === "none") return;
    Sfx.play(name);
  }, true);

  /* ---------------------------------------------------------
     data
     --------------------------------------------------------- */
  const RAW = Array.isArray(window.LISTINGS) ? window.LISTINGS : null;

  function slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  function catOf(id) {
    for (const c of CATS) if (c.id === id) return c;
    return { id: id, label: id || "Other", hue: 200 };
  }

  const seen = {};
  const LIST = (RAW || []).map(function (l, i) {
    const id = String(l.id || slug(l.title) || "item-" + i);
    if (seen[id]) console.warn("[listings.js] duplicate id:", id, "- every listing needs its own unique id");
    seen[id] = true;
    if (!CATS.some(function (c) { return c.id === l.category; })) console.warn('[listings.js] unknown category "' + l.category + '" in listing "' + id + '"');
    const images = Array.isArray(l.images) ? l.images.filter(Boolean) : (l.image ? [l.image] : []);
    const tags = Array.isArray(l.tags) ? l.tags.filter(Boolean) : [];
    const o = {
      id: id,
      title: String(l.title || "Untitled"),
      category: l.category,
      date: String(l.date || ""),
      tags: tags,
      images: images,
      description: String(l.description || ""),
      downloads: (Array.isArray(l.downloads) ? l.downloads : []).filter(function (d) { return d && d.url; }),
      owned: !!l.owned,
      credit: String(l.credit || ""),
      creditUrl: String(l.creditUrl || ""),
      _i: i
    };
    o._hay = [o.title, o.description, o.tags.join(" "), catOf(o.category).label, o.credit].join(" ").toLowerCase();
    return o;
  }).sort(function (a, b) { return b.date.localeCompare(a.date) || a._i - b._i; });

  function fmtDate(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
    if (!m) return "";
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  /* ---------------------------------------------------------
     state + routing  (#/  ·  #/?cat=mods&q=forge&page=2  ·  #/l/listing-id)
     --------------------------------------------------------- */
  const app = $("#app");
  const searchInput = $("#search");
  const clearBtn = $("#searchClear");

  let view = null;           // "home" | "detail" | "nf"
  let refs = {};
  let state = { cat: "all", q: "", page: 1 };
  let lastHomeHash = "#/";
  let homeScroll = 0;

  function validCat(c) { return c && CATS.some(function (x) { return x.id === c; }) ? c : "all"; }

  function buildHash(s) {
    const p = new URLSearchParams();
    if (s.cat && s.cat !== "all") p.set("cat", s.cat);
    if (s.q) p.set("q", s.q);
    if (s.page > 1) p.set("page", s.page);
    const qs = p.toString();
    return "#/" + (qs ? "?" + qs : "");
  }

  function parseHash() {
    const raw = location.hash.replace(/^#/, "") || "/";
    const i = raw.indexOf("?");
    return { path: i < 0 ? raw : raw.slice(0, i), params: new URLSearchParams(i < 0 ? "" : raw.slice(i + 1)) };
  }

  function filtered(cat, q) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return LIST.filter(function (l) {
      if (cat !== "all" && l.category !== cat) return false;
      return words.every(function (w) { return l._hay.indexOf(w) !== -1; });
    });
  }

  function route() {
    closeMenu();
    const r = parseHash();
    if (r.path.indexOf("/l/") === 0) {
      let id = r.path.slice(3);
      try { id = decodeURIComponent(id); } catch (e) {}
      showDetail(id);
      return;
    }
    const prev = state;
    state = {
      cat: validCat(r.params.get("cat")),
      q: (r.params.get("q") || "").trim(),
      page: Math.max(1, parseInt(r.params.get("page"), 10) || 1)
    };
    lastHomeHash = buildHash(state);
    showHome(prev);
  }

  /* ---------------------------------------------------------
     media (real image, or a generated placeholder if there is none / it fails to load)
     --------------------------------------------------------- */
  function media(l, src, extra) {
    const c = catOf(l.category);
    const box = h("div", { class: "media " + (extra || ""), style: { "--hue": c.hue } },
      h("div", { class: "ph" }, icon("box", 40), h("span", null, c.label)));
    if (src) {
      const img = new Image();
      img.alt = l.title;
      img.decoding = "async";
      img.addEventListener("load", function () { box.classList.add("has-img"); });
      img.addEventListener("error", function () { img.remove(); });
      box.append(img);
      img.src = src;
    }
    return box;
  }

  function mailLink(subject) {
    const email = CFG.contactEmail || "";
    return h("a", { href: "mailto:" + email + (subject ? "?subject=" + encodeURIComponent(subject) : "") }, email);
  }

  /* ---------------------------------------------------------
     HOME
     --------------------------------------------------------- */
  function buildHome() {
    view = "home";
    refs = {};
    refs.chips = h("div", { class: "chips", role: "group", "aria-label": "Categories" });
    refs.meta = h("div", { class: "result-meta", "aria-live": "polite" });
    refs.results = h("div", { class: "results" });
    refs.chipEls = {};

    const all = [{ id: "all", label: "All" }].concat(CATS);
    all.forEach(function (c) {
      const n = h("span", { class: "n" }, "0");
      const b = h("button", {
        class: "chip", type: "button", "data-cat": c.id,
        onclick: function () { location.hash = buildHash({ cat: c.id, q: state.q, page: 1 }); }
      }, c.label, n);
      refs.chipEls[c.id] = { btn: b, n: n };
      refs.chips.append(b);
    });

    const hero = h("section", { class: "hero" },
      h("h1", null,
        h("span", { class: "h-main" }, CFG.heroTitle || "Minecraft downloads"),
        CFG.heroLine ? [" ", h("span", { class: "h-line" }, CFG.heroLine)] : null),
      CFG.heroSubtitle ? h("p", null, CFG.heroSubtitle) : null);

    const kids = [hero];
    if (!RAW) {
      kids.push(h("div", { class: "notice glass" },
        h("h3", null, "Listings could not be loaded"),
        h("p", null, "Open js/listings.js and check for a missing comma, quote or bracket. The file must start with window.LISTINGS = [ and end with ];")));
    }
    kids.push(refs.chips, refs.meta, refs.results);
    app.replaceChildren(h("div", { class: "view" }, kids));
  }

  function updateChips() {
    const counts = {};
    CATS.forEach(function (c) { counts[c.id] = filtered(c.id, state.q).length; });
    counts.all = filtered("all", state.q).length;
    for (const id in refs.chipEls) {
      const el = refs.chipEls[id];
      el.n.textContent = counts[id] != null ? counts[id] : 0;
      const on = id === state.cat;
      el.btn.classList.toggle("active", on);
      el.btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function card(l) {
    const c = catOf(l.category);
    return h("a", {
      class: "card glass", href: "#/l/" + encodeURIComponent(l.id), "data-sfx": "listing",
      "aria-label": l.title + " — open"
    },
      media(l, l.images[0], "card-media"),
      h("div", { class: "card-body" },
        h("div", { class: "card-tags" },
          h("span", { class: "pill", style: { "--hue": c.hue } }, c.label),
          l.tags.slice(0, 2).map(function (t) { return h("span", { class: "tag" }, t); })),
        h("h3", null, l.title),
        h("p", null, l.description.split(/\n\s*\n/)[0])),
      h("div", { class: "card-foot" }, "Open and download", icon("next", 18)));
  }

  function pager(page, pages) {
    if (pages <= 1) return null;
    const go = function (p) { return function () { location.hash = buildHash({ cat: state.cat, q: state.q, page: p }); }; };
    const nav = h("nav", { class: "pager", "aria-label": "Pages" });
    nav.append(h("button", { class: "pg", type: "button", disabled: page === 1, "aria-label": "Previous page", onclick: go(page - 1) }, icon("back", 18), "Prev"));
    const set = {};
    [1, pages, page - 1, page, page + 1].forEach(function (n) { if (n >= 1 && n <= pages) set[n] = true; });
    const nums = Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
    let last = 0;
    nums.forEach(function (n) {
      if (n - last > 1) nav.append(h("span", { class: "pg-gap", "aria-hidden": "true" }, "…"));
      nav.append(h("button", {
        class: "pg" + (n === page ? " current" : ""), type: "button", "aria-label": "Page " + n,
        "aria-current": n === page ? "page" : null, onclick: n === page ? null : go(n)
      }, String(n)));
      last = n;
    });
    nav.append(h("button", { class: "pg", type: "button", disabled: page === pages, "aria-label": "Next page", onclick: go(page + 1) }, "Next", icon("next", 18)));
    return nav;
  }

  function renderResults(animate) {
    const list = filtered(state.cat, state.q);
    const per = Math.max(1, parseInt(CFG.perPage, 10) || 9);
    const pages = Math.max(1, Math.ceil(list.length / per));
    if (state.page > pages) {
      state.page = pages;
      history.replaceState(null, "", buildHash(state));
      lastHomeHash = buildHash(state);
    }
    const from = (state.page - 1) * per;
    const slice = list.slice(from, from + per);

    // meta line
    refs.meta.replaceChildren();
    if (list.length) {
      const left = h("span", null, "Showing ", h("b", null, from + 1 + "–" + (from + slice.length)), " of ", h("b", null, String(list.length)));
      if (state.q) left.append(" for “" + state.q + "”");
      if (state.cat !== "all") left.append(" in " + catOf(state.cat).label.toLowerCase());
      refs.meta.append(left);
      if (pages > 1) refs.meta.append(h("span", null, "Page " + state.page + " of " + pages));
    }

    // grid / empty state
    refs.results.replaceChildren();
    if (!list.length) {
      refs.results.append(h("div", { class: "empty glass" },
        icon("find", 38),
        h("h3", null, state.q ? "Nothing found for “" + state.q + "”" : "Nothing here yet"),
        h("p", null, state.q ? "Check the spelling, try fewer words, or look in another category." : "New downloads are added regularly. Check back soon."),
        state.q || state.cat !== "all"
          ? h("button", { class: "btn", type: "button", onclick: function () { searchInput.value = ""; clearBtn.hidden = true; location.hash = "#/"; } }, "Show everything")
          : null));
    } else {
      refs.results.append(h("div", { class: "grid" }, slice.map(card)), pager(state.page, pages));
    }

    if (animate) {
      refs.results.classList.remove("in");
      void refs.results.offsetWidth;
      refs.results.classList.add("in");
    }
  }

  function syncSearchUI() {
    if (searchInput.value.trim() !== state.q) searchInput.value = state.q;
    clearBtn.hidden = !searchInput.value;
  }

  function showHome(prev) {
    const fromOther = view !== "home";
    if (fromOther) buildHome();
    document.title = CFG.siteName || "Minecraft Downloads";
    syncSearchUI();
    updateChips();
    renderResults(true);

    if (fromOther) {
      const y = view === "home" && homeScroll ? homeScroll : 0;
      requestAnimationFrame(function () { window.scrollTo({ top: y, behavior: "instant" }); });
    } else if (prev.cat !== state.cat || prev.page !== state.page) {
      refs.chips.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------------------------------------------------------
     LISTING PAGE
     --------------------------------------------------------- */
  function showDetail(id) {
    if (view === "home") homeScroll = window.scrollY;
    const l = LIST.find(function (x) { return x.id === id; });
    const back = h("a", { class: "btn btn-ghost back", href: lastHomeHash }, icon("back", 18), "All downloads");

    if (!l) {
      view = "nf";
      document.title = "Not found — " + (CFG.siteName || "Minecraft Downloads");
      app.replaceChildren(h("div", { class: "view detail" }, back,
        h("div", { class: "empty glass" }, icon("find", 38), h("h3", null, "This listing doesn't exist"),
          h("p", null, "It may have been renamed or removed."),
          h("a", { class: "btn btn-primary", href: "#/" }, "Browse all downloads"))));
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    view = "detail";
    document.title = l.title + " — " + (CFG.siteName || "Minecraft Downloads");
    const c = catOf(l.category);

    // showcase + gallery
    const imgs = l.images.length ? l.images : [""];
    const stage = h("div", { class: "stage" });
    const thumbs = [];
    function setImage(i, swap) {
      const m = media(l, imgs[i], "stage-media" + (swap ? " swap" : ""));
      stage.replaceChildren(m);
      thumbs.forEach(function (t, k) {
        t.classList.toggle("active", k === i);
        t.setAttribute("aria-current", k === i ? "true" : "false");
      });
    }
    let thumbRow = null;
    if (imgs.length > 1) {
      imgs.forEach(function (src, i) {
        thumbs.push(h("button", { class: "thumb", type: "button", "aria-label": "Show image " + (i + 1), onclick: function () { setImage(i, true); } }, media(l, src, "")));
      });
      thumbRow = h("div", { class: "thumbs" }, thumbs);
    }
    setImage(0, false);

    // description
    const desc = h("div", { class: "desc" },
      l.description.split(/\n\s*\n/).filter(function (p) { return p.trim(); }).map(function (p) { return h("p", null, p.trim()); }));

    // downloads
    const dl = h("div", { class: "dl-row" });
    if (l.downloads.length) {
      // one button per listing: it goes to the owner's ad link, which leads to the Google Drive file
      const d = l.downloads[0];
      const placeholder = d.url === "#";
      const a = h("a", {
        class: "btn btn-primary dl-main",
        href: d.url, "data-sfx": "download",
        target: placeholder ? null : "_blank", rel: placeholder ? null : "noopener noreferrer"
      }, icon("download", 20), h("span", { class: "dl-text" },
        h("b", null, CFG.downloadLabel || "Download from Google Drive"),
        h("small", null, CFG.downloadHint || "1 min ads link: ads open first, then you get the Drive link")));
      if (placeholder) a.addEventListener("click", function (e) { e.preventDefault(); });
      dl.append(a);
    } else {
      dl.append(h("span", { class: "btn is-soon", "aria-disabled": "true" }, icon("download", 20), "Download link coming soon"));
    }

    // credit
    const credit = h("div", { class: "credit" });
    if (l.owned) credit.append(h("span", { class: "badge-own" }, icon("user", 16), "Made by me"));
    if (l.credit) {
      credit.append(h("span", null, "Credit: ", h("b", null, l.credit)));
      if (l.creditUrl) credit.append(h("a", { href: l.creditUrl, target: "_blank", rel: "noopener noreferrer" }, "Original page", icon("external", 15)));
    }

    // default disclaimer (on every listing)
    const disclaimer = h("aside", { class: "disclaimer", role: "note" },
      icon("info", 22),
      h("div", null,
        h("b", null, CFG.disclaimerTitle || "Disclaimer"),
        CFG.disclaimer || "",
        " Contact: ", mailLink("Copyright / credit concern: " + l.title), "."));

    const frame = h("article", { class: "frame glass" },
      stage, thumbRow,
      h("div", { class: "detail-body" },
        h("div", { class: "badges" },
          h("span", { class: "pill", style: { "--hue": c.hue } }, c.label),
          l.tags.map(function (t) { return h("span", { class: "tag" }, t); })),
        h("h1", null, l.title),
        fmtDate(l.date) ? h("div", { class: "date" }, "Added " + fmtDate(l.date)) : null,
        desc,
        h("section", { class: "dl-block", "aria-label": "Downloads" }, h("h2", null, "Download"), dl),
        credit.children.length ? credit : null),
      disclaimer);

    app.replaceChildren(h("div", { class: "view detail" }, back, frame));
    window.scrollTo({ top: 0, behavior: "instant" });
    app.focus({ preventScroll: true });
  }

  /* ---------------------------------------------------------
     top bar, socials menu, footer
     --------------------------------------------------------- */
  const siteName = CFG.siteName || "Minecraft Hub";
  const brandMark = $("#brandMark");
  if (CFG.logo) {
    const im = new Image();
    im.alt = "";
    im.addEventListener("error", function () { brandMark.textContent = siteName.charAt(0).toUpperCase(); im.remove(); });
    brandMark.append(im);
    im.src = CFG.logo;
  } else {
    brandMark.textContent = siteName.charAt(0).toUpperCase();
  }
  $("#brandName").textContent = siteName;
  $("#footName").textContent = siteName;

  document.querySelectorAll("[data-icon]").forEach(function (el) { fillSlot(el, el.getAttribute("data-icon"), 20); });
  fillSlot(clearBtn.querySelector(".slot"), "close", 14);

  // entries without a url are kept and shown as "Coming soon"
  const socials = (Array.isArray(CFG.socials) ? CFG.socials : []).filter(function (s) { return !!s; });
  const menu = $("#socialsMenu");
  const socialsBtn = $("#socialsBtn");

  menu.append(h("div", { class: "menu-title" }, "Find me on"));
  socials.forEach(function (s) {
    const live = !!s.url;
    const attrs = { class: "social-item" + (live ? "" : " is-soon"), role: "menuitem", "data-brand": s.icon || "link" };
    if (live) { attrs.href = s.url; attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
    else attrs["aria-disabled"] = "true";
    menu.append(h(live ? "a" : "span", attrs,
      h("span", { class: "social-ico" }, icon(s.icon || "link", 22)),
      h("span", { class: "social-text" }, h("b", null, s.name || "Link"),
        live ? (s.handle ? h("small", null, s.handle) : null) : h("small", null, "Coming soon")),
      live ? h("span", { class: "ext" }, icon("external", 16)) : null));
  });
  if (!socials.length) socialsBtn.hidden = true;

  function openMenu() { menu.classList.add("open"); menu.setAttribute("aria-hidden", "false"); socialsBtn.setAttribute("aria-expanded", "true"); }
  function closeMenu() { menu.classList.remove("open"); menu.setAttribute("aria-hidden", "true"); socialsBtn.setAttribute("aria-expanded", "false"); }
  socialsBtn.addEventListener("click", function () { menu.classList.contains("open") ? closeMenu() : openMenu(); });
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !socialsBtn.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // footer
  const foot = $("#footSocials");
  socials.forEach(function (s) {
    const live = !!s.url;
    const attrs = { class: "foot-social" + (live ? "" : " is-soon"), "data-brand": s.icon || "link" };
    if (live) { attrs.href = s.url; attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
    else attrs["aria-disabled"] = "true";
    foot.append(h(live ? "a" : "span", attrs, icon(s.icon || "link", 20), s.name || "Link", live ? null : h("small", null, "soon")));
  });
  $("#footContact").append("Copyright or credit concern? ", mailLink("Copyright / credit concern"));
  $("#footCopy").textContent = "© " + new Date().getFullYear() + " " + siteName;

  // sound toggle
  const soundBtn = $("#soundBtn");
  const soundIcon = $("#soundIcon");
  function paintSound() {
    const on = !Sfx.isMuted();
    fillSlot(soundIcon, on ? "volume" : "mute", 20);
    soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
    soundBtn.setAttribute("aria-label", on ? "Sound effects on. Click to mute" : "Sound effects off. Click to turn on");
    soundBtn.title = on ? "Sound on" : "Sound off";
  }
  if (!Sfx.enabled) soundBtn.hidden = true;
  paintSound();
  soundBtn.addEventListener("click", function () {
    const on = Sfx.toggle();
    paintSound();
    if (on) Sfx.play("click");
  });

  /* ---------------------------------------------------------
     search
     --------------------------------------------------------- */
  let searchTimer = null;
  function applySearch() {
    const q = searchInput.value.trim();
    if (view === "home") {
      if (q === state.q) return;
      state = { cat: state.cat, q: q, page: 1 };
      lastHomeHash = buildHash(state);
      history.replaceState(null, "", lastHomeHash);
      updateChips();
      renderResults(false);
    } else if (q) {
      location.hash = buildHash({ cat: "all", q: q, page: 1 });
    }
  }
  searchInput.addEventListener("input", function () {
    clearBtn.hidden = !searchInput.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applySearch, 130);
  });
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { clearTimeout(searchTimer); applySearch(); searchInput.blur(); }
    if (e.key === "Escape") { searchInput.value = ""; clearBtn.hidden = true; applySearch(); searchInput.blur(); }
  });
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    clearBtn.hidden = true;
    applySearch();
    searchInput.focus();
  });
  document.addEventListener("keydown", function (e) {
    const tg = e.target;
    const typing = tg && (tg.tagName === "INPUT" || tg.tagName === "TEXTAREA" || tg.isContentEditable);
    if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // brand → home
  $("#brand").addEventListener("click", function (e) {
    e.preventDefault();
    homeScroll = 0;
    searchInput.value = "";
    clearBtn.hidden = true;
    if (location.hash === "#/" || !location.hash) { route(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else location.hash = "#/";
  });

  window.addEventListener("hashchange", route);
  route();
})();
