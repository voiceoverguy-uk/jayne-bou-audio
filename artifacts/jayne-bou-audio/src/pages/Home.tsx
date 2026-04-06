import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Truck, Star, Search, ExternalLink } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { jayne, images } from '@/lib/assets';

interface Listing {
  id: string;
  title: string;
  price: string;
  currency: string;
  condition: string;
  imageUrl: string;
  ebayUrl: string;
}

const guideCards = [
  { title: 'What Do Watts Actually Mean?', teaser: 'Power ratings can be confusing. Here\'s what really matters for your listening room.', src: images.learnWatts, slug: 'learn-watts' },
  { title: 'Active vs Passive Speakers', teaser: 'Which approach is right for you? We break it down simply.', src: images.learnActiveVsPassive, slug: 'learn-active-vs-passive' },
  { title: 'Valve vs Transistor Amplifiers', teaser: 'The age-old debate explained for real listeners, not engineers.', src: images.learnValveVsTransistor, slug: 'learn-valve-vs-transistor' },
  { title: 'Warm vs Bright: Understanding Tone', teaser: 'Why does one system sound exciting and another relaxing? Let\'s find out.', src: images.learnWarmVsBright, slug: 'learn-warm-vs-bright' },
];

const trustPoints = [
  { icon: Search, title: 'Thoroughly Inspected', body: 'Every item is tested and honestly graded before listing. No surprises.' },
  { icon: ShieldCheck, title: 'Accurate Descriptions', body: 'We photograph and describe every flaw. You know exactly what you\'re getting.' },
  { icon: Truck, title: 'Carefully Packed', body: 'Double-boxed with professional packaging materials. It arrives safely, every time.' },
  { icon: Star, title: 'Trusted Seller', body: 'Years of positive feedback on eBay. We stand behind every sale.' },
];

function SkeletonCard() {
  return (
    <div className="bg-background rounded-md border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

function conditionShort(condition: string): string {
  const c = condition.toLowerCase();
  if (c.includes('new')) return 'New';
  if (c.includes('excellent')) return 'Excellent';
  if (c.includes('very good')) return 'Very Good';
  if (c.includes('good')) return 'Good';
  return condition;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.json())
      .then((d: { listings: Listing[] }) => {
        setListings(d.listings.slice(0, 6));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-foreground" data-testid="section-hero">
        {/* Full-bleed faded room photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-room.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-30"
          />
          {/* Gradient: strong dark on left for text legibility, lighter on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/30" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4" style={{color:'hsl(109,55%,62%)'}}>Jayne Bou Audio</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              Pre-Owned Hi-Fi,<br />Properly Done
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-10">
              Carefully sourced, thoroughly tested, and honestly described hi-fi equipment. Your friendly guide to buying pre-owned audio gear with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                data-testid="link-hero-products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Equipment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/learn"
                data-testid="link-hero-learn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Buyer Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-intro">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Hi, I'm Jayne.</h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              I've been passionate about hi-fi audio for over two decades. Jayne Bou Audio is my way of helping fellow enthusiasts find brilliant pre-owned gear without the usual guesswork. Everything I sell is something I'd be happy buying myself.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-products">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Currently Listed</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest Equipment</h2>
            </div>
            <Link
              href="/products"
              data-testid="link-all-products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {listings.map((listing) => (
                <a
                  key={listing.id}
                  href={listing.ebayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`card-product-${listing.id}`}
                  className="bg-background rounded-md border border-border overflow-hidden group block hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    {listing.imageUrl ? (
                      <img
                        src={listing.imageUrl}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                    )}
                    <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wide bg-background/90 text-foreground px-2 py-0.5 rounded">
                      {conditionShort(listing.condition)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2 leading-snug">{listing.title}</h3>
                    <p className="text-primary font-bold text-sm mb-3">
                      {listing.currency === 'GBP' ? '£' : listing.currency}{listing.price}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80 transition-opacity">
                      View on eBay <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">Browse our full selection on eBay.</p>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80">
                View all listings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* WHY BUY */}
      <section className="py-16 md:py-24 bg-background border-t border-border" data-testid="section-why-buy">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Why Choose Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Buying with Confidence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div key={point.title} className="p-6 rounded-md bg-card border border-border">
                <point.icon className="w-7 h-7 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES TEASER */}
      <section className="py-16 md:py-24 bg-card border-t border-border" data-testid="section-guides">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Learn More</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Buyer Guides</h2>
            </div>
            <Link
              href="/learn"
              data-testid="link-all-guides"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              All guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {guideCards.map((guide) => (
              <Link
                key={guide.slug}
                href="/learn"
                data-testid={`card-guide-${guide.slug}`}
                className="group bg-background rounded-md border border-border overflow-hidden block hover:border-primary/50 transition-colors"
              >
                <SmartImage
                  src={guide.src}
                  fallbackLabel="Guide Image Placeholder"
                  alt={guide.title}
                  aspectRatio="16/9"
                  objectFit="cover"
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{guide.teaser}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGING TRUST */}
      <section className="py-16 md:py-24 bg-background border-t border-border" data-testid="section-packaging">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <SmartImage
                src={jayne.packing}
                fallbackLabel="Packaging Scene Placeholder"
                alt="Careful packaging and inspection"
                aspectRatio="9/7"
                objectFit="cover"
                className="w-full rounded-md"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Every Order</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Packed Like It's Precious — Because It Is</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every item that leaves us is double-boxed, padded with professional materials, and handled with genuine care. We've shipped hundreds of items, and our philosophy is simple: if it wouldn't survive our packing, it doesn't leave.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We also photograph every item inside the packaging before dispatch, so there's full accountability from door to door.
              </p>
              <Link
                href="/shipping"
                data-testid="link-shipping-detail"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-primary pb-0.5 hover:text-primary transition-colors"
              >
                Our packing promise <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-14 bg-primary" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary-foreground">Got a question? We'd love to help.</h2>
            <p className="text-primary-foreground/80 mt-1 text-sm">Whether you're a first-time buyer or seasoned audiophile — just ask.</p>
          </div>
          <Link
            href="/contact"
            data-testid="link-cta-contact"
            className="flex-shrink-0 px-6 py-3 rounded-md bg-primary-foreground text-primary font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
