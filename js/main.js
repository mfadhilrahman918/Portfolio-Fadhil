(function () {
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var c = document.getElementById('bh'), x = c.getContext('2d'), W, H, mx = 0, my = 0, t = 0, P = [], rafId = null;
  function rs() { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight }
  rs(); addEventListener('resize', rs);
  for (var i = 0; i < 260; i++)P.push({ a: Math.random() * 6.28, r: .55 + Math.random() * .7, s: .002 + Math.random() * .004, z: Math.random() });
  function draw() {
    var hole = (getComputedStyle(c).getPropertyValue('--hole') || '34,211,238').trim();
    x.fillStyle = '#000'; x.fillRect(0, 0, W, H);
    var R = Math.min(W, H) * .22, cx = W * .66 + mx * 18, cy = H * .46 + my * 12;
    x.save(); x.translate(cx, cy); x.rotate(-.35);
    for (var k = 0; k < 46; k++) { var rr = R * (1.08 + k * .032), al = .55 * (1 - k / 46); x.beginPath(); x.ellipse(0, 0, rr * 1.9, rr * .42, 0, 0, 6.283); x.strokeStyle = 'rgba(' + hole + ',' + al.toFixed(3) + ')'; x.lineWidth = 1.4; x.stroke() }
    P.forEach(function (p) { p.a += p.s; var rr = R * (1.1 + p.r * 1.2), px = Math.cos(p.a) * rr * 1.9, py = Math.sin(p.a) * rr * .42; x.fillStyle = 'rgba(' + hole + ',' + (.25 + p.z * .6) + ')'; x.fillRect(px, py, 1.6, 1.6) });
    x.restore();
    var g = x.createRadialGradient(cx, cy, R * .8, cx, cy, R * 1.5); g.addColorStop(0, 'rgba(' + hole + ',.55)'); g.addColorStop(1, 'rgba(' + hole + ',0)');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.5, 0, 6.283); x.fill();
    x.fillStyle = '#000'; x.beginPath(); x.arc(cx, cy, R, 0, 6.283); x.fill();
    x.strokeStyle = 'rgba(' + hole + ',.9)'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, R, 0, 6.283); x.stroke();
    var gl = x.createLinearGradient(0, 0, W * .7, 0); gl.addColorStop(0, 'rgba(0,0,0,.92)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gl; x.fillRect(0, 0, W, H);
    if (!rm) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(draw);
    }
  }
  draw();
  document.querySelector('.hero').addEventListener('mousemove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; if (rm) draw() });

  var w = ['Rekayasa Perangkat Lunak', 'Computer Vision Enthusiast', 'AI Learner'], wi = 0, ci = 0, del = false, tx = document.getElementById('tx');
  function ty() {
    var s = w[wi]; tx.textContent = s.slice(0, ci);
    if (rm) { tx.textContent = w[0]; return }
    if (!del && ci < s.length) { ci++; setTimeout(ty, 70) } else if (!del) { del = true; setTimeout(ty, 1400) } else if (ci > 0) { ci--; setTimeout(ty, 35) } else { del = false; wi = (wi + 1) % w.length; setTimeout(ty, 300) }
  }
  ty();

  var typBox = document.querySelector('.typ');
  if (typBox) {
    typBox.addEventListener('mousedown', function (e) { e.preventDefault(); });
  }

  // Render kartu proyek dari data js/projects.js
  function renderProjects() {
    var grid = document.getElementById('project-grid');
    if (!grid) return;
    var list = window.projectsData || [];
    grid.innerHTML = list.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="chip" tabindex="0" role="button" aria-label="Filter ' + t + '">' + t + '</span>';
      }).join('');
      var badge = p.placeholder
        ? '<span class="badge-placeholder">Contoh, belum diganti</span>'
        : '';
      var img = p.image
        ? '<img src="' + p.image + '" alt="' + p.title + '" onerror="this.parentElement.innerHTML=\'<div class=\\\'no-img\\\'>Gambar menyusul</div>\'">'
        : '<div class="no-img">Gambar menyusul</div>';
      var filterKey = ((p.tags || []).concat(p.category || '')).join(' ').toLowerCase();
      return '<article class="card rv" data-t="' + filterKey + '" data-category="' + (p.category || '') + '">' +
        badge +
        '<div class="th">' + img + '</div>' +
        '<div class="bd">' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + p.summary + '</p>' +
        '<div class="meta">' + tags + '</div>' +
        '</div>' +
        '</article>';
    }).join('');
  }
  renderProjects();

  // Klik tag di kartu proyek untuk mengaktifkan filter terkait dan scroll ke section Proyek
  var gridEl = document.getElementById('project-grid');
  if (gridEl) {
    function filterByTag(chip) {
      var tag = chip.textContent.trim().toLowerCase();
      var filterBtns = document.querySelectorAll('#flt button');
      var targetBtn = null;

      filterBtns.forEach(function (btn) {
        var f = (btn.dataset.f || '').toLowerCase();
        var label = btn.textContent.trim().toLowerCase();
        if (label === tag) {
          targetBtn = btn;
        } else if (tag.indexOf('python') >= 0 && f === 'py') {
          targetBtn = btn;
        } else if ((tag.indexOf('vision') >= 0 || tag.indexOf('yolo') >= 0) && f === 'cv') {
          targetBtn = btn;
        } else if ((tag.indexOf('ui') >= 0 || tag.indexOf('canva') >= 0) && f === 'ux') {
          targetBtn = btn;
        } else if (tag.indexOf('mysql') >= 0 && f === 'db') {
          targetBtn = btn;
        }
      });

      if (targetBtn) {
        targetBtn.click();
        var sec = document.getElementById('proyek');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }
    }

    gridEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.card .chip');
      if (chip) filterByTag(chip);
    });

    gridEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        var chip = e.target.closest('.card .chip');
        if (chip) {
          e.preventDefault();
          filterByTag(chip);
        }
      }
    });
  }

  // Interaksi Navbar: Sliding Segmented Control (iPhone Style)
  var navLinksContainer = document.querySelector('nav .links');
  var indicatorActive = document.querySelector('.nav-indicator-active');
  var indicatorHover = document.querySelector('.nav-indicator-hover');
  var navLinks = document.querySelectorAll('nav .links a');
  var currentActiveLink = null;
  var hoverFirstEntry = true;

  function moveIndicator(indicator, targetEl, animate) {
    if (!indicator || !targetEl) return;
    if (!animate) {
      indicator.classList.add('no-transition');
    }
    var left = targetEl.offsetLeft;
    var top = targetEl.offsetTop;
    var width = targetEl.offsetWidth;
    var height = targetEl.offsetHeight;

    indicator.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
    indicator.style.width = width + 'px';
    indicator.style.height = height + 'px';
    indicator.style.opacity = '1';

    if (!animate) {
      void indicator.offsetHeight;
      indicator.classList.remove('no-transition');
    }
  }

  function hideIndicator(indicator) {
    if (!indicator) return;
    indicator.style.opacity = '0';
  }

  function setActiveNavLink(targetLink, isInit) {
    currentActiveLink = targetLink;
    navLinks.forEach(function (link) {
      if (link === targetLink) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    if (targetLink) {
      var animate = !isInit && !matchMedia('(prefers-reduced-motion: reduce)').matches;
      moveIndicator(indicatorActive, targetLink, animate);
    } else {
      hideIndicator(indicatorActive);
    }
  }

  // Hover indicator interaction
  if (navLinksContainer && indicatorHover) {
    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        if (!matchMedia('(hover: hover)').matches) return;
        var animate = !hoverFirstEntry && !matchMedia('(prefers-reduced-motion: reduce)').matches;
        moveIndicator(indicatorHover, link, animate);
        hoverFirstEntry = false;
      });
    });

    navLinksContainer.addEventListener('mouseleave', function () {
      hideIndicator(indicatorHover);
      hoverFirstEntry = true;
    });
  }

  // a. Link yang baru saja diklik
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setActiveNavLink(link, false);
    });
  });

  // b. Link yang sesuai section yang sedang terlihat saat scroll (rootMargin: -40% 0px -55% 0px)
  var spySections = [];
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var sec = document.querySelector(href);
      if (sec) spySections.push({ link: link, sec: sec });
    }
  });

  if ('IntersectionObserver' in window && spySections.length > 0) {
    var scrollSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          var matched = document.querySelector('nav .links a[href="' + id + '"]');
          if (matched) setActiveNavLink(matched, false);
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });

    spySections.forEach(function (item) {
      scrollSpy.observe(item.sec);
    });

    var heroSec = document.getElementById('top') || document.querySelector('.hero');
    if (heroSec) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.boundingClientRect.top >= -100) {
            setActiveNavLink(null, false);
          }
        });
      }, {
        threshold: 0.5
      });
      heroObserver.observe(heroSec);
    }
  }

  // Initial placement & recalculate on resize / font ready
  function updateIndicators() {
    if (currentActiveLink) {
      moveIndicator(indicatorActive, currentActiveLink, false);
    }
  }

  window.addEventListener('resize', updateIndicators);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateIndicators);
  }

  if (location.hash) {
    var initLink = document.querySelector('nav .links a[href="' + location.hash + '"]');
    if (initLink) {
      setActiveNavLink(initLink, true);
    }
  }

  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); e.target.querySelectorAll('.bar i').forEach(function (b) { b.style.width = b.dataset.w + '%' }); io.unobserve(e.target) } }) }, { threshold: .15 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el) });

  document.getElementById('flt').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    this.querySelectorAll('button').forEach(function (x) { x.classList.remove('on') }); b.classList.add('on');
    document.querySelectorAll('.card').forEach(function (cd) { cd.classList.toggle('hide', b.dataset.f !== 'all' && cd.dataset.t.split(' ').indexOf(b.dataset.f) < 0) })
  });

  var tt = document.getElementById('tt');
  if (tt) {
    tt.addEventListener('click', function () {
      var r = document.documentElement, cur = r.dataset.theme || (matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
      r.dataset.theme = cur === 'dark' ? 'light' : 'dark';
      draw();
    });
  }
  var colorSchemeMedia = matchMedia('(prefers-color-scheme:light)');
  if (colorSchemeMedia.addEventListener) {
    colorSchemeMedia.addEventListener('change', function () { draw() });
  }

  document.getElementById('f').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = document.getElementById('n').value.trim(), em = document.getElementById('e').value.trim(), m = document.getElementById('m').value.trim(), er = document.getElementById('er'), ok = document.getElementById('ok'); ok.textContent = '';
    if (!n || !m) { er.textContent = 'Nama dan pesan wajib diisi.'; return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { er.textContent = 'Masukkan email yang valid.'; return }
    er.textContent = '';
    location.href = 'mailto:mfadhilrahman913@gmail.com?subject=' + encodeURIComponent('Pesan dari ' + n) + '&body=' + encodeURIComponent(m + '\n\n' + n + ' (' + em + ')');
    ok.textContent = 'Aplikasi email Anda akan terbuka. Terima kasih, ' + n + '!'
  });
})();