import { ArrowRight } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { images } from '@/lib/assets';
import { useSeo } from '@/hooks/useSeo';

const guides = [
  {
    id: 'watts',
    src: images.learnWatts,
    title: 'What Do Watts Actually Mean?',
    category: 'Power & Performance',
    readTime: '5 min read',
    teaser: 'Power ratings are one of the most misunderstood numbers in hi-fi. A 50-watt amplifier isn\'t necessarily twice as loud as a 25-watt one — and that 300-watt AV receiver might actually be quieter than a 10-watt valve amp. Here\'s what\'s really going on.',
    highlights: ['Why watts aren\'t everything', 'Sensitivity and efficiency explained', 'How big does your room matter?', 'Real-world listening level requirements'],
  },
  {
    id: 'active-passive',
    src: images.learnActiveVsPassive,
    title: 'Active vs Passive Speakers',
    category: 'Speaker Systems',
    readTime: '6 min read',
    teaser: 'Active speakers have built-in amplification; passive ones need a separate amplifier. But which approach gives you better sound for your budget? And what are the real trade-offs beyond the obvious?',
    highlights: ['What \'active\' really means', 'Where passive setups win', 'The studio monitor story', 'Which suits your lifestyle?'],
  },
  {
    id: 'valve-transistor',
    src: images.learnValveVsTransistor,
    title: 'Valve vs Transistor Amplifiers',
    category: 'Amplification',
    readTime: '7 min read',
    teaser: 'Valve (tube) amplifiers have been around since before the transistor existed, and they\'re still beloved today. Transistor amps are more reliable, run cooler, and are often cheaper. So why does anyone still choose valves?',
    highlights: ['How each technology works', 'The \'warmth\' myth, examined', 'Maintenance and running costs', 'Which genres suit each best?'],
  },
  {
    id: 'warm-bright',
    src: images.learnWarmVsBright,
    title: 'Warm vs Bright: Understanding Sonic Character',
    category: 'Sound & Taste',
    readTime: '5 min read',
    teaser: 'When audiophiles describe sound as \'warm\' or \'bright\', what are they actually talking about? These terms can feel vague, but they point to real, measurable characteristics — and understanding them will transform how you choose equipment.',
    highlights: ['The frequency spectrum explained', 'Why \'warm\' doesn\'t mean \'slow\'', 'Matching gear to your music taste', 'System building for balance'],
  },
];

export default function Learn() {
  useSeo({
    title: 'Hi-Fi Buying Guides & Advice',
    description: 'Plain-English guides to buying pre-owned hi-fi. Understand amplifier power ratings, valve vs transistor, active vs passive speakers, and what warm vs bright sound really means.',
    canonical: 'https://jaynebou.com/learn',
  });
  return (
    <div className="w-full pt-20">
      <section className="py-14 md:py-20 bg-background" data-testid="section-learn-header">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Knowledge Base</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hi-Fi Buyer Guides</h1>
            <p className="text-muted-foreground leading-relaxed">
              The hi-fi world can feel intimidating — full of technical jargon, conflicting opinions, and expensive mistakes waiting to happen. These guides exist to cut through the noise and help you understand what actually matters when buying audio equipment.
            </p>
          </div>

          <div className="space-y-10">
            {guides.map((guide, index) => (
              <article
                key={guide.id}
                data-testid={`card-guide-${guide.id}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-card border border-border rounded-md overflow-hidden"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <SmartImage
                    src={guide.src}
                    fallbackLabel="Guide Image Placeholder"
                    alt={guide.title}
                    aspectRatio="16/9"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className={`p-7 md:p-10 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">{guide.category}</span>
                    <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{guide.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{guide.teaser}</p>
                  <ul className="space-y-2 mb-7">
                    {guide.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    data-testid={`button-read-guide-${guide.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity self-start"
                  >
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
