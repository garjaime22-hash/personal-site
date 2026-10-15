# Jaime Garza — personal academic website

This is a plain static website for GitHub Pages. It has no build step, paid
service, or complicated framework.

The site uses a traditional academic structure:

- Home / biography
- Research
- Publications
- Contact

## The one file you normally edit

Open **`site-data.js`** whenever you want to change:

- your biography or research interests;
- your email and academic profile links;
- publications and preprints;
- the link to your CV.

The other files control the pages and appearance. You normally do not need to
edit them.

## Add your CV

1. Rename your CV file to **`cv.pdf`**.
2. Upload it beside `index.html`.
3. Open `site-data.js`.
4. Change:

   ```js
   cvUrl: "",
   ```

   to:

   ```js
   cvUrl: "cv.pdf",
   ```

The CV link will then appear automatically.

## Add ORCID

In `site-data.js`, replace the empty `orcidUrl` with your full ORCID
address. Leave it empty if you do not want an ORCID link displayed.

## Add a publication

Open `site-data.js`. At the top of the `publications` list, paste a copy of
this block and replace the text inside quotation marks:

```js
{
  year: "2027",
  status: "Preprint",
  title: "Paper title",
  authors: "Author One and Author Two",
  arxivUrl: "https://arxiv.org/abs/0000.00000",
  pdfUrl: "https://arxiv.org/pdf/0000.00000",
  journalUrl: ""
},
```

Paper summaries are deliberately not part of the site. Keep the comma after the
closing brace when another publication follows it.

## If an edit breaks the page

The most common cause is a missing quotation mark or comma in
`site-data.js`. On GitHub, open the file's **History** and restore the most
recent working version, or ask ChatGPT to inspect the edited section.

## What each file does

| File | Purpose |
| --- | --- |
| `site-data.js` | All routine text, links, research areas, and publications |
| `index.html` | Home / biography page |
| `research.html` | Research page |
| `publications.html` | Publications page |
| `contact.html` | Contact page |
| `styles.css` | Colors, typography, spacing, and mobile layout |
| `app.js` | Places the information from `site-data.js` onto every page |
| `favicon.svg` | Small JG icon in the browser tab |
