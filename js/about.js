/* ========================================================================
   ABOUT PAGE — dynamic render
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

  function renderIcons(){
    var m = document.getElementById('mission-ico');
    var v = document.getElementById('vision-ico');
    if(m) m.innerHTML = window.CTS_ICONS.target;
    if(v) v.innerHTML = window.CTS_ICONS.eye;
  }

  function renderTimeline(){
    var el = document.getElementById('timeline');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    el.innerHTML = DATA.timeline.map(function(item){
      var year = typeof item.year === 'object' ? item.year[lang] : item.year;
      return '<div class="timeline-item" data-reveal>' +
        '<div class="year">' + year + '</div>' +
        '<div><h3>' + item.title[lang] + '</h3><p>' + item.body[lang] + '</p></div>' +
      '</div>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function renderValues(){
    var el = document.getElementById('values-grid');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    el.innerHTML = DATA.values.map(function(v, i){
      var idx = String(i + 1).padStart(2, '0');
      return '<div class="value-card" data-reveal>' +
        '<div class="idx mono">' + idx + '</div>' +
        '<h3>' + v.title[lang] + '</h3>' +
        '<p>' + v.body[lang] + '</p>' +
      '</div>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function renderWhy(){
    var el = document.getElementById('why-list');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    var I = window.CTS_ICONS;
    el.innerHTML = DATA.whyUs.map(function(w){
      return '<div class="why-item" data-reveal><span class="tick">' + I.check + '</span><span class="label">' + w[lang] + '</span></div>';
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

  function renderTeam(){
    var el = document.getElementById('team-grid');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    el.innerHTML = DATA.team.map(function(m){
      return '<div class="team-card' + (m.highlight ? '' : '') + '" data-reveal>' +
        '<div class="avatar">' + m.initials + '</div>' +
        '<div class="name">' + m.name + '</div>' +
        '<div class="role">' + m.role[lang] + '</div>' +
        '<div class="div"></div>' +
        '<div class="cred">' + m.cred[lang] + '</div>' +
      '</div>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function renderAll(){
    renderIcons();
    renderTimeline();
    renderValues();
    renderWhy();
    renderStats();
    renderTeam();
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('about');
    renderAll();
  });
  document.addEventListener('cts:langchange', renderAll);
})();
