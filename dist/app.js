'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const exampleLink = 'https://livecv.work/id/GID-12345-67890';
const builderLink = 'https://livecv.dev/build';
const brand = '<span class="brand"><img src="assets/livecv-logo-original.jpeg" alt="LiveCV" width="2048" height="1152"></span>';
const projectData = [
  {name:'Finly', caption:'A simpler way to manage money', type:'Product design', description:'An illustrative mobile-finance design project. Aanya brings everyday money tasks into a clear, approachable interface, with an emphasis on useful information and considered interaction design.'},
  {name:'Horizon', caption:'B2B analytics platform', type:'Interface design', description:'An illustrative analytics concept that makes complex information easier to explore. A clear hierarchy and reusable interface patterns keep the experience calm and consistent.'},
  {name:'Journey', caption:'Research that shapes the experience', type:'UX research', description:'Aanya’s illustrative research study brings interview themes, journey maps and early wireframes together. The focus is on understanding people before deciding what to build.'},
  {name:'Sensor Lab', caption:'From readings to understanding', type:'Engineering prototype', description:'Noah’s illustrative sensor prototype connects a small hardware assembly with a Python processing workflow. It explores reliable readings, structured testing and clear technical documentation.'},
  {name:'Dataflow', caption:'Turning messy data into structure', type:'Python development', description:'Noah’s illustrative data project uses reusable Python scripts to clean, validate and organize sample datasets. The visual represents information moving through a clear processing pipeline.'},
  {name:'Kinetic', caption:'Thoughtful mechanical movement', type:'Mechanical engineering', description:'Noah’s illustrative robotics study explores a compact gripper, controlled motion and repeatable test cases. It brings practical experimentation and mechanical problem solving together.'},
  {name:'Bloom', caption:'A campaign with a distinct point of view', type:'Creative campaign', description:'Maya’s illustrative campaign concept combines expressive product art direction with audience-led messaging. Color, composition and creative variations form the starting point for channel experiments.'},
  {name:'Pulse', caption:'Finding the signal in a campaign', type:'Marketing analytics', description:'Maya’s illustrative reporting project connects audience attention, engagement and conversion. The concept turns campaign patterns into useful questions for the next creative experiment.'},
  {name:'Together', caption:'A community built around people', type:'Community marketing', description:'Maya’s illustrative community concept brings people together through clear stories and thoughtful content. It explores editorial themes, launch messaging and meaningful professional connection.'}
];
const profiles = {
 aanya:{name:'Aanya Rao',role:'Product designer',portrait:0,city:'London, UK',bio:'I design human-centered products that make a difference. Turning complex problems into thoughtful, useful experiences.',shortBio:'Designing simple, inclusive products for a more open financial future.',skills:['Figma','User research','Product design'],experience:'Product designer',company:'Independent product projects',education:'Design & visual communication',goal:'Design useful products with thoughtful teams.',projects:[0,1,2]},
 noah:{name:'Noah Martin',role:'Graduate engineer',portrait:1,city:'Manchester, UK',bio:'I turn ideas into reliable, practical systems. Curious about clean engineering, thoughtful technology and building things that make everyday life better.',shortBio:'Turning ideas into real-world solutions through clean, practical engineering.',skills:['Python','Engineering','Problem solving'],experience:'Graduate engineering projects',company:'Academic & independent work',education:'Engineering graduate',goal:'Build practical technology and keep learning.',projects:[3,4,5]},
 maya:{name:'Maya Chen',role:'Growth marketer',portrait:2,city:'Berlin, Germany',bio:'I bring brands and communities together through clear stories, thoughtful strategy and creative work. I care about the people on the other side of every campaign.',shortBio:'Building brands and communities through creative, data-informed growth.',skills:['Growth','Content strategy','Analytics'],experience:'Brand & content projects',company:'Independent marketing work',education:'Marketing & communications',goal:'Help thoughtful brands connect with people.',projects:[6,7,8]}
};

