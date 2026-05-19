# Aura Sky Website

This repository is the public GitHub Pages website for Aura Sky.

Live site:

```text
https://jorrian.github.io/aura-sky/
```

Use the live site as the App Store Marketing URL. Use the support page as the App Store Support URL:

```text
https://jorrian.github.io/aura-sky/support/
```

## Purpose

The site presents Aura Sky to App Store reviewers and users with:

- a product landing page
- supported-platform notes
- support information
- privacy policy
- terms and safety disclaimer
- static assets used by the public site

## Repository Boundary

This repo is public. Keep it limited to public website files.

Do not commit:

- Aura Sky app source code
- App Store Connect working notes
- internal release docs
- screenshots or assets that are not intended for public website use
- secrets, private API keys, provisioning data, or local build artifacts

The private Aura Sky app repository remains the source of truth for product code and internal release planning. Public website updates should stay aligned with the app repo's `website/` source and current App Store copy.

## File Layout

- `index.html`: public landing page.
- `support/index.html`: support page and data-source notes.
- `privacy/index.html`: privacy policy.
- `terms/index.html`: terms and disclaimer.
- `assets/aura-sky/`: public website images and styles.
- `.nojekyll`: keeps GitHub Pages from applying Jekyll processing.

## Local Preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Validation

For content-only changes, verify the affected pages render locally and keep links relative so GitHub Pages works from the repository root.
