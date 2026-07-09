/* ========================================================================
   SERVICES (umbrella) PAGE
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

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
      return '<a href="' + d.page + '" class="' + cls + '" data-reveal>' +
        badge +
        '<h3>' + d.name[lang] + '</h3>' +
        '<p>' + d.shortDesc[lang] + '</p>' +
        '<div class="svc-tags">' + d.services.map(function(s){ return '<span>' + s.name[lang] + '</span>'; }).join('') + '</div>' +
        '<span class="go">' + window.CTS_I18N.t('common.exploreDept') + ' ' + I.arrowRight + '</span>' +
      '</a>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('services');
    renderDepartments();
  });
  document.addEventListener('cts:langchange', renderDepartments);
})();
