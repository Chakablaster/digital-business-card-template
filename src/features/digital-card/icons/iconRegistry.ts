import {
  BookOpen,
  Briefcase,
  CalendarDays,
  FileText,
  Globe,
  Link2,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  FaDiscord,
  FaFacebookF,
  FaFacebookMessenger,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaRedditAlien,
  FaSnapchat,
  FaSoundcloud,
  FaSpotify,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaTwitch,
  FaViber,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

import type { KnownIconName } from '../types/card.types'

export type CardIconComponent = IconType | LucideIcon

export const iconRegistry: Record<KnownIconName, CardIconComponent> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,

  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  threads: FaThreads,
  tiktok: FaTiktok,
  snapchat: FaSnapchat,
  reddit: FaRedditAlien,
  pinterest: FaPinterestP,

  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  discord: FaDiscord,
  messenger: FaFacebookMessenger,
  viber: FaViber,

  youtube: FaYoutube,
  twitch: FaTwitch,
  spotify: FaSpotify,
  soundcloud: FaSoundcloud,

  website: Globe,
  email: Mail,
  phone: Phone,
  location: MapPin,
  portfolio: Briefcase,
  blog: BookOpen,
  resume: FileText,
  calendar: CalendarDays,
  link: Link2,
}