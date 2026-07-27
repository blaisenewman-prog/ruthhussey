/* Gallery image lists. Keep this file in sync when images are added or removed. */
const galleryWorks = (folder, files) => files.map((name) => ({
  src: `images/${folder}/${name}`,
  alt: "Artwork by Ruth Hussey"
}));

window.GALLERY_DATA = {
  home: {
    src: "images/home/WhatsApp Image 2026-07-16 at 1.07.02 PM (1).jpeg",
    alt: "Artwork by Ruth Hussey"
  },
  large: galleryWorks("large-works", [
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (1).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (10).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (11).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (12).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (2).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (3).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (4).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (6).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (7).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (8).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (9).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM.jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (10).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (20).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (21).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (22).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (23).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (24).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (25).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (26).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (28).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (5).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (6).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (9).jpeg",
    "WhatsApp Image 2026-07-16 at 2.01.46 PM.jpeg", "WhatsApp Image 2026-07-16 at 2.02.11 PM.jpeg",
    "WhatsApp Image 2026-07-16 at 2.03.29 PM (1).jpeg", "WhatsApp Image 2026-07-16 at 2.03.29 PM (2).jpeg",
    "WhatsApp Image 2026-07-16 at 2.03.29 PM (3).jpeg", "WhatsApp Image 2026-07-16 at 2.03.29 PM.jpeg"
  ]),
  small: galleryWorks("small-works", [
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (15).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (16).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (17).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (5).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (11).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (12).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (13).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (14).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (15).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (16).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (17).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (18).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (19).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (2).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (29).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (3).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (30).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (31).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (4).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM (7).jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.03 PM (8).jpeg", "WhatsApp Image 2026-07-16 at 1.07.03 PM.jpeg",
    "WhatsApp Image 2026-07-27 at 5.22.06 PM (1).jpeg", "WhatsApp Image 2026-07-27 at 5.22.06 PM (2).jpeg",
    "WhatsApp Image 2026-07-27 at 5.22.06 PM (3).jpeg", "WhatsApp Image 2026-07-27 at 5.22.06 PM (4).jpeg",
    "WhatsApp Image 2026-07-27 at 5.22.06 PM (5).jpeg", "WhatsApp Image 2026-07-27 at 5.22.06 PM (6).jpeg",
    "WhatsApp Image 2026-07-27 at 5.22.06 PM (7).jpeg", "WhatsApp Image 2026-07-27 at 5.22.06 PM (8).jpeg",
    "WhatsApp Image 2026-07-27 at 5.22.06 PM (9).jpeg", "WhatsApp Image 2026-07-27 at 5.22.06 PM.jpeg",
    "WhatsApp Image 2026-07-16 at 1.07.02 PM (13).jpeg", "WhatsApp Image 2026-07-16 at 1.07.02 PM (14).jpeg"
  ])
};
