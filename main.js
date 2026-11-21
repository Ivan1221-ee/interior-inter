function resizeGallery(){document.documentElement.style.setProperty('--gallery-scale',document.documentElement.clientWidth/1440)}
resizeGallery();window.addEventListener('resize',resizeGallery);
document.fonts.ready.then(()=>{const ctx=document.createElement('canvas').getContext('2d');document.querySelectorAll('.copy').forEach(p=>{const s=getComputedStyle(p),size=parseFloat(s.fontSize);ctx.font=`${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;const m=ctx.measureText('Hg');p.style.setProperty('--baseline-offset',-((m.fontBoundingBoxAscent-m.fontBoundingBoxDescent+size)/2)+'px');const lines=[...p.querySelectorAll('.line')];p.style.width=Math.max(...lines.map(l=>parseFloat(l.style.left)+ctx.measureText(l.textContent).width))+'px';p.style.height=Math.max(...lines.map(l=>parseFloat(l.style.top)+size))+'px';});document.documentElement.dataset.fontsReady='true'});

// Native controls layered over the original artwork preserve the desktop layout.
const assetRoot = document.querySelector('.hero-photo').getAttribute('data').replace('hero.svg','');
const projects = [
 {title:'Эстетика минимализма',image:'image-9.jpg',text:'Светлый интерьер с чистыми линиями и сдержанной палитрой. Естественный свет объединяет жилые зоны, а встроенные системы хранения помогают сохранить ощущение простора. Фактура дерева и мягкий текстиль добавляют тепла лаконичной архитектуре.'},
 {title:'Естественный ритм',image:'image-7.jpg',text:'Природные оттенки, выразительные фактуры и продуманное освещение задают спокойный ритм повседневной жизни. В центре проекта — удобное пространство для общения и отдыха, где каждый предмет поддерживает общую композицию.'},
 {title:'Теплый минимализм',image:'image-8.jpg',text:'Дом, в котором минимализм становится уютным. Теплая палитра, тактильные материалы и мягкий свет создают камерную атмосферу. Открытые зоны сочетаются с тихими уголками для отдыха, а практичные решения остаются незаметными.'}
];
const dialog=document.createElement('dialog');dialog.className='site-dialog';dialog.innerHTML='<button class="dialog-close" aria-label="Закрыть окно">×</button><div class="dialog-content"></div>';document.body.append(dialog);
const content=dialog.querySelector('.dialog-content');
let returnFocus;
function openDialog(html){if(!dialog.open)returnFocus=document.activeElement;content.innerHTML=html;dialog.showModal();document.body.classList.add('modal-open');}
function closeDialog(){dialog.close();}
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus();});
function openProject(p){openDialog(`<img class="dialog-photo" src="${assetRoot+p.image}" alt="${p.title}"><div class="dialog-body"><h2 id="dialog-title">${p.title}</h2><p>${p.text}</p><button class="ui-button" data-consult>Обсудить проект</button></div>`);dialog.setAttribute('aria-labelledby','dialog-title');content.querySelector('[data-consult]').onclick=()=>{openConsult();};}
function openConsult(){openDialog(`<div class="dialog-body consultation"><h2 id="dialog-title">Обсудить проект</h2><p>Расскажите о вашем будущем интерьере. Оставьте имя и телефон для консультации.</p><form class="consult-form"><label><span class="sr-only">Ваше имя</span><input name="name" autocomplete="name" placeholder="Ваше имя" required></label><label><span class="sr-only">Телефон</span><input name="phone" type="tel" autocomplete="tel" placeholder="+7 (999) 999-99-99" required></label><label class="form-consent"><input type="checkbox" required><span>Я даю своё согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности</span></label><button class="ui-button" type="submit">Получить консультацию</button><p class="form-status" role="status"></p></form></div>`);dialog.setAttribute('aria-labelledby','dialog-title');setupForm(content.querySelector('form'));}

function control(el,handler){let b=document.createElement('button');for(const a of el.attributes)b.setAttribute(a.name,a.value);b.removeAttribute('href');b.type='button';b.innerHTML=el.innerHTML;b.classList.add('interactive-copy');el.replaceWith(b);b.addEventListener('click',handler);return b;}
document.querySelectorAll('a.copy').forEach(el=>{if(/Обсудить проект|Рассчитать стоимость/.test(el.textContent)){const b=control(el,openConsult);if(b.closest('#process'))b.classList.add('process-cta');}});
document.querySelectorAll('#projects .underline').forEach(el=>{const y=parseFloat(el.style.top);control(el,()=>openProject(projects[y<1000?0:y<1600?1:2]));});
document.querySelectorAll('#about .underline').forEach(el=>control(el,()=>openProject({title:'Пространство для жизни',image:'image-11.jpg',text:'Мы создаём интерьеры вокруг привычек и пожеланий людей. Работа начинается с разговора о вашем образе жизни и продолжается в планировке, выборе материалов и внимательной проработке деталей. Наш подход объединяет спокойную эстетику, функциональность и комфорт.'})));
document.querySelectorAll('#services .underline').forEach(el=>{const y=parseFloat(el.style.top);const title=[...document.querySelectorAll('#services .copy')].find(p=>p.style.fontSize==='25px'&&Math.abs(parseFloat(p.style.top)-y)<5)?.textContent||'Дизайн-проект';control(el,()=>openProject({title,image:'image-9.jpg',text:'Обсудим ваши задачи и подготовим решение с учётом пространства, бюджета и желаемого результата. Согласуем этапы работы, материалы и детали, чтобы каждый шаг был понятным, а интерьер соответствовал вашему образу жизни.'}));});
// Three projects wrap in both directions; neighbouring images are controls too.
const gallery=document.querySelector('#gallery .canvas');
gallery.querySelectorAll('.copy').forEach(p=>{if(parseFloat(p.style.top)>240)p.hidden=true;});
const carousel=document.createElement('div');carousel.className='carousel';carousel.setAttribute('aria-label','Галерея проектов');carousel.innerHTML='<div class="gallery-cards"></div><div class="gallery-controls"><button aria-label="Предыдущий проект"><svg viewBox="1201 7161 44 44" aria-hidden="true"><path d="M1220 7174.5L1211.5 7183L1220 7191.5 M1212 7183H1234"/></svg></button><span class="sr-only" aria-live="polite"></span><button aria-label="Следующий проект"><svg viewBox="1261 7161 44 44" aria-hidden="true"><path d="M1286 7174.5L1294.5 7183L1286 7191.5 M1294 7183H1272"/></svg></button></div>';gallery.append(carousel);
const slides=[{title:'Природная эстетика',image:'image-4.jpg',text:projects[0].text},{title:'Естественный ритм',image:'image-0.jpg',text:projects[1].text},{title:'Тихая гармония',image:'image-5.jpg',text:projects[2].text}];let current=0;
function renderGallery(){carousel.querySelector('.gallery-cards').innerHTML=[-1,0,1].map(offset=>{const p=slides[(current+offset+3)%3];return `<button class="gallery-card position-${offset+1}" data-offset="${offset}" aria-label="${offset===0?'Открыть проект':'Показать проект'} ${p.title}"><img src="${assetRoot+p.image}" alt="${p.title}"><span>${p.title}</span></button>`;}).join('');carousel.querySelector('[aria-live]').textContent=`0${current+1} / 03`;carousel.querySelectorAll('[data-offset]').forEach(b=>b.onclick=()=>{const offset=Number(b.dataset.offset);if(!offset)openProject(slides[current]);else moveGallery(offset);});}
let galleryAnimating=false;
async function moveGallery(delta){
 if(galleryAnimating)return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){current=(current+delta+3)%3;renderGallery();return;}
 galleryAnimating=true;
 const cards=carousel.querySelector('.gallery-cards');
 try{
  await cards.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-delta*60}px)`}],{duration:180,easing:'ease-in',fill:'forwards'}).finished;
  current=(current+delta+3)%3;renderGallery();
  cards.getAnimations().forEach(a=>a.cancel());
  await cards.animate([{opacity:0,transform:`translateX(${delta*60}px)`},{opacity:1,transform:'translateX(0)'}],{duration:300,easing:'ease-out'}).finished;
 }finally{cards.getAnimations().forEach(a=>a.cancel());galleryAnimating=false;}
}
carousel.querySelector('[aria-label="Предыдущий проект"]').onclick=()=>moveGallery(-1);carousel.querySelector('[aria-label="Следующий проект"]').onclick=()=>moveGallery(1);carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();moveGallery(e.key==='ArrowLeft'?-1:1);}});renderGallery();
const awards=document.querySelector('#awards .canvas');const awardPhoto=document.createElement('figure');awardPhoto.className='award-photo';awardPhoto.innerHTML='<img alt=""><figcaption></figcaption>';awards.append(awardPhoto);
const awardText=[...awards.querySelectorAll('p.copy')];awardText.filter(p=>parseFloat(p.style.left)>900).forEach(p=>p.hidden=true);
let activeAward=-1;
function setAward(index){if(index===activeAward)return;activeAward=index;awardText.forEach(p=>{const y=parseFloat(p.style.top);const row=y<270?0:y<410?1:2;p.style.color=row===index?'#6d6d6d':'#d2d2d2';});awards.querySelectorAll('.award-row').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));const p=projects[index];awardPhoto.querySelector('img').src=assetRoot+p.image;awardPhoto.querySelector('img').alt=p.title;awardPhoto.querySelector('figcaption').textContent=p.title;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)awardPhoto.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300});}
[135,300,430].forEach((top,i)=>{const b=document.createElement('button');b.className='award-row';b.style.top=top+'px';b.style.height=(i===1?115:145)+'px';b.setAttribute('aria-label',['Диплом международной школы дизайна, январь 2025','Премия «Лучший интерьер года», октябрь 2023','Участие в выставке «Тренды дизайна», март 2024'][i]);b.onmouseenter=b.onfocus=b.onclick=()=>setAward(i);awards.append(b);});setAward(1);

