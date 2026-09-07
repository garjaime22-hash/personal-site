(function () {
  "use strict";

  const data = window.SITE_DATA;

  if (!data) {
    document.body.classList.add("data-error");
    return;
  }

  const byId = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const element = byId(id);
    if (element && value) element.textContent = value;
  };

  const configureLink = (id, url, options = {}) => {
    const element = byId(id);
    if (!element) return;

    if (!url) {
      element.hidden = true;
      return;
    }

    element.hidden = false;
    element.href = url;

    if (options.external !== false && !url.startsWith("mailto:")) {
      element.target = "_blank";
      element.rel = "noopener noreferrer";
    }
  };

  const makeExternalLink = (label, url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
  };

  document.title = `${data.name} | Probability Researcher`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `${data.name} — ${data.role} at ${data.institution}. Research, publications, and contact information.`;

  setText("wordmark-initials", data.initials);
  setText("wordmark-name", data.name);
  setText("hero-role", data.role);
  setText("hero-title", data.name);
  setText("hero-intro", data.intro);
  setText("hero-institution", data.institution);
  setText("hero-location", data.location);
  setText("research-overview", data.researchOverview);
  setText("contact-text", data.contactText);
  setText("footer-name", data.name);
  setText("current-year", new Date().getFullYear());

  configureLink("hero-scholar-link", data.scholarUrl);
  configureLink("publications-scholar-link", data.scholarUrl);
  configureLink("contact-scholar-link", data.scholarUrl);
  configureLink("contact-arxiv-link", data.arxivUrl);
  configureLink("contact-orcid-link", data.orcidUrl);
  configureLink("hero-cv-link", data.cvUrl);
  configureLink("nav-cv-link", data.cvUrl);
  configureLink("contact-cv-link", data.cvUrl);

  const emailLink = byId("contact-email");
  if (emailLink && data.email) {
    emailLink.textContent = data.email;
    emailLink.href = `mailto:${data.email}`;
  }

  const snapshotList = byId("research-snapshot-list");
  const researchList = byId("research-list");

  data.researchAreas.forEach((area, index) => {
    const snapshotItem = document.createElement("li");
    const snapshotNumber = document.createElement("span");
    const snapshotTitle = document.createElement("span");
    snapshotNumber.textContent = String(index + 1).padStart(2, "0");
    snapshotTitle.textContent = area.title;
    snapshotItem.append(snapshotNumber, snapshotTitle);
    snapshotList.append(snapshotItem);

    const article = document.createElement("article");
    article.className = "research-item";

    const number = document.createElement("p");
    number.className = "research-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const content = document.createElement("div");
    const heading = document.createElement("h3");
    const descriptionText = document.createElement("p");
    heading.textContent = area.title;
    descriptionText.textContent = area.description;
    content.append(heading, descriptionText);

    article.append(number, content);
    researchList.append(article);
  });

  const publicationList = byId("publication-list");

  data.publications.forEach((publication, index) => {
    const article = document.createElement("article");
    article.className = "publication";

    const number = document.createElement("p");
    number.className = "publication-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const body = document.createElement("div");
    body.className = "publication-body";

    const meta = document.createElement("p");
    meta.className = "publication-meta";
    meta.textContent = `${publication.year} · ${publication.status}`;

    const title = document.createElement("h3");
    title.textContent = publication.title;

    const authors = document.createElement("p");
    authors.className = "publication-authors";
    authors.textContent = publication.authors;

    const summary = document.createElement("p");
    summary.className = "publication-summary";
    summary.textContent = publication.summary;

    const links = document.createElement("div");
    links.className = "publication-links";
    links.setAttribute("aria-label", `Links for ${publication.title}`);

    if (publication.arxivUrl) links.append(makeExternalLink("arXiv", publication.arxivUrl));
    if (publication.pdfUrl) links.append(makeExternalLink("PDF", publication.pdfUrl));
    if (publication.journalUrl) links.append(makeExternalLink("Journal", publication.journalUrl));

    body.append(meta, title, authors, summary, links);
    article.append(number, body);
    publicationList.append(article);
  });

  const menuButton = byId("menu-button");
  const siteNav = byId("site-nav");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
})();
