import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">START A PROJECT</h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
              Ready to elevate your sound? Tell me about your project, timeline, and what you're looking to achieve. I'll get back to you within 24 hours with a custom quote.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card border border-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold mb-1">Email</h4>
                  <a href="mailto:hello@jaynebouaudio.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@jaynebouaudio.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card border border-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold mb-1">Studio Location</h4>
                  <p className="text-muted-foreground">
                    Los Angeles, CA<br/>
                    (In-person sessions by appointment only)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-8 md:p-10 rounded-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Service Needed</label>
                <select 
                  id="service" 
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option>Mixing</option>
                  <option>Mastering</option>
                  <option>Mixing & Mastering</option>
                  <option>Vocal Production</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Project Details</label>
                <textarea 
                  id="message" 
                  rows={5}
                  required
                  placeholder="Tell me about your track count, references, timeline..."
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Rough Mix / Demo Link (Optional)</label>
                <input 
                  type="url" 
                  id="link" 
                  placeholder="Dropbox, Google Drive, Soundcloud..."
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[var(--shadow-gold)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
