/* ========================================================================
   AUTH PAGES — mock sign in / sign up (no backend; persists to localStorage)
   ======================================================================== */
(function(){
  function saveUser(user){
    try{ localStorage.setItem('cts-user', JSON.stringify(user)); }catch(e){}
  }

  function wireSignin(){
    var form = document.getElementById('signin-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var email = form.email.value.trim();
      if(!email) return;
      var name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
      saveUser({ name: name, email: email });
      window.location.href = 'blog.html?justSignedIn=1';
    });
  }

  function wireSignup(){
    var form = document.getElementById('signup-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(form.password.value !== form.confirm.value){
        form.confirm.setCustomValidity(window.CTS_I18N.lang === 'fa' ? 'رمزهای عبور یکسان نیستند' : 'Passwords do not match');
        form.confirm.reportValidity();
        return;
      }
      form.confirm.setCustomValidity('');
      saveUser({ name: form.name.value.trim(), email: form.email.value.trim() });
      window.location.href = 'blog.html?justSignedIn=1';
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    window.CTS_mountLayout('');
    wireSignin();
    wireSignup();
  });
})();
