
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


function loadScript(src, cb) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.onload = () => cb && cb();
  s.onerror = () => console.warn('Failed to load:', src);
  document.head.appendChild(s);
}


document.addEventListener('DOMContentLoaded', () => {
  const initAnimations = () => {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      try { gsap.registerPlugin(ScrollTrigger); } catch(e) {}
    }

    
    gsap.from('.hero-left h1, .hero-tagline, .hero-cta', {
      opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: 'power2.out'
    });
    gsap.from('.avatar', { opacity: 0, x: 60, duration: 1.1, delay: 0.2, ease: 'power2.out' });

    
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.from('.about-text, .about-image', {
        scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.9, stagger: 0.25, ease: 'power2.out'
      });
    }

    
    const line = document.querySelector('.timeline-line');
    if (line && typeof ScrollTrigger !== 'undefined') {
      gsap.to(line, {
        scrollTrigger: { trigger: '#skills', start: 'top 70%', once: true },
        scaleY: 1, duration: 1.4, ease: 'power2.out'
      });
    }

    
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.batch('.timeline-item', {
        start: 'top 85%',
        interval: 0.12,
        batchMax: 3,
        once: true,
        onEnter: (batch) => {
          batch.forEach((item, idx) => {
            const isLeft = item.classList.contains('left');
            gsap.fromTo(
              item.querySelector('.timeline-card'),
              { opacity: 0, x: isLeft ? -60 : 60 },
              { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: idx * 0.08 }
            );
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
              gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(1.8)', delay: idx * 0.08 });
            }
          });
        }
      });
    }

    
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' },
        opacity: 0, y: 50, duration: 0.9, stagger: 0.18, ease: 'power2.out'
      });
    }

    
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.from('.contact-form, .contact-links a', {
        scrollTrigger: { trigger: '.contact-section', start: 'top 85%' },
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power2.out'
      });
      gsap.from('.footer', {
        scrollTrigger: { trigger: '.footer', start: 'top 95%' },
        opacity: 0, y: 30, duration: 0.9, ease: 'power2.out'
      });
    }

    
    if (typeof SplitType !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const headings = document.querySelectorAll('.section-title, #intro-heading');
      headings.forEach(h => {
        const split = new SplitType(h, { types: 'words' });
        gsap.from(split.words, {
          scrollTrigger: { trigger: h, start: 'top 85%' },
          yPercent: 120, opacity: 0, duration: 0.7, stagger: 0.03, ease: 'power3.out'
        });
      });
    }
  };

  
  const ensureGSAP = () => {
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') {
        try { gsap.registerPlugin(ScrollTrigger); } catch(e) {}
        initAnimations();
      } else {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', initAnimations);
      }
    } else {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', () => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', initAnimations);
      });
    }
  };

  ensureGSAP();
});


document.addEventListener('DOMContentLoaded', () => {
  const blobs = document.querySelectorAll('.bg-aurora span');
  if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
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
  }

  
  const sendBtn = document.querySelector('.contact-form .btn');
  if (sendBtn) {
    sendBtn.style.position = 'relative';
    sendBtn.style.overflow = 'hidden';
    sendBtn.addEventListener('pointerdown', (e) => {
      const rect = sendBtn.getBoundingClientRect();
      const r = document.createElement('span');
      r.style.position = 'absolute';
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top = (e.clientY - rect.top) + 'px';
      r.style.width = '0';
      r.style.height = '0';
      r.style.borderRadius = '50%';
      r.style.pointerEvents = 'none';
      r.style.transform = 'translate(-50%, -50%)';
      r.style.background = 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 40%, transparent 60%)';
      r.style.mixBlendMode = 'screen';
      r.style.animation = 'btn-ripple 650ms ease-out forwards';
      sendBtn.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  }
});


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


document.addEventListener('DOMContentLoaded', () => {
  if (!window.VanillaTilt) return;
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


document.addEventListener('DOMContentLoaded', () => {
  const heroName = document.querySelector('#intro-heading');
  const avatarImg = document.querySelector('.hero-image');

  if (heroName) {
    const cs = getComputedStyle(heroName);
    if (parseFloat(cs.opacity) < 0.5) heroName.style.opacity = '1';
    if (cs.transform && cs.transform !== 'none') heroName.style.transform = 'none';
  }

  ['.hero-tagline', '.avatar'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.5) el.style.opacity = '1';
      if (cs.transform && cs.transform !== 'none') el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  });

  if (avatarImg) {
    const ensureVisible = () => {
      avatarImg.style.opacity = '1';
      avatarImg.style.visibility = 'visible';
      avatarImg.style.transform = 'none';
    };

    if (avatarImg.complete) {
      if (!avatarImg.naturalWidth) {
        avatarImg.src = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=80';
      }
      ensureVisible();
    } else {
      avatarImg.addEventListener('load', ensureVisible, { once: true });
      avatarImg.addEventListener('error', () => {
        avatarImg.src = 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&auto=format&fit=crop&q=80';
        ensureVisible();
      }, { once: true });
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  const openMenu = () => {
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    navLinks.classList.add('show');
  };

  const closeMenu = () => {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    navLinks.classList.remove('show');
  };

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.contains('show') ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('show')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) closeMenu();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  
  const safeRefresh = () => {
    if (window.ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
      try { ScrollTrigger.refresh(true); } catch (e) {  }
    }
  };

  
  if (location.hash) {
    setTimeout(safeRefresh, 300);
  }

  
  window.addEventListener('load', () => {
    safeRefresh();
    
    setTimeout(safeRefresh, 150);
  });

  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      
      setTimeout(safeRefresh, 250);
    });
  });

  
  window.addEventListener('hashchange', () => {
    setTimeout(safeRefresh, 200);
  });

  
  const snapProjectsInView = () => {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    cards.forEach((el) => {
      const r = el.getBoundingClientRect();
      
      if (r.top < vh && r.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        
        el.style.transition = 'opacity .25s ease, transform .25s ease';
      }
    });
  };

  
  setTimeout(snapProjectsInView, 220);
  window.addEventListener('hashchange', () => setTimeout(snapProjectsInView, 220));
});