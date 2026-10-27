# Sachith Asmadala — Portfolio

A responsive personal portfolio for Sachith Asmadala, a third-year Computer Science undergraduate at SLIIT seeking a Software Engineering Internship. The site presents selected individual, coursework, and collaborative projects with an understated midnight navy and warm ivory visual system.

## Technology

- React 18 and TypeScript
- Vite
- Lucide React icons
- Custom CSS, with no component or animation framework

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Local development

```bash
npm install
npm run dev
```

Vite prints the local address after the development server starts.

## Production build

```bash
npm run build
npm run preview
```

The static production site is written to `dist/`.

## Deployment

The project includes `vercel.json` configured for Vite. Import this repository in Vercel and use the detected project settings, or set the build command to `npm run build` and the output directory to `dist`. No server environment variables are required.

For GitHub Pages, set the Vite `base` option to `/<repository-name>/`, build, then publish the `dist/` directory using GitHub Pages. Use `/` as the base when serving from a custom domain or the `username.github.io` root repository.

## Portfolio content customization

Project descriptions, repository links, and skill groups live in [`src/data/portfolio.ts`](src/data/portfolio.ts). The page sections and their layout live in [`src/App.tsx`](src/App.tsx), with responsive styling and design tokens in [`src/styles.css`](src/styles.css). Keep descriptions aligned with verified project functionality and distinguish collaborative work from individual contributions.

## Images and visual assets

The portfolio currently uses original CSS and React illustrations for project previews; it does not present them as screenshots. Replace or supplement these visuals with real project screenshots by adding optimized images to `public/` and updating the project visual component in `src/App.tsx`. Use descriptive alt text and only include images you have permission to publish. No portrait is assumed.

The SA favicon is at `public/favicon.svg`. The social sharing image is `public/og-card.svg`.

## Résumé

No résumé file was present when this portfolio was prepared, so the site does not show a download link. To add one later, place the verified PDF in `public/` and add a clearly labeled link to it in the hero or contact section.

## Existing profile automation

This repository also contains the existing GitHub profile automation under `.github/`, `docs/`, `assets/`, and `tests/`. Its static README mode keeps this document unchanged when the profile update workflow runs.
