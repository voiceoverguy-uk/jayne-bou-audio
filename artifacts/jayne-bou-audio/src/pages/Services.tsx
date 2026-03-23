import { motion } from 'framer-motion';
import { useServices } from '@/hooks/use-site-data';
import { Sliders, Disc, Mic, Speaker } from 'lucide-react';

const iconMap: Record<string, any> = {
  sliders: Sliders,
  disc: Disc,
  mic: Mic,
  speaker: Speaker
};

export default function Services() {
  const { data: services } = useServices();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-[-20%] w-[40%] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-noise z-0 opacity-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">SERVICES</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Professional audio engineering tailored to your unique sound. We offer a comprehensive suite of services to take your music from rough draft to radio-ready.
          </p>
        </motion.div>

        <div className="space-y-12 md:space-y-24">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sliders;
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 aspect-[4/3] bg-card border border-white/5 flex items-center justify-center overflow-hidden relative group">
                   {/* Abstract aesthetic placeholder for service image */}
                   <div className="absolute inset-0 bg-gradient-to-br from-background to-card z-0" />
                   <Icon className="w-32 h-32 text-primary/20 group-hover:scale-110 group-hover:text-primary/40 transition-all duration-700 z-10" />
                   <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary font-display font-bold text-xl">0{index + 1}</span>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {/* Placeholder features list */}
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Industry standard processing</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Analog summing & saturation</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Unlimited revisions (within reason)</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
