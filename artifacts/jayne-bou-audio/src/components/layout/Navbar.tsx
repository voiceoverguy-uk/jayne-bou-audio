import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { logo } from '@/lib/assets';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Learn', path: '/learn' },
  { name: 'Shipping', path: '/shipping' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <Link href="/" data-testid="link-logo" className="flex-shrink-0 w-36 md:w-44">
          <SmartImage
            src={logo.svg}
            fallbackLabel="Logo Placeholder"
            alt="Jayne Bou Audio"
            aspectRatio="3/1"
            objectFit="contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
              className={`text-sm font-medium tracking-wide transition-colors ${
                location === link.path
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            data-testid="link-nav-cta"
            className="ml-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4" data-testid="nav-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              data-testid={`link-mobile-${link.name.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-1 transition-colors ${
                location === link.path
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold text-center"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </header>
  );
}
