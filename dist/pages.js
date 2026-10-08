'use strict';

// Inner-page interactions: contact form tabs and email hand-off, CVID lookup, the placements
// walkthrough, the consent demo and the demo-request form. Uses $, $$ and toast from app.js.
// This is a static site, so forms open the visitor's email app with the message filled in.
{
 const mailto = (to, subject, lines) => `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`;
 const value = (form, name) => form.elements[name]?.value.trim() || '';

 // ---------- Contact: For Users / For Business ----------
 const contactForm = $('#contact-form');
 if (contactForm) {
  const tabs = $$('[data-contact-tab]');
  const copy = {
   users: {to: 'support@livecv.work', email: 'Email Address', first: 'John', last: 'Doe', mail: 'john@example.com', message: 'How can we help?'},
   business: {to: 'partners@livecv.work', email: 'Work Email', first: 'Jane', last: 'Smith', mail: 'jane@company.com', message: 'How can we help your team?'},
  };
  let audience = 'users';
  const show = next => {
   audience = next;
   const c = copy[next];
   tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.contactTab === next)));
   $('#contact-email-label').textContent = c.email;
   contactForm.elements.firstName.placeholder = c.first;
   contactForm.elements.lastName.placeholder = c.last;
   contactForm.elements.email.placeholder = c.mail;
   contactForm.elements.message.placeholder = c.message;
   const company = $('#contact-company');
   company.hidden = next !== 'business';
   $('#contact-email-field').classList.toggle('full', next !== 'business');
   contactForm.elements.company.disabled = next !== 'business';
   $('#contact-to').textContent = c.to;
  };
  tabs.forEach(tab => tab.addEventListener('click', () => show(tab.dataset.contactTab)));
  contactForm.addEventListener('submit', event => {
   event.preventDefault();
   if (!contactForm.reportValidity()) return;
   const name = `${value(contactForm, 'firstName')} ${value(contactForm, 'lastName')}`.trim();
   const reason = value(contactForm, 'reason') || 'Question';
   window.location.href = mailto(copy[audience].to, `${reason} — LiveCV`, [
    value(contactForm, 'message'), '',
    `${name}`, value(contactForm, 'email'), audience === 'business' ? value(contactForm, 'company') : '',
   ]);
   toast(`Your email app should open with this message to ${copy[audience].to}.`);
  });
  show('users');
 }

 // ---------- Look up a CVID: GIDs open livecv.work/id/, CVIDs open livecv.work/cv/ ----------
 const lookup = $('#cvid-lookup');
 if (lookup) {
  lookup.addEventListener('submit', event => {
   event.preventDefault();
   const id = value(lookup, 'cvid').replace(/\s+/g, '');
   if (!/^[a-z0-9-]{4,40}$/i.test(id)) {
    lookup.elements.cvid.focus();
    toast('Enter a CVID like 0000-0000-0000 or a GID like GID-12345-67890.');
    return;
   }
   const url = /^gid-/i.test(id) ? `https://livecv.work/id/${id.toUpperCase()}` : `https://livecv.work/cv/${id.toLowerCase()}`;
   window.open(url, '_blank', 'noopener');
  });
 }

 // ---------- Placements walkthrough: advances on its own until a step is picked ----------
 const flow = $('[data-flow]');
 if (flow) {
  const steps = $$('[role="tab"]', flow), panels = $$('[role="tabpanel"]', flow);
  const stepMs = 6000;
  let index = 0, timer = 0, auto = !window.matchMedia('(prefers-reduced-motion: reduce)').matches, inView = false;
  const select = (next, focus = false) => {
   index = (next + steps.length) % steps.length;
   steps.forEach((step, i) => {
    const on = i === index;
    step.setAttribute('aria-selected', String(on));
    step.tabIndex = on ? 0 : -1;
    step.classList.remove('is-timing');
   });
   panels.forEach((panel, i) => {
    panel.hidden = i !== index;
    if (i === index) {panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering');}
   });
   if (focus) steps[index].focus();
   schedule();
  };
  const schedule = () => {
   clearTimeout(timer);
   if (!auto || !inView) return;
   const step = steps[index];
   step.style.setProperty('--flow-ms', `${stepMs}ms`);
   void step.offsetWidth;
   step.classList.add('is-timing');
   timer = setTimeout(() => select(index + 1), stepMs);
  };
  const stop = () => {auto = false; clearTimeout(timer); steps.forEach(step => step.classList.remove('is-timing'));};
  steps.forEach((step, i) => step.addEventListener('click', () => {stop(); select(i);}));
  flow.addEventListener('keydown', event => {
   if (!event.target.matches('[role="tab"]')) return;
   const moves = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
   if (event.key in moves) {event.preventDefault(); stop(); select(index + moves[event.key], true);}
  });
  new IntersectionObserver(([entry]) => {inView = entry.isIntersecting; inView ? schedule() : clearTimeout(timer);}, {threshold: 0.35}).observe(flow);
  select(0);
 }

 // ---------- Consent demo: one student withdraws, three places update ----------
 const demo = $('[data-consent-demo]');
 if (demo) {
  const toggle = $('[data-consent-toggle]', demo);
  toggle.addEventListener('click', () => {
   const on = demo.dataset.consent !== 'on';
   demo.dataset.consent = on ? 'on' : 'off';
   toggle.textContent = on ? 'Withdraw consent' : 'Consent again';
   toggle.setAttribute('aria-pressed', String(!on));
   $('[data-consent-row]', demo).classList.toggle('is-changed', !on);
  });
 }

 // ---------- Placements demo request ----------
 const demoForm = $('#demo-form');
 if (demoForm) {
  demoForm.addEventListener('submit', event => {
   event.preventDefault();
   if (!demoForm.reportValidity()) return;
   const institution = value(demoForm, 'institution');
   window.location.href = mailto('partners@livecv.work', `LiveCV Placements demo — ${institution}`, [
    `Name: ${value(demoForm, 'firstName')} ${value(demoForm, 'lastName')}`,
    `Work email: ${value(demoForm, 'email')}`,
    `Institution: ${institution}`,
    `Role: ${value(demoForm, 'role')}`,
    `Approx. students: ${value(demoForm, 'students')}`,
    value(demoForm, 'message') ? `\n${value(demoForm, 'message')}` : '',
   ]);
   toast('Your email app should open with this request to partners@livecv.work.');
  });
 }
}
