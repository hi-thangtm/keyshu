/* =========================================================
   HERO SLIDER (Banner chính)
========================================================= */
const heroSlides = document.querySelectorAll('.hero-slider .slide');
const heroDots = document.querySelectorAll('.hero-slider .dot');
const heroPrevBtn = document.querySelector('.hero-slider .prev');
const heroNextBtn = document.querySelector('.hero-slider .next');

let heroCurrentSlide = 0;
let heroAutoSlide = null;

function showHeroSlide(index) {
  if (!heroSlides.length || !heroDots.length) return;

  heroSlides.forEach(slide => slide.classList.remove('active'));
  heroDots.forEach(dot => dot.classList.remove('active'));

  heroSlides[index].classList.add('active');
  heroDots[index].classList.add('active');
  heroCurrentSlide = index;
}

function nextHeroSlide() {
  if (!heroSlides.length) return;
  const newIndex = (heroCurrentSlide + 1) % heroSlides.length;
  showHeroSlide(newIndex);
}

function prevHeroSlide() {
  if (!heroSlides.length) return;
  const newIndex = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(newIndex);
}

function startHeroAutoSlide() {
  if (!heroSlides.length) return;
  heroAutoSlide = setInterval(nextHeroSlide, 4000);
}

function resetHeroAutoSlide() {
  clearInterval(heroAutoSlide);
  startHeroAutoSlide();
}

if (heroNextBtn) {
  heroNextBtn.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroAutoSlide();
  });
}

if (heroPrevBtn) {
  heroPrevBtn.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroAutoSlide();
  });
}

heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showHeroSlide(index);
    resetHeroAutoSlide();
  });
});

if (heroSlides.length && heroDots.length) {
  showHeroSlide(heroCurrentSlide);
  startHeroAutoSlide();
}


/* =========================================================
   COMBO SLIDER
========================================================= */
const comboSlider = document.getElementById('comboSlider');
const comboPrev = document.querySelector('.combo-prev');
const comboNext = document.querySelector('.combo-next');

if (comboSlider && comboPrev && comboNext) {
  const getComboScrollAmount = () => {
    const card = comboSlider.querySelector('.combo-card');
    if (!card) return 300;

    const style = window.getComputedStyle(comboSlider);
    const gap = parseInt(style.columnGap || style.gap || 20, 10);
    return card.offsetWidth + gap;
  };

  comboNext.addEventListener('click', () => {
    comboSlider.scrollBy({
      left: getComboScrollAmount(),
      behavior: 'smooth'
    });
  });

  comboPrev.addEventListener('click', () => {
    comboSlider.scrollBy({
      left: -getComboScrollAmount(),
      behavior: 'smooth'
    });
  });
}


/* =========================================================
   FLASH SALE SLIDER
========================================================= */
const flashsaleSlider = document.getElementById('flashsaleSlider');
const flashsalePrev = document.querySelector('.flashsale-prev');
const flashsaleNext = document.querySelector('.flashsale-next');

if (flashsaleSlider) {
  let flashsaleAutoSlideInterval = null;
  const flashsaleSpeed = 1500;

  const getFlashsaleScrollAmount = () => {
    const card = flashsaleSlider.querySelector('.flashsale-card');
    if (!card) return 300;

    const gap = parseInt(getComputedStyle(flashsaleSlider).gap || 16, 10);
    return card.offsetWidth + gap;
  };

  const nextFlashsaleSlide = () => {
    const maxScroll = flashsaleSlider.scrollWidth - flashsaleSlider.clientWidth;

    if (flashsaleSlider.scrollLeft >= maxScroll - 5) {
      flashsaleSlider.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      flashsaleSlider.scrollBy({
        left: getFlashsaleScrollAmount(),
        behavior: 'smooth'
      });
    }
  };

  const prevFlashsaleSlide = () => {
    flashsaleSlider.scrollBy({
      left: -getFlashsaleScrollAmount(),
      behavior: 'smooth'
    });
  };

  const startFlashsaleAutoSlide = () => {
    flashsaleAutoSlideInterval = setInterval(nextFlashsaleSlide, flashsaleSpeed);
  };

  const stopFlashsaleAutoSlide = () => {
    clearInterval(flashsaleAutoSlideInterval);
  };

  startFlashsaleAutoSlide();

  flashsaleSlider.addEventListener('mouseenter', stopFlashsaleAutoSlide);
  flashsaleSlider.addEventListener('mouseleave', startFlashsaleAutoSlide);

  if (flashsaleNext) {
    flashsaleNext.addEventListener('click', () => {
      nextFlashsaleSlide();
      stopFlashsaleAutoSlide();
      startFlashsaleAutoSlide();
    });
  }

  if (flashsalePrev) {
    flashsalePrev.addEventListener('click', () => {
      prevFlashsaleSlide();
      stopFlashsaleAutoSlide();
      startFlashsaleAutoSlide();
    });
  }
}


