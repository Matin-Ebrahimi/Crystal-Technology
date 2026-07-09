/* ========================================================================
   ARTICLE PAGE — single post reading layout
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

  function getSlug(){
    var params = new URLSearchParams(window.location.search);
    return params.get('slug') || DATA.blog[0].slug;
  }

  function formatDate(dateStr, lang){
    try{
      return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
    }catch(e){ return dateStr; }
  }
  function initials(name){
    return name.split(' ').map(function(p){ return p[0]; }).join('').slice(0,2).toUpperCase();
  }

  function render(){
    var post = DATA.blog.filter(function(p){ return p.slug === getSlug(); })[0] || DATA.blog[0];
    var lang = window.CTS_I18N.lang;
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);

    document.getElementById('doc-title').textContent = post.title[lang] + ' — Crystal Tech Services';
    document.getElementById('art-cat').textContent = t('common.categories.' + post.category);
    document.getElementById('art-title').textContent = post.title[lang];
    document.getElementById('art-avatar').textContent = initials(post.author);
    document.getElementById('art-author').textContent = post.author;
    document.getElementById('art-date').textContent = formatDate(post.date, lang);
    document.getElementById('art-readtime').textContent = post.readTime + ' ' + t('common.minRead');
    document.getElementById('art-cover-ico').innerHTML = window.CTS_ICONS.sparkle;
    document.getElementById('art-body').innerHTML = post.body[lang].map(function(p){ return '<p>' + p + '</p>'; }).join('');

    var shareUrl = window.location.href;
    var twitter = document.getElementById('share-twitter');
    var linkedin = document.getElementById('share-linkedin');
    var copy = document.getElementById('share-copy');
    if(twitter){ twitter.innerHTML = window.CTS_ICONS.twitter; twitter.href = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(shareUrl) + '&text=' + encodeURIComponent(post.title[lang]); }
    if(linkedin){ linkedin.innerHTML = window.CTS_ICONS.linkedin; linkedin.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareUrl); }
    if(copy){
      copy.innerHTML = window.CTS_ICONS.link;
      copy.addEventListener('click', function(e){
        e.preventDefault();
        if(navigator.clipboard) navigator.clipboard.writeText(shareUrl);
      });
    }

    var related = DATA.blog.filter(function(p){ return p.slug !== post.slug; });
    var sameCat = related.filter(function(p){ return p.category === post.category; });
    var picks = (sameCat.length >= 3 ? sameCat : related).slice(0, 3);
    var relEl = document.getElementById('related-grid');
    if(relEl){
      relEl.innerHTML = picks.map(function(p){
        return '<a class="blog-card" href="article.html?slug=' + p.slug + '">' +
          '<div class="thumb">' + window.CTS_ICONS.image + '</div>' +
          '<div class="body">' +
            '<span class="cat">' + t('common.categories.' + p.category) + '</span>' +
            '<h3>' + p.title[lang] + '</h3>' +
            '<p class="excerpt">' + p.excerpt[lang] + '</p>' +
          '</div>' +
        '</a>';
      }).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('blog');
    render();
  });
  document.addEventListener('cts:langchange', render);
})();
