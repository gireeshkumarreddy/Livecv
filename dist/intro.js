'use strict';

// Home page intro: two resume versions arrive, fly into the ID card inside the "CV" mark,
// "Live" grows out of the mark, and the finished logo glides into the header.
// Plays on each visit to the home page; a click, key press, scroll or touch skips it.
// Uses $ and $$ from app.js. motion.js starts the page's reveals on 'intro:reveal'.
{
 const root = document.documentElement;
 const intro = $('.intro');
 if (intro && root.classList.contains('intro-playing')) {
  // Measured on assets/livecv-logo.png (902 × 216): the gap between "Live" and "CV",
  // the centre of the CV mark and the ID card inside the "C".
  const LOGO = {w: 902, h: 216, split: 479 / 902, cvCenter: 693 / 902, icon: {x: 600 / 902, y: 112 / 216, w: 76 / 902}};
  // Where that logo sits inside the header's original image (2048 × 1152).
  const SOURCE = {w: 2048, h: 1152, x: 585, y: 458};
  const CARD_W = 190;
  const ease = 'cubic-bezier(.22,1,.36,1)', glide = 'cubic-bezier(.65,0,.35,1)';

  const logo = $('.intro-logo', intro), live = $('.intro-live', intro), cv = $('.intro-cv', intro), bg = $('.intro-bg', intro);
  const [cardA, cardB] = $$('.intro-card', intro);
  const animations = [];
  const play = (el, frames, options) => {const a = el.animate(frames, {fill: 'forwards', easing: ease, ...options}); animations.push(a); return a;};
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const skipEvents = ['click', 'keydown', 'wheel', 'touchstart'];

  let revealed = false, finished = false;
  const reveal = () => {if (!revealed) {revealed = true; document.dispatchEvent(new Event('intro:reveal'));}};
  const finish = () => {
   if (finished) return;
   finished = true;
   skipEvents.forEach(type => window.removeEventListener(type, finish));
   animations.forEach(a => a.cancel());
   intro.remove();
   root.classList.remove('intro-playing');
   root.style.overflow = '';
   reveal();
  };

  const start = async () => {
   if (finished) return;
   root.style.overflow = 'hidden';
   const vw = window.innerWidth, vh = window.innerHeight;
   const W = Math.min(560, vw * 0.78), H = W * LOGO.h / LOGO.w;
   const centerX = (vw - W) / 2, centerY = (vh - H) / 2;
   const cvX = centerX - (LOGO.cvCenter - 0.5) * W; // the CV mark alone, centred
   Object.assign(logo.style, {width: `${W}px`, height: `${H}px`, transform: `translate(${cvX}px, ${centerY}px)`});
   const icon = {x: cvX + LOGO.icon.x * W - vw / 2, y: centerY + LOGO.icon.y * H - vh / 2, scale: LOGO.icon.w * W / CARD_W};
   // Card poses shrink with the screen so both resumes fit on a phone; the icon target is absolute.
   const fit = Math.min(1, vw / 480);
   const pose = (x, y, r, s = 1) => `translate(${x * fit}px, ${y * fit}px) rotate(${r}deg) scale(${s * fit})`;
   const at = (x, y, s) => `translate(${x}px, ${y}px) rotate(0deg) scale(${s})`;
   const restA = pose(-74, 6, -8), restB = pose(70, -6, 6);

   // 1. A resume arrives, then a newer version beside it.
   play(cardA, [{opacity: 0, transform: pose(-210, 70, -18, .9)}, {opacity: 1, transform: restA}], {duration: 600, delay: 80});
   play(cardB, [{opacity: 0, transform: pose(210, 70, 18, .9)}, {opacity: 1, transform: restB}], {duration: 600, delay: 400});
   await wait(1050);
   if (finished) return;

   // 2. Both fly into the ID card at the centre of the "CV" mark as the mark appears.
   [[cardA, restA], [cardB, restB]].forEach(([card, rest], i) => play(card, [
    {opacity: 1, transform: rest},
    {opacity: 1, transform: at(icon.x, icon.y, icon.scale), offset: .82},
    {opacity: 0, transform: at(icon.x, icon.y, icon.scale * .7)},
   ], {duration: 640, delay: i * 80, easing: glide}));
   play(cv, [{opacity: 0, transform: 'scale(.82)'}, {opacity: 1, transform: 'scale(1)'}], {duration: 620, delay: 160});
   await wait(800);
   if (finished) return;
   play(cv, [{transform: 'scale(1)'}, {transform: 'scale(1.06)'}, {transform: 'scale(1)'}], {duration: 380, easing: 'ease-out', fill: 'none'});
   await wait(240);
   if (finished) return;

   // 3. "Live" grows out of the mark and the whole logo settles in the centre.
   const cut = `${(1 - LOGO.split) * 100}%`;
   play(live, [{opacity: 0, clipPath: `inset(0 ${cut} 0 ${LOGO.split * 100}%)`}, {opacity: 1, clipPath: `inset(0 ${cut} 0 0)`}], {duration: 680});
   play(logo, [{transform: `translate(${cvX}px, ${centerY}px)`}, {transform: `translate(${centerX}px, ${centerY}px)`}], {duration: 680});
   await wait(880);
   if (finished) return;

   // 4. The logo glides into the header's logo spot while the page fades in underneath.
   const target = $('.site-header .brand img').getBoundingClientRect();
   const scale = (LOGO.w / SOURCE.w) * target.width / W;
   const tx = target.left + SOURCE.x / SOURCE.w * target.width, ty = target.top + SOURCE.y / SOURCE.h * target.height;
   play(logo, [{transform: `translate(${centerX}px, ${centerY}px) scale(1)`}, {transform: `translate(${tx}px, ${ty}px) scale(${scale})`}], {duration: 820, easing: glide});
   play(bg, [{opacity: 1}, {opacity: 0}], {duration: 700, delay: 160});
   await wait(380);
   reveal();
   await wait(460);
   finish();
  };

  skipEvents.forEach(type => window.addEventListener(type, finish, {passive: true}));
  const logoImage = $('img', logo);
  Promise.race([logoImage.decode().catch(() => {}), wait(1500)]).then(start);
 }
}
