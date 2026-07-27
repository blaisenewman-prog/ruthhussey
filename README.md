# Ruth Hussey artist website

This version has four pages:

- Home — one large painting beside the artist statement
- Large Works — selected large paintings
- Small Works — selected small paintings
- Contact — location, email and Instagram

## Adding paintings

No code needs to be edited.

1. Put the homepage painting in `images/home`.
2. Put large paintings in `images/large-works`.
3. Put small paintings in `images/small-works`.
4. Double-click `UPDATE_GALLERY.bat`.
5. Upload the updated files to GitHub.

Only the first picture in `images/home` is used on the homepage. Paintings are ordered alphabetically by filename. Adding numbers to the start of filenames gives exact control, for example `01.jpg`, `02.jpg`, `03.jpg`.

The older `images/paintings` folder is still supported. Until paintings are sorted into the new folders, those older pictures will appear under Large Works and the first one will appear on the homepage.

## GitHub Pages

Upload the contents of this folder to the top level of the repository. `index.html` must be visible at the top level. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save.
