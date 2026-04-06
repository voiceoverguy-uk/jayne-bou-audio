import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { jayne, images } from '@/lib/assets';

interface Listing {
  id: string;
  title: string;
  ebayUrl: string;
}

function useLatestListings(count: number) {
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/listings')
      .then((r) => r.json())
      .then((d: { listings: Listing[] }) => {
        setTitles(d.listings.slice(0, count).map((l) => l.title));
      })
      .catch(() => {});
  }, [count]);

  return titles;
}

function trimTitle(title: string, max = 48): string {
  return title.length > max ? title.slice(0, max).trimEnd() + '…' : title;
}

export default function About() {
  const latestTitles = useLatestListings(3);

  return (
    <div className="w-full pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden bg-card" data-testid="section-about-hero">
        <SmartImage
          src={images.aboutHero}
          fallbackLabel="About Hero Image Placeholder"
          alt="Jayne Bou Audio studio and setup"
          aspectRatio="11/4"
          objectFit="cover"
          className="w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-7xl mx-auto w-full px-6 md:px-10 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">About Jayne Bou Audio</h1>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-brand-story">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why This Business Exists</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Jayne Bou Audio started from a simple frustration: buying pre-owned hi-fi equipment online felt like a lottery. Sellers who didn't know their gear, photos that hid faults, and descriptions that told you nothing useful.
                </p>
                <p>
                  I've been living and breathing hi-fi for over twenty years. I know what to listen for, what to look for, and what genuine quality sounds like — whether it's a classic British integrated amplifier, a phono stage, a pair of standmount speakers, or a modern streamer. So I decided to do it differently.
                </p>
                <p>
                  The stock covers a wide range: integrated and pre/power amplifiers, CD players, turntables, phono stages, DACs, streamers, and loudspeakers — from vintage British classics through to current audiophile favourites. Everything listed has been personally inspected, tested, honestly described, and photographed with care. If something has a scratch, I'll tell you. If the remote is missing, you'll know. That's the deal.
                </p>
                <p>
                  I also want this to be a resource, not just a shop. The Buyer Guides are here to help you make sense of hi-fi terminology, understand what really matters, and buy with knowledge rather than hope.
                </p>
              </div>

              {/* Dynamic latest listings teaser */}
              {latestTitles.length > 0 && (
                <div className="mt-6 p-4 rounded-md bg-primary/5 border border-primary/20" data-testid="latest-listings-teaser">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-semibold text-primary">Currently listed: </span>
                    {latestTitles.map((t, i) => (
                      <span key={i}>
                        <Link
                          href="/products"
                          className="underline underline-offset-2 hover:text-primary transition-colors"
                        >
                          {trimTitle(t)}
                        </Link>
                        {i < latestTitles.length - 1 ? ', ' : ' '}
                      </span>
                    ))}
                    <span className="text-muted-foreground">and more.</span>
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  data-testid="link-about-products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Browse Equipment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  data-testid="link-about-contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-semibold text-sm hover:bg-accent transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <SmartImage
                  src={jayne.default}
                  fallbackLabel="Jayne Character Placeholder"
                  alt="Jayne Bou"
                  aspectRatio="4/5"
                  objectFit="contain"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 md:py-20 bg-card border-t border-border" data-testid="section-about-trust">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How We Operate</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">What You Can Always Expect</h2>
            <div className="space-y-6">
              {[
                { title: 'Honest Grading', body: 'We use clear, consistent grading language that means what it says. Excellent really is excellent. Good means there are minor signs of use. We\'ll never dress up a worn item as pristine.' },
                { title: 'Personal Testing', body: 'Items are tested by ear and by measurement where possible. If it doesn\'t pass, it doesn\'t list.' },
                { title: 'Real Photography', body: 'No stock images. Every photo shows the actual item you\'ll receive, including close-ups of any flaws or marks.' },
                { title: 'Fair Pricing', body: 'We research the market carefully and price to reflect honest condition. No inflated valuations, no bait-and-switch.' },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-primary pl-5">
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
