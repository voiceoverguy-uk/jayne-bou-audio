import { ArrowRight } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { products } from '@/lib/assets';

const listings = [
  { id: 1, src: products.p01, name: 'Product One', category: 'Integrated Amplifier', condition: 'Excellent', blurb: 'A beautifully maintained example. Original remote included. Minimal hours of use. Tested and fully operational.', ebayUrl: '#' },
  { id: 2, src: products.p02, name: 'Product Two', category: 'CD Player', condition: 'Very Good', blurb: 'Some light marks on the casework consistent with careful use. Mechanically perfect — laser reads every disc without issue.', ebayUrl: '#' },
  { id: 3, src: products.p03, name: 'Product Three', category: 'Loudspeakers (Pair)', condition: 'Excellent', blurb: 'Original packaging retained. Grilles in perfect condition. Drive units inspected and performing perfectly.', ebayUrl: '#' },
  { id: 4, src: products.p04, name: 'Product Four', category: 'Phono Stage', condition: 'Near Mint', blurb: 'Barely used. Purchased new and used lightly for a brief period. Effectively as new condition throughout.', ebayUrl: '#' },
  { id: 5, src: products.p05, name: 'Product Five', category: 'DAC / Streamer', condition: 'Good', blurb: 'Some use wear on the casework, honestly shown in photos. Electronics fully functional — sounds excellent.', ebayUrl: '#' },
  { id: 6, src: products.p06, name: 'Product Six', category: 'Turntable', condition: 'Very Good', blurb: 'Belt replaced. Stylus in good condition with modest hours. Drives at correct speed, sounds as it should.', ebayUrl: '#' },
];

const conditionColors: Record<string, string> = {
  'Near Mint': 'bg-primary/10 text-primary',
  'Excellent': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Very Good': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Good': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
};

export default function Products() {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((item) => (
              <article
                key={item.id}
                data-testid={`card-product-${item.id}`}
                className="bg-card border border-border rounded-md overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={item.src}
                    fallbackLabel="Product Image Placeholder"
                    alt={item.name}
                    aspectRatio="1/1"
                    objectFit="cover"
                    className="w-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-xs text-muted-foreground font-medium">{item.category}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${conditionColors[item.condition] ?? 'bg-muted text-muted-foreground'}`}>
                      {item.condition}
                    </span>
                  </div>
                  <h2 className="font-bold text-foreground mb-2">{item.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.blurb}</p>
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
