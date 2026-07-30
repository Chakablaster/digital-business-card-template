# Digital Business Card Template

A configurable digital business card built with React, TypeScript, Vite, and Tailwind CSS.

The template is designed so most users only need to edit one configuration file and replace a few assets. Profile details, social links, theme presets, colours, the primary action, page metadata, sharing behaviour, and the QR code destination are all controlled from `src/config/card.config.ts`.

## Features

- Central typed configuration file
- Five tested theme presets
- Optional per colour overrides
- Configurable profile content
- Configurable primary action
- Configurable and reorderable social links
- Built in icon registry with generic fallback
- Native Web Share API support
- QR code fallback and dedicated QR dialog
- Optional background and divider assets
- Runtime configuration validation
- Accessible keyboard and focus behaviour
- Automated tests, linting, production builds, and GitHub Actions checks

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- React Icons
- React QR Code
- Vitest
- React Testing Library
- ESLint

## Requirements

- Node.js 24
- npm
- Git

The required Node.js version is also defined in `.nvmrc`.

## Create Your Own Card

1. Select **Use this template** on GitHub.
2. Choose **Create a new repository**.
3. Clone your new repository.
4. Open it in VS Code.
5. Install dependencies:

   `npm install`

6. Start the development server:

   `npm run dev`

7. Open the local URL shown in the terminal.
8. Edit `src/config/card.config.ts`.
9. Replace the placeholder assets in `public`.
10. Run the full project checks before publishing:

   `npm test`

   `npm run lint`

   `npm run build`

## Main Configuration File

Edit:

`src/config/card.config.ts`

The configuration is type checked with TypeScript. Invalid field names, unsupported theme preset names, and invalid value types are caught during development.

### Metadata

```ts
metadata: {
  pageTitle: 'Your Name | Digital Business Card',
  pageDescription:
    'A short description used for the browser tab and page metadata.',
},
```

- `pageTitle` controls the browser title.
- `pageDescription` controls the page description meta tag.
- Both fields are required.

### Profile

```ts
profile: {
  fullName: 'Your Name',
  profileImage: '/assets/profile.jpg',
  nickname: '',
  role: 'Your Role',
  descriptor: 'A short description about what you do',
  bio: 'Add a concise introduction.',
},
```

- `fullName` is required.
- `profileImage` is required.
- `role` is required.
- `nickname`, `descriptor`, and `bio` are optional.
- Empty optional values are hidden automatically.

### Primary Action

```ts
primaryAction: {
  icon: 'email',
  label: 'Contact Me',
  supportingText: 'hello@example.com',
  href: 'mailto:hello@example.com',
},
```

The primary action can link to:

- Email with `mailto:`
- Phone with `tel:`
- A website with `https://`
- An internal path such as `/contact`
- A page fragment such as `#contact`

To hide the primary action, leave both `label` and `href` empty.

`supportingText` is optional.

### Social Links

```ts
socialLinks: [
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
  },
  {
    platform: 'github',
    label: 'GitHub',
    href: 'https://github.com/',
  },
],
```

- Add, remove, or reorder entries directly in the array.
- The displayed order matches the configuration order.
- Each visible entry requires both `label` and `href`.
- Unknown platform names still work and use the generic link icon.
- Duplicate destinations are rejected by configuration validation.

## Supported Icon Names

### Professional

- `linkedin`
- `github`

### Social

- `instagram`
- `facebook`
- `x`
- `threads`
- `tiktok`
- `snapchat`
- `reddit`
- `pinterest`

### Messaging

- `whatsapp`
- `telegram`
- `discord`
- `messenger`
- `viber`

### Media

- `youtube`
- `twitch`
- `spotify`
- `soundcloud`

### Contact and General

- `website`
- `email`
- `phone`
- `location`
- `portfolio`
- `blog`
- `resume`
- `calendar`
- `link`

The resolver also recognizes common aliases such as `twitter`, `web`, `cv`, and `generic-link`.

## QR Code

```ts
qrCode: {
  cardUrl: '',
  dialogTitle: 'Share This Card',
  dialogDescription:
    'Scan the QR code to open this digital business card.',
},
```

