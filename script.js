(() => {
  'use strict';
  const en = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { en[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { en[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => { en[el.dataset.i18nAlt] = el.alt; });
  Object.assign(en, {
    title: document.title, description: document.querySelector('meta[name="description"]').content,
    menuClose: 'Close navigation'
  });
  const tr = {
    skip:'İçeriğe geç', menuLabel:'Gezinme menüsünü aç', menuClose:'Gezinme menüsünü kapat', navLabel:'Ana gezinme',
    navGames:'Projelerimiz', navStudio:'Stüdyo', navContact:'Merhaba de',
    eyebrow:'INDIE MOBİL OYUN STÜDYOSU', heroNote:'Küçük ekip. Net bir vizyon.',
    heroLine1:'Senin', heroLine2:'tarzında', heroLine3:'oyunlar.',
    heroDescription:'Kararlarının fark yarattığı, kendi tarzında şekillendirebildiğin dünyalar. Indie mobil oyunlar geliştiriyoruz.',
    heroCta:'Oyunlarımızı keşfet', playgroundLabel:'Restoran dünyamızdan küçük bir önizleme',
    worldToolbar:'Emelans / Dineit',
    worldAlt:'Minik müşteriler, mahalle binaları ve sana ait bir dükkânla restoran oyunumuz',
    worldCaption:'Senin şekillendirdiğin bir dünya.',
    heroBottom:'Mobil için. Her ayrıntısı düşünülerek.', scroll:'KEŞFETMEYE DEVAM',
    workEyebrow:'ÜZERİNDE ÇALIŞTIKLARIMIZ', workTitle:'Bir dünya. Bir sürü olasılık.',
    development:'GELİŞTİRME AŞAMASINDA',
    projectLine1:'Senin köşen.', projectLine2:'Senin kuralların.',
    projectDescription:'Bir restoran, menüden fazlasıdır. Sana ait bir mekân yarat, ekibini bir araya getir ve küçük bir dükkânı kendi hikâyene dönüştür.',
    tagManagement:'Restoran yönetimi', tagMobile:'Mobil için tasarlandı', projectCta:'Biraz daha yakından',
    projectFootnote:'Geliştirme sürüyor. Görüntüler oyunun içinden.', stageTop:'KÜÇÜK BİR MEKÂN. BÜYÜK PLANLAR.',
    phoneAlt:'Döşeme, menü ve personel kontrollerini gösteren gerçek mobil oyun görüntüsü',
    stageBottom:'GERÇEK OYUN GÖRÜNTÜSÜ / GELİŞTİRME SÜRÜMÜ',
    notebookEyebrow:'SIRADA NE VAR?', notebookDescription:'Özenle geliştirilen yeni fikirler.',
    projectA:'Şimdilik biraz gizli tuttuğumuz bir fikir', earlyConcept:'İlk fikirler',
    studioEyebrow:'PİKSELLERİN ARKASINDAKİ STÜDYO', studioLine1:'Küçük bir stüdyo.', studioLine2:'Indie bir bakış açısı.',
    studioDescription:'Biz Emelans, indie bir mobil oyun stüdyosuyuz. Bir oyunu sana ait hissettiren küçük kararları seviyoruz: kurduğun bir mekânı, keşfettiğin bir dünyayı, sonunda yoluna giren bir planı.',
    studioDescription2:'Her ayrıntıyı düşünerek, adım adım geliştiriyoruz. Daha keşfedecek çok şey var.',
    currentProjectLabel:'Şu an geliştirdiğimiz oyun', currentProject:'GELİŞTİRDİĞİMİZ OYUN',
    currentProjectDescription:'Mobil bir restoran yönetimi oyunu. Mekânını tasarla, menünü oluştur ve ekibini kur.', focusPlatforms:'Telefon ve tablet',
    contactEyebrow:'GÜZEL ŞEYLER BİR MERHABAYLA BAŞLAR', contactLine1:'Aklında bir', contactLine2:'şey mi var?',
    contactDescription:'Bir fikir, bir soru ya da küçük bir geri bildirim. Duymak isteriz.', contactCta:'Konuşalım',
    footerTagline:'Indie oyunlar. Özenli tasarım.', copyright:'Özenle hazırlandı.', backTop:'Başa dön ↑',
    dialogClose:'Proje önizlemesini kapat',
    dialogDescription:'Restoranını kendi tarzında kur. Eşyalarını seç, menünü oluştur, ekibini işe al ve yaşayan küçük bir işletmeyi yönet.',
    dialogAlt:'Restoran oyununun dünyası, doğal genel görünüm ölçeğinde',
    feature1:'Mekânını oluştur', feature1Description:'Eşyalarını seç ve yerleştir. Her restorana kendi karakterini ver.',
    feature2:'Hayat kat', feature2Description:'Ekibini kur, menünü planla ve müşterilerine birlikte hizmet ver.',
    feature3:'Hikâyeni büyüt', feature3Description:'Yeni dükkânlara açılırken stoklarını ve harcamalarını dengele.',
    dialogNote:'Dineit geliştirme aşamasında. Burada henüz herkese açık bir indirme bağlantısı bulunmuyor.',
    dialogContact:'Proje hakkında bize yaz',
    socialHeading:'Emelans’ı takip et', socialLabel:'Sosyal medya hesapları', instagramLabel:'Instagram', youtubeLabel:'YouTube', xLabel:'X',
    title:'Emelans — Indie Mobil Oyun Stüdyosu',
    description:'Emelans, kararlarının fark yarattığı dünyalar geliştiren indie bir mobil oyun stüdyosu. Restoran yönetimi oyunumuza göz at.'
  };
  const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preferences are optional. */ } };
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let language = readSetting('emelans-language') === 'tr' ? 'tr' : 'en';
  const text = key => (language === 'tr' ? tr[key] : en[key]) || en[key] || '';
  const menu = document.getElementById('navigation');
  const menuToggle = document.querySelector('.menu-toggle');
  const dialog = document.getElementById('project-dialog');
  const projectOpen = document.getElementById('project-open');
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', text('menuLabel'));
  };
  function updateMotion() {
    const paused = reducedMotion.matches;
    document.body.dataset.motion = paused ? 'off' : 'on';
    document.documentElement.style.scrollBehavior = paused ? 'auto' : '';
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = text(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', text(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = text(el.dataset.i18nAlt); });
    document.querySelectorAll('[data-image-en]').forEach(el => {
      el.src = language === 'en' ? el.dataset.imageEn : el.dataset.imageTr;
      el.width = language === 'en' ? 1170 : 960;
      el.height = language === 'en' ? 2532 : 1800;
    });
    document.title = text('title');
    document.querySelector('meta[name="description"]').content = text('description');
    document.querySelector('meta[property="og:description"]').content = text('description');
    document.querySelector('meta[property="og:title"]').content = text('title');
    document.getElementById('language-label').textContent = language === 'en' ? 'TR' : 'EN';
    const languageButton = document.getElementById('language-toggle');
    languageButton.setAttribute('aria-label', language === 'en' ? 'Türkçeye geç' : 'Switch to English');
    languageButton.title = languageButton.getAttribute('aria-label');
    document.querySelector('.header-inner .wordmark').setAttribute('aria-label', language === 'tr' ? 'Emelans ana sayfa' : 'Emelans home');
    menuToggle.setAttribute('aria-label', text(menuToggle.getAttribute('aria-expanded') === 'true' ? 'menuClose' : 'menuLabel'));
    updateMotion();
    saveSetting('emelans-language', language);
  }
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', text(open ? 'menuClose' : 'menuLabel'));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); menuToggle.focus(); }
  });
  const desktop = matchMedia('(min-width: 601px)');
  desktop.addEventListener('change', () => { if (desktop.matches) closeMenu(); });
  document.getElementById('language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'tr' : 'en'));
  reducedMotion.addEventListener('change', updateMotion);
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
  document.documentElement.classList.add('js-ready');
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('animated-scene')) entry.target.classList.toggle('is-in-view', entry.isIntersecting);
        else if (entry.isIntersecting) { entry.target.classList.add('is-in-view'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal,.animated-scene').forEach(el => observer.observe(el));
  } else document.querySelectorAll('.animated-scene').forEach(el => el.classList.add('is-in-view'));
  const visibility = () => document.body.classList.toggle('page-hidden', document.hidden);
  document.addEventListener('visibilitychange', visibility);
  visibility();
  projectOpen.addEventListener('click', () => {
    closeMenu();
    if (typeof dialog.showModal !== 'function') { location.href = 'mailto:emiryucelyucel27@hotmail.com'; return; }
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
  document.getElementById('project-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); projectOpen.focus({ preventScroll: true }); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  setLanguage(language);
})();
