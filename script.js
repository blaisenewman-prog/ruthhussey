(() => {
  const config = window.SITE_CONFIG || {};
  const galleryData = window.GALLERY_DATA || {};
  const legacyWorks = Array.isArray(window.ARTWORKS) ? window.ARTWORKS : [];
  const page = document.body.dataset.page || "home";
  let visibleWorks = [];
  let currentIndex = 0;

  const normaliseWork = (work) => {
    if (typeof work === "string") {
      return { src: work, alt: "Artwork by Ruth Hussey" };
    }

    return {
      src: work?.src || "",
      alt: work?.alt || work?.title || "Artwork by Ruth Hussey"
    };
  };

  const largeWorks = Array.isArray(galleryData.large) && galleryData.large.length
    ? galleryData.large.map(normaliseWork)
    : legacyWorks.map(normaliseWork);

  const smallWorks = Array.isArray(galleryData.small)
    ? galleryData.small.map(normaliseWork)
    : [];

  const homeWork = galleryData.home
    ? normaliseWork(galleryData.home)
    : (largeWorks[0] || smallWorks[0] || null);

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
    link.textContent = config.instagramLabel || "Instagram";
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const homeImage = document.querySelector("#home-image");
  if (homeImage && homeWork?.src) {
    homeImage.src = homeWork.src;
    homeImage.alt = homeWork.alt;
    homeImage.hidden = false;
  }

  const gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    visibleWorks = gallery.dataset.gallery === "small" ? smallWorks : largeWorks;

    visibleWorks.forEach((work, index) => {
      if (!work.src) return;

      const figure = document.createElement("figure");
      figure.className = "artwork";

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Open artwork ${index + 1}`);
      button.addEventListener("click", () => openLightbox(index));

      const image = document.createElement("img");
      image.src = work.src;
      image.alt = work.alt;
      image.loading = index < 4 ? "eager" : "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => figure.remove());

      button.appendChild(image);
      figure.appendChild(button);
      gallery.appendChild(figure);
    });
  }

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");

  function updateLightbox() {
    const work = visibleWorks[currentIndex];
    if (!work || !lightboxImage) return;
    lightboxImage.src = work.src;
    lightboxImage.alt = work.alt;
  }

  function openLightbox(index) {
    if (!lightbox || !visibleWorks.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.showModal();
    document.body.classList.add("is-locked");
  }

  function closeLightbox() {
    if (!lightbox?.open) return;
    lightbox.close();
    document.body.classList.remove("is-locked");
  }

  function moveLightbox(direction) {
    currentIndex = (currentIndex + direction + visibleWorks.length) % visibleWorks.length;
    updateLightbox();
  }

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
})();