/* =========================================================
   COUNTDOWN
========================================================= */
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

if (daysEl && hoursEl && minutesEl && secondsEl) {
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 2);

  const updateCountdown = () => {
    const now = new Date();
    const diff = endTime - now;

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}


/* =========================================================
   BESTSELLER TABS
========================================================= */
const bestsellerMenuItems = document.querySelectorAll('.bestseller-menu-item');
const bestsellerContents = document.querySelectorAll('.bestseller-products[data-content]');

if (bestsellerMenuItems.length && bestsellerContents.length) {
  bestsellerMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');

      bestsellerMenuItems.forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');

      bestsellerContents.forEach(content => {
        content.classList.toggle(
          'active',
          content.getAttribute('data-content') === target
        );
      });
    });
  });
}


/* =========================================================
   DOM READY
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  /* =========================
     KOL VIDEO
  ========================= */
  const kolCards = document.querySelectorAll('.kol-lux-card');
  const kolVideos = document.querySelectorAll('.kol-lux-video');

  if (kolVideos.length) {
    const isMobile = () => window.innerWidth <= 767;
    let mobileObserver = null;

    const stopAllKolVideos = () => {
      kolVideos.forEach(video => {
        video.pause();
        video.closest('.kol-lux-card')?.classList.remove('is-playing');
      });
    };

    const playKolVideo = (video) => {
      stopAllKolVideos();

      const playPromise = video.play();
      video.closest('.kol-lux-card')?.classList.add('is-playing');

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.closest('.kol-lux-card')?.classList.remove('is-playing');
        });
      }
    };

    kolVideos.forEach(video => {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
    });

    kolCards.forEach(card => {
      const video = card.querySelector('.kol-lux-video');
      if (!video) return;

      card.addEventListener('mouseenter', () => {
        if (!isMobile()) playKolVideo(video);
      });

      card.addEventListener('mouseleave', () => {
        if (!isMobile()) {
          video.pause();
          card.classList.remove('is-playing');
        }
      });
    });

    const setupMobileAutoplay = () => {
      if (mobileObserver) {
        mobileObserver.disconnect();
        mobileObserver = null;
      }

      stopAllKolVideos();

      if (!isMobile()) return;

      mobileObserver = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (!visibleEntries.length) return;

          playKolVideo(visibleEntries[0].target);
        },
        {
          threshold: [0.35, 0.6, 0.85]
        }
      );

      kolVideos.forEach(video => mobileObserver.observe(video));
    };

    setupMobileAutoplay();
    window.addEventListener('resize', setupMobileAutoplay);
  }

  /* =========================
     BEAUTY BLOG TABS + REVEAL
  ========================= */
  const blogTabs = document.querySelectorAll('.blog-tab');
  const blogContents = document.querySelectorAll('.beauty-blog-content');

  if (blogTabs.length && blogContents.length) {
    let blogRevealObserver;

    function observeRevealItems() {
      const currentRevealItems = document.querySelectorAll(
        '.beauty-blog-content.active .reveal-item'
      );

      if (blogRevealObserver) blogRevealObserver.disconnect();

      blogRevealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('is-visible');
              }, index * 80);
            }
          });
        },
        {
          threshold: 0.15
        }
      );

      currentRevealItems.forEach(item => {
        item.classList.remove('is-visible');
        blogRevealObserver.observe(item);
      });
    }

    blogTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        blogTabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');

        blogContents.forEach(content => {
          content.classList.toggle(
            'active',
            content.getAttribute('data-content') === target
          );
        });

        setTimeout(() => {
          observeRevealItems();
        }, 50);
      });
    });

    observeRevealItems();
  }

  /* =========================
     STORY ITEM REVEAL
  ========================= */
  const storyItems = document.querySelectorAll('.story-item');

  if (storyItems.length) {
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    storyItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'all 0.6s ease';
      storyObserver.observe(item);
    });
  }

  /* =========================
     NEWSLETTER FORM + TOAST
  ========================= */
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');

  if (form && emailInput) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showToast('Vui lòng nhập email của bạn.', 'error');
        emailInput.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        showToast('Email chưa đúng định dạng.', 'error');
        emailInput.focus();
        return;
      }

      showToast('Đăng ký nhận tin thành công!', 'success');
      form.reset();
    });
  }

  function showToast(message, type = 'success') {
    const oldToast = document.querySelector('.kf-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = `kf-toast ${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
});
/* =========================================================
   FIXED HEADER
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header.site-header--premium');
  if (!header) return;

  let isScrolled = false;

  function setHeaderOffset() {
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
  }

  function handleHeaderScroll() {
    const shouldBeScrolled = window.scrollY > 20;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      header.classList.toggle('is-scrolled', shouldBeScrolled);
      requestAnimationFrame(setHeaderOffset);
      return;
    }

    if (!isScrolled) {
      setHeaderOffset();
    }
  }

  const mobileMenuToggle = header.querySelector('.mobile-menu-toggle');
  const mobileMenuClose = header.querySelector('.mobile-menu-close');
  const mobileMenuOverlay = header.querySelector('.mobile-menu-overlay');
  const mobileMenuLinks = header.querySelectorAll('.mobile-menu-nav a');

  function closeMobileMenu() {
    header.classList.remove('mobile-menu-open');
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      header.classList.add('mobile-menu-open');
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuLinks.length) {
    mobileMenuLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  setHeaderOffset();
  handleHeaderScroll();

  window.addEventListener('resize', setHeaderOffset);
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("comboLookbookSlider");
  const prevBtn = document.querySelector(".combo-lookbook-prev");
  const nextBtn = document.querySelector(".combo-lookbook-next");
  const dotsWrap = document.getElementById("comboLookbookDots");
  const cards = slider ? slider.querySelectorAll(".combo-lookbook-card") : [];

  if (!slider || !cards.length) return;

  let currentPage = 0;
  let autoSlide;

  function getGap() {
    return 26;
  }

  function getCardsPerPage() {
    return window.innerWidth <= 991 ? 1 : 2;
  }

  function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerPage());
  }

  function getScrollAmount() {
    const cardWidth = cards[0].offsetWidth;
    return (cardWidth + getGap()) * getCardsPerPage();
  }

  function goToPage(index) {
    const totalPages = getTotalPages();
    currentPage = Math.max(0, Math.min(index, totalPages - 1));

    slider.scrollTo({
      left: currentPage * getScrollAmount(),
      behavior: "smooth"
    });

    updateDots();
  }

  function nextSlide() {
    const totalPages = getTotalPages();
    currentPage = (currentPage + 1) % totalPages;
    goToPage(currentPage);
  }

  function prevSlideFn() {
    const totalPages = getTotalPages();
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    goToPage(currentPage);
  }

  function createDots() {
    dotsWrap.innerHTML = "";
    const totalPages = getTotalPages();

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      if (i === currentPage) dot.classList.add("active");

      dot.addEventListener("click", function () {
        goToPage(i);
        resetAutoSlide();
      });

      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll("button");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlideFn();
      resetAutoSlide();
    });
  }

  slider.addEventListener("mouseenter", function () {
    clearInterval(autoSlide);
  });

  slider.addEventListener("mouseleave", function () {
    startAutoSlide();
  });

  window.addEventListener("resize", function () {
    currentPage = 0;
    createDots();
    goToPage(0);
  });

  createDots();
  startAutoSlide();
});

  (function () {
    const slider = document.getElementById("ksBannerSlider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".ks-banner-slide");
    const dots = slider.querySelectorAll(".ks-banner-dot");
    const prevBtn = slider.querySelector(".ks-banner-prev");
    const nextBtn = slider.querySelector(".ks-banner-next");

    let currentIndex = 0;
    let autoSlide;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentIndex = index;
    }

    function nextSlide() {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlideFn() {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    function startAutoSlide() {
      autoSlide = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    nextBtn.addEventListener("click", function () {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    prevBtn.addEventListener("click", function () {
      prevSlideFn();
      stopAutoSlide();
      startAutoSlide();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    showSlide(0);
    startAutoSlide();
  })();
