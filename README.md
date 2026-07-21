# Dea Nur Fauzi — Portfolio (editable, GitHub Pages)

Static site, no server. `index.html` renders content from `content.json`.
`admin.html` lets you edit that JSON and push it straight to this repo — GitHub
Pages then serves the update automatically.

## 1. Put this on GitHub

1. Create a **public** repository (GitHub Pages' free tier needs public for a
   user/repo site) — e.g. `portfolio`.
2. Upload all 5 files from this folder to the repo root:
   `index.html`, `admin.html`, `style.css`, `app.js`, `content.json`.
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch:
   `main` / `(root)` → Save.
4. Your site goes live at `https://<username>.github.io/<repo>/` within a
   minute or two.

## 2. Create a token so the admin page can save

The admin page needs a **fine-grained personal access token** scoped to only
this repo — that's what actually protects your content, not the passcode.

1. GitHub → your avatar → **Settings → Developer settings → Personal access
   tokens → Fine-grained tokens → Generate new token**.
2. **Repository access**: "Only select repositories" → choose this repo.
3. **Permissions** → Repository permissions → **Contents: Read and write**.
   (Nothing else needed.)
4. Generate, copy the token (starts with `github_pat_…`). GitHub only shows
   it once — save it somewhere safe (a password manager, not a text file in
   the repo).

## 3. Edit your portfolio

1. Go to `https://<username>.github.io/<repo>/admin.html`.
2. First visit: set a local passcode (only guards this browser, so casual
   visitors who find the URL can't poke around the editor UI).
3. Enter your GitHub username, repo name, branch (`main`), and the token from
   step 2.
4. Click **Load content.json from repo**, edit the JSON, then **Save to
   GitHub**. The live site updates within about a minute.
5. Click **Lock editor** or just close the tab when done — the token only
   lives in the page's memory for that session, it's never written to the
   repo.

### What each field in content.json controls
- `profile` — name, title, contact details in the header/footer.
- `hero.points` — the 4 metrics plotted on the control chart (fixed at 4
  points to keep the chart's layout intact).
- `experience`, `projects`, `achievements` — arrays; add or remove objects
  freely, each renders as its own card/row.
- `skillBins` — the four toolboard groups; edit `chips` freely.
- `education`, `certifications` — arrays, same pattern.

If the JSON editor shows an error on save, it's telling you the JSON is
invalid (usually a missing comma or bracket) — the **Format JSON** button
will also flag this.

## Security notes (read this once)

- The site itself is fully public, as is its source — that's normal for a
  portfolio and for `content.json`.
- `admin.html` is also publicly reachable at its URL, but it can't do
  anything without a valid token. Don't rely on the URL being "secret."
- Only ever use a **fine-grained** token limited to this one repo with
  **Contents: Read/write** — never a classic token with broad account access.
- If a token ever leaks, revoke it immediately from GitHub's token settings
  and generate a new one.