- `cardUrl` is optional.
- When `cardUrl` is provided, the QR code uses that URL.
- When it is empty, the current browser URL is used.
- URL fragments are removed from the browser fallback.
- During local development, the QR code points to the local development URL.

Set `cardUrl` after deployment when you want the QR code to use one fixed public address.

## Themes

Choose one preset:

```ts
appearance: {
  preset: 'light',
},
```

Available presets:

- `light`
- `dark`
- `slate-blue`
- `warm-sand`
- `forest`

### Colour Overrides

Override only the values you need:

```ts
appearance: {
  preset: 'light',

  colorOverrides: {
    accent: '#123456',
    primaryActionBackground: '#1f2937',
  },
},
```

Available override fields:

- `pageBackground`
- `cardBackground`
- `primaryText`
- `secondaryText`
- `mutedText`
- `border`
- `accent`
- `accentText`
- `primaryActionBackground`
- `primaryActionText`
- `dialogBackground`
- `focusRing`

Overrides must use three digit, six digit, or eight digit hexadecimal colours.

The included presets are tested for required token coverage and key text contrast combinations.

## Assets

### Required Profile Image

Replace:

`public/assets/profile.jpg`

Recommended:

- Square image
- JPG or PNG source
- At least 600 × 600 pixels
- Clear subject positioning near the centre
- Optimized file size for web delivery

Keep the configured path as:

```ts
profileImage: '/assets/profile.jpg'
```

### Favicon

Replace both files:

- `public/favicon.png`
- `public/favicon.ico`

The filenames are already referenced by `index.html`.

### Optional Background

Add:

`public/assets/background.jpg`

Then configure:

```ts
backgroundImage: '/assets/background.jpg'
```

Leave `backgroundImage` empty to use the selected theme's page background.

### Optional Divider

Add:

`public/assets/divider.png`

Then configure:

```ts
dividerImage: '/assets/divider.png'
```

Leave `dividerImage` empty to hide it.

The divider appears between the profile section and the primary action.

## Available Commands

Start development:

`npm run dev`

Run all tests once:

`npm test`

Run tests in watch mode:

`npm run test:watch`

Run ESLint:

`npm run lint`

Create a production build:

`npm run build`

Preview the production build locally:

`npm run preview`

## Validation

The application validates the configuration before rendering.

Validation covers:

- Required metadata
- Required profile fields
- Primary-action completeness
- Supported URL protocols
- Absolute QR-code URLs
- Incomplete social links
- Duplicate social destinations
- Hexadecimal colour overrides

Invalid configuration throws a readable error that identifies the affected field.

## Accessibility

The template includes:

- Semantic headings and navigation
- Accessible labels for icon-only links
- Visible keyboard focus states
- An accessible modal dialog for QR sharing
- Escape to close support
- Focus trapping inside the QR dialog
- Focus restoration after the dialog closes
- Decorative images excluded from the accessibility tree
- Safe external-link attributes

Changes to interactive behaviour should preserve these features.

## Deployment

This is a static Vite application.

1. Set `qrCode.cardUrl` to your intended public URL when needed.
2. Run:

   `npm run build`

3. Deploy the generated `dist` folder using a static hosting provider.
4. Open the deployed card and verify:
   - Page title and description
   - Profile image and favicons
   - Primary action
   - Social links
   - Native sharing where supported
   - QR code destination
   - Mobile layout
   - Keyboard navigation

Do not commit passwords, API keys, private tokens, or other secrets. This template does not require secrets for its default functionality.

## Project Structure

```text
src/
├── config/
│   └── card.config.ts
├── features/
│   └── digital-card/
│       ├── components/
│       ├── icons/
│       ├── themes/
│       ├── types/
│       └── utils/
├── hooks/
├── test/
├── App.tsx
├── index.css
└── main.tsx
```

## Quality Checks

Every push and pull request to `main` runs:

- Automated tests
- ESLint
- Production build

The workflow is located at:

`.github/workflows/quality-checks.yml`

## Contributing

Read `CONTRIBUTING.md` before submitting changes.

Public contributions must remain reusable, configuration-driven, accessible, and free from personal data or deployment specific branding.

## Security

Do not report vulnerabilities through public issues.

Follow the private reporting instructions in `SECURITY.md`.

## Licence

This project is licensed under the MIT License. See `LICENSE`.
