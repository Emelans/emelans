# Emelans website

A self-contained, bilingual studio website for GitHub Pages. No build step, external JavaScript libraries, analytics, cookies or runtime font services.

## Preview

Open index.html in a browser for a quick look. For normal web-server behaviour, run a local static server in this folder, for example:

    python -m http.server 8765 --bind 127.0.0.1

Then visit http://127.0.0.1:8765/. The existing CNAME remains emelans.com.

Publishing target: the existing `main` branch of Emelans/emelans and its GitHub Pages site, emelans.com. The owner approved publishing this redesign and the MOK branding on 2026-10-08. See qa/VERIFICATION.md for actual checks and delivery status.

## Contents

- Responsive studio landing page, with actual small-scale game screenshots.
- English / Turkish switch and locally stored language preference.
- Project preview dialog, mobile navigation and keyboard access.
- Short entrance/hover transitions only; no perpetual animation or pause button.
- System reduced-motion support remains automatic.
- Instagram, YouTube and X buttons in the contact section. No coming-soon captions or fake account links; disabled until real account URLs are provided.
- Direct email contact: emiryucelyucel27@hotmail.com.

Dineit is the user-confirmed game name. No public download or store launch is claimed. The cancelled project was removed. Project A is shown only as an early concept, not an announced or released game.

## Assets

- assets/images/restaurant-world.png: own-game capture from Reports/2026-10-08-sky-city/tablet-0-istanbul.png.
- assets/images/restaurant-phone.png: own-game capture from Reports/2026-10-08-sky-city/live-hud-istanbul.png.
- assets/images/restaurant-phone-en.png: unmodified English-mode own-game capture from Reports/2026-10-07-test-feedback/Phone/salon-en.png. This is older than the sky-city capture and should eventually be replaced with a current English capture. The Turkish restaurant name in this image is a player/shop proper name, not a tutorial label. Switching site language selects the corresponding screenshot without distorting its aspect ratio.
- assets/fonts/outfit-variable.ttf: Outfit, official Google Fonts repository (google/fonts, ofl/outfit). SIL Open Font License 1.1 is included as assets/fonts/OFL.txt.
- assets/brand/mok/: owner-approved transparent MOK mascot lockups in three empty-handed poses. Wave appears in the header, peek in the studio section, jump in the footer on a light plaque for contrast. PNG artwork is unchanged; CSS frames remove empty canvas margins. Decorative images have empty alt text; home links retain accessible Emelans labels.
- MOK face icons at 32, 180 and 192 pixels replace the old geometric favicon. The face was derived from the approved mascot with the built-in image tool, then downsampled for the browser and Apple touch icon.
- Unused logo concepts and internal research are not published. No third-party logo is copied, and this is not a trademark-clearance claim.
- Original favicon.png is preserved, but not loaded by the redesigned page.

## Checks

qa/static-check.cjs checks local assets, translation completeness, markup references and script behaviour in a lightweight DOM simulation:

    node qa/static-check.cjs

qa/site-check.cjs is a browser integration test requiring Playwright in the Node environment and a running local server:

    node qa/site-check.cjs

Optional environment variables: PREVIEW_URL and PLAYWRIGHT_CHROME_PATH. It checks five viewport widths in both languages, preferences, navigation, dialog focus and reduced-motion handling, and saves screenshots under qa/results/ (ignored by Git).

See qa/VERIFICATION.md for the latest browser checks. Static/DOM checks do not replace real-device Safari/iPhone testing.

## Publishing

Publish website files and used assets to the existing GitHub Pages branch after owner approval. Keep CNAME unchanged. Do not include qa/results/, internal research, rejected concepts or generation prompts.

## Review revisions

- English studio descriptions use indie consistently.
- GitHub links, exposed email address, no-forms copy and decorative language icon removed.
- Generic principles replaced with a concrete Dineit development card.
- Brand references reviewed: https://ustwogames.co.uk/ and https://rawfury.com/. No third-party logo is used or copied.
