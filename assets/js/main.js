/**
* Template Name: Clarity
* Template URL: https://bootstrapmade.com/clarity-bootstrap-agency-template/
* Updated: Sep 13 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * layanan.js
 * Skrip tambahan khusus halaman layanan.html.
 * Dimuat SETELAH main.js.
 *
 * Fungsi: menjaga menu "Layanan" (induk dropdown) tetap berstatus aktif.
 * Scrollspy bawaan di main.js menandai tautan dropdown (#social-media, dst.)
 * saat section terlihat, tetapi sekaligus mencabut status aktif dari semua
 * tautan menu lain, termasuk induknya. Skrip ini mengembalikannya.
 */
(function () {
  "use strict";

  const parentLink = document.querySelector("#navmenu li.nav-layanan > a");
  if (!parentLink) return;

  function keepParentActive() {
    parentLink.classList.add("active");
  }

  window.addEventListener("load", keepParentActive);
  document.addEventListener("scroll", keepParentActive);
})();

/**
 * portofolio.js
 * Skrip tambahan khusus halaman portofolio.html.
 * Dimuat SETELAH main.js.
 *
 * Fungsi: memperbarui keterangan "Menampilkan X dari Y proyek"
 * setiap kali filter kategori diklik. Proses penyaringan kartu sendiri
 * ditangani Isotope di main.js.
 */
(function () {
  "use strict";

  const countEl = document.getElementById("portfolio-count");
  const filters = document.querySelectorAll(".portfolio .isotope-filters li");
  const items = document.querySelectorAll(".portfolio .portfolio-item");
  if (!countEl || !filters.length || !items.length) return;

  const total = items.length;

  function update(filter) {
    const visible = filter === "*"
      ? total
      : document.querySelectorAll(".portfolio-item" + filter).length;
    countEl.innerHTML = "Menampilkan <strong>" + visible + "</strong> dari " + total + " proyek";
  }

  filters.forEach(function (li) {
    li.addEventListener("click", function () {
      update(li.getAttribute("data-filter") || "*");
    });
  });
})();

/**
 * blog.js
 * Skrip tambahan khusus halaman blog.html. Dimuat SETELAH main.js.
 *
 * Fungsi:
 * 1) Memfilter artikel berdasarkan kategori (sidebar atau label di kartu).
 * 2) Mencari artikel berdasarkan judul dan ringkasan.
 * 3) Mendukung tautan langsung ke kategori, misalnya: blog.html?kategori=seo
 */
(function () {
  "use strict";

  const items = Array.from(document.querySelectorAll(".blog .blog-item"));
  const categoryButtons = Array.from(document.querySelectorAll(".blog .category-item"));
  const cardLabels = Array.from(document.querySelectorAll(".blog .post-category"));
  const searchForm = document.querySelector(".blog .blog-search");
  const searchInput = document.getElementById("blog-search");
  const resultEl = document.getElementById("blog-result");
  const emptyEl = document.getElementById("blog-empty");
  if (!items.length) return;

  const validCategories = categoryButtons.map(function (b) { return b.dataset.category; });
  const state = { category: "all", query: "" };

  function apply() {
    const q = state.query.trim().toLowerCase();
    let visible = 0;

    items.forEach(function (item) {
      const matchCategory = state.category === "all" || item.dataset.category === state.category;
      const text = (item.textContent || "").toLowerCase();
      const matchQuery = !q || text.indexOf(q) !== -1;
      const show = matchCategory && matchQuery;
      item.hidden = !show;
      if (show) visible++;
    });

    categoryButtons.forEach(function (btn) {
      const active = btn.dataset.category === state.category;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (resultEl) {
      resultEl.innerHTML = "Menampilkan <strong>" + visible + "</strong> dari " + items.length + " artikel";
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  function setCategory(cat) {
    state.category = validCategories.indexOf(cat) !== -1 ? cat : "all";
    apply();
  }

  categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { setCategory(btn.dataset.category); });
  });

  cardLabels.forEach(function (btn) {
    btn.addEventListener("click", function () { setCategory(btn.dataset.category); });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      apply();
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  // Tautan langsung ke kategori: blog.html?kategori=seo
  const param = new URLSearchParams(window.location.search).get("kategori");
  if (param) state.category = validCategories.indexOf(param) !== -1 ? param : "all";

  apply();
})();

/**
 * tanya-jawab.js
 * Skrip tambahan khusus halaman tanya-jawab.html. Dimuat SETELAH main.js.
 * (Buka-tutup jawaban ditangani komponen collapse Bootstrap.)
 *
 * Fungsi:
 * 1) Memfilter pertanyaan berdasarkan kategori.
 * 2) Mencari pertanyaan berdasarkan kata kunci (pertanyaan dan jawaban).
 * 3) Mendukung tautan langsung ke kategori, misalnya: tanya-jawab.html?kategori=biaya
 */
(function () {
  "use strict";

  const items = Array.from(document.querySelectorAll(".faq .faq-item"));
  const filters = Array.from(document.querySelectorAll(".faq .faq-filter"));
  const form = document.querySelector(".faq .faq-search");
  const input = document.getElementById("faq-search");
  const resultEl = document.getElementById("faq-result");
  const emptyEl = document.getElementById("faq-empty");
  if (!items.length) return;

  const validCategories = filters.map(function (f) { return f.dataset.category; });
  const state = { category: "all", query: "" };

  function apply() {
    const q = state.query.trim().toLowerCase();
    let visible = 0;

    items.forEach(function (item) {
      const matchCategory = state.category === "all" || item.dataset.category === state.category;
      const matchQuery = !q || (item.textContent || "").toLowerCase().indexOf(q) !== -1;
      const show = matchCategory && matchQuery;
      item.hidden = !show;
      if (show) visible++;
    });

    filters.forEach(function (f) {
      const active = f.dataset.category === state.category;
      f.classList.toggle("active", active);
      f.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (resultEl) {
      resultEl.innerHTML = "Menampilkan <strong>" + visible + "</strong> dari " + items.length + " pertanyaan";
    }
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      state.category = f.dataset.category;
      apply();
    });
  });

  if (input) {
    input.addEventListener("input", function () {
      state.query = input.value;
      apply();
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  const param = new URLSearchParams(window.location.search).get("kategori");
  if (param && validCategories.indexOf(param) !== -1) state.category = param;

  apply();
})();