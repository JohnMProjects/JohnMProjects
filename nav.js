/* Shared site scripts: mobile nav, scroll reveal, count-up, tools rotator.
   Each block runs only where its target elements exist. */

/* flag JS so reveal styles apply only when they can be undone */
document.documentElement.classList.add('js');

/* ---- mobile nav toggle ---- */
(function () {
  var t = document.querySelector('.nav-toggle');
  var m = document.getElementById('primary-nav');
  if (!t || !m) return;
  t.addEventListener('click', function () {
    var open = m.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  m.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { m.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); }
  });
})();

/* ---- reveal on scroll + gentle count-up (reduced-motion safe) ---- */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce) { reveals.forEach(function (el) { el.classList.add('in'); }); }
  else if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i, 4) * 60) + 'ms';
      io.observe(el);
    });
  }

  var cu = document.querySelector('[data-count]');
  if (cu && !reduce) {
    var target = parseInt(cu.getAttribute('data-count'), 10);
    var suffix = cu.getAttribute('data-suffix') || '';
    var seen = false;
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !seen) {
          seen = true;
          var start = null, dur = 1100;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            cu.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.6 });
    io2.observe(cu);
  }
})();

/* ---- tools spotlight rotator (About aside) ---- */
(function () {
  var el = document.querySelector('.tools-spot .spot-now');
  if (!el) return;
  var tools = ["Ahrefs","Semrush","Screaming Frog","Google Search Console","Google Analytics",
               "Microsoft Clarity","Moz","Mangools","SEOquake","BuzzStream","Instantly","Apollo",
               "Hunter.io","LinkedIn Sales Navigator","HARO","Featured","Qwoted","Google Sheets"];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  var i = 0;
  setInterval(function () {
    el.style.opacity = 0;
    setTimeout(function () {
      i = (i + 1) % tools.length;
      el.textContent = tools[i];
      el.style.opacity = 1;
    }, 400);
  }, 2200);
})();
