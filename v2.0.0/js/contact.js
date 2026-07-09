/* ========================================================================
   CONTACT PAGE
   ======================================================================== */
(function(){
  function renderIcons(){
    var mail = document.getElementById('ico-mail');
    var clock = document.getElementById('ico-clock');
    if(mail) mail.innerHTML = window.CTS_ICONS.mail;
    if(clock) clock.innerHTML = window.CTS_ICONS.clock;
  }

  function wireForm(){
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      success.textContent = window.CTS_I18N.t('contact.formSuccess');
      success.style.display = 'block';
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('contact');
    renderIcons();
    wireForm();
  });
  document.addEventListener('cts:langchange', renderIcons);
})();
