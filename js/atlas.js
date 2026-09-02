/* Maritime Atlas — shared UI logic */

var MOF_BASE = 'https://clarkngo.github.io/maritime-fundamentals/';
var MOT_BASE = 'https://clarkngo.github.io/maritime-ot/';

var VISUAL_TYPE_LABELS = {
  schematic: 'Schematic',
  illustration: 'AI illustration',
  photo: 'Photo'
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '\u2600\ufe0f Light' : '\ud83c\udf19 Dark';
  try { localStorage.setItem('atlas-theme', theme); } catch (e) {}
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

(function initTheme() {
  var saved = null;
  try { saved = localStorage.getItem('atlas-theme'); } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');
})();

function lessonUrl(course, lesson) {
  var base = course === 'mof' ? MOF_BASE : MOT_BASE;
  var num = String(lesson).padStart(2, '0');
  return base + 'lesson' + num + '.html';
}

function sourceLabel(course, lesson) {
  var code = course === 'mof' ? 'MOF-101' : 'MOT-101';
  return code + ' \u00b7 L' + lesson;
}

function getVisualType(entry) {
  return entry.visualType || 'schematic';
}

function renderSourceTags(sources) {
  return sources.map(function (s) {
    return '<a class="source-tag ' + s.course + '" href="' + lessonUrl(s.course, s.lesson) + '" onclick="event.stopPropagation()">' +
      sourceLabel(s.course, s.lesson) + '</a>';
  }).join('');
}

function renderVisualTypeBadge(type, extraClass) {
  var label = VISUAL_TYPE_LABELS[type] || type;
  var cls = 'visual-type-badge type-' + type + (extraClass ? ' ' + extraClass : '');
  return '<span class="' + cls + '">' + label + '</span>';
}

function getAttribution(entry) {
  if (entry.attribution) return entry.attribution;
  var type = getVisualType(entry);
  if (type === 'schematic') return 'Author-created educational schematic \u2014 Clark Ngo';
  if (type === 'illustration') return 'AI-generated illustration \u2014 tool and model credited on publication';
  return 'Licensed photograph \u2014 source credited on publication';
}

function renderVisual(visual) {
  if (visual.type === 'img') {
    return '<img src="' + visual.src + '" alt="' + (visual.alt || '') + '">';
  }
  return visual.svg;
}

function filterEntries(opts) {
  opts = opts || {};
  if (typeof ATLAS_ENTRIES === 'undefined') return [];
  return ATLAS_ENTRIES.filter(function (e) {
    if (opts.category && e.category !== opts.category) return false;
    if (opts.visualType && opts.visualType !== 'all') {
      if (opts.visualType === 'raster') {
        if (getVisualType(e) === 'schematic') return false;
      } else if (getVisualType(e) !== opts.visualType) {
        return false;
      }
    }
    if (opts.course && opts.course !== 'all') {
      if (!e.sources.some(function (s) { return s.course === opts.course; })) return false;
    }
    if (opts.query) {
      var cat = typeof ATLAS_CATEGORIES !== 'undefined'
        ? ATLAS_CATEGORIES.find(function (c) { return c.id === e.category; })
        : null;
      var hay = (e.title + ' ' + e.caption + ' ' + (cat ? cat.title : '')).toLowerCase();
      if (hay.indexOf(opts.query) === -1) return false;
    }
    return true;
  });
}

function renderGalleryCard(entry) {
  var card = document.createElement('article');
  var vType = getVisualType(entry);
  card.className = 'gallery-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', 'View ' + entry.title);
  card.dataset.id = entry.id;
  card.dataset.visualType = vType;
  card.innerHTML =
    '<div class="gallery-visual">' +
      renderVisualTypeBadge(vType, 'on-visual') +
      renderVisual(entry.visual) +
    '</div>' +
    '<div class="gallery-body">' +
      '<h3 class="gallery-title">' + entry.title + '</h3>' +
      '<p class="gallery-caption">' + entry.caption + '</p>' +
      '<div class="source-tags">' + renderSourceTags(entry.sources) + '</div>' +
    '</div>';
  card.addEventListener('click', function () { openLightbox(entry); });
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(entry); }
  });
  return card;
}

