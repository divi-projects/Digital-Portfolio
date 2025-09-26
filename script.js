// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const getPreferred = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (mode) => {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    if (themeMeta) themeMeta.setAttribute('content', mode === 'light' ? '#f7fafc' : '#0a192f');
    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) icon.className = mode === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      const isLight = mode === 'light';
      btn.setAttribute('aria-pressed', String(isLight));
      btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      btn.title = isLight ? 'Switch to dark' : 'Switch to light';
    }
  };

  setTheme(getPreferred());
  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
});

// Mobile nav
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  const toggleMenu = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    const nextOpen = !isOpen;
    hamburger.setAttribute('aria-expanded', String(nextOpen));
    hamburger.setAttribute('aria-label', nextOpen ? 'Close menu' : 'Open menu');
    navLinks.classList.toggle('show', nextOpen);
    document.body.classList.toggle('no-scroll', nextOpen);
  };

  hamburger.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('show')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        navLinks.classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  document.addEventListener('click', (e) => {
    const withinMenu = navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!withinMenu && navLinks.classList.contains('show')) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      navLinks.classList.remove('show');
      document.body.classList.remove('no-scroll');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      navLinks.classList.remove('show');
      document.body.classList.remove('no-scroll');
    }
  });
});

// Typed text
document.addEventListener('DOMContentLoaded', () => {
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  const words = ['AI Engineer', 'Web Developer', 'Tech Enthusiast'];
  let w = 0, c = 0, del = false;

  const typeLoop = () => {
    const txt = words[w];

    if (!del && c <= txt.length) {
      typedEl.textContent = txt.slice(0, c++);
      setTimeout(typeLoop, 120);
    } else if (del && c >= 0) {
      typedEl.textContent = txt.slice(0, c--);
      setTimeout(typeLoop, 70);
    } else {
      del = !del;
      if (!del) w = (w + 1) % words.length;
      setTimeout(typeLoop, del ? 900 : 300);
    }
  };

  typeLoop();
});

// Animations (GSAP)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-left h1, .hero-tagline, .hero-cta', {
    opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: 'power2.out'
  });
  gsap.from('.avatar', { opacity: 0, x: 60, duration: 1.1, delay: 0.2, ease: 'power2.out' });

  gsap.from('.about-text, .about-image', {
    scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
    opacity: 0, y: 40, duration: 0.9, stagger: 0.25, ease: 'power2.out'
  });

  const line = document.querySelector('.timeline-line');
  if (line) {
    gsap.to(line, {
      scrollTrigger: { trigger: '#skills', start: 'top 70%', once: true },
      scaleY: 1, duration: 1.4, ease: 'power2.out'
    });
  }
  gsap.utils.toArray('.timeline-item').forEach((item) => {
    const isLeft = item.classList.contains('left');
    gsap.from(item.querySelector('.timeline-card'), {
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      x: isLeft ? -60 : 60, opacity: 0, duration: 0.9, ease: 'power3.out'
    });
    gsap.from(item.querySelector('.timeline-dot'), {
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      scale: 0, duration: 0.5, ease: 'back.out(1.8)'
    });
  });

  gsap.from('.project-card', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.9, stagger: 0.18, ease: 'power2.out'
  });
  gsap.from('.project-tags .chip', {
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
    y: 18, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'back.out(1.7)'
  });

  gsap.from('.contact-form, .contact-links a', {
    scrollTrigger: { trigger: '.contact-section', start: 'top 85%' },
    opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power2.out'
  });

  gsap.from('.footer', {
    scrollTrigger: { trigger: '.footer', start: 'top 95%' },
    opacity: 0, y: 30, duration: 0.9, ease: 'power2.out'
  });

  if (typeof SplitType !== 'undefined') {
    const headings = document.querySelectorAll('.section-title, #intro-heading');
    headings.forEach(h => {
      const split = new SplitType(h, { types: 'words' });
      gsap.from(split.words, {
        scrollTrigger: { trigger: h, start: 'top 85%' },
        yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out'
      });
    });
  }
});

// Parallax blobs
document.addEventListener('DOMContentLoaded', () => {
  const blobs = document.querySelectorAll('.bg-aurora span');
  if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Skip parallax on touch/coarse pointers
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  let targetX = 0, targetY = 0;
  let currX = 0, currY = 0;

  const onMove = (x, y) => {
    const nx = (x / window.innerWidth) - 0.5;
    const ny = (y / window.innerHeight) - 0.5;
    targetX = nx; targetY = ny;
  };

  window.addEventListener('pointermove', (e) => onMove(e.clientX, e.clientY), { passive: true });

  const tick = () => {
    currX += (targetX - currX) * 0.06;
    currY += (targetY - currY) * 0.06;

    blobs.forEach((el, i) => {
      const strength = (i + 1) * 1.2;
      const lim = 2.5;
      const tx = Math.max(-lim, Math.min(lim, currX * strength));
      const ty = Math.max(-lim, Math.min(lim, currY * strength));
      el.style.translate = `${tx.toFixed(2)}vw ${ty.toFixed(2)}vh`;
    });

    requestAnimationFrame(tick);
  };
  tick();
});

