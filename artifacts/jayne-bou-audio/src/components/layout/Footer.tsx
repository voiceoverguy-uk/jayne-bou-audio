import { Link } from 'wouter';
import { Mail, MapPin } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { logo } from '@/lib/assets';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Learn', path: '/learn' },
  { name: 'Shipping & Trust', path: '/shipping' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="w-40 mb-5">
              <SmartImage
                src={logo.svg}
                fallbackLabel="Logo"
                alt="Jayne Bou Audio"
                aspectRatio="3/1"
                objectFit="contain"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted guide to buying quality pre-owned hi-fi audio equipment. Carefully inspected, honestly described, carefully packed.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-5">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <a href="mailto:hello@jaynebouaudio.com" className="hover:text-foreground transition-colors" data-testid="link-footer-email">
                  hello@jaynebouaudio.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>United Kingdom — Ships Worldwide</span>
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-xs text-muted-foreground mb-2">Find our listings on</p>
              <a
                href="https://www.ebay.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-ebay"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                eBay Store
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jayne Bou Audio. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
