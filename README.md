# Orthopaedic Oncology Pocket Guide

A lightweight installable PWA designed for GitHub Pages and iPhone.

## Deploy with GitHub Pages
1. Create a new GitHub repository.
2. Upload/push everything in this folder to the repository root.
3. In GitHub: Settings → Pages.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then Save.
6. Open the published URL in **Safari** on your iPhone.
7. Tap **Share → Add to Home Screen → Add**.

## Local test
Because service workers require HTTP/HTTPS, do not test by double-clicking `index.html`.
Run a small local server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Clinical safety
This prototype is for clinician education/reference only. Verify clinical content against current institutional protocols and specialty guidance. Do not store PHI in this app unless you later add an appropriately secured, compliant backend and institutional approval.

## Suggested next features
- Expanded tumor library
- Custom favorites
- Post-op surveillance schedules
- Bone lesion differential helper
- Sarcoma staging reference
- Patient education handouts
- Secure sign-in/backend only if truly needed
