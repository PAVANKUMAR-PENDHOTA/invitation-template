import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

// key must match the keys inside profile.socials
export const socialConfig = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon, color: '#e1306c', placeholder: 'https://instagram.com/username', href: (v) => v },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon, color: '#1877f2', placeholder: 'https://facebook.com/username', href: (v) => v },
  { key: 'twitter', label: 'X (Twitter)', Icon: XIcon, color: '#111111', placeholder: 'https://x.com/username', href: (v) => v },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon, color: '#0a66c2', placeholder: 'https://linkedin.com/in/username', href: (v) => v },
  { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon, color: '#ff0000', placeholder: 'https://youtube.com/@channel', href: (v) => v },
  { key: 'github', label: 'GitHub', Icon: GitHubIcon, color: '#24292f', placeholder: 'https://github.com/username', href: (v) => v },
  { key: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon, color: '#25d366', placeholder: 'Phone with country code, e.g. 919999999999', href: (v) => `https://wa.me/${String(v).replace(/\D/g, '')}` },
  { key: 'email', label: 'Email', Icon: EmailIcon, color: '#7b4bb7', placeholder: 'you@example.com', href: (v) => `mailto:${v}` },
];