// Share the same validation and phone input behaviour in both forms.
function setupForm(form){
 const phone=form.querySelector('input[type=tel]');
 phone.inputMode='numeric';phone.autocomplete='tel';phone.placeholder='+7 (999) 999-99-99';
 phone.addEventListener('input',()=>{
  const old=phone.value,pos=phone.selectionStart??old.length;
  const before=old.slice(0,pos).replace(/\D/g,'').length;
  let digits=old.replace(/\D/g,'');
  if(digits[0]==='7'||digits[0]==='8')digits=digits.slice(1);
  digits=digits.slice(0,10);
  let formatted=digits?'+7 ('+digits.slice(0,3):'';
  if(digits.length>=3)formatted+=') ';
  if(digits.length>3)formatted+=digits.slice(3,6);
  if(digits.length>6)formatted+='-'+digits.slice(6,8);
  if(digits.length>8)formatted+='-'+digits.slice(8,10);
  phone.value=formatted;
  if(pos<old.length){let seen=0,caret=formatted.length;for(let i=0;i<formatted.length;i++){if(/\d/.test(formatted[i]))seen++;if(seen>=before){caret=i+1;break;}}phone.setSelectionRange(caret,caret);}
  phone.setCustomValidity(digits.length===10?'':'Введите телефон полностью');
 });
 phone.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;if(e.key==='Backspace'&&phone.selectionStart===phone.selectionEnd){const end=phone.selectionStart;let start=end;while(start>0&&!/\d/.test(phone.value[start-1]))start--;if(start<end){e.preventDefault();phone.setRangeText('',Math.max(0,start-1),end,'end');phone.dispatchEvent(new Event('input',{bubbles:true}));return;}}if(e.key.length===1&&!/\d/.test(e.key))e.preventDefault();});
 form.noValidate=true;
 form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=form.querySelector('[name=name]');name.setCustomValidity(name.value.trim()?'':'Укажите ваше имя');
  phone.setCustomValidity(phone.value.replace(/\D/g,'').length===11?'':'Введите телефон полностью');
  if(!form.reportValidity())return;
  form.querySelector('.form-status').textContent='Приём заявок через форму пока недоступен. Пожалуйста, свяжитесь с нами по телефону, указанному в контактах.';
 });
 form.querySelector('[name=name]').addEventListener('input',e=>e.target.setCustomValidity(''));
}
const contactCanvas=document.querySelector('#contact .canvas');
const contactForm=document.createElement('form');contactForm.id='contact-form';contactForm.className='bottom-form';
contactCanvas.append(contactForm);
for(const [selector,name] of [['.name','name'],['.phone','phone'],['.consent','consent']]){
 const input=contactCanvas.querySelector(selector);input.name=name;input.required=true;contactForm.append(input);
}
const footerSubmit=[...contactCanvas.querySelectorAll('p.copy')].find(p=>p.textContent==='Получить консультацию');
if(footerSubmit){const button=control(footerSubmit,()=>{});button.type='submit';button.classList.add('contact-cta');contactForm.append(button);}
const formStatus=document.createElement('p');formStatus.className='form-status';formStatus.setAttribute('role','status');contactForm.append(formStatus);setupForm(contactForm);
// The original hero menu stays in place; its white counterpart appears after the hero.
const sticky=document.createElement('nav');sticky.className='sticky-menu';sticky.setAttribute('aria-label','Основная навигация');sticky.hidden=true;
sticky.innerHTML='<div class="canvas"></div>';
for(const item of document.querySelectorAll('#hero .copy')){
 if(parseFloat(item.style.top)>100)continue;
 const clone=item.cloneNode(true);clone.style.color='#292929';
 if(clone.classList.contains('menu-cta'))clone.addEventListener('click',openConsult);
 sticky.firstElementChild.append(clone);
}
document.body.append(sticky);
function updateSticky(){sticky.hidden=document.querySelector('#about').getBoundingClientRect().top>0;}
addEventListener('scroll',updateSticky,{passive:true});addEventListener('resize',updateSticky);updateSticky();

