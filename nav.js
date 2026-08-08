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
