/* ========================================================================
   CRYSTAL TECH — SHARED HEADER / FOOTER / MODAL COMPONENTS
   Single source of truth for nav + footer markup, injected on every page.
   ======================================================================== */

(function(){
  var I = window.CTS_ICONS;
  var DATA = window.CTS_DATA;

  function deptIcon(key){
    return I[key] || I.layout;
  }

  // Service links pull bilingual text from data.js at render/translate time
  // via [data-svc="deptIndex:serviceIndex"] rather than the strings.js dictionary,
  // since department/service copy already lives in one place: CTS_DATA.
  function svcLink(deptIdx, dept, svcIdx){
    var s = dept.services[svcIdx];
    return '<a href="' + dept.page + '#' + s.slug + '" data-svc="' + deptIdx + ':' + svcIdx + '">' + s.name.en + '</a>';
  }

  function megaMarkup(){
    var d = DATA.departments;
    return (
      '<div class="mega" role="menu" aria-label="Services">' +
        '<div class="mega-col flagship">' +
          '<span class="mega-flag-badge" data-i18n="mega.flagship">Flagship</span>' +
          '<div class="mega-dept-title">' + deptIcon(d[0].icon) + '<a href="' + d[0].page + '" data-i18n="mega.dept1Name">' + d[0].name.en + '</a></div>' +
          '<p class="mega-dept-desc" data-i18n="mega.dept1Desc">' + d[0].shortDesc.en + '</p>' +
          '<div class="mega-svc-list">' +
            d[0].services.map(function(s, i){ return svcLink(0, d[0], i); }).join('') +
          '</div>' +
        '</div>' +
        '<div class="mega-col">' +
          '<div class="mega-dept-title">' + deptIcon(d[1].icon) + '<a href="' + d[1].page + '" data-i18n="mega.dept2Name">' + d[1].name.en + '</a></div>' +
          '<p class="mega-dept-desc" data-i18n="mega.dept2Desc">' + d[1].shortDesc.en + '</p>' +
          '<div class="mega-svc-list">' +
            d[1].services.map(function(s, i){ return svcLink(1, d[1], i); }).join('') +
          '</div>' +
        '</div>' +
        '<div class="mega-col">' +
          '<div class="mega-dept-title">' + deptIcon(d[2].icon) + '<a href="' + d[2].page + '" data-i18n="mega.dept3Name">' + d[2].name.en + '</a></div>' +
          '<p class="mega-dept-desc" data-i18n="mega.dept3Desc">' + d[2].shortDesc.en + '</p>' +
          '<div class="mega-svc-list">' +
            d[2].services.map(function(s, i){ return svcLink(2, d[2], i); }).join('') +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function headerMarkup(active){
    var servicesActive = ['services','web-design','infrastructure','cloud-consulting'].indexOf(active) > -1;
    return (
    '<div class="nav-shell">' +
      '<div class="nav-bar">' +
        '<a href="index.html" class="brand-mark" aria-label="Crystal Tech Services — home">' +
          '<img src="assets/horizontal-dark.png" alt="Crystal Tech Services">' +
        '</a>' +
        '<ul class="nav-links hide-mobile">' +
          '<li class="nav-item"><a class="nav-link' + (active==='home'?' is-active':'') + '" href="index.html" data-i18n="nav.home">Home</a></li>' +
          '<li class="nav-item services' + (servicesActive?' is-active':'') + '">' +
            '<a class="nav-link' + (servicesActive?' is-active':'') + '" href="services.html" aria-haspopup="true">' +
              '<span data-i18n="nav.services">Services</span>' + I.chevronDown +
            '</a>' +
            megaMarkup() +
          '</li>' +
          '<li class="nav-item"><a class="nav-link' + (active==='about'?' is-active':'') + '" href="about.html" data-i18n="nav.about">About</a></li>' +
          '<li class="nav-item"><a class="nav-link' + (active==='work'?' is-active':'') + '" href="work.html" data-i18n="nav.work">Work</a></li>' +
          '<li class="nav-item"><a class="nav-link' + (active==='blog'?' is-active':'') + '" href="blog.html" data-i18n="nav.blog">Blog</a></li>' +
          '<li class="nav-item"><a class="nav-link' + (active==='contact'?' is-active':'') + '" href="contact.html" data-i18n="nav.contact">Contact</a></li>' +
        '</ul>' +
        '<div class="nav-actions">' +
          '<button type="button" class="lang-switch" data-lang-toggle aria-label="Switch language">' + I.globe + '<span class="lang-label">EN / فا</span></button>' +
          '<span class="hide-mobile" data-auth-slot></span>' +
          '<a href="contact.html" class="btn btn-primary btn-sm hide-mobile" data-i18n="nav.startProject">Start a project</a>' +
          '<button type="button" class="menu-toggle" data-mobile-open aria-label="Open menu">' + I.menu + '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    mobileDrawerMarkup(active)
    );
  }

  function mobileDrawerMarkup(active){
    var d = DATA.departments;
    function deptBlock(dept, deptIdx){
      return '<div class="mega-dept-title">' + deptIcon(dept.icon) + '<a href="' + dept.page + '" data-dept-name="' + deptIdx + '">' + dept.name.en + '</a></div>' +
        dept.services.map(function(s, i){ return svcLink(deptIdx, dept, i); }).join('');
    }
    return (
    '<div class="mobile-drawer" data-mobile-drawer>' +
      '<div class="mobile-drawer-panel">' +
        '<div class="mobile-drawer-top">' +
          '<img src="assets/horizontal-dark.png" alt="Crystal Tech Services" style="height:24px;">' +
          '<button type="button" class="mobile-close" data-mobile-close aria-label="Close menu">' + I.close + '</button>' +
        '</div>' +
        '<a class="mobile-nav-link" href="index.html" data-i18n="nav.home">Home</a>' +
        '<button type="button" class="mobile-nav-link" data-mobile-accordion-toggle style="width:100%; text-align:start; border:none; background:none;">' +
          '<span data-i18n="nav.services">Services</span>' + I.chevronDown +
        '</button>' +
        '<div class="mobile-accordion-body" data-mobile-accordion-body>' +
          deptBlock(d[0], 0) + deptBlock(d[1], 1) + deptBlock(d[2], 2) +
        '</div>' +
        '<a class="mobile-nav-link" href="about.html" data-i18n="nav.about">About</a>' +
        '<a class="mobile-nav-link" href="work.html" data-i18n="nav.work">Work</a>' +
        '<a class="mobile-nav-link" href="blog.html" data-i18n="nav.blog">Blog</a>' +
        '<a class="mobile-nav-link" href="contact.html" data-i18n="nav.contact">Contact</a>' +
        '<span data-auth-slot-mobile></span>' +
        '<div class="mobile-drawer-cta">' +
          '<a href="contact.html" class="btn btn-primary btn-block" data-i18n="nav.startProject">Start a project</a>' +
        '</div>' +
      '</div>' +
    '</div>'
    );
  }

  function footerMarkup(){
    var d = DATA.departments;
    return (
    '<div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="assets/horizontal-dark.png" alt="Crystal Tech Services">' +
          '<p data-i18n="footer.tagline">Where creativity meets technology.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4 data-i18n="footer.servicesHeading">Services</h4>' +
          d.map(function(dept, i){ return '<a href="' + dept.page + '" data-dept-name="' + i + '">' + dept.name.en + '</a>'; }).join('') +
          '<a href="services.html" data-i18n="common.allDepartments">All departments</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4 data-i18n="footer.companyHeading">Studio</h4>' +
          '<a href="about.html" data-i18n="nav.about">About</a>' +
          '<a href="work.html" data-i18n="nav.work">Work</a>' +
          '<a href="blog.html" data-i18n="nav.blog">Blog</a>' +
          '<a href="contact.html" data-i18n="nav.contact">Contact</a>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4 data-i18n="footer.reachHeading">Reach us</h4>' +
          '<a href="mailto:hello@crystaltechservices.com" data-i18n="footer.email">hello@crystaltechservices.com</a>' +
          '<p data-i18n="footer.hq">Herat, Afghanistan</p>' +
          '<p data-i18n="footer.global">Working worldwide</p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span data-i18n="footer.copyright">© 2025 CRYSTAL TECH SERVICES</span>' +
        '<span data-i18n="footer.taglineCaps">WHERE CREATIVITY MEETS TECHNOLOGY</span>' +
      '</div>' +
    '</div>'
    );
  }

  function getMockUser(){
    try{
      var raw = localStorage.getItem('cts-user');
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }

  function userInitials(name){
    return (name || 'U').split(' ').map(function(p){ return p[0]; }).join('').slice(0,2).toUpperCase();
  }

  function renderAuthSlot(){
    var user = getMockUser();
    var t = function(k){ return window.CTS_I18N ? window.CTS_I18N.t(k) : k; };
    var slot = document.querySelector('[data-auth-slot]');
    var mobileSlot = document.querySelector('[data-auth-slot-mobile]');

    if(slot){
      slot.innerHTML = user
        ? '<a href="dashboard.html" class="lang-switch" style="gap:8px;"><span style="width:20px;height:20px;border-radius:50%;background:var(--accent-soft);color:var(--accent-lt);display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;font-family:var(--font-display);">' + userInitials(user.name) + '</span><span>' + t('common.dashboardLink') + '</span></a><button type="button" class="signin-link" data-logout title="' + t('common.logout') + '" style="padding:10px 8px;">' + I.close + '</button>'
        : '<a href="signin.html" class="signin-link" data-i18n="nav.signin">' + t('nav.signin') + '</a>';
    }
    if(mobileSlot){
      mobileSlot.innerHTML = user
        ? '<a class="mobile-nav-link" href="dashboard.html">' + t('common.dashboardLink') + '</a><button type="button" class="mobile-nav-link" data-logout style="width:100%; text-align:start; border-bottom:1px solid var(--border);">' + t('common.logout') + '</button>'
        : '<a class="mobile-nav-link" href="signin.html">' + t('nav.signin') + '</a>';
    }
    document.querySelectorAll('[data-logout]').forEach(function(btn){
      btn.addEventListener('click', function(){
        try{ localStorage.removeItem('cts-user'); localStorage.removeItem('cts-consent'); }catch(e){}
        window.location.href = 'index.html';
      });
    });
  }
  window.CTS_renderAuthSlot = renderAuthSlot;
  window.CTS_getUser = getMockUser;

  // Translates mega-dropdown / mobile-drawer / footer department & service
  // links, which are data-driven (CTS_DATA) rather than strings.js-driven.
  function translateDynamicNav(){
    var lang = window.CTS_I18N ? window.CTS_I18N.lang : 'en';
    document.querySelectorAll('[data-svc]').forEach(function(el){
      var parts = el.getAttribute('data-svc').split(':');
      var dept = DATA.departments[+parts[0]];
      var svc = dept && dept.services[+parts[1]];
      if(svc) el.textContent = svc.name[lang];
    });
    document.querySelectorAll('[data-dept-name]').forEach(function(el){
      var dept = DATA.departments[+el.getAttribute('data-dept-name')];
      if(dept) el.textContent = dept.name[lang];
    });
  }
  window.CTS_translateDynamicNav = translateDynamicNav;

  function wireHeaderInteractions(){
    renderAuthSlot();
    translateDynamicNav();
    document.addEventListener('cts:langchange', translateDynamicNav);
    document.addEventListener('cts:langchange', renderAuthSlot);
    var toggle = document.querySelector('[data-mobile-open]');
    var drawer = document.querySelector('[data-mobile-drawer]');
    var closeBtn = document.querySelector('[data-mobile-close]');
    if(toggle && drawer){
      toggle.addEventListener('click', function(){
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }
    function closeDrawer(){
      if(drawer){ drawer.classList.remove('is-open'); document.body.style.overflow = ''; }
    }
    if(closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if(drawer) drawer.addEventListener('click', function(e){ if(e.target === drawer) closeDrawer(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeDrawer(); });

    var accToggle = document.querySelector('[data-mobile-accordion-toggle]');
    var accBody = document.querySelector('[data-mobile-accordion-body]');
    if(accToggle && accBody){
      accToggle.addEventListener('click', function(){ accBody.classList.toggle('is-open'); });
    }

    // services nav-item: click toggles on touch devices (hover unavailable)
    var servicesItem = document.querySelector('.nav-item.services');
    if(servicesItem){
      var link = servicesItem.querySelector('.nav-link');
      link.addEventListener('click', function(e){
        if(window.matchMedia('(hover: none)').matches){
          e.preventDefault();
          servicesItem.classList.toggle('is-open');
        }
      });
      document.addEventListener('click', function(e){
        if(!servicesItem.contains(e.target)) servicesItem.classList.remove('is-open');
      });
    }

    // sticky header shadow on scroll
    var navBar = document.querySelector('.nav-bar');
    if(navBar){
      window.addEventListener('scroll', function(){
        navBar.style.boxShadow = window.scrollY > 8 ? '0 12px 40px rgba(0,0,0,0.4)' : '';
      }, { passive: true });
    }
  }

  window.CTS_mountLayout = function(active){
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    if(headerEl) headerEl.innerHTML = headerMarkup(active);
    if(footerEl) footerEl.innerHTML = footerMarkup();
    wireHeaderInteractions();
    if(window.CTS_I18N) window.CTS_I18N.apply();
    initScrollReveal();
  };

  function initScrollReveal(){
    var els = document.querySelectorAll('[data-reveal]');
    if(!('IntersectionObserver' in window) || !els.length){
      els.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(el){ io.observe(el); });
  }

  window.CTS_initScrollReveal = initScrollReveal;
})();
