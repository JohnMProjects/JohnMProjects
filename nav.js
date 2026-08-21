/* Accessible dropdown menus for the primary nav.
   Click to toggle; closes on outside-click or Escape. */
(function () {
  var toggles = document.querySelectorAll('.dropdown-toggle');

  toggles.forEach(function (toggle) {
    var menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    menu.addEventListener('click', function (e) { e.stopPropagation(); });

    document.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  });
})();

/* Tools spotlight rotator (About aside). Runs only where the element exists,
   and respects the user's reduced-motion preference. */
(function () {
  var el = document.querySelector('.tools-spot .spot-now');
  if (!el) return;
  var tools = ["Ahrefs","Semrush","Moz","Google Search Console","Google Analytics",
               "Mangools","BuzzStream","Instantly","SEOquake"];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // leave the first tool shown, no rotation
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
