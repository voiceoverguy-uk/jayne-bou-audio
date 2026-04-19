import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';

const EBAY_STORE_URL = 'https://www.ebay.co.uk/usr/davsande_3';

interface Listing {
  id: string;
  title: string;
  price: string;
  currency: string;
  condition: string;
  imageUrl: string | null;
  ebayUrl: string;
  category: string;
}

const conditionColors: Record<string, string> = {
  'New': 'bg-primary/10 text-primary',
  'Like New': 'bg-primary/10 text-primary',
  'Excellent': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Very Good': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Good': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'Acceptable': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Used': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
};

function formatPrice(price: string, currency: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : `${currency} `;
  return `${symbol}${num.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-9 bg-muted rounded w-full mt-4" />
      </div>
    </div>
  );
}

export default function Products() {
  useSeo({
    title: 'Pre-Owned Hi-Fi Equipment for Sale',
    description: 'Browse pre-owned amplifiers, speakers, turntables and hi-fi separates. All items tested, honestly described, and double-boxed for safe UK delivery.',
    canonical: 'https://jaynebou.com/products',
  });
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/listings');
        const data = await res.json() as { listings: Listing[]; error?: string };
        if (!res.ok || data.error) {
          setError(data.error ?? 'Unable to load listings');
        } else {
          setListings(data.listings);
        }
      } catch {
        setError('Unable to connect to listings service');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="w-full pt-20">
      <section className="py-14 md:py-20 bg-background" data-testid="section-products-header">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Currently Available</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Featured Equipment</h1>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Every item here has been personally sourced, inspected, tested, and honestly described. We list what we'd be confident buying ourselves. All items link directly to our eBay listings where you can purchase securely.
              </p>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="listings-loading">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="listings-error">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">Listings temporarily unavailable</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                You can browse our full current stock directly on eBay.
              </p>
              <a
                href={EBAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-ebay-store-fallback"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Browse our eBay store <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {!loading && !error && listings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="listings-empty">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">No items listed at the moment</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                We regularly refresh our stock. Check back soon, or visit our eBay store for the latest.
              </p>
              <a
                href={EBAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-ebay-store-empty"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Visit our eBay store <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {!loading && !error && listings.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="listings-grid">
                {listings.map((item) => (
                  <article
                    key={item.id}
                    data-testid={`card-product-${item.id}`}
                    className="bg-card border border-border rounded-md overflow-hidden group flex flex-col"
                  >
                    <div className="overflow-hidden bg-muted aspect-square">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-xs text-muted-foreground font-medium truncate">{item.category}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${conditionColors[item.condition] ?? 'bg-muted text-muted-foreground'}`}>
                          {item.condition}
                        </span>
                      </div>
                      <h2 className="font-bold text-foreground mb-2 leading-snug line-clamp-2">{item.title}</h2>
                      <p className="text-lg font-bold text-primary mb-4 mt-auto pt-2">
                        {formatPrice(item.price, item.currency)}
                      </p>
                      <a
                        href={item.ebayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-ebay-${item.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity w-full justify-center"
                      >
                        View on eBay <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href={EBAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-ebay-store-all"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
                >
                  View all listings on our eBay store <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </>
          )}

          <div className="mt-12 p-6 md:p-8 rounded-md bg-card border border-border">
            <h3 className="font-bold text-foreground mb-2">Looking for something specific?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We regularly refresh our stock with new finds. If you're after a particular brand, type of equipment, or price point — get in touch. We may have something in the pipeline, or we can keep an eye out for you.
            </p>
            <a
              href="/contact"
              data-testid="link-products-contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              Make an enquiry <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
