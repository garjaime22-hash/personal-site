# Jaime Garza — personal academic website

This is a plain static website designed for GitHub Pages. It has no build step,
no paid service, and no complicated framework.

## The one file you normally edit

Open **`site-data.js`** whenever you want to change:

- your bio or research interests;
- your email and academic profile links;
- publications and preprints;
- the link to your CV.

The other files control the layout and appearance. You usually do not need to
touch them.

## Publish it on GitHub Pages

Because your GitHub username is `garjaime22-hash`, use this exact repository
name to get the cleanest address:

**`garjaime22-hash.github.io`**

1. On GitHub, click **New repository**.
2. Enter `garjaime22-hash.github.io` as the repository name.
3. Select **Public**, then click **Create repository**.
4. Unzip the website package on your computer.
5. In the new repository, click **uploading an existing file** (or **Add file → Upload files**).
6. Upload every file from inside this folder. `index.html` must be at the top
   level of the repository, not inside another folder.
7. Click **Commit changes**.
8. Open **Settings → Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**. Select
   **main** and **/(root)**, then click **Save**.

Your site will appear at:

<https://garjaime22-hash.github.io/>

The first publication can take a few minutes. Later edits usually appear within
one or two minutes, though GitHub occasionally takes longer.

## Add your CV

1. Rename your CV file to **`cv.pdf`**.
2. Upload `cv.pdf` to the same place as `index.html`.
3. Open `site-data.js` and click the pencil icon.
4. Find this line:

   ```js
   cvUrl: "",
   ```

5. Change it to:

   ```js
   cvUrl: "cv.pdf",
   ```

6. Commit the change. CV links will automatically appear in the header, hero,
   and contact section.

## Add ORCID later

In `site-data.js`, change:

```js
orcidUrl: "",
```

to your full ORCID address, for example:

```js
orcidUrl: "https://orcid.org/0000-0000-0000-0000",
```

Do not use the example number as your real ORCID.

## Add a publication

Open `site-data.js`. At the top of the `publications` list, paste a copy of this
block and replace the text inside quotation marks:

```js
{
  year: "2027",
  status: "Preprint",
  title: "Paper title",
  authors: "Author One and Author Two",
  summary: "A short one- or two-sentence description.",
  arxivUrl: "https://arxiv.org/abs/0000.00000",
  pdfUrl: "https://arxiv.org/pdf/0000.00000",
  journalUrl: ""
},
```

Important: keep the comma after the closing `}` when another publication comes
after it.

## Update ordinary text

In `site-data.js`, only change words inside quotation marks. For example:

```js
location: "Ottawa, Canada",
```

can become:

```js
location: "Montréal, Canada",
```

Keep the quotation marks and the comma.

## If an edit breaks the page

The most common cause is a missing quotation mark or comma in `site-data.js`.
On GitHub, open the file's **History**, choose the last working version, and use
it to restore the file. You can also paste the edited section into ChatGPT and
ask it to find the JavaScript punctuation error.

## What each file does

| File | Purpose |
| --- | --- |
| `site-data.js` | All routine text, links, research areas, and publications |
| `index.html` | Page structure and search-engine information |
| `styles.css` | Colors, typography, spacing, and mobile layout |
| `app.js` | Places the content from `site-data.js` onto the page |
| `favicon.svg` | Small JG icon in the browser tab |
| `README.md` | These instructions; it does not appear on the website |

## Details to verify

The initial publication list was assembled from Jaime Garza's public arXiv
author results. Before treating the site as final, check the wording of the
research summary, publication years/statuses, and add the current CV.
