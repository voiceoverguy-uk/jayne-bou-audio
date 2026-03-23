import { Link } from 'wouter';
import { ArrowRight, ShieldCheck, Truck, Star, Search } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { jayne, products, images } from '@/lib/assets';

const featuredProducts = [
  { id: 1, src: products.p01, name: 'Product One', blurb: 'Lightly used, fully tested. A superb example.', ebayUrl: '#' },
  { id: 2, src: products.p02, name: 'Product Two', blurb: 'Original boxes, minimal use. Exceptional condition.', ebayUrl: '#' },
  { id: 3, src: products.p03, name: 'Product Three', blurb: 'Serviced and inspected. Ready to impress.', ebayUrl: '#' },
  { id: 4, src: products.p04, name: 'Product Four', blurb: 'A classic piece in stunning shape.', ebayUrl: '#' },
  { id: 5, src: products.p05, name: 'Product Five', blurb: 'Rare find. Fully operational and honest graded.', ebayUrl: '#' },
  { id: 6, src: products.p06, name: 'Product Six', blurb: 'Immaculate. Comes with accessories.', ebayUrl: '#' },
];

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

export default function Home() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-card" data-testid="section-hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="w-full h-full flex items-end justify-end">
            <div className="w-full md:w-[62%] h-full">
              <SmartImage
                src={jayne.heroListening}
                fallbackLabel="Hero Illustration Placeholder"
                alt="Jayne enjoying hi-fi audio"
                aspectRatio="11/8"
                objectFit="cover"
                className="w-full h-full absolute inset-0"
                priority
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Jayne Bou Audio</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Pre-Owned Hi-Fi,<br />Properly Done
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Carefully sourced, thoroughly tested, and honestly described hi-fi equipment. Your friendly guide to buying pre-owned audio gear with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                data-testid="link-hero-products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Equipment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/learn"
                data-testid="link-hero-learn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground font-semibold hover:bg-accent transition-colors"
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
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Equipment</h2>
            </div>
            <Link
              href="/products"
              data-testid="link-all-products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              See all listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                data-testid={`card-product-${product.id}`}
                className="bg-background rounded-md border border-border overflow-hidden group"
              >
                <SmartImage
                  src={product.src}
                  fallbackLabel="Product Image Placeholder"
                  alt={product.name}
                  aspectRatio="1/1"
                  objectFit="cover"
                  className="w-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{product.blurb}</p>
                  <a
                    href={product.ebayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-ebay-product-${product.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                  >
                    View on eBay <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
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
