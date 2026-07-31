# Digital Business Card Template

A simple digital business card template built with React, TypeScript, Vite, and Tailwind CSS.

Edit one configuration file, replace the included images, and deploy your own card.

## Create Your Card

1. Select **Use this template** on GitHub.
2. Select **Create a new repository**.
3. Clone your new repository.
4. Open it in VS Code.

## Run Locally

Install the dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the local address shown in the terminal.

## Edit the Card

Open:

```text
src/config/card.config.ts
```

This file controls:

- Page title and description
- Name, role, nickname, descriptor, and bio
- Profile image
- Main contact action
- Social links
- QR code
- Theme
- Custom colours
- Cover image
- Decorative divider

Optional profile fields are hidden when left empty.

To hide the main contact action, leave both `label` and `href` empty.

When `qrCode.cardUrl` is empty, the QR code uses the current page address.

## Replace the Images

The included images are stored in:

```text
public/assets
```

Replace these files while keeping the same names:

```text
profile.jpg
background.jpg
divider.png
```

Also replace:

```text
public/favicon.png
public/favicon.ico
```

The cover and divider are already enabled in `card.config.ts`.

To hide either image, set its value to an empty string:

```ts
backgroundImage: ''
dividerImage: ''
```

## Themes

Choose one theme in `card.config.ts`:

```ts
preset: 'light'
```

Available themes:

```text
light
dark
slateBlue
warmSand
forest
```

Custom colours can be added through `colorOverrides`:

```ts
colorOverrides: {
  accent: '#2563eb',
  primaryActionBackground: '#111827',
}
```

## Social Icons

Supported names:

```text
linkedin     github       instagram
facebook     x            threads
tiktok       snapchat     reddit
pinterest    whatsapp     telegram
discord      messenger    viber
youtube      twitch       spotify
soundcloud   website      email
phone        location     portfolio
blog         resume       calendar
link
```

Unknown names still work and use the general link icon.

Add, remove, or reorder links inside the `socialLinks` array.

## Deploy to Vercel

1. Push your completed card to GitHub.
2. Create a new project in Vercel.
3. Import your GitHub repository.
4. Deploy it.

Vercel should detect the Vite setup. When manual settings are needed, use:

```text
Build command: npm run build
Output directory: dist
```

After deployment, add the public address to:

```ts
qrCode: {
  cardUrl: 'https://your-card.vercel.app',
}
```

Push that change so the QR code uses the public card address.

For a custom domain, open the Vercel project and go to:

```text
Settings → Domains
```

After connecting the domain, update `qrCode.cardUrl` again.

## Commands

```powershell
npm run dev
npm test
npm run test:watch
npm run lint
npm run build
npm run preview
```

## Security

Do not commit passwords, private tokens, API keys, or other secrets.

See `SECURITY.md` for private vulnerability reporting.

## Licence

Licensed under the MIT License. See `LICENSE`.