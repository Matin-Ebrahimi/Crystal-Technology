/* ========================================================================
   BLOG PAGE — featured article, category filter, search, grid
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;
  var state = { cat: 'all', query: '' };

  function formatDate(dateStr, lang){
    try{
      return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
    }catch(e){ return dateStr; }
  }

  function initials(name){
    return name.split(' ').map(function(p){ return p[0]; }).join('').slice(0,2).toUpperCase();
  }

  function cardHTML(post, lang){
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    return '<a class="blog-card" href="article.html?slug=' + post.slug + '" data-reveal>' +
      '<div class="thumb">' + window.CTS_ICONS.image + '</div>' +
      '<div class="body">' +
        '<span class="cat">' + t('common.categories.' + post.category) + '</span>' +
        '<h3>' + post.title[lang] + '</h3>' +
        '<p class="excerpt">' + post.excerpt[lang] + '</p>' +
        '<div class="meta"><span class="avatar-sm">' + initials(post.author) + '</span>' +
          '<span>' + post.author + '</span><span>·</span>' +
          '<span>' + formatDate(post.date, lang) + '</span><span>·</span>' +
          '<span>' + post.readTime + ' ' + t('common.minRead') + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  function renderFeatured(){
    var el = document.getElementById('featured-slot');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    var post = DATA.blog.filter(function(p){ return p.featured; })[0];
    if(!post){ el.innerHTML = ''; return; }
    el.innerHTML = '<a class="featured-article" href="article.html?slug=' + post.slug + '">' +
      '<div>' +
        '<span class="badge approved" style="margin-bottom:14px;">' + t('blog.featured') + '</span>' +
        '<span class="cat" style="display:block; margin-bottom:8px;">' + t('common.categories.' + post.category) + '</span>' +
        '<h2 style="font-size:clamp(22px,3vw,32px); margin-bottom:14px;">' + post.title[lang] + '</h2>' +
        '<p class="muted" style="font-size:15.5px; margin-bottom:18px;">' + post.excerpt[lang] + '</p>' +
        '<div class="meta mono" style="display:flex; gap:10px; align-items:center; color:var(--muted-2); font-size:12.5px;">' +
          '<span class="avatar-sm">' + initials(post.author) + '</span><span>' + post.author + '</span><span>·</span>' +
          '<span>' + formatDate(post.date, lang) + '</span><span>·</span><span>' + post.readTime + ' ' + t('common.minRead') + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="thumb">' + window.CTS_ICONS.sparkle + '</div>' +
    '</a>';
  }

  function renderFilters(){
    var el = document.getElementById('cat-filter');
    if(!el) return;
    var cats = ['all','technology','business','tips','company'];
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    el.innerHTML = cats.map(function(c){
      return '<button type="button" class="cat-btn' + (state.cat === c ? ' is-active' : '') + '" data-cat="' + c + '">' + t('common.categories.' + c) + '</button>';
    }).join('');
    el.querySelectorAll('[data-cat]').forEach(function(btn){
      btn.addEventListener('click', function(){
        state.cat = btn.getAttribute('data-cat');
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid(){
    var el = document.getElementById('blog-grid');
    if(!el) return;
    var lang = window.CTS_I18N.lang;
    var q = state.query.trim().toLowerCase();
    var posts = DATA.blog.filter(function(p){ return !p.featured; });
    if(state.cat !== 'all') posts = posts.filter(function(p){ return p.category === state.cat; });
    if(q){
      posts = posts.filter(function(p){
        return (p.title[lang] + ' ' + p.excerpt[lang]).toLowerCase().indexOf(q) > -1 ||
               (p.title.en + ' ' + p.excerpt.en).toLowerCase().indexOf(q) > -1;
      });
    }
    el.innerHTML = posts.length
      ? posts.map(function(p){ return cardHTML(p, lang); }).join('')
      : '<p class="muted" style="grid-column:1/-1; text-align:center; padding:40px 0;">' + (lang === 'fa' ? 'مقاله‌ای یافت نشد.' : 'No articles found.') + '</p>';
    window.CTS_initScrollReveal();
  }

  function wireSearch(){
    var input = document.getElementById('search-input');
    var icoSlot = document.getElementById('search-ico');
    if(icoSlot) icoSlot.innerHTML = window.CTS_ICONS.search;
    if(input){
      input.addEventListener('input', function(){
        state.query = input.value;
        renderGrid();
      });
    }
  }

  function renderAll(){
    renderFeatured();
    renderFilters();
    renderGrid();
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('blog');
    wireSearch();
    renderAll();
  });
  document.addEventListener('cts:langchange', renderAll);
})();
