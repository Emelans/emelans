(() => {
  'use strict';
  // Language switch for the simple text pages (privacy, terms, KVKK, support). Every language a page
  // offers is in the page (data-langs, English and Turkish by default). The header key switches
  // between English and Turkish like the home page; the Bistroodle legal pages also have a row with
  // all nine game languages, and open in the one asked for (?lang=de), the one chosen before, or the
  // browser's own.
  const root = document.documentElement;
  const languages = (root.dataset.langs || 'en tr').split(' ');
  const read = () => { try { return localStorage.getItem('emelans-language'); } catch { return null; } };
  const save = value => { try { localStorage.setItem('emelans-language', value); } catch { /* Preferences are optional. */ } };
  const button = document.getElementById('language-toggle');
  const label = document.getElementById('language-label');
  const switches = document.querySelectorAll('[data-set-lang]');
  const titleOf = language => root.dataset['title' + language[0].toUpperCase() + language.slice(1)] || root.dataset.titleEn;
  function setLanguage(language) {
    root.lang = language;
    document.title = titleOf(language);
    document.querySelectorAll('[data-en]').forEach(el => { el.textContent = el.dataset[language] || el.dataset.en; });
    label.textContent = language === 'tr' ? 'EN' : 'TR';
    button.setAttribute('aria-label', language === 'tr' ? 'Switch to English' : 'Türkçeye geç');
    button.title = button.getAttribute('aria-label');
    switches.forEach(el => el.setAttribute('aria-pressed', String(el.dataset.setLang === language)));
    save(language);
  }
  function initial() {
    const asked = new URLSearchParams(location.search).get('lang');
    if (asked && languages.includes(asked)) return asked;
    const stored = read();
    if (stored && languages.includes(stored)) return stored;
    if (languages.length > 2) {
      const browser = (navigator.language || '').slice(0, 2).toLowerCase();
      if (languages.includes(browser)) return browser;
    }
    return 'en';
  }
  button.addEventListener('click', () => setLanguage(root.lang === 'tr' ? 'en' : 'tr'));
  switches.forEach(el => el.addEventListener('click', () => setLanguage(el.dataset.setLang)));
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
  root.classList.add('js-ready');
  setLanguage(initial());
})();
