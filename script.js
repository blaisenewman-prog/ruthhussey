(() => {
  const config = window.SITE_CONFIG || {};
  const works = Array.isArray(window.ARTWORKS) ? window.ARTWORKS : [];
  const gallery = document.querySelector("#gallery");
  const filterRow = document.querySelector("#filter-row");
  const emptyMessage = document.querySelector("#gallery-empty");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxMeta = document.querySelector("#lightbox-meta");
  let activeFilter = "All";
  let visibleWorks = works;
  let currentIndex = 0;

  document.querySelectorAll("[data-site-name]").forEach((node) => {
    node.textContent = config.artistName || "Ruth Hussey";
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    const email = config.email || "Ruthhussey@gmail.com";
    link.href = `mailto:${email}`;
    link.textContent = email;
  });

  document.querySelectorAll("[data-instagram-link]").forEach((link) => {
    link.href = config.instagramUrl || "https://www.instagram.com/";
    if (link.closest(".contact-links")) {
      link.textContent = `${config.instagramLabel || "Instagram"} ↗`;
    }
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();

  const categories = ["All", ...new Set(works.map((work) => work.category || "Other"))];

  const makeFilterButtons = () => {
    if (!filterRow) return;
    filterRow.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${category === activeFilter ? " is-active" : ""}`;
      button.textContent = category;
      button.setAttribute("aria-pressed", category === activeFilter ? "true" : "false");
      button.addEventListener("click", () => {
        activeFilter = category;
        makeFilterButtons();
        renderGallery();
      });
      filterRow.appendChild(button);
    });
  };

  const artworkMeta = (work) => [work.medium, work.year].filter(Boolean).join(" · ");

  const renderGallery = () => {
    if (!gallery) return;
    visibleWorks = activeFilter === "All"
      ? works
      : works.filter((work) => (work.category || "Other") === activeFilter);

    gallery.innerHTML = "";
    emptyMessage.hidden = visibleWorks.length > 0;

    visibleWorks.forEach((work, index) => {
      const article = document.createElement("article");
      article.className = "artwork-card";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "artwork-button";
      button.setAttribute("aria-label", `View ${work.title || "artwork"}`);
      button.addEventListener("click", () => openLightbox(index));

      const imageWrap = document.createElement("span");
      imageWrap.className = "artwork-image-wrap";

      const image = document.createElement("img");
      image.className = "artwork-image";
      image.src = work.src;
      image.alt = work.alt || work.title || "Artwork by Ruth Hussey";
      image.loading = index < 3 ? "eager" : "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => {
        article.hidden = true;
      });

      const caption = document.createElement("span");
      caption.className = "artwork-caption";
      caption.innerHTML = `
        <span class="artwork-title">${escapeHTML(work.title || "Untitled")}</span>
        <span class="artwork-meta">${escapeHTML(artworkMeta(work))}</span>
      `;

      imageWrap.appendChild(image);
      button.append(imageWrap, caption);
      article.appendChild(button);
      gallery.appendChild(article);
    });

    updateHeroImages();
  };

  const updateHeroImages = () => {
    const first = works[0];
    const second = works[1] || works[0];
    if (first) document.querySelector("#hero-image-one").src = first.src;
    if (second) document.querySelector("#hero-image-two").src = second.src;
  };

  const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const openLightbox = (index) => {
    if (!lightbox || !visibleWorks.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.showModal();
    document.body.classList.add("is-locked");
  };

  const closeLightbox = () => {
    if (!lightbox?.open) return;
    lightbox.close();
    document.body.classList.remove("is-locked");
  };

  const updateLightbox = () => {
    const work = visibleWorks[currentIndex];
    if (!work) return;
    lightboxImage.src = work.src;
    lightboxImage.alt = work.alt || work.title || "Artwork by Ruth Hussey";
    lightboxTitle.textContent = work.title || "Untitled";
    lightboxMeta.textContent = artworkMeta(work);
  };

  const moveLightbox = (direction) => {
    currentIndex = (currentIndex + direction + visibleWorks.length) % visibleWorks.length;
    updateLightbox();
  };

  document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  document.querySelector(".lightbox-prev")?.addEventListener("click", () => moveLightbox(-1));
  document.querySelector(".lightbox-next")?.addEventListener("click", () => moveLightbox(1));
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox?.open) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  makeFilterButtons();
  renderGallery();
})();
