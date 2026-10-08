// Development-only checks. Never included in the site's browser scripts.
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const root = path.resolve(__dirname, '..');
  const output = path.join(__dirname, 'results');
  await fs.mkdir(output, {recursive:true});
  const browser = await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROME_PATH ? {executablePath:process.env.PLAYWRIGHT_CHROME_PATH} : {})});
  const results = [];
  const errors = [];
  const url = process.env.PREVIEW_URL || 'http://127.0.0.1:8765/';
  try {
    for (const width of [1440,1024,768,390,320]) {
      const context = await browser.newContext({viewport:{width,height:900}});
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, {waitUntil:'networkidle', timeout:15000});
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({reducedMotion:'reduce'});
      for (const language of ['en','tr']) {
        if (language === 'tr') await page.locator('#language-toggle').click();
        assert.equal(await page.locator('html').getAttribute('lang'), language);
        assert.equal(await page.locator('.phone img').getAttribute('src'),language==='en'?'assets/images/restaurant-phone-en.png':'assets/images/restaurant-phone.png');
        assert.equal(await page.locator('.project-name').innerText(),'Dineit');
        assert.equal(await page.locator('a[href*="github.com"]').count(),0);
        const dimensions = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        assert.ok(dimensions.scroll <= dimensions.width + 1, JSON.stringify({width,language,dimensions}));
        assert.equal(await page.locator('[data-i18n]').evaluateAll(els=>els.filter(el=>!el.textContent.trim()).length), 0);
        assert.equal(await page.locator('img').evaluateAll(els=>els.filter(el=>el.complete && !el.naturalWidth).length), 0);
        results.push({width,language,horizontalOverflow:false});
        if (width === 1440 || width === 390 || width === 320) {
          await page.screenshot({path:path.join(output,width+'-'+language+'.png'),fullPage:true});
        }
      }
      await page.reload({waitUntil:'networkidle'});
      assert.equal(await page.locator('html').getAttribute('lang'), 'tr');
      if (width <= 600) {
        await page.locator('.menu-toggle').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
        await page.locator('#navigation a[href="#studio"]').click();
        assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      }
      await page.locator('#project-open').click();
      assert.equal(await page.locator('#project-dialog').evaluate(el=>el.open),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#project-dialog').evaluate(el=>el.open),false);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'project-open');
      assert.equal(await page.locator('#motion-toggle').count(),0);
      assert.equal(await page.locator('body').getAttribute('data-motion'),'off');
      assert.equal(await page.locator('.social-button:disabled').count(),3);
      assert.equal(await page.getByText('Astronaut Zero',{exact:true}).count(),0);
      await page.emulateMedia({reducedMotion:'no-preference'});
      assert.equal(await page.locator('body').getAttribute('data-motion'),'on');
      await page.reload({waitUntil:'networkidle'});
      assert.equal(await page.locator('body').getAttribute('data-motion'),'on');
      await context.close();
    }
    const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const page = await noJs.newPage();
    await page.goto(url, {waitUntil:'networkidle'});
    assert.ok(await page.locator('#navigation a[href="#games"]').isVisible());
    assert.ok(await page.locator('h1').isVisible());
    await noJs.close();
    assert.deepEqual(errors, []);
    await fs.writeFile(path.join(output,'checks.json'),JSON.stringify({passed:true,results,errors,checks:['translations','no horizontal overflow','images','mobile navigation','dialog and focus return','OS reduced motion','stored language preference','no-JavaScript content','inactive social placeholders','removed cancelled project']},null,2));
    console.log(JSON.stringify({passed:true,layouts:results.length,errors}));
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
