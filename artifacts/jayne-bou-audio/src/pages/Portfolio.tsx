import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { usePortfolio } from '@/hooks/use-site-data';

export default function Portfolio() {
  const { data: portfolio } = usePortfolio();
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Mixing', 'Mastering', 'Recording & Mix'];

  const filteredPortfolio = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.role.includes(filter));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">SELECTED WORK</h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            A curated selection of recent projects. Best experienced on studio monitors or high-quality headphones.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border border-border hover:border-primary/50 text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPortfolio.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden mb-4 rounded-sm">
                  {/* stock image from unsplash via hook data */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-wide">{item.title}</h3>
                  <p className="text-primary text-sm mt-1 mb-2">{item.artist}</p>
                  <span className="inline-block px-3 py-1 bg-card border border-white/5 text-xs text-muted-foreground tracking-wider uppercase">
                    {item.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
