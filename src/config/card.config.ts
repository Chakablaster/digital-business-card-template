import type { CardConfig } from '../features/digital-card/types/card.types'

const cardConfig = {
  metadata: {
    pageTitle: 'Your Name | Digital Business Card',
    pageDescription:
      'A customizable digital business card with contact details, social links, and a shareable QR code.',
  },

  profile: {
    fullName: 'Your Name',
    profileImage: '/assets/profile.jpg',
    nickname: '',
    role: 'Your Role',
    descriptor: 'A short description about what you do',
    bio: 'Add a concise introduction that helps visitors understand who you are and how you can help.',
  },

  primaryAction: {
    icon: 'email',
    label: 'Contact Me',
    supportingText: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },

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
    {
      platform: 'instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/',
    },
  ],

  qrCode: {
    cardUrl: '',
    dialogTitle: 'Share This Card',
    dialogDescription:
      'Scan the QR code to open this digital business card.',
  },

  appearance: {
    preset: 'light',
    colorOverrides: {},
    backgroundImage: '',
    dividerImage: '',
  },
} satisfies CardConfig

export default cardConfig