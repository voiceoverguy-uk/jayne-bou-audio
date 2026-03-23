import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Sliders, Disc, Mic } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Studio Control Room" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-noise z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              SONIC <span className="text-gradient-gold">EXCELLENCE</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Premium mixing, mastering, and production services. Elevating your tracks with analog warmth, digital precision, and uncompromising clarity.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/portfolio"
                className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm hover:bg-primary/90 transition-all shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-lg)] w-full sm:w-auto"
              >
                Listen to Work
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 border border-white/20 text-foreground font-bold tracking-widest uppercase text-sm hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Book a Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="font-display text-sm tracking-[0.3em] text-primary uppercase mb-4">Expertise</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold">CRAFTING YOUR SOUND</h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Mixing', icon: Sliders, desc: 'Translating raw emotion into a wide, punchy, and cohesive mix that hits hard.' },
              { title: 'Mastering', icon: Disc, desc: 'The final polish to ensure your music competes perfectly on every streaming platform.' },
              { title: 'Production', icon: Mic, desc: 'Vocal tuning, editing, and creative production to take your song to the finish line.' },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 group"
              >
                <service.icon className="w-12 h-12 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                <h4 className="font-display text-2xl font-bold mb-4">{service.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm font-bold hover:gap-4 transition-all"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VISUAL BREAK / QUOTE */}
      <section className="py-32 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/sound-wave.png`}
            alt="Abstract Soundwave" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <p className="font-display text-2xl md:text-4xl leading-relaxed text-foreground italic">
            "Music is not just heard, it is felt. The right mix doesn't just change how a song sounds—it changes how it hits the soul."
          </p>
        </motion.div>
      </section>

    </div>
  );
}
