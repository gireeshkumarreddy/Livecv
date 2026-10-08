'use strict';

// Motion layer: scroll reveals, the expanding video, the header nav highlight and pointer effects.
// Runs after app.js, so the generated example cards already exist. Uses $, $$ and toast from app.js.

const motionOK = document.documentElement.classList.contains('js-motion');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Wraps each word of a heading in a mask so it can rise into place.
const splitWords = heading => {
 let index = 0;
 const parts = [];
 const wrap = content => {
  const outer = document.createElement('span'), inner = document.createElement('span');
  outer.className = 'w';
  inner.style.setProperty('--wi', index++);
  inner.append(content);
  outer.append(inner);
  return outer;
 };
 [...heading.childNodes].forEach(node => {
  if (node.nodeType === Node.TEXT_NODE) node.textContent.split(/(\s+)/).forEach(part => {if (part) parts.push(/^\s+$/.test(part) ? ' ' : wrap(part));});
  else parts.push(node.nodeName === 'BR' ? node : wrap(node));
 });
 heading.replaceChildren(...parts);
 heading.classList.add('words');
};

// ---------- Scroll reveals: fade up when entering, reset once fully below the viewport ----------
if (motionOK) {
 $$('.stagger').forEach(group => [...group.children].forEach((child, index) => child.style.setProperty('--i', index)));
 $$('main h1, main h2').forEach(splitWords);
 const reveals = $$('.reveal, .words');
 const enter = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
 }), {threshold: 0.12, rootMargin: '0px 0px -8% 0px'});
 const leave = new IntersectionObserver(entries => entries.forEach(entry => {
  // Only reset elements that dropped out through the bottom, so scrolling back down replays them.
  if (!entry.isIntersecting && entry.boundingClientRect.top > 0) entry.target.classList.remove('is-visible');
 }), {threshold: 0});
 const startReveals = () => reveals.forEach(el => {enter.observe(el); leave.observe(el);});
 // On the home page the intro plays first; the hero rises in as the logo lands in the header.
 if (document.documentElement.classList.contains('intro-playing')) {
  let started = false;
  const go = () => {if (!started) {started = true; startReveals();}};
  document.addEventListener('intro:reveal', go, {once: true});
  setTimeout(go, 7000);
 } else startReveals();
}

// ---------- Video: grows from a small frame to full screen while the section is pinned ----------
const videoSection = $('#video');
if (videoSection && motionOK) {
 let target = 0, current = 0, running = false;
 const measure = () => {
  const rect = videoSection.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  const raw = clamp(-rect.top / (travel * 0.75));
  target = raw * raw * (3 - 2 * raw);
 };
 const tick = () => {
  current += (target - current) * 0.16;
  if (Math.abs(target - current) < 0.0005) current = target;
  videoSection.style.setProperty('--p', current.toFixed(4));
  if (current !== target) requestAnimationFrame(tick); else running = false;
 };
 const onScroll = () => {measure(); if (!running) {running = true; requestAnimationFrame(tick);}};
 window.addEventListener('scroll', onScroll, {passive: true});
 window.addEventListener('resize', onScroll, {passive: true});
 onScroll();
}

// ---------- Color switch: the whole page turns blue while a marked section crosses the middle of the screen ----------
// 'is-blue-leaving' keeps section backgrounds out of the way while the page fades back, so nothing snaps.
const switchSections = $$('[data-color-switch]');
if (switchSections.length && 'IntersectionObserver' in window) {
 const root = document.documentElement, themeColor = $('meta[name="theme-color"]'), lightTheme = themeColor?.content;
 const active = new Set();
 let leaveTimer = 0;
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
  const blue = active.size > 0;
  if (blue === root.classList.contains('is-blue')) return;
  clearTimeout(leaveTimer);
  root.classList.toggle('is-blue', blue);
  root.classList.toggle('is-blue-leaving', !blue);
  if (!blue) leaveTimer = setTimeout(() => root.classList.remove('is-blue-leaving'), 650);
  if (themeColor) themeColor.content = blue ? '#0663fc' : lightTheme;
 }, {rootMargin: '-50% 0px -50% 0px'});
 switchSections.forEach(section => observer.observe(section));
}