// These stories belong to the illustrative profiles, not real employment records.
const profileStories = {
 aanya:{
  visual:'assets/skill-design-creative-ai.webp',
  visualAlt:'Sculptural cursor with floating prototype artboards and colorful components on lilac',
  experienceVisual:'assets/skill-design-ai.webp',
  experienceVisualAlt:'A design workbench displaying connected interface prototypes and reusable components',
  experienceTitle:'Research, design and thoughtful delivery',
  visualTitle:'From first frame to working prototype',
  visualCopy:'Figma brings my ideas, components and interactions into one design workspace.',
  skillDetails:[
   {name:'Figma',mark:'figma',copy:'Auto layout, reusable components and interactive prototypes.'},
   {name:'User research',mark:'people',copy:'Interview guides, journey maps and usability testing.'},
   {name:'Product design',mark:'grid',copy:'Clear user flows, accessible interfaces and thoughtful handoff.'}
  ],
  experienceEntries:[
   {role:'Product designer',place:'Finly · independent concept',period:'2025 — Present',summary:'Bringing clarity to everyday money tasks.',points:['Mapped the onboarding journey and turned early ideas into a connected Figma prototype.','Built a reusable UI kit for balances, spending categories and account screens.'],tools:['Figma','Prototyping','Design systems']},
   {role:'UX & interface designer',place:'Horizon · portfolio project',period:'2024 — 2025',summary:'Making a complex analytics workspace easier to explore.',points:['Organized dashboard information around the questions a user needs to answer.','Designed responsive layouts and refined the flow through usability feedback.'],tools:['User research','Wireframing','Interface design']}
  ]
 },
 noah:{
  visual:'assets/skill-python-creative-ai.webp',
  visualAlt:'Interlocking blue and yellow code loops surrounded by sculptural brackets on navy',
  experienceVisual:'assets/experience-engineering-ai.webp',
  experienceVisualAlt:'Hands carefully adjusting a precision sensor assembly at an engineering workbench',
  experienceTitle:'Built, tested and understood',
  visualTitle:'Ideas, code and real-world systems',
  visualCopy:'I use Python and hands-on engineering to understand problems and build practical solutions.',
  skillDetails:[
   {name:'Python',mark:'code',copy:'Data cleaning, useful scripts and clear visualizations.'},
   {name:'Engineering',mark:'engineering',copy:'Sensor prototypes, system integration and structured testing.'},
   {name:'Problem solving',mark:'goal',copy:'Breaking a problem down, testing assumptions and documenting decisions.'}
  ],
  experienceEntries:[
   {role:'Graduate engineering project',place:'Connected sensor lab · academic project',period:'2025 — 2026',summary:'Turning sensor readings into useful, understandable information.',points:['Connected a sensor prototype to a Python data-processing workflow.','Visualized readings, investigated unexpected results and documented the test setup.'],tools:['Python','Sensors','Testing']},
   {role:'Python developer',place:'Data tools · independent projects',period:'2024 — 2025',summary:'Making repetitive data tasks simpler and more reliable.',points:['Created scripts to validate, clean and combine sample datasets.','Added reusable functions, test cases and clear setup notes for future contributors.'],tools:['Python','Data analysis','Documentation']}
  ]
 },
 maya:{
  visual:'assets/skill-growth-creative-ai.webp',
  visualAlt:'Coral megaphone sending colorful content shapes toward a growing mint sprout',
  experienceVisual:'assets/experience-marketing-ai.webp',
  experienceVisualAlt:'Editorial campaign moodboard with photographs, color swatches and a camera lens',
  experienceTitle:'From creative direction to campaign learning',
  visualTitle:'Creative stories. Measurable learning.',
  visualCopy:'I connect content, campaigns and analytics to understand what helps a community grow.',
  skillDetails:[
   {name:'Growth',mark:'chart',copy:'Audience discovery, campaign experiments and conversion journeys.'},
   {name:'Content strategy',mark:'file',copy:'Editorial calendars, clear brand messaging and channel planning.'},
   {name:'Analytics',mark:'analytics',copy:'Campaign reporting, useful metrics and evidence-led recommendations.'}
  ],
  experienceEntries:[
   {role:'Growth & content strategist',place:'Together · community concept',period:'2025 — Present',summary:'Giving a new professional community a clear voice.',points:['Developed audience themes, campaign messages and a practical content calendar.','Planned creative experiments across email, social posts and landing-page copy.'],tools:['Content strategy','Campaign planning','Community']},
   {role:'Marketing analyst',place:'Campaign lab · independent project',period:'2024 — 2025',summary:'Turning campaign data into the next useful question.',points:['Built an illustrative reporting dashboard for traffic, engagement and conversion.','Compared channel patterns and translated the findings into content recommendations.'],tools:['Analytics','Reporting','Experimentation']}
  ]
 }
};
Object.entries(profiles).forEach(([key,profile])=>Object.assign(profile,profileStories[key]));

