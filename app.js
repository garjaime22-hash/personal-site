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
  if (description) {
    description.content = `${data.name} — ${data.role} at ${data.institution}. Research, publications, and contact information.`;
  }

  setText("header-name", data.name);
  setText("intro-role", data.role);
  setText("page-title", data.name);
  setText("intro-institution", data.institution);
  setText("intro-location", data.location);
  setText("intro-text", data.intro);
  setText("research-overview", data.researchOverview);
  setText("contact-text", data.contactText);
  setText("footer-name", data.name);
  setText("current-year", new Date().getFullYear());

  const mailto = data.email ? `mailto:${data.email}` : "";
  configureLink("intro-email-link", mailto, { external: false });
  configureLink("intro-scholar-link", data.scholarUrl);
  configureLink("intro-arxiv-link", data.arxivUrl);
  configureLink("intro-orcid-link", data.orcidUrl);
  configureLink("intro-cv-link", data.cvUrl);
  configureLink("nav-cv-link", data.cvUrl);
  configureLink("publications-scholar-link", data.scholarUrl);
  configureLink("contact-scholar-link", data.scholarUrl);
  configureLink("contact-arxiv-link", data.arxivUrl);
  configureLink("contact-orcid-link", data.orcidUrl);
  configureLink("contact-cv-link", data.cvUrl);

  const emailLink = byId("contact-email");
  if (emailLink && data.email) {
    emailLink.textContent = data.email;
    emailLink.href = mailto;
  } else if (emailLink) {
    emailLink.hidden = true;
  }

  const researchList = byId("research-list");
  (data.researchAreas || []).forEach((area) => {
    const article = document.createElement("article");
    article.className = "research-topic";

    const heading = document.createElement("h3");
    heading.textContent = area.title;

    const descriptionText = document.createElement("p");
    descriptionText.textContent = area.description;

    article.append(heading, descriptionText);
    researchList.append(article);
  });

  const publicationList = byId("publication-list");
  (data.publications || []).forEach((publication) => {
    const article = document.createElement("article");
    article.className = "publication";

    const year = document.createElement("p");
    year.className = "publication-year";
    year.textContent = publication.year;

    const body = document.createElement("div");
    body.className = "publication-body";

    const title = document.createElement("h3");
    if (publication.arxivUrl || publication.journalUrl) {
      title.append(makeExternalLink(publication.title, publication.journalUrl || publication.arxivUrl));
    } else {
      title.textContent = publication.title;
    }

    const authors = document.createElement("p");
    authors.className = "publication-authors";
    authors.textContent = publication.authors;

    const status = document.createElement("p");
    status.className = "publication-status";
    status.textContent = publication.status;

    const summary = document.createElement("p");
    summary.className = "publication-summary";
    summary.textContent = publication.summary;

    const links = document.createElement("div");
    links.className = "publication-links";
    links.setAttribute("aria-label", `Links for ${publication.title}`);

    if (publication.arxivUrl) links.append(makeExternalLink("arXiv", publication.arxivUrl));
    if (publication.pdfUrl) links.append(makeExternalLink("PDF", publication.pdfUrl));
    if (publication.journalUrl) links.append(makeExternalLink("Journal", publication.journalUrl));

    body.append(title, authors, status);
    if (publication.summary) body.append(summary);
    body.append(links);
    article.append(year, body);
    publicationList.append(article);
  });
})();
