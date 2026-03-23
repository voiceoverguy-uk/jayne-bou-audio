import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm relative">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-portrait.png`}
                alt="Jayne Bou in the studio" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-card border border-white/10 -z-10" />
            <div className="absolute -top-8 -left-8 w-48 h-48 border border-primary/30 -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
              THE <span className="text-primary">VISION</span>
            </h1>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                Founded on the principle that every great song deserves a great finish, Jayne Bou Audio is a boutique mixing and mastering studio dedicated to sonic excellence.
              </p>
              <p>
                With over a decade of experience across genres ranging from intimate acoustic sessions to heavy-hitting electronic and pop, I approach every mix as a unique puzzle. My goal is never to impose a "signature sound" on your music, but rather to reveal the truest, most impactful version of your own vision.
              </p>
              <p>
                The studio is a hybrid environment, combining the surgical precision of modern digital tools with the unmistakable character, warmth, and depth of high-end analog outboard gear.
              </p>
            </div>

            <div className="mt-12 pt-12 border-t border-border/50">
              <h3 className="font-display text-2xl font-bold mb-6">The Setup</h3>
              <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">Monitoring</h4>
                  <ul className="space-y-1">
                     <li>Focal Trio11 Be</li>
                     <li>Yamaha NS-10M</li>
                     <li>Dangerous Music D-Box+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-2 uppercase tracking-widest text-xs">Analog Outboard</h4>
                  <ul className="space-y-1">
                     <li>SSL Fusion</li>
                     <li>Manley Massive Passive</li>
                     <li>Rupert Neve Master Buss</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link 
                href="/contact"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm hover:bg-primary/90 transition-all shadow-[var(--shadow-gold)]"
              >
                Work With Me
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