// Active link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('.site-header .nav-link')];
  if (!sections.length || !links.length) return;

  const linkFor = (id) => links.find(a => a.getAttribute('href') === `#${id}`);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = linkFor(id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.remove('active');
          l.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });

  sections.forEach(sec => observer.observe(sec));
});

// Contact form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if (name && email && message) {
      alert('Thanks for reaching out! I will get back to you soon.');
      if (window.confetti) {
        confetti({ particleCount: 120, spread: 60, origin: { y: 0.8 } });
      }
      form.reset();
    } else {
      alert('Please fill out all fields.');
    }
  });
});

// Progress bars animate in view
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.progress .bar[data-perc]');
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const perc = Math.max(0, Math.min(100, parseInt(bar.dataset.perc || '0', 10)));
        bar.style.width = perc + '%';
        observer.unobserve(bar);
      }
    });
  }, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });

  bars.forEach(b => obs.observe(b));
});

// Tilt effects
document.addEventListener('DOMContentLoaded', () => {
  if (!window.VanillaTilt) return;
  // Skip tilt on touch/coarse pointers
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.project-card, .timeline-card');
  if (cards.length) {
    VanillaTilt.init(cards, { max: 8, speed: 400, glare: true, "max-glare": 0.12, gyroscope: true });
  }
  const avatar = document.querySelector('.avatar');
  if (avatar) {
    VanillaTilt.init(avatar, { max: 6, speed: 300, glare: false, gyroscope: true });
  }
});

// Button magnet micro-interaction
document.addEventListener('DOMContentLoaded', () => {
  const mags = document.querySelectorAll('.btn');
  mags.forEach(btn => {
    const strength = 18;
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
});

// Custom cursor (desktop)
document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  document.body.classList.add('cursor-ready');

  let x = 0, y = 0, rx = 0, ry = 0;
  const raf = () => {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(raf);
  };
  window.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
  raf();

  const hoverables = document.querySelectorAll('a, .btn, .project-card, .timeline-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.opacity = '0.9'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '26px'; ring.style.height = '26px'; ring.style.opacity = '0.6'; });
  });
});

// Command palette (Ctrl/Cmd + K)
document.addEventListener('DOMContentLoaded', () => {
  const pal = document.getElementById('cmdk');
  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');
  if (!pal || !input || !list) return;

  const items = [
    { label: 'Home', action: () => location.hash = '#hero' },
    { label: 'About', action: () => location.hash = '#about' },
    { label: 'Skills', action: () => location.hash = '#skills' },
    { label: 'Projects', action: () => location.hash = '#projects' },
    { label: 'Contact', action: () => location.hash = '#contact' },
    { label: 'Open GitHub', action: () => window.open('https://github.com/divi-projects', '_blank', 'noopener') },
    { label: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/divyansh-gupta-352614370/', '_blank', 'noopener') },
    { label: 'Compose Email', action: () => window.location.href = 'mailto:divyanshgupta103@gmail.com' },
    { label: 'Download Resume', action: () => window.open('resume.pdf', '_blank') },
    { label: 'Toggle Theme', action: () => document.querySelector('.theme-toggle')?.click() }
  ];

  let filtered = items.slice();

  const show = () => {
    pal.style.display = 'grid';
    pal.setAttribute('aria-hidden', 'false');
    input.value = '';
    render('');
    input.focus();
  };
  const hide = () => {
    pal.style.display = 'none';
    pal.setAttribute('aria-hidden', 'true');
  };
  const render = (q) => {
    const ql = (q || '').toLowerCase();
    filtered = items.filter(i => i.label.toLowerCase().includes(ql));
    list.innerHTML = filtered.map((i, idx) => `<li role="option" tabindex="0" data-idx="${idx}">${i.label}</li>`).join('');
    list.querySelectorAll('li').forEach((li, idx) => {
      li.addEventListener('click', () => { filtered[idx].action(); hide(); });
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); filtered[idx].action(); hide(); }
      });
    });
  };

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      pal.style.display === 'grid' ? hide() : show();
    }
    if (e.key === 'Escape' && pal.style.display === 'grid') hide();
  });
  pal.addEventListener('click', (e) => { if (e.target === pal) hide(); });
  input.addEventListener('input', (e) => render(e.target.value));
});