// All studio logos return to the start of this one-page website.
for(const el of document.querySelectorAll('#hero p.copy, .sticky-menu p.copy, #footer h2.copy')){
 if(el.textContent.trim()!=='Inter')continue;
 const link=document.createElement('a');for(const attr of el.attributes)link.setAttribute(attr.name,attr.value);
 link.href='./';link.setAttribute('aria-label','Inter — на главную');link.innerHTML=el.innerHTML;el.replaceWith(link);
}
document.fonts.ready.then(()=>{
 for(const item of sticky.querySelectorAll('.copy')){
  const source=[...document.querySelectorAll('#hero .copy')].find(el=>el.style.left===item.style.left&&el.textContent===item.textContent);
  if(source){item.style.width=source.style.width;item.style.height=source.style.height;item.style.setProperty('--baseline-offset',source.style.getPropertyValue('--baseline-offset'));}
 }
});

// Mobile layout uses the same content, photos, dialogs and validation as desktop.
const mobile=document.createElement('main');mobile.className='mobile-site';
const plain=el=>el?el.textContent.replace(/\s+/g,' ').trim():'';
const sourceText=selector=>[...document.querySelectorAll(selector)].map(plain);
const imageTag=(file,alt,cls='')=>`<img class="${cls}" src="${assetRoot+file}" alt="${alt}" loading="lazy">`;
const serviceNodes=[...document.querySelectorAll('#services .copy')];
const serviceItems=[208,409,610,811].map(y=>({title:plain(serviceNodes.find(el=>el.style.fontSize==='25px'&&Math.abs(parseFloat(el.style.top)-y)<3)),description:plain(serviceNodes.find(el=>Math.abs(parseFloat(el.style.top)-(y+48))<3))}));
let steps=[['Консультация','На первой встрече обсудим ваши пожелания, стиль и бюджет.'],['Создание концепции','Разработаем планировку, эскизы и общее настроение будущего интерьера.'],['Проектирование','Проработаем детали, подготовим рабочие чертежи и спецификации.'],['Реализация проекта','Проконтролируем работы и согласуем решения с подрядчиками.'],['Декорирование и финализация','Подберём мебель, текстиль и аксессуары, чтобы интерьер приобрёл завершённый вид.']];
const processNodes=[...document.querySelectorAll('#process .copy')];
steps=steps.map(([title,text],i)=>[title,plain(processNodes.find(el=>Math.abs(parseFloat(el.style.top)-[445.13,557.13,428.13,792.13,846.13][i])<.1))||text]);
const projectDescriptions=[272.63,901.63,1610.63].map(y=>plain([...document.querySelectorAll('#projects p.copy')].find(el=>Math.abs(parseFloat(el.style.top)-y)<.1)));
const reviewNodes=[...document.querySelectorAll('#reviews p.copy')];
const reviews=[180,580,980].map(x=>({text:plain(reviewNodes.find(el=>parseFloat(el.style.left)===x&&parseFloat(el.style.top)<350)),name:plain(reviewNodes.find(el=>parseFloat(el.style.left)===x+44))}));
mobile.innerHTML=`
<header class="m-header"><a class="m-logo" href="./" aria-label="Inter — на главную">Inter</a><button class="m-menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-navigation"><span></span><span></span></button><nav id="mobile-navigation" hidden><a href="#m-projects">Наши проекты</a><a href="#m-services">Услуги</a><a href="#m-reviews">Отзывы</a><a href="#m-contact">Контакты</a><button class="ui-button" data-mobile-consult>Обсудить проект</button></nav></header>
<section class="m-hero"><img src="${assetRoot}image-12.jpg" alt="Светлый интерьер гостиной" fetchpriority="high"><div><h1>Создаем интерьеры, отражающие вашу индивидуальность</h1><p>Полный спектр услуг по дизайну интерьера, от концепции до реализации</p><button class="ui-button m-light" data-mobile-consult>Рассчитать стоимость</button></div></section>
<section class="m-section m-about"><h2>О нас</h2>${imageTag('image-11.jpg','Интерьер загородного дома')}<p>Наши проекты — это гармония эстетики, функциональности и комфорта, созданные с учетом ваших пожеланий и особенностей пространства.</p><p>Независимо от масштаба проекта, будь то уютная квартира или роскошный дом, мы подходим к каждому заданию с одинаковым энтузиазмом и профессионализмом.</p><button class="m-text-button" data-about>Узнать больше</button>${imageTag('image-10.png','Детали интерьера')}</section>
<section id="m-projects" class="m-section"><h2>Мы верим, что каждый проект — это возможность создать что-то особенное</h2>${projects.map((p,i)=>`<article class="m-project">${imageTag(p.image,p.title)}<h3>${p.title}</h3><p>${projectDescriptions[i]}</p><button class="m-text-button" data-project="${i}">Смотреть проект</button></article>`).join('')}</section>
<section class="m-section m-awards"><h2>Награды</h2>${['Диплом международной школы дизайна','Премия «Лучший интерьер года»','Участие в выставке «Тренды дизайна»'].map((title,i)=>`<button class="m-award" data-award="${i}" aria-pressed="${i===1}"><span>${['январь 2025','октябрь 2023','март 2024'][i]}</span><strong>${title}</strong></button>`).join('')}<figure>${imageTag(projects[1].image,projects[1].title)}<figcaption>${projects[1].title}</figcaption></figure></section>
<section id="m-services" class="m-section m-dark"><h2>Наши услуги</h2>${serviceItems.map((s,i)=>`<article class="m-service"><span>0${i+1}</span><h3>${s.title}</h3><p>${s.description}</p><button class="m-text-button" data-service="${i}">Узнать подробнее</button></article>`).join('')}</section>
<section class="m-section"><h2>Как мы работаем</h2><p class="m-intro">Мы разработали четкий и понятный процесс работы, чтобы обеспечить вам максимальное удобство и результат.</p><ol class="m-steps">${steps.map(([title,text],i)=>`<li><span>0${i+1}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol><button class="ui-button m-outline" data-mobile-consult>Обсудить проект</button></section>
<section class="m-section m-gallery"><h2>Галерея выполненных работ</h2><p>Ознакомьтесь с нашими реализованными проектами, чтобы вдохновиться и понять, как мы можем преобразить ваше пространство.</p><div class="m-slide"></div><div class="m-gallery-controls"><button aria-label="Предыдущий проект"><svg viewBox="1201 7161 44 44" aria-hidden="true"><path d="M1220 7174.5L1211.5 7183L1220 7191.5 M1212 7183H1234"/></svg></button><button aria-label="Следующий проект"><svg viewBox="1261 7161 44 44" aria-hidden="true"><path d="M1286 7174.5L1294.5 7183L1286 7191.5 M1294 7183H1272"/></svg></button></div><p class="sr-only m-slide-status" aria-live="polite"></p></section>
<section id="m-reviews" class="m-section m-dark"><h2>Отзывы о работе</h2><p class="m-intro">Ваше мнение для нас важно. Вот что говорят о нашей работе те, кто уже доверил нам создание своего идеального интерьера.</p><div class="m-review-list">${reviews.map((r,i)=>`<article class="m-review"><p>${r.text}</p><div>${imageTag('image-'+(i+1)+'.jpg',r.name)}<span>${r.name}</span></div></article>`).join('')}</div></section>
<section id="m-contact" class="m-section"><h2>Дом, в который всегда хочется возвращаться</h2><p>Inter — команда, которая поможет вам воплотить в жизнь ваши мечты о доме.</p><h2 class="m-form-title">Обсудить проект</h2><form class="consult-form"><label><span class="sr-only">Ваше имя</span><input name="name" autocomplete="name" placeholder="Ваше имя" required></label><label><span class="sr-only">Телефон</span><input name="phone" type="tel" required></label><label class="form-consent"><input type="checkbox" required><span>Я даю своё согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности</span></label><button type="submit" class="ui-button">Получить консультацию</button><p class="form-status" role="status"></p></form><div class="m-contact-info"><h2>Контакты</h2><a href="tel:+78125550550">+7 (812) 555-05-50</a><a href="mailto:interior@gmail.com">interior@gmail.com</a><p>Санкт-Петербург, ул. Ленина, д. 89, офис 12</p></div>${imageTag('image-0.jpg','Интерьер гостиной Inter')}</section>
<footer class="m-section m-dark"><a class="m-logo" href="./" aria-label="Inter — на главную">Inter</a><nav><a href="#m-projects">Наши проекты</a><a href="#m-services">Услуги</a><a href="#m-reviews">Отзывы</a><a href="#m-contact">Контакты</a></nav><p>Согласие на обработку персональных данных</p><p>Политика конфиденциальности</p></footer>`;
document.body.insertBefore(mobile,dialog);
const menuToggle=mobile.querySelector('.m-menu-toggle'),mobileNav=mobile.querySelector('#mobile-navigation');
function closeMobileMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');}
menuToggle.onclick=()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');};
mobileNav.querySelectorAll('a').forEach(a=>a.onclick=closeMobileMenu);
mobile.querySelectorAll('[data-mobile-consult]').forEach(b=>b.onclick=()=>{closeMobileMenu();openConsult();});
mobile.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu();});
mobile.querySelector('[data-about]').onclick=()=>document.querySelector('#about .interactive-copy').click();
mobile.querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>openProject(projects[Number(b.dataset.project)]));
mobile.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>{const s=serviceItems[Number(b.dataset.service)];openProject({title:s.title,image:'image-9.jpg',text:s.description});});
mobile.querySelectorAll('[data-award]').forEach(b=>b.onclick=()=>{mobile.querySelectorAll('[data-award]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));const p=projects[Number(b.dataset.award)];const fig=mobile.querySelector('.m-awards figure');fig.querySelector('img').src=assetRoot+p.image;fig.querySelector('img').alt=p.title;fig.querySelector('figcaption').textContent=p.title;});
setupForm(mobile.querySelector('form'));
let mobileSlide=0,mobileMoving=false;
const slideEl=mobile.querySelector('.m-slide');
function renderMobileSlide(){const p=slides[mobileSlide];slideEl.innerHTML=`<button aria-label="Открыть проект ${p.title}">${imageTag(p.image,p.title)}<span>${p.title}</span></button>`;slideEl.querySelector('button').onclick=()=>openProject(p);mobile.querySelector('.m-slide-status').textContent=`${p.title}, ${mobileSlide+1} из 3`;}
async function moveMobileSlide(delta){if(mobileMoving)return;mobileMoving=true;mobileSlide=(mobileSlide+delta+3)%3;renderMobileSlide();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)await slideEl.animate([{opacity:.3,transform:`translateX(${delta*24}px)`},{opacity:1,transform:'translateX(0)'}],{duration:320,easing:'ease-out'}).finished;mobileMoving=false;}
mobile.querySelectorAll('.m-gallery-controls button').forEach((b,i)=>b.onclick=()=>moveMobileSlide(i?1:-1));
let touchStart;slideEl.addEventListener('touchstart',e=>{touchStart=[e.touches[0].clientX,e.touches[0].clientY];},{passive:true});slideEl.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart[0],dy=e.changedTouches[0].clientY-touchStart[1];if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))moveMobileSlide(dx<0?1:-1);touchStart=null;},{passive:true});renderMobileSlide();
function updateMobileHeader(){mobile.querySelector('.m-header').classList.toggle('is-scrolled',mobile.querySelector('.m-hero').getBoundingClientRect().bottom<=64);}
addEventListener('scroll',updateMobileHeader,{passive:true});addEventListener('resize',updateMobileHeader);updateMobileHeader();
