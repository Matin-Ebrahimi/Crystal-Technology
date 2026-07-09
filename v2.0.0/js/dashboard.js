/* ========================================================================
   AUTHOR DASHBOARD — mock article status list
   ======================================================================== */
(function(){
  var SEED = [
    {
      id: 'seed1', category: 'tips', status: 'approved', date: '2026-05-20',
      title: { en: 'Notes for a Faster Homepage', fa: 'یادداشت‌هایی برای صفحه‌ی اصلی سریع‌تر' }
    },
    {
      id: 'seed2', category: 'technology', status: 'rejected', date: '2026-04-02',
      title: { en: 'Draft: API Rate Limiting Explained', fa: 'پیش‌نویس: محدودسازی نرخ API به‌زبان ساده' }
    }
  ];

  function loadMyArticles(){
    try{ return JSON.parse(localStorage.getItem('cts-my-articles') || '[]'); }catch(e){ return []; }
  }

  function userInitials(name){
    return (name || 'U').split(' ').map(function(p){ return p[0]; }).join('').slice(0,2).toUpperCase();
  }

  function renderSidebar(){
    var user = window.CTS_getUser ? window.CTS_getUser() : { name: 'Guest Author', email: 'guest@crystaltechservices.com' };
    document.getElementById('dash-avatar').textContent = userInitials(user.name);
    document.getElementById('dash-name').textContent = user.name;
    document.getElementById('dash-email').textContent = user.email;
  }

  function renderTable(){
    var el = document.getElementById('article-table');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    var mine = loadMyArticles().map(function(a){
      return { id: a.id, category: a.category, status: a.status, date: a.date, title: a.title };
    });
    var all = mine.concat(SEED);

    if(!all.length){
      el.innerHTML = '<p class="muted" style="padding:24px 0;">' + (lang === 'fa' ? 'هنوز مقاله‌ای ارسال نکرده‌اید.' : 'You haven\'t submitted any articles yet.') + '</p>';
      return;
    }

    el.innerHTML = all.map(function(a){
      var title = typeof a.title === 'object' ? a.title[lang] : a.title;
      var statusLabel = t('contribute.status' + a.status.charAt(0).toUpperCase() + a.status.slice(1));
      return '<div class="article-row" data-reveal>' +
        '<div class="info"><h4>' + title + '</h4><div class="meta">' + t('common.categories.' + a.category) + ' · ' + a.date + '</div></div>' +
        '<span class="badge ' + a.status + '">' + statusLabel + '</span>' +
      '</div>';
    }).join('');
    window.CTS_initScrollReveal();
  }

  function guardAccess(){
    var user = window.CTS_getUser ? window.CTS_getUser() : null;
    if(!user){ window.location.href = 'signin.html'; return false; }
    return true;
  }

  function renderAll(){ renderSidebar(); renderTable(); }

  document.addEventListener('DOMContentLoaded', function(){
    if(!guardAccess()) return;
    window.CTS_mountLayout('');
    renderAll();
    document.addEventListener('cts:langchange', renderAll);
  });
})();
