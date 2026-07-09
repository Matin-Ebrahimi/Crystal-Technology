/* ========================================================================
   DEPARTMENT PAGE (shared renderer for web-design / infrastructure / cloud-consulting)
   Reads window.CTS_DEPT_SLUG set inline in each department HTML page.
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

  function getDept(){
    return DATA.departments.filter(function(d){ return d.slug === window.CTS_DEPT_SLUG; })[0];
  }

  function render(){
    var dept = getDept();
    if(!dept) return;
    var lang = window.CTS_I18N.lang;
    var I = window.CTS_ICONS;
    var t = function(k){ return window.CTS_I18N.t(k); };

    document.title = dept.name[lang] + ' — Crystal Tech Services';

    document.querySelectorAll('[data-dept="eyebrow"]').forEach(function(el){
      el.innerHTML = '<a href="services.html">' + t('nav.services') + '</a> <span>/</span> <span>' + dept.name[lang] + '</span>';
    });
    document.querySelectorAll('[data-dept="badge"]').forEach(function(el){
      el.style.display = dept.flagship ? '' : 'none';
      el.textContent = t('mega.flagship');
    });
    document.querySelectorAll('[data-dept="name"]').forEach(function(el){ el.textContent = dept.name[lang]; });
    document.querySelectorAll('[data-dept="intro"]').forEach(function(el){ el.textContent = dept.intro[lang]; });
    document.querySelectorAll('[data-dept="closing"]').forEach(function(el){ el.textContent = dept.closing[lang]; });

    var sideList = document.getElementById('dept-side-list');
    if(sideList){
      sideList.innerHTML = dept.services.map(function(s){
        return '<li><a href="#' + s.slug + '">' + s.name[lang] + '</a></li>';
      }).join('');
    }

    var rows = document.getElementById('service-rows');
    if(rows){
      rows.innerHTML = dept.services.map(function(s, i){
        var idx = String(i + 1).padStart(2, '0');
        return '<div class="service-row" id="' + s.slug + '" data-reveal>' +
          '<div class="idx">' + idx + '</div>' +
          '<div><h3>' + s.name[lang] + '</h3><p>' + s.desc[lang] + '</p></div>' +
        '</div>';
      }).join('');
    }

    var cross = document.getElementById('cross-depts');
    if(cross){
      var others = DATA.departments.filter(function(d){ return d.slug !== dept.slug; });
      cross.innerHTML = others.map(function(d){
        return '<a href="' + d.page + '" class="dept-card" data-reveal>' +
          '<div class="num">' + I[d.icon] + '</div>' +
          '<h3>' + d.name[lang] + '</h3>' +
          '<p>' + d.shortDesc[lang] + '</p>' +
          '<span class="go">' + t('common.exploreDept') + ' ' + I.arrowRight + '</span>' +
        '</a>';
      }).join('');
    }

    window.CTS_initScrollReveal();
  }

  document.addEventListener('DOMContentLoaded', function(){
    var dept = getDept();
    window.CTS_mountLayout(dept ? dept.slug : 'services');
    render();
  });
  document.addEventListener('cts:langchange', render);
})();
