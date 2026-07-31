import type { CardConfig } from '../features/digital-card/types/card.types'

const cardConfig = {
  metadata: {
    pageTitle: 'Your Name | Digital Business Card', // Text shown in the browser tab.
    pageDescription: 'A short description of your digital business card.', // Summary used by the page metadata.
  },

  profile: {
    fullName: 'Your Name', // Main name shown on the card.
    profileImage: '/assets/profile.jpg', // Image stored inside public/assets.
    nickname: '', // Optional name shown beside the main name. Empty values are hidden.
    role: 'Your Role', // Main role, position, or title.
    descriptor: 'A short description about what you do', // Optional supporting line below the role.
    bio: 'Add a concise introduction about who you are and what you do.', // Optional introduction shown below the profile details.
  },

  primaryAction: {
    icon: 'email', // Icon used for the main action.
    label: 'Contact Me', // Main action text. Empty together with href hides the action.
    supportingText: 'hello@example.com', // Optional smaller text shown inside the action.
    href: 'mailto:hello@example.com', // Accepts email, phone, website, internal page, or section links.
  },

  socialLinks: [
    {
      platform: 'linkedin', // Controls the icon. Unknown names use the general link icon.
      label: 'LinkedIn', // Name announced to visitors and assistive technology.
      href: 'https://www.linkedin.com/', // Full destination for this link.
    },
    {
      platform: 'github',
      label: 'GitHub',
      href: 'https://github.com/',
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/',
    },
  ], // Add as many links as needed. Every complete entry is shown in this order.

  qrCode: {
    cardUrl: '', // Empty uses the current page address. Add the final Vercel address after deployment.
    dialogTitle: 'Share This Card', // Heading shown when the QR code opens.
    dialogDescription: 'Scan the QR code to open this digital business card.', // Text shown below the QR heading.
  },

  appearance: {
    preset: 'light', // Available values: light, dark, slateBlue, warmSand, forest.
    colorOverrides: {}, // Add only the theme colours that need a custom value.
    backgroundImage: '/assets/background.jpg', // Cover image shown at the top of the card.
    dividerImage: '/assets/divider.png', // Decorative divider shown before the bio.
  },
} satisfies CardConfig

export default cardConfig