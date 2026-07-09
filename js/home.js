/* ========================================================================
   HOME PAGE — dynamic render of data-driven sections
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

  function renderTrustNames(){
    var el = document.getElementById('trust-names');
    if(!el) return;
    el.innerHTML = DATA.clients.slice(0, 6).map(function(c){ return '<span>' + c + '</span>'; }).join('');
  }

  function renderDepartments(){
    var el = document.getElementById('dept-grid');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    var I = window.CTS_ICONS;
    el.innerHTML = DATA.departments.map(function(d, i){
      var cls = 'dept-card' + (d.flagship ? ' flagship' : '');
      var badge = d.flagship
        ? '<span class="flag-badge">' + window.CTS_I18N.t('mega.flagship') + '</span>'
        : '<div class="num">0' + (i + 1) + '</div>';
      var svcCount = d.flagship ? 5 : 4;
      return '<a href="' + d.page + '" class="' + cls + '" data-reveal>' +
        badge +
        '<h3>' + d.name[lang] + '</h3>' +
        '<p>' + d.shortDesc[lang] + '</p>' +
        '<div class="svc-tags">' + d.services.slice(0, svcCount).map(function(s){ return '<span>' + s.name[lang] + '</span>'; }).join('') + '</div>' +
        '<span class="go">' + window.CTS_I18N.t('common.exploreDept') + ' ' + I.arrowRight + '</span>' +
      '</a>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function renderStats(){
    var el = document.getElementById('stats-strip');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    el.innerHTML = DATA.stats.map(function(s){
      var num = lang === 'fa' ? (typeof s.faNum === 'object' ? s.faNum[lang] : s.faNum) : s.num;
      return '<div class="stat-cell"><div class="num' + (s.accent ? ' acc' : '') + '">' + num + '</div><div class="cap">' + s.cap[lang] + '</div></div>';
    }).join('');
  }

  function renderTestimonials(){
    var el = document.getElementById('testi-grid');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    el.innerHTML = DATA.testimonials.map(function(t){
      return '<div class="testi-card" data-reveal><div class="quote-mark">&ldquo;</div><p class="quote">' + t[lang] + '</p>' +
        '<div class="attrib"><b>' + t.name[lang] + '</b>, ' + t.position[lang] + ', ' + t.company + '</div></div>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function renderAll(){
    renderTrustNames();
    renderDepartments();
    renderStats();
    renderTestimonials();
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('home');
    renderAll();
  });
  document.addEventListener('cts:langchange', renderAll);
})();
