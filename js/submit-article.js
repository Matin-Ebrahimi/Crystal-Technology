/* ========================================================================
   SUBMIT ARTICLE — write/submit form, gated by mock auth + consent
   ======================================================================== */
(function(){
  function renderCategorySelect(){
    var sel = document.getElementById('category-select');
    if(!sel) return;
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    var cats = ['technology','business','tips','company'];
    sel.innerHTML = cats.map(function(c){
      return '<option value="' + c + '">' + t('common.categories.' + c) + '</option>';
    }).join('');
  }

  function wireDropzone(){
    var zone = document.getElementById('dropzone');
    var input = document.getElementById('cover-input');
    var fname = document.getElementById('cover-filename');
    var ico = document.getElementById('dropzone-ico');
    if(ico) ico.innerHTML = window.CTS_ICONS.upload;
    if(!zone || !input) return;
    zone.addEventListener('click', function(){ input.click(); });
    input.addEventListener('change', function(){
      if(input.files && input.files[0]) fname.textContent = input.files[0].name;
    });
    ['dragover','dragenter'].forEach(function(evt){
      zone.addEventListener(evt, function(e){ e.preventDefault(); zone.style.borderColor = 'var(--accent)'; });
    });
    ['dragleave','drop'].forEach(function(evt){
      zone.addEventListener(evt, function(e){ e.preventDefault(); zone.style.borderColor = ''; });
    });
    zone.addEventListener('drop', function(e){
      if(e.dataTransfer.files && e.dataTransfer.files[0]) fname.textContent = e.dataTransfer.files[0].name;
    });
  }

  function loadMyArticles(){
    try{ return JSON.parse(localStorage.getItem('cts-my-articles') || '[]'); }catch(e){ return []; }
  }
  function saveMyArticles(list){
    try{ localStorage.setItem('cts-my-articles', JSON.stringify(list)); }catch(e){}
  }

  function wireForm(){
    var form = document.getElementById('article-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var list = loadMyArticles();
      list.unshift({
        id: 'a' + Date.now(),
        title: form.title.value.trim(),
        category: form.category.value,
        status: 'pending',
        date: new Date().toISOString().slice(0, 10)
      });
      saveMyArticles(list);

      document.getElementById('submit-form-wrap').style.display = 'none';
      var confirmWrap = document.getElementById('pending-confirm-wrap');
      confirmWrap.style.display = 'block';
      document.getElementById('pending-ico').innerHTML = window.CTS_ICONS.check;
      confirmWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function guardAccess(){
    var user = window.CTS_getUser ? window.CTS_getUser() : null;
    if(!user){ window.location.href = 'signin.html'; return false; }
    var consent = null;
    try{ consent = localStorage.getItem('cts-consent'); }catch(e){}
    if(consent !== '1'){ window.location.href = 'blog.html'; return false; }
    return true;
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(!guardAccess()) return;
    window.CTS_mountLayout('');
    renderCategorySelect();
    wireDropzone();
    wireForm();
    document.addEventListener('cts:langchange', renderCategorySelect);
  });
})();