function skillMark(name) {
 const svg = (content, viewBox='0 0 24 24') => `<svg class="skill-mark" viewBox="${viewBox}" aria-hidden="true" focusable="false">${content}</svg>`;
 if(name==='figma')return svg('<path fill="#f24e1e" d="M5 0h5v10H5A5 5 0 0 1 5 0Z"/><path fill="#ff7262" d="M10 0h5a5 5 0 0 1 0 10h-5Z"/><path fill="#a259ff" d="M5 10h5v10H5a5 5 0 0 1 0-10Z"/><circle cx="15" cy="15" r="5" fill="#1abcfe"/><path fill="#0acf83" d="M5 20h5v5a5 5 0 1 1-5-5Z"/>','0 0 20 30');
 if(name==='code')return svg('<path d="m8 6-6 6 6 6m8-12 6 6-6 6" fill="none" stroke="#3974a6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="m14 3-4 18" fill="none" stroke="#e0ab22" stroke-width="2.5" stroke-linecap="round"/>');
 if(name==='chart'||name==='analytics')return svg('<path d="M3 3v18h18" fill="none" stroke="#6d8aa4" stroke-width="1.8" stroke-linecap="round"/><rect x="6" y="13" width="3" height="5" rx="1" fill="#53bfb1"/><rect x="11" y="9" width="3" height="9" rx="1" fill="#5b9ffa"/><rect x="16" y="5" width="3" height="13" rx="1" fill="#8d79db"/>');
 if(name==='engineering')return svg('<rect x="6" y="6" width="12" height="12" rx="3" fill="#eaf3ff" stroke="#3974a6" stroke-width="1.8"/><rect x="10" y="10" width="4" height="4" rx="1" fill="#5b9ffa"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" stroke="#3974a6" stroke-width="1.8" stroke-linecap="round"/>');
 return icon(name);
}

function skillsHTML(profile) {
 return `<div class="profile-skills"><div class="profile-tab-title">Skills in practice <small>Illustrative work</small></div><div class="skill-spotlight"><img src="${profile.visual}" alt="${profile.visualAlt}" width="1672" height="941" decoding="async"><div class="skill-spotlight-copy"><span class="tool-badge">${skillMark(profile.skillDetails[0].mark)}${escapeHTML(profile.skills[0])}</span><h4>${profile.visualTitle}</h4><p>${profile.visualCopy}</p></div></div><div class="skill-detail-grid">${profile.skillDetails.map(skill=>`<article class="skill-detail"><span class="skill-symbol">${skillMark(skill.mark)}</span><h4>${skill.name}</h4><p>${skill.copy}</p></article>`).join('')}</div></div>`;
}

function experienceHTML(profile) {
 return `<div class="profile-experience"><div class="profile-tab-title">Experience & contributions <small>Illustrative experience</small></div><div class="experience-heading"><img src="${profile.experienceVisual}" alt="${profile.experienceVisualAlt}" width="1672" height="941" decoding="async"><div><span class="experience-eyebrow">The work behind the skills</span><h4>${profile.experienceTitle}</h4><p>${profile.experienceEntries[0].summary}</p></div></div><div class="experience-timeline">${profile.experienceEntries.map((entry,index)=>`<details class="experience-entry" ${index===0?'open':''}><summary><span class="experience-marker">${icon('briefcase')}</span><span class="experience-title"><strong>${entry.role}</strong><span>${entry.place}</span></span><span class="experience-period">${entry.period}</span><span class="experience-toggle" aria-hidden="true">+</span></summary><div class="experience-body"><p>${entry.summary}</p><ul>${entry.points.map(point=>`<li>${point}</li>`).join('')}</ul><div class="skill-chips">${entry.tools.map(tool=>`<span>${tool}</span>`).join('')}</div></div></details>`).join('')}</div></div>`;
}

