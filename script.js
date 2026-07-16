(() => {
  const config = window.SITE_CONFIG || {};
  const works = Array.isArray(window.ARTWORKS) ? window.ARTWORKS : [];
  const gallery = document.querySelector("#gallery");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
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
    link.textContent = config.instagramLabel || "Instagram";
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const renderGallery = () => {
    if (!gallery) return;

    gallery.innerHTML = "";

    works.forEach((work, index) => {
      const article = document.createElement("article");
      article.className = "artwork";

      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Open ${work.title || "artwork"}`);
      button.addEventListener("click", () => openLightbox(index));

      const image = document.createElement("img");
      image.src = work.src;
      image.alt = work.alt || work.title || "Artwork by Ruth Hussey";
      image.loading = index < 4 ? "eager" : "lazy";
      image.decoding = "async";
      image.addEventListener("error", () => article.remove());

      button.appendChild(image);
      article.appendChild(button);
      gallery.appendChild(article);
    });
  };

  const updateLightbox = () => {
    const work = works[currentIndex];
    if (!work || !lightboxImage) return;
    lightboxImage.src = work.src;
    lightboxImage.alt = work.alt || work.title || "Artwork by Ruth Hussey";
  };

  const openLightbox = (index) => {
    if (!lightbox || !works.length) return;
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

  const moveLightbox = (direction) => {
    currentIndex = (currentIndex + direction + works.length) % works.length;
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

  renderGallery();
})();