function ensureLightbox() {
  if (document.getElementById('atlas-lightbox')) return;
  var lb = document.createElement('div');
  lb.id = 'atlas-lightbox';
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<div class="lightbox-panel">' +
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<div class="lightbox-visual" id="lb-visual"></div>' +
      '<div class="lightbox-body">' +
        '<div id="lb-type-row"></div>' +
        '<h2 class="lightbox-title" id="lb-title"></h2>' +
        '<p class="lightbox-caption" id="lb-caption"></p>' +
        '<div class="source-tags" id="lb-sources"></div>' +
        '<p class="lightbox-attribution" id="lb-attribution"></p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(lb);
  lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(entry) {
  ensureLightbox();
  var lb = document.getElementById('atlas-lightbox');
  document.getElementById('lb-visual').innerHTML = renderVisual(entry.visual);
  document.getElementById('lb-type-row').innerHTML = renderVisualTypeBadge(getVisualType(entry));
  document.getElementById('lb-title').textContent = entry.title;
  document.getElementById('lb-caption').textContent = entry.caption;
  document.getElementById('lb-sources').innerHTML = renderSourceTags(entry.sources);
  document.getElementById('lb-attribution').textContent = getAttribution(entry);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var lb = document.getElementById('atlas-lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function renderGallery(categoryId, containerId) {
  var container = document.getElementById(containerId || 'gallery-grid');
  if (!container) return;
  var entries = filterEntries({ category: categoryId });
  container.innerHTML = '';
  if (!entries.length) {
    container.innerHTML = '<p class="empty-state">No visuals in this category yet.</p>';
    return;
  }
  entries.forEach(function (entry) {
    container.appendChild(renderGalleryCard(entry));
  });
}

function getCategoryCount(categoryId) {
  return filterEntries({ category: categoryId }).length;
}

function getVisualTypeCount(type) {
  if (type === 'raster') {
    return filterEntries({ visualType: 'raster' }).length;
  }
  return filterEntries({ visualType: type }).length;
}

function setActiveChips(selector, activeChip) {
  document.querySelectorAll(selector).forEach(function (c) {
    c.classList.toggle('active', c === activeChip);
  });
}

function initFilterBar(options) {
  options = options || {};
  var searchInput = document.getElementById('search-input');
  var catContainer = document.getElementById('category-grid');
  var resultContainer = document.getElementById('search-results');
  var defaultVisualType = options.defaultVisualType || 'all';
  var activeCourse = 'all';
  var activeVisualType = defaultVisualType;
  var hideCategoriesWhenFiltering = options.hideCategoriesWhenFiltering !== false;

  function isFiltering() {
    var q = searchInput ? (searchInput.value || '').trim() : '';
    return q.length > 0 || activeCourse !== 'all' || activeVisualType !== 'all';
  }

  function runFilter() {
    var q = searchInput ? (searchInput.value || '').trim().toLowerCase() : '';
    var filtering = isFiltering();

    if (!filtering && hideCategoriesWhenFiltering && catContainer) {
      catContainer.style.display = '';
      if (resultContainer) { resultContainer.style.display = 'none'; resultContainer.innerHTML = ''; }
      updateResultCount('');
      return;
    }

    var matches = filterEntries({
      query: q,
      course: activeCourse,
      visualType: activeVisualType
    });

    if (catContainer && hideCategoriesWhenFiltering) catContainer.style.display = 'none';
    if (resultContainer) {
      resultContainer.style.display = '';
      resultContainer.innerHTML = '';
      if (!matches.length) {
        resultContainer.innerHTML = '<p class="empty-state">No visuals match your filters.</p>';
      } else {
        matches.forEach(function (entry) {
          resultContainer.appendChild(renderGalleryCard(entry));
        });
      }
    }
    updateResultCount(matches.length + ' visual' + (matches.length === 1 ? '' : 's') + ' found');
  }

  function updateResultCount(text) {
    var el = document.getElementById('filter-results');
    if (el) el.textContent = text;
  }

  if (searchInput) searchInput.addEventListener('input', runFilter);

  document.querySelectorAll('.filter-chip[data-course]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      setActiveChips('.filter-chip[data-course]', chip);
      activeCourse = chip.dataset.course;
      runFilter();
    });
  });

  document.querySelectorAll('.filter-chip[data-visual]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      setActiveChips('.filter-chip[data-visual]', chip);
      activeVisualType = chip.dataset.visual;
      runFilter();
    });
  });

  if (options.runOnLoad) runFilter();
}

function initIllustrationsPage() {
  var grid = document.getElementById('illustrations-grid');
  if (!grid) return;
  var entries = filterEntries({ visualType: 'raster' });
  grid.innerHTML = '';
  if (!entries.length) {
    grid.innerHTML = '<p class="empty-state">No reviewed illustrations yet. Schematics remain in the topic categories above.</p>';
    return;
  }
  entries.forEach(function (entry) {
    grid.appendChild(renderGalleryCard(entry));
  });
  var countEl = document.getElementById('illustration-count');
  if (countEl) countEl.textContent = String(entries.length);
}

function populateCategoryCounts() {
  document.querySelectorAll('[data-cat-count]').forEach(function (el) {
    el.textContent = getCategoryCount(el.dataset.catCount);
  });
  var illusCount = document.getElementById('hub-illustration-count');
  if (illusCount) illusCount.textContent = String(getVisualTypeCount('raster'));
}

document.addEventListener('DOMContentLoaded', function () {
  populateCategoryCounts();
  var page = document.body.dataset.page;
  if (page === 'hub') initFilterBar({ hideCategoriesWhenFiltering: true });
  if (page === 'illustrations') initIllustrationsPage();
  if (page === 'category') renderGallery(document.body.dataset.category);
});
