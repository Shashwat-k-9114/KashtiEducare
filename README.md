# Kashti Educare (Next.js)

Production Next.js (App Router) build of the Kashti Educare site. Markup, styles, copy and behaviour are carried over 1:1 from the original static site (kept untouched in `legacy/`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploys as-is to Vercel (no env vars needed). If a corporate policy blocks Next's native compiler (an "Application Control" error on Windows), use `npx next build --webpack` / `npx next dev --webpack`.

## Layout

```
src/app/<route>/page.tsx   The 11 pages (/, why-kashti, people, programs, experiences, formats, institutions, partners, read, gallery, contact)
                           Each exports its own <title>, description, canonical and Open Graph metadata.
src/app/template.tsx       Shared chrome: icon sprite, skip link, announcement, header, footer, cookie banner
src/app/globals.css        All styles (identical to legacy/css/styles.css)
src/lib/data.js            ALL editable content: notices, downloads, programmes, partners, gallery, FAQ, ...
src/legacy/engine.js       The original main.js (rendering + interactions), wrapped as initKashti() with cleanup
src/components/Enhancer.tsx  Boots the engine after each navigation and tears it down on leave
legacy/                    The original static site, for reference/diffing
scripts/                   One-off converters used to generate the pages from legacy/*.html
```

## Everyday edits

Same as before, but in `src/lib/data.js` (see the comments at the top of that file): post a notice, add a programme, people, partners, gallery photos, FAQ, blog posts. The enquiry form uses `config.formEndpoint`, or opens an email to engage@kashtieducare.com when empty.

## Notes

- Old `*.html` URLs permanently redirect to the clean routes (`/programs.html?theme=global` -> `/programs?theme=global`); canonical URLs are the clean ones.
- Images and the logo still load from `https://kashtieducare.com` (set in `config.img`). To self-host, copy them into `public/` and update `config.img` and the logo `src` in the header/footer.
- `reactStrictMode` is off on purpose: the engine is imperative DOM code and StrictMode's dev-only double mount would initialise it twice.
- `/sitemap.xml` and `/robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.

## Google Sheet setup (form submissions)

Both forms (Contact enquiry, Newsletter) POST to `/api/submit`, which validates and appends a row to the Google Sheet via an Apps Script web app. Enquiries go to an `Enquiries` tab, newsletter sign-ups to a `Newsletter` tab (created with headers on first use).

1. Open the sheet -> Extensions -> Apps Script. Replace the contents with `google-apps-script/Code.gs`.
2. Project Settings -> Script properties -> add `SECRET` = a long random string.
3. Deploy -> New deployment -> type Web app -> Execute as: Me, Who has access: Anyone -> Deploy, authorise, copy the `/exec` URL.
4. Put `GOOGLE_SCRIPT_URL` (that URL) and `GOOGLE_SCRIPT_SECRET` (the same string) in `.env.local` and in Vercel's environment variables, then redeploy. See `.env.example`.

If the variables are missing the API returns 503 and the form shows its "didn't send" message with the email fallback.

### Confirmation emails

`Code.gs` also emails the visitor right after their row is saved: a branded "thank you" (with a summary of their enquiry) for the Contact form, and a welcome email for the Newsletter. They are sent from the Google account that owns the script (display name "Kashti Educare", replies go to engage@kashtieducare.com). A failed email never blocks the sheet write or the form.

After pasting the updated `Code.gs`: run `doPost` once from the editor (or any function) to approve the new permissions (send email, external requests), then **Deploy -> Manage deployments -> pencil -> Version: New version -> Deploy**. The `/exec` URL stays the same. Free Gmail accounts can send about 100 such emails a day (Google Workspace about 1,500).

Every submission also emails `engage@kashtieducare.com` ("New enquiry: ..." / "New newsletter sign-up: ...") with all the details, a "Reply" button (replies go straight to the visitor) and a link to the sheet. That makes 2 emails per submission, so a free Gmail account covers roughly 50 submissions a day. The logo is bundled inside `Code.gs` (`LOGO_B64`), so emails never depend on the website being reachable.

## Admin portal and CMS (`/admin`)

A password-protected portal that uses the same Google Sheet as its database.

**What it does**
- **Submissions inbox**: every enquiry and newsletter sign-up, with a status (New, Contacted, In discussion, Won, Closed, Spam), private notes, reply link, CSV export and delete.
- **Content editor**: 25 sections (announcement bar, contact details, notice board, downloads, featured stories, themes, the 53-programme catalogue, people, council, partners, values, stats, testimonials, FAQs, gallery, blog/newsletter/magazine and more). Edits are saved to the sheet's `Content` tab as overrides on top of the built-in content in `src/lib/data.js`. **Reset to original** removes the override. Every change is logged in the `Changelog` tab.
- Saves go live within seconds (cache tag `content`); the site otherwise refreshes at most every 60 s.

**Setup**
1. Paste the latest `google-apps-script/Code.gs` into Apps Script and **Deploy > Manage deployments > Edit > New version > Deploy** (the URL stays the same). This adds the admin actions and the Status/Notes columns.
2. Add these environment variables (`.env.local` and Vercel > Settings > Environment Variables), then redeploy:
   - `GOOGLE_SCRIPT_URL`, `GOOGLE_SCRIPT_SECRET` (as before)
   - `ADMIN_PASSWORD`: a long password
   - `ADMIN_SESSION_SECRET`: 32+ random characters
3. Open `/admin` and sign in.

**Security**: HMAC-signed HttpOnly session cookie (12 h), constant-time password check, lockout after 5 failures (15 min), same-origin and JSON-only writes, `noindex`, and the sheet is only reachable through the secret-guarded Apps Script.

**Not editable yet**: page copy written directly in the page files (hero headlines, section paragraphs, footer) and image uploads (images are URL fields). Phase 2 could add these.
