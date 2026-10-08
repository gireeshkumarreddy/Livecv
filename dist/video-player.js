'use strict';

// Launch video: plays muted on a loop with no visible controls. It starts from the beginning the first
// time it scrolls into view and pauses while off-screen. Uses $ from app.js.
{
 const video = $('.launch-video');
 if (video) {
  let started = false;
  new IntersectionObserver(([entry]) => {
   if (!entry.isIntersecting) {video.pause(); return;}
   if (!started) {started = true; video.currentTime = 0;}
   video.play().catch(() => {});
  }, {threshold: 0.3}).observe(video.closest('.video-frame'));
 }
}
