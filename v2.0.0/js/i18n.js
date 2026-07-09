/* ========================================================================
   CRYSTAL TECH — I18N ENGINE
   Handles language state, RTL flip, Vazirmatn swap, persistence,
   and declarative string binding via [data-i18n] attributes.
   ======================================================================== */

(function(){
  var STORAGE_KEY = "cts-lang";

  function getLang(){
    var saved = null;
    try{ saved = localStorage.getItem(STORAGE_KEY); }catch(e){}
    return saved === "fa" ? "fa" : "en";
  }

  function resolve(dict, path){
    var parts = path.split(".");
    var node = dict;
    for(var i=0;i<parts.length;i++){
      if(node == null) return null;
      node = node[parts[i]];
    }
    return node;
  }

  window.CTS_I18N = {
    lang: getLang(),

    t: function(path){
      var dict = window.CTS_STRINGS[this.lang];
      var val = resolve(dict, path);
      if(val == null){
        var fallback = resolve(window.CTS_STRINGS.en, path);
        return fallback != null ? fallback : path;
      }
      return val;
    },

    apply: function(){
      var lang = this.lang;
      var dir = lang === "fa" ? "rtl" : "ltr";
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.classList.toggle("lang-fa", lang === "fa");

      var self = this;
      document.querySelectorAll("[data-i18n]").forEach(function(el){
        var val = self.t(el.getAttribute("data-i18n"));
        if(val != null) el.textContent = val;
      });
      document.querySelectorAll("[data-i18n-html]").forEach(function(el){
        var val = self.t(el.getAttribute("data-i18n-html"));
        if(val != null) el.innerHTML = val;
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el){
        var val = self.t(el.getAttribute("data-i18n-placeholder"));
        if(val != null) el.setAttribute("placeholder", val);
      });
      document.querySelectorAll("[data-i18n-aria]").forEach(function(el){
        var val = self.t(el.getAttribute("data-i18n-aria"));
        if(val != null) el.setAttribute("aria-label", val);
      });

      var flagEl = document.querySelector(".lang-label");
      if(flagEl) flagEl.textContent = lang === "fa" ? "EN / فا" : "EN / فا";

      document.dispatchEvent(new CustomEvent("cts:langchange", { detail: { lang: lang } }));
    },

    set: function(lang){
      this.lang = lang === "fa" ? "fa" : "en";
      try{ localStorage.setItem(STORAGE_KEY, this.lang); }catch(e){}
      this.apply();
    },

    toggle: function(){
      this.set(this.lang === "fa" ? "en" : "fa");
    },

    init: function(){
      this.apply();
      document.addEventListener("click", function(e){
        var btn = e.target.closest("[data-lang-toggle]");
        if(btn){ window.CTS_I18N.toggle(); }
      });
    }
  };

  // Apply immediately (pre-paint) to avoid flash of wrong language/direction,
  // and wire up [data-lang-toggle] click handling site-wide.
  window.CTS_I18N.init();
})();