function portraitHTML(profile, extra='') {
 return `<span class="portrait person-${profile.portrait} ${extra}" role="img" aria-label="Illustrative portrait of ${escapeHTML(profile.name)}"></span>`;
}

function projectsHTML(profile) {
 return `<div class="profile-tab-title">Featured projects <small>Illustrative work</small></div><div class="profile-projects">${profile.projects.map(index => `<button class="profile-project" data-project="${index}"><span class="project-image project-${index}" role="img" aria-label="${escapeHTML(projectData[index].name)} project visual"></span><strong>${projectData[index].name}</strong><small>${projectData[index].caption}</small></button>`).join('')}</div>`;
}

function tabHTML(profile, tab) {
 switch (tab) {
  case 'experience':return experienceHTML(profile);
  case 'projects':return projectsHTML(profile);
  case 'skills':return skillsHTML(profile);
  case 'education':return `<div class="tab-story"><div class="story-row">${icon('school')}<div><h4>${escapeHTML(profile.education)}</h4><small>Illustrative education entry</small><p>Bringing coursework, practical projects and new perspectives into a professional story.</p></div></div></div>`;
  case 'achievements':return `<div class="tab-story"><div class="story-row">${icon('award')}<div><h4>Every step is part of the story</h4><p>Completed projects, new skills and meaningful milestones, all in one place.</p><small>This profile is an illustrative example.</small></div></div></div>`;
  case 'goals':return `<div class="tab-story"><div class="story-row">${icon('goal')}<div><h4>What comes next</h4><p>${escapeHTML(profile.goal)}</p><small>Your direction is part of your career identity, too.</small></div></div></div>`;
  default:return projectsHTML(profile);
 }
}

let profileInstance = 0;
function profileHTML(key, variant='hero') {
 const p = profiles[key];
 const instance = ++profileInstance;
 const tabs = ['about','experience','projects','skills','education','achievements','goals'];
 return `<div class="profile-toolbar">${brand}<div class="profile-top-nav" aria-hidden="true"><span>About</span><span>Experience</span><span>Projects</span><span>Skills</span><span>Education</span></div><div class="profile-toolbar-actions"><button data-copy aria-label="Copy example profile link">${icon('up')}</button><button data-copy>${icon('link')} Share</button></div></div>
 <div class="profile-main">${portraitHTML(p)}<div class="profile-intro"><h3 class="profile-name">${p.name}</h3><p class="profile-role">${escapeHTML(p.role)}</p><p class="profile-bio">${p.bio}</p><div class="profile-meta"><span>${icon('location')}${p.city}</span><span><i class="available-dot"></i>Open to opportunities</span></div></div><div class="profile-social"><button data-profile-projects>${icon('grid')}Portfolio</button><button data-share="linkedin"><span class="linkedin-mark" aria-hidden="true" style="width:12px;height:12px;font-size:10px">in</span>LinkedIn</button><button data-share="email">${icon('mail')}Email</button><button class="profile-contact" data-dialog="example-contact">Contact me</button></div></div>
 <div class="profile-tabs" role="tablist" aria-label="${p.name} profile sections">${tabs.map((tab,index) => `<button id="profile-${instance}-${tab}" role="tab" aria-selected="${index===0}" aria-controls="profile-panel-${instance}" tabindex="${index===0?'0':'-1'}" class="${index===0?'active':''}" data-profile-tab="${tab}" data-profile-key="${key}">${tab.charAt(0).toUpperCase()+tab.slice(1)}</button>`).join('')}</div><div class="profile-tab-panel" id="profile-panel-${instance}" role="tabpanel" aria-labelledby="profile-${instance}-about">${projectsHTML(p)}</div>`;
}

