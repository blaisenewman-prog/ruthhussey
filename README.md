# Ruth Hussey Artist Website

A responsive, static portfolio designed for GitHub Pages. No framework, database or paid hosting is required.

## 1. Add the paintings

1. Open the downloaded website folder.
2. Copy all suitable artwork images from `C:\Mom Pictures` into:

   `images/paintings/`

3. JPG, PNG, WebP and AVIF are best for the web. HEIC files should be converted to JPG or WebP because browser support is inconsistent.
4. Use descriptive filenames where possible, for example:

   `summer-nasturtiums.jpg`

   The filename becomes the displayed title: **Summer Nasturtiums**.

## 2. Build the gallery automatically

Open Command Prompt or PowerShell inside this website folder and run:

```bash
python build_gallery.py
```

This scans `images/paintings/` and rewrites `artworks.js`. Once real paintings are present, the six coloured placeholder images are ignored automatically.

You may then open `artworks.js` in Notepad or VS Code to edit titles, categories, media and dates. Example:

```js
{
  src: "images/paintings/summer-nasturtiums.jpg",
  title: "Summer Nasturtiums",
  category: "Flowers",
  medium: "Watercolour & ink on Arches paper",
  year: "2026"
}
```

Suggested categories are `Flowers`, `Figures` and `Animals`. New category names automatically become filter buttons.

## 3. Preview the website

Double-clicking `index.html` should work. A local server gives a more accurate preview:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in a browser.

## 4. Edit contact details

Open `site-config.js`. The name, email and Instagram account are controlled there.

## 5. Publish on GitHub Pages

1. Create a new public GitHub repository, for example `ruth-hussey-art`.
2. Upload everything inside this folder to the repository root. `index.html` must be visible at the top level.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. GitHub will show the live website address after deployment.

## Optional custom domain

A custom domain such as `ruthhussey.ie` can be connected under **Settings → Pages → Custom domain**. The domain provider will also need the DNS records shown by GitHub.

## Image recommendations

- Export paintings at roughly 1800–2500 px on the longest edge.
- Use an image quality around 80–88% for JPG/WebP.
- Keep each file below about 2 MB where possible.
- Photograph paintings straight-on, in even daylight, and crop away the wall or frame unless it is part of the presentation.
- Add a meaningful `alt` field in `artworks.js` for accessibility, for example: `alt: "Loose pink and orange flowers in a blue vase"`.
"# ruthhussey" 
