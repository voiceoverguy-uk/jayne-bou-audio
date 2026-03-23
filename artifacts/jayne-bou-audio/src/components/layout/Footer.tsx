import { Link } from 'wouter';
import { Instagram, Twitter, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold tracking-widest mb-6">
              Jayne Bou <span className="text-primary">Audio</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Premium mixing and mastering services dedicated to bringing out the absolute best in your music. Elevating sound with analog warmth and digital precision.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-sm text-foreground uppercase mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-sm text-foreground uppercase mb-6">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hello@jaynebouaudio.com" className="hover:text-primary transition-colors">hello@jaynebouaudio.com</a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Los Angeles, CA<br/>Available Worldwide</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jayne Bou Audio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