$$('[data-profile]').forEach(el => {el.innerHTML = profileHTML(el.dataset.profile, el.dataset.variant);});
if ($('#examples-grid')) $('#examples-grid').innerHTML = Object.entries(profiles).map(([key,p],index) => `<article class="example-card reveal" style="--delay:${index*90}ms">
 <div class="example-person">${portraitHTML(p)}<div><h3>${p.name}</h3><p class="role">${p.role}</p><p class="bio">${p.shortBio}</p></div></div>
 <div class="example-images" aria-hidden="true">${p.projects.map(index=>`<span class="project-image project-${index}"></span>`).join('')}</div>
 <p class="skill-caption">Skills</p>
 <button class="example-skill-preview" data-example="${key}" data-start-tab="skills" aria-label="Explore ${p.name}'s ${p.skills[0]} skills"><img src="${p.visual}" alt="${p.visualAlt}" width="1672" height="941" loading="lazy" decoding="async"><span class="example-skill-label">${skillMark(p.skillDetails[0].mark)}<strong>${p.skills[0]} in practice</strong>${icon('arrow')}</span></button>
 <div class="skill-chips">${p.skills.map(skill=>`<span>${skill}</span>`).join('')}</div>
 <button class="example-experience-link" data-example="${key}" data-start-tab="experience">${icon('briefcase')}Explore experience<span aria-hidden="true">↗</span></button>
 <button class="example-link" data-example="${key}">View example profile ${icon('arrow')}</button></article>`).join('');

