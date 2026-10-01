// Knowledge Lab : filtre des articles par thème (amélioration progressive).
// Sans JavaScript, la liste complète reste visible et les boutons restent masqués.
(function () {
  var list = document.querySelector('[data-kl-list]');
  var bar = document.querySelector('[data-kl-filters]');
  if (!list || !bar) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('[data-category]'));
  var chips = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
  var desc = document.querySelector('[data-kl-desc]');
  var status = document.querySelector('[data-kl-status]');
  var axes = Array.prototype.slice.call(document.querySelectorAll('[data-axis]'));
  var PARAM = 'categorie';

  function labelOf(chip) {
    var clone = chip.cloneNode(true);
    var c = clone.querySelector('.kl-count');
    if (c) c.remove();
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function countFor(filter) {
    if (filter === 'all') return items.length;
    return items.filter(function (el) { return el.getAttribute('data-category') === filter; }).length;
  }

  // Compteurs calculés depuis la liste : rien à maintenir à la main.
  chips.forEach(function (chip) {
    var n = countFor(chip.getAttribute('data-filter'));
    var span = chip.querySelector('.kl-count');
    if (span) span.textContent = '(' + n + ')';
  });

  // Axes de contenu : compteur + état actif.
  function updateAxes(filter) {
    axes.forEach(function (axis) {
      var key = axis.getAttribute('data-axis');
      var n = countFor(key);
      var on = key === filter;
      axis.setAttribute('aria-current', on ? 'true' : 'false');
      var label = axis.querySelector('.kl-axis-link');
      if (label) {
        label.textContent = on
          ? 'Affichés ci-dessous'
          : n + ' ' + (n > 1 ? 'articles' : 'article');
      }
    });
  }

  function isValid(filter) {
    return chips.some(function (c) { return c.getAttribute('data-filter') === filter; });
  }

  function apply(filter, updateUrl) {
    var shown = 0;
    items.forEach(function (el) {
      var match = filter === 'all' || el.getAttribute('data-category') === filter;
      el.hidden = !match;
      if (match) shown++;
    });

    var active = null;
    chips.forEach(function (chip) {
      var on = chip.getAttribute('data-filter') === filter;
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) active = chip;
    });

    updateAxes(filter);

    if (desc && active) desc.textContent = active.getAttribute('data-desc') || '';
    if (status && active) {
      var noun = shown > 1 ? 'articles' : 'article';
      status.textContent = filter === 'all'
        ? shown + ' ' + noun
        : shown + ' ' + noun + ' dans « ' + labelOf(active) + ' »';
    }

    if (updateUrl && window.history && history.replaceState) {
      try {
        var url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete(PARAM);
        else url.searchParams.set(PARAM, filter);
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (e) { /* environnement qui interdit la mise à jour d'URL : le filtre fonctionne quand même */ }
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      apply(chip.getAttribute('data-filter'), true);
    });
  });

  // Clic sur un axe : filtre la liste, y fait défiler la page, place le focus sur le bouton actif.
  axes.forEach(function (axis) {
    axis.addEventListener('click', function (e) {
      var key = axis.getAttribute('data-axis');
      if (!isValid(key)) return;
      e.preventDefault();
      apply(key, true);
      var target = document.getElementById('articles');
      if (target) target.scrollIntoView({ block: 'start' });
      var chip = bar.querySelector('[data-filter="' + key + '"]');
      if (chip) chip.focus({ preventScroll: true });
    });
  });

  var initial = 'all';
  try {
    var fromUrl = new URL(window.location.href).searchParams.get(PARAM);
    if (fromUrl && isValid(fromUrl)) initial = fromUrl;
  } catch (e) { /* URL non supportée : on garde "all" */ }

  bar.hidden = false;
  apply(initial, false);
})();
