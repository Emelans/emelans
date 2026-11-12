(() => {
  'use strict';
  // Language switch for the simple text pages (privacy, support). Both languages are in the
  // page; the switch shows one and remembers the choice together with the home page.
  const root = document.documentElement;
  const read = () => { try { return localStorage.getItem('emelans-language'); } catch { return null; } };
  const save = value => { try { localStorage.setItem('emelans-language', value); } catch { /* Preferences are optional. */ } };
  const button = document.getElementById('language-toggle');
  const label = document.getElementById('language-label');
  function setLanguage(language) {
    root.lang = language;
    document.title = root.dataset['title' + (language === 'tr' ? 'Tr' : 'En')];
    document.querySelectorAll('[data-en]').forEach(el => { el.textContent = language === 'tr' ? el.dataset.tr : el.dataset.en; });
    label.textContent = language === 'en' ? 'TR' : 'EN';
    button.setAttribute('aria-label', language === 'en' ? 'Türkçeye geç' : 'Switch to English');
    button.title = button.getAttribute('aria-label');
    save(language);
  }
  button.addEventListener('click', () => setLanguage(root.lang === 'tr' ? 'en' : 'tr'));
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
  root.classList.add('js-ready');
  setLanguage(read() === 'tr' ? 'tr' : 'en');
})();