const dialog = $('#site-dialog');
let lastFocused;
function openDialog(content) {
 if (!dialog.open) lastFocused = document.activeElement;
 $('#dialog-content').innerHTML = content;
 if (!dialog.open) dialog.showModal();
 document.body.classList.add('dialog-open');
 dialog.scrollTop = 0;
 $('.dialog-close').focus({preventScroll:true});
}
function closeDialog() {dialog.close();}
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(lastFocused?.isConnected)lastFocused.focus({preventScroll:true});});
$('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
function simpleDialog(title, copy, action='', eyebrow='LiveCV') {
 openDialog(`<div class="dialog-simple"><p class="dialog-eyebrow">${eyebrow}</p><h2 id="dialog-title">${title}</h2>${copy}${action}</div>`);
}
function builderAction(label='Open the LiveCV builder') {return `<a class="button" href="${builderLink}" target="_blank" rel="noopener">${label} ${icon('up')}</a>`;}
function showExample(key, startTab='about') {
 const p=profiles[key];
 openDialog(`<p class="dialog-eyebrow">Illustrative LiveCV profile</p><h2 id="dialog-title" class="sr-only">${p.name} — example profile</h2><div class="profile-window dialog-profile">${profileHTML(key,'dialog')}</div><p class="dialog-footnote">An example of a digital career identity. Names, portraits, projects and experience are illustrative.</p>`);
 if(startTab==='skills'||startTab==='experience')$(`[data-profile-tab="${startTab}"]`,dialog).click();
}
let toastTimeout;
function toast(message){clearTimeout(toastTimeout);const node=$('#toast');node.textContent=message;node.classList.add('visible');toastTimeout=setTimeout(()=>node.classList.remove('visible'),3500);}
async function copyExample(){
 try {await navigator.clipboard.writeText(exampleLink);toast('Example link copied. Create your LiveCV to get your own.');}
 catch {simpleDialog('Copy the example link',`<p>This is an illustrative link. Create your LiveCV to publish your own identity.</p><label class="sr-only" for="manual-copy">Example link</label><input id="manual-copy" value="${exampleLink}" readonly style="width:100%;padding:14px;border:1px solid #cfe2f4;border-radius:8px;margin-top:20px;font-size:12px">`);const input=$('#manual-copy');input.select();}
}

const shareCopy={
 email:{title:'Make your introduction count.',text:'Add your own LiveCV link to an introduction, follow-up or email signature. The same link can carry your most recent experience whenever someone opens it.',tip:'Try: “Here’s a little more about my work and experience: [your LiveCV link].”'},
 linkedin:{title:'Give your profile a next step.',text:'When you have published your LiveCV, add its link to your LinkedIn contact information, Featured section or a post about your work.',tip:'Copy your personal link from LiveCV after publishing it. The link on this page is an example.'},
 applications:{title:'Put your work in context.',text:'Use your LiveCV link in the website or portfolio field of an application. Keep a PDF ready for applications that also ask for a resume file.',tip:'You can build and export a PDF for free. Live identity links are available on paid plans.'},
 recruiter:{title:'A better answer to “send your CV.”',text:'Share your own LiveCV link with a recruiter so they can explore your career story. Keep the profile updated as you add experience, skills and new work.',tip:'This landing page shows an illustrative profile. Your own link is created in the LiveCV product.'}
};
function showShare(type){const d=shareCopy[type];if(!d)return;simpleDialog(d.title,`<p>${d.text}</p><p>${d.tip}</p>`,builderAction('Create your own LiveCV'),'One link. Your entire career.');}

document.addEventListener('click',event=>{
 const el=event.target.closest('button,[data-example]');if(!el)return;
 if(el.hasAttribute('data-copy')){copyExample();return;}
 if(el.dataset.example){showExample(el.dataset.example,el.dataset.startTab);return;}
 if(el.dataset.share){showShare(el.dataset.share);return;}
 if(el.hasAttribute('data-project')){const p=projectData[Number(el.dataset.project)];simpleDialog(p.name,`<div class="project-image dialog-project-image project-${el.dataset.project}" role="img" aria-label="${p.name} project visual"></div><p>${p.description}</p><p class="dialog-footnote">Illustrative project · ${p.type}</p>`,builderAction('Give your work a home'),'Example project');return;}
 if(el.hasAttribute('data-profile-projects')){const wrap=el.closest('.profile-window');$('[data-profile-tab="projects"]',wrap).click();return;}
 if(el.dataset.profileTab){const tabs=el.closest('.profile-tabs');$$('button',tabs).forEach(button=>{const selected=button===el;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});const panel=tabs.nextElementSibling;panel.innerHTML=tabHTML(profiles[el.dataset.profileKey],el.dataset.profileTab);panel.setAttribute('aria-labelledby',el.id);return;}
 if(el.dataset.dialog){
  const type=el.dataset.dialog;
  if(type==='example-contact')simpleDialog('Imagine your next introduction.','<p>This is an illustrative profile, so Aanya’s contact details are not active. Your own LiveCV can help people connect with your professional story.</p>',builderAction());
  if(type==='privacy')simpleDialog('Privacy information','<p>This landing page does not collect account information or submit your profile edits. The sample editor works only in this browser session. External links open the official LiveCV product, where its privacy information applies.</p>','<a class="button" href="https://livecv.dev/" target="_blank" rel="noopener">Visit LiveCV '+icon('up')+'</a>');
  if(type==='terms')simpleDialog('About this landing page','<p>The profile names, portraits and projects shown here are illustrative. Resume creation, paid features and account services are provided through the official LiveCV product and are subject to its current terms.</p>','<a class="button" href="https://livecv.dev/" target="_blank" rel="noopener">Visit LiveCV '+icon('up')+'</a>');
  return;
 }
 if(el.dataset.grow){const labels={project:['Add the work you’re proud of.','A project is more than a title. Show the problem, your contribution and the work itself.'],experience:['Your story keeps moving.','Add a new role, a collaboration or a meaningful responsibility as your career develops.'],skill:['Make room for what you’ve learned.','Connect new skills to the experience and projects where you put them into practice.']};const d=labels[el.dataset.grow];simpleDialog(d[0],`<p>${d[1]}</p>`,builderAction('Continue in the builder'),'Keep evolving');return;}
 if(el.dataset.suggestion){const d={experience:['Lead with relevant experience.','Example suggestion: bring the projects most relevant to your target role to the top of your career story. Explain what you contributed and how you approached the work.'],skills:['Make your skills specific.','Example suggestion: replace broad labels with the tools, methods and skills you can demonstrate through your projects.'],summary:['Make your introduction sound like you.','Example: “I’m a product designer who turns complex problems into clear, approachable experiences. I care about useful work and thoughtful teams.”']}[el.dataset.suggestion];simpleDialog(d[0],`<p>${d[1]}</p><p class="dialog-footnote">Illustrative suggestion. This preview does not call an AI service. AI tailoring is a paid LiveCV feature.</p>`,builderAction('Explore LiveCV'),'A clearer career story');return;}
});

// Keep tabbed previews accessible by keyboard as well as touch.
document.addEventListener('keydown',event=>{
 const active=event.target.closest('[role="tab"]');if(!active)return;
 if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
 const tabs=$$('[role="tab"]',active.closest('[role="tablist"]'));const index=tabs.indexOf(active);let next;
 if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else next=(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)+tabs.length)%tabs.length;
 event.preventDefault();tabs[next].focus();tabs[next].click();
});

