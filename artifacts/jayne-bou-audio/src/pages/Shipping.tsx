import { Link } from 'wouter';
import { ArrowRight, PackageCheck, Camera, ClipboardList, BadgeCheck } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { jayne, images } from '@/lib/assets';
import { useSeo } from '@/hooks/useSeo';

const steps = [
  { icon: ClipboardList, title: 'Inspection', body: 'Every item is inspected against a consistent checklist before listing. Electronics are tested. Mechanics are verified. Cosmetics are graded and documented honestly.' },
  { icon: Camera, title: 'Photography', body: 'We photograph every angle, every flaw, every box and accessory. What you see in the listing is what you get — no exceptions.' },
  { icon: PackageCheck, title: 'Packaging', body: 'Double-boxed with professional foam inserts or bubble wrap, tailored to the specific item. We photograph everything inside the packaging before the box is sealed.' },
  { icon: BadgeCheck, title: 'Dispatch', body: 'Sent on a tracked, insured service appropriate to the item\'s value. You\'ll receive tracking the moment it leaves us.' },
];

export default function Shipping() {
  useSeo({
    title: 'Shipping & Packaging Promise',
    description: 'Every item double-boxed with professional materials and photographed before dispatch. Safe, insured UK delivery — if it wouldn\'t survive our packing, it doesn\'t leave.',
    canonical: 'https://jaynebou.com/shipping',
  });
  return (
    <div className="w-full pt-20">

      {/* HERO */}
      <section className="py-14 md:py-20 bg-background" data-testid="section-shipping-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Commitment</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5">Packing, Shipping & Buyer Confidence</h1>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pre-owned hi-fi equipment is often irreplaceable. Vintage pieces, discontinued favourites, carefully maintained classics — they deserve to be treated accordingly. We pack everything as if our reputation depends on it. Because it does.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From the moment you purchase to the moment it arrives in your hands, we want you to feel confident that you made the right choice buying from us.
              </p>
              <Link
                href="/contact"
                data-testid="link-shipping-contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Ask Us Anything <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <SmartImage
                src={images.shippingPackaging}
                fallbackLabel="Packaging Scene Placeholder"
                alt="Careful packaging of hi-fi equipment"
                aspectRatio="3/2"
                objectFit="cover"
                className="w-full rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-14 md:py-20 bg-card border-t border-border" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-xl mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">How We Do It</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">From Our Hands to Yours</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                data-testid={`card-process-${index}`}
                className="p-6 md:p-8 bg-background border border-border rounded-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JAYNE TRUST */}
      <section className="py-14 md:py-20 bg-background border-t border-border" data-testid="section-trust-character">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-xs">
                <SmartImage
                  src={jayne.trust}
                  fallbackLabel="Jayne Trust Placeholder"
                  alt="Jayne giving a thumbs up"
                  aspectRatio="4/5"
                  objectFit="contain"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Guarantee</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">We Stand Behind Every Sale</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>If anything we describe is materially different from what you receive, we will make it right. No quibbling, no run-around.</p>
                <p>Our eBay feedback history speaks for itself — but beyond that, we simply believe that treating buyers honestly is the only way to operate. We want customers who come back, and who recommend us to their friends.</p>
                <p>Have a question before you buy? We encourage it. Good questions lead to better purchases — for both of us.</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  data-testid="link-trust-products"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Browse Equipment
                </Link>
                <Link
                  href="/contact"
                  data-testid="link-trust-contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-semibold text-sm hover:bg-accent transition-colors"
                >
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
