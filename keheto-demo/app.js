document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.kht-menu-toggle');
  const nav = document.querySelector('.kht-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('kht-menu-open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      document.body.classList.remove('kht-menu-open');
    });
  });
});
