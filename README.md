# LiveCV landing page

A responsive, buildless HTML/CSS/JavaScript landing page based on the approved soft-blue visual reference.

## Files

- `dist/index.html`: semantic page content and reusable SVG icons.
- `dist/styles.css`: responsive layout, spacing, original-logo framing and reduced-motion styling.
- `dist/app.js`: profile tabs, example/project dialogs, copy controls, sample headline editing, category/audience selection, mobile navigation and fade-in animation.
- `dist/profile-details.css`: responsive skill visuals, tool icons and expandable experience timelines for Aanya, Noah and Maya.
- `dist/assets`: local fonts, the supplied original logo, and generated illustrative portrait/project photography.

Serve the `dist` directory with a static web server. No build process or external JavaScript dependencies are required.

## Product boundaries

- The video area is intentionally a placeholder with no simulated playback.
- Profile identities and projects are illustrative. The example link is labeled accordingly.
- Every example profile has a distinct AI-generated skill visual, three relevant capability descriptions and two illustrative experience entries. Skill images and experience shortcuts on the example cards open the corresponding profile tab; native disclosure controls expand responsibilities and tools.
- Each profile owns three different projects: Aanya has Finly, Horizon and Journey; Noah has Sensor Lab, Dataflow and Kinetic; Maya has Bloom, Pulse and Together. No project image is shared across profiles. Skills use three separate creative compositions, and each Experience header has its own image rather than reusing its Skills image.
- Profile creation links open `https://livecv.dev/build`.
- Login links open the verified `https://livecv.dev/login` route. Authentication and paid account capabilities remain in the official LiveCV product. This landing page does not implement an authentication or payment backend.
- The sample headline editor is browser-session only. No personal information is submitted.
- Legal dialogs identify the preview and direct visitors to the official product.
- Portraits and project visuals are individual AI-generated images, each 1672×941 pixels, encoded as pixel-identical lossless WebP. They replace the previous 724px tile crops and remain crisp in responsive cards and larger dialogs. The built-in generator returned HD despite a 4K prompt; these assets are not native 4K. Generation prompts and asset paths are recorded in `docs/ai-image-assets.json`.

## Spacing and accessibility

Major desktop chapters use 88–124px of top and bottom padding, giving approximately 192px or more between adjoining content groups. Mobile spacing and typography are scaled independently. Native links, accessible dialogs, keyboard-operated tabs, a skip link, reduced-motion support and native FAQ disclosures are included.

The hosted repository is the source of truth for this site. Deployment metadata is in `.openai/hosting.json`.