// ---------- Header: sliding highlight on hover, current section when idle ----------
const nav = $('.desktop-nav'), navPill = $('.nav-pill');
if (nav && navPill) {
 const links = $$('a', nav);
 let current = links.find(link => link.getAttribute('aria-current') === 'page') || null;
 const moveTo = link => {
  if (!link) {navPill.classList.remove('is-shown'); return;}
  navPill.style.setProperty('--pill-x', `${link.offsetLeft - 14}px`);
  navPill.style.setProperty('--pill-w', `${link.offsetWidth + 28}px`);
  navPill.classList.add('is-shown');
 };
 links.forEach(link => link.addEventListener('pointerenter', () => moveTo(link)));
 nav.addEventListener('pointerleave', () => moveTo(current));
 const sections = links.map(link => $(link.getAttribute('href'))).filter(Boolean);
 const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   const link = links.find(a => a.getAttribute('href') === `#${entry.target.id}`);
   if (entry.isIntersecting) current = link;
   else if (current === link) current = null;
  });
  links.forEach(a => a.classList.toggle('is-current', a === current));
  if (!nav.matches(':hover')) moveTo(current);
 }, {rootMargin: '-45% 0px -50% 0px'});
 sections.forEach(section => spy.observe(section));
 if (current) requestAnimationFrame(() => moveTo(current));
 window.addEventListener('resize', () => {if (!nav.matches(':hover')) moveTo(current);}, {passive: true});
}

// ---------- Cards: 3D tilt toward the cursor with a soft spotlight ----------
const tiltCards = [['.step-ui', 7], ['.feature-card', 4], ['.example-card', 4], ['.comparison-card', 7], ['.mini-identity', 7], ['.faq-grid details', 3], ['.audience-card', 8], ['.share-destinations button', 10]];
if (motionOK && finePointer) {
 tiltCards.forEach(([selector, max]) => $$(selector).forEach(card => {
  card.classList.add('tilt');
  card.dataset.tilt = max;
  let rect = null, rectScroll = 0, frame = 0;
  const measure = () => {rect = card.getBoundingClientRect(); rectScroll = window.scrollY;};
  card.addEventListener('pointerenter', event => {if (event.pointerType !== 'mouse') return; measure(); card.classList.add('is-tilting');});
  card.addEventListener('pointermove', event => {
   if (event.pointerType !== 'mouse') return;
   if (!rect || rectScroll !== window.scrollY) measure();
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    const x = clamp((event.clientX - rect.left) / rect.width), y = clamp((event.clientY - rect.top) / rect.height);
    card.style.setProperty('--rx', `${((0.5 - y) * max).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${((x - 0.5) * max).toFixed(2)}deg`);
    card.style.setProperty('--sx', `${(x * 100).toFixed(1)}%`);
    card.style.setProperty('--sy', `${(y * 100).toFixed(1)}%`);
   });
  });
  card.addEventListener('pointerleave', () => {
   cancelAnimationFrame(frame);
   card.classList.remove('is-tilting');
   card.style.setProperty('--rx', '0deg');
   card.style.setProperty('--ry', '0deg');
  });
 }));
}

// ---------- Buttons: magnetic pull toward the cursor ----------
if (motionOK && finePointer) {
 let magnet = null, magnetRect = null;
 const release = button => {button.classList.remove('is-magnetic'); button.style.removeProperty('--bx'); button.style.removeProperty('--by');};
 document.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  const button = event.target.closest?.('.button') || null;
  if (button !== magnet) {
   if (magnet) release(magnet);
   magnet = button;
   magnetRect = button?.getBoundingClientRect();
   button?.classList.add('is-magnetic');
  }
  if (!button) return;
  const dx = clamp((event.clientX - magnetRect.left) / magnetRect.width, 0, 1) - 0.5;
  const dy = clamp((event.clientY - magnetRect.top) / magnetRect.height, 0, 1) - 0.5;
  button.style.setProperty('--bx', `${(dx * 12).toFixed(1)}px`);
  button.style.setProperty('--by', `${(dy * 8).toFixed(1)}px`);
 }, {passive: true});
 document.addEventListener('scroll', () => {if (magnet) {release(magnet); magnet = null;}}, {passive: true});
}

// ---------- Click ripple ----------
const rippleTargets = '.button,.mini-blue,.mini-action,.login-link,.audience-card,.share-icon-row>button,.orbit-label,.icon-button,.mini-identity,.ai-demo button,.example-experience-link,.profile-social button';
if (motionOK) {
 document.addEventListener('pointerdown', event => {
  const target = event.target.closest?.(rippleTargets);
  if (!target || event.button !== 0) return;
  const rect = target.getBoundingClientRect();
  const size = Math.hypot(rect.width, rect.height) * 2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.setAttribute('aria-hidden', 'true');
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`;
  target.classList.add('has-ripple');
  target.append(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
 });
}
