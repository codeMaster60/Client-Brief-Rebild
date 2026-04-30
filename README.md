# Rebild-Style Client Onboarding Website

This is a self-contained static website inspired by the Emergent preview.

Open `index.html` in a browser. No build step or package install is required.

## Files

- `index.html` - page structure
- `styles.css` - complete visual styling
- `script.js` - multi-step form, local uploads UI, thank-you screen, and local admin mock

## Notes

- Submissions are saved to `localStorage` in the browser.
- Uploaded files are listed by name/size only; a pure static site cannot upload files to a server.
- The Admin button opens a local mock inbox from saved submissions.
- Replace the image URLs or logo URL in `script.js` if you want to rebrand it.