const identityContent={experience:['Product designer','A place for the work that’s shaped you.'],projects:['The work behind the title','Connect projects to your professional story.'],skills:['Research · Design · Figma','Show what you know and how you use it.'],education:['Learning that stays with you','Bring education and practical experience together.'],achievements:['Milestones that matter','Make space for the work you’re proud of.'],goals:['Your next chapter','Share the direction you want to grow.']};
$$('[data-identity]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.identity;$$('[data-identity]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});$('#identity-caption').textContent=key.charAt(0).toUpperCase()+key.slice(1);$('#identity-detail-title').textContent=identityContent[key][0];$('#identity-detail-copy').textContent=identityContent[key][1];const panel=$('.identity-detail');panel.classList.remove('changing');requestAnimationFrame(()=>panel.classList.add('changing'));}));

$('#headline-form')?.addEventListener('submit',event=>{event.preventDefault();const value=$('#demo-headline').value.trim();if(!value){$('#demo-headline').focus();toast('Add a headline to update the example.');return;}profiles.aanya.role=value;$$('.hero-profile .profile-role').forEach(el=>el.textContent=value);toast('Example headline updated in the hero.');});

const builderOriginal=$('#builder-content')?.innerHTML;
$$('[data-builder]').forEach(button=>button.addEventListener('click',()=>{$$('[data-builder]').forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});const panel=$('#builder-content');if(button.dataset.builder==='resume')panel.innerHTML=builderOriginal;if(button.dataset.builder==='preview')panel.innerHTML=`${portraitHTML(profiles.aanya)}<strong>Aanya Rao</strong><small>${escapeHTML(profiles.aanya.role)}</small><p>Thoughtful design.<br>Useful experiences.</p><div class="skill-chips"><span>Research</span><span>Design</span></div>`;if(button.dataset.builder==='export')panel.innerHTML=`${icon('file')}<strong style="margin-top:12px">Ready for your next step.</strong><p style="margin-top:9px">Create and export your own PDF in the free builder.</p><a class="mini-blue" href="${builderLink}" target="_blank" rel="noopener">Open builder ↗</a>`;}));

const audienceText={students:['Your first opportunity starts with what you’ve already built. Bring your coursework, personal projects and skills into one story.','Start your story'],graduates:['Your education is only the beginning. Give your projects, practical experience and ambitions a professional home.','Create your first LiveCV'],professionals:['A new role, a new project, a new direction. Keep your career identity up to date as your experience grows.','Bring your experience together'],freelancers:['Let people see the work behind your services. Bring your experience and projects together for a clearer introduction.','Give your work a home']};
$$('[data-audience]').forEach(button=>button.addEventListener('click',()=>{$$('[data-audience]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});const data=audienceText[button.dataset.audience];$('#audience-copy').textContent=data[0];$('#audience-cta').innerHTML=`${data[1]} <span>↗</span>`;}));

$('#expand-faq')?.addEventListener('click',()=>{const expand=$('#expand-faq').getAttribute('aria-expanded')!=='true';$$('.faq-grid details').forEach(el=>el.open=expand);$('#expand-faq').setAttribute('aria-expanded',String(expand));$('#expand-faq').innerHTML=expand?'Close all answers <span>−</span>':'View all answers <span>＋</span>';});

const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');mobileNav.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open menu':'Close menu');mobileNav.hidden=open;});
$$('a,button',mobileNav).forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>680)closeMenu();},{passive:true});

const header=$('.site-header');let scrollTick=false;
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>75);scrollTick=false;}
window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateHeader);}},{passive:true});updateHeader();

// Scroll reveals, the video expansion and pointer effects live in motion.js.
