/* ========================================================================
   CONTRIBUTION FLOW — generic modal engine + publish/consent modals
   Used on blog.html. Steps: publish prompt -> consent -> submit-article.html
   ======================================================================== */
(function(){
  function openModal(id){
    var el = document.getElementById(id);
    if(el){ el.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  }
  function closeModal(el){
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  window.CTS_openModal = openModal;

  function wireGenericClose(){
    document.querySelectorAll('[data-modal]').forEach(function(overlay){
      overlay.addEventListener('click', function(e){
        if(e.target === overlay) closeModal(overlay);
      });
      overlay.querySelectorAll('[data-modal-close]').forEach(function(btn){
        btn.addEventListener('click', function(){ closeModal(overlay); });
      });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
      }
    });
  }

  function renderContributeCta(){
    var row = document.getElementById('contribute-cta-row');
    if(!row) return;
    var user = window.CTS_getUser ? window.CTS_getUser() : null;
    var t = window.CTS_I18N.t.bind(window.CTS_I18N);
    if(user){
      row.innerHTML = '<button type="button" class="btn btn-primary btn-lg" id="write-article-btn">' + t('common.writeArticle') + '</button>';
      document.getElementById('write-article-btn').addEventListener('click', function(){ openModal('modal-publish'); });
    }else{
      row.innerHTML = '<a href="signin.html" class="btn btn-primary btn-lg">' + t('common.signInToWrite') + '</a>';
    }
  }

  function wirePublishFlow(){
    var yesBtn = document.getElementById('modal-publish-yes');
    var consentCheckbox = document.getElementById('consent-checkbox');
    var continueBtn = document.getElementById('modal-consent-continue');
    var publishIcon = document.getElementById('modal-publish-icon');
    var consentIcon = document.getElementById('modal-consent-icon');
    if(publishIcon) publishIcon.innerHTML = window.CTS_ICONS.sparkle;
    if(consentIcon) consentIcon.innerHTML = window.CTS_ICONS.fileText;

    if(yesBtn){
      yesBtn.addEventListener('click', function(){
        var overlay = document.getElementById('modal-publish');
        if(overlay) closeModal(overlay);
        openModal('modal-consent');
      });
    }
    if(consentCheckbox && continueBtn){
      consentCheckbox.addEventListener('change', function(){
        continueBtn.disabled = !consentCheckbox.checked;
      });
    }
    if(continueBtn){
      continueBtn.addEventListener('click', function(){
        try{ localStorage.setItem('cts-consent', '1'); }catch(e){}
        window.location.href = 'submit-article.html';
      });
    }
  }

  function maybeAutoPrompt(){
    var params = new URLSearchParams(window.location.search);
    var user = window.CTS_getUser ? window.CTS_getUser() : null;
    if(params.get('justSignedIn') === '1' && user){
      setTimeout(function(){ openModal('modal-publish'); }, 600);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    wireGenericClose();
    renderContributeCta();
    wirePublishFlow();
    maybeAutoPrompt();
  });
  document.addEventListener('cts:langchange', renderContributeCta);
})();
