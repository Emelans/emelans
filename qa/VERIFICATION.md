# Verification — 2026-10-09

## Passed

- JavaScript syntax check.
- git diff --check.
- Fourteen static / simulated-DOM checks via node qa/static-check.cjs, including approved MOK poses, icons, accessible branding, asset paths, unique IDs, anchor targets, contact/domain preservation, initialization, translation coverage, navigation/Escape, dialog close/focus return, reduced-motion handling, inactive social buttons, Dineit naming, screenshot selection and storage failure resilience.
- Real Chromium browser: 1440, 1024, 768, 390 and 320 CSS-pixel widths, each in English and Turkish. No document or header horizontal overflow in these ten checks. Correct language-specific phone screenshot selected.
- Visual inspection: desktop studio section, narrow mobile home and contact/footer. All three MOK PNGs loaded, with no handheld props. Footer logo lettering remains readable on its light plaque.
- Mobile navigation opens and closes on link selection. Native project dialog opens, closes via Escape, and returns keyboard focus to its trigger.
- No warnings or errors in the captured preview browser log.
- Local preview returned HTTP 200. Earlier local timeout was resolved by running the server with the necessary local network permission.

## Not verified

- Real Safari/iPhone rendering.
- Standalone Playwright integration suite was not run; the browser checks above used the connected browser instead.
- Physical device, VoiceOver and other browser engines.

The simulated DOM checks do not validate CSS layout or native browser behaviour. Responsive Chromium checks are not physical iPhone/Safari tests.

## Delivery scope

Website publication to the existing GitHub Pages main branch is explicitly authorized by the owner. CNAME is unchanged. Internal research, generation prompts, rejected logos and QA screenshots are excluded from the commit. No Unity source change, TestFlight upload, account security change or DNS change.
