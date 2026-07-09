/* ========================================================================
   WORK PAGE — dynamic render
   ======================================================================== */
(function(){
  var DATA = window.CTS_DATA;

  function renderClients(){
    var el = document.getElementById('client-grid');
    if(!el) return;
    el.innerHTML = DATA.clients.map(function(c){
      return '<div class="client-box" data-reveal><span>' + c + '</span></div>';
    }).join('');
    window.CTS_initScrollReveal();
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

  function renderAll(){ renderClients(); renderTestimonials(); }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('work');
    renderAll();
  });
  document.addEventListener('cts:langchange', renderAll);
})();
