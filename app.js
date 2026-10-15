(function () {
  "use strict";

  const data = window.SITE_DATA;

  if (!data) {
    document.body.classList.add("data-error");
    return;
  }

  const fieldValues = {
    name: data.name,
    initials: data.initials,
    role: data.role,
    institution: data.institution,
    location: data.location,
    intro: data.intro,
    "research-overview": data.researchOverview,
    "contact-text": data.contactText,
    "current-year": new Date().getFullYear()
  };

  Object.entries(fieldValues).forEach(function (entry) {
    const field = entry[0];
    const value = entry[1];
    if (!value) return;

    document.querySelectorAll('[data-field="' + field + '"]').forEach(function (element) {
      element.textContent = value;
    });
  });

  const linkValues = {
    email: data.email ? "mailto:" + data.email : "",
    scholar: data.scholarUrl,
    arxiv: data.arxivUrl,
    orcid: data.orcidUrl,
    cv: data.cvUrl
  };

  Object.entries(linkValues).forEach(function (entry) {
    const kind = entry[0];
    const url = entry[1];

    document.querySelectorAll('[data-link="' + kind + '"]').forEach(function (element) {
      if (!url) {
        element.hidden = true;
        return;
      }

      element.hidden = false;
      element.href = url;

      if (element.hasAttribute("data-use-email-address")) {
        element.textContent = data.email;
      }

      if (kind !== "email") {
        element.target = "_blank";
        element.rel = "noopener noreferrer";
      }
    });
  });

  const page = document.body.dataset.page || "home";
  const activeNavigationLink = document.querySelector('[data-nav="' + page + '"]');
  if (activeNavigationLink) activeNavigationLink.setAttribute("aria-current", "page");

  const pageTitles = {
    home: data.name + " | Probability Researcher",
    research: "Research | " + data.name,
    publications: "Publications | " + data.name,
    contact: "Contact | " + data.name
  };
  document.title = pageTitles[page] || data.name;

  const description = document.querySelector('meta[name="description"]');
  if (description && page === "home") {
    description.content = data.name + " — " + data.role + " at " + data.institution + ".";
  }

  const makeExternalLink = function (label, url) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
  };

  const researchList = document.getElementById("research-list");
  if (researchList) {
    (data.researchAreas || []).forEach(function (area) {
      const section = document.createElement("section");
      section.className = "research-topic";

      const heading = document.createElement("h2");
      heading.textContent = area.title;

      const descriptionText = document.createElement("p");
      descriptionText.textContent = area.description;

      section.append(heading, descriptionText);
      researchList.append(section);
    });
  }

  const publicationList = document.getElementById("publication-list");
  if (publicationList) {
    const publications = data.publications || [];

    publications.forEach(function (publication, index) {
      const item = document.createElement("li");
      item.className = "publication";

      const number = document.createElement("span");
      number.className = "publication-number";
      number.textContent = "[" + (publications.length - index) + "]";
      number.setAttribute("aria-hidden", "true");

      const body = document.createElement("div");
      body.className = "publication-body";

      const title = document.createElement("h2");
      const titleUrl = publication.journalUrl || publication.arxivUrl;
      if (titleUrl) {
        title.append(makeExternalLink(publication.title, titleUrl));
      } else {
        title.textContent = publication.title;
      }

      const citation = document.createElement("p");
      citation.className = "publication-citation";
      citation.textContent = publication.authors;

      const details = document.createElement("p");
      details.className = "publication-details";
      details.textContent = [publication.status, publication.year].filter(Boolean).join(" · ");

      const links = document.createElement("div");
      links.className = "publication-links";
      links.setAttribute("aria-label", "Links for " + publication.title);

      if (publication.arxivUrl) links.append(makeExternalLink("arXiv", publication.arxivUrl));
      if (publication.pdfUrl) links.append(makeExternalLink("PDF", publication.pdfUrl));
      if (publication.journalUrl) links.append(makeExternalLink("Journal", publication.journalUrl));

      body.append(title, citation, details, links);
      item.append(number, body);
      publicationList.append(item);
    });
  }
})();
