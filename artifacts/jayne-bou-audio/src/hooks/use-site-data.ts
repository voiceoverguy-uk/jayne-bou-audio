import { useState, useEffect } from 'react';

// Static data hooks since there's no backend for this portfolio yet.
// In a real app, these would use @tanstack/react-query and fetch from an API.

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  artist: string;
  role: string;
  imageUrl: string;
}

export function useServices() {
  const [services] = useState<Service[]>([
    {
      id: '1',
      title: 'Mixing',
      description: 'Transforming raw stems into a cohesive, radio-ready masterpiece with depth, clarity, and punch.',
      icon: 'sliders'
    },
    {
      id: '2',
      title: 'Mastering',
      description: 'The final polish. Ensuring your tracks translate perfectly across all playback systems with competitive loudness.',
      icon: 'disc'
    },
    {
      id: '3',
      title: 'Vocal Production',
      description: 'Editing, tuning, and timing to make your lead vocal shine while retaining natural emotion.',
      icon: 'mic'
    },
    {
      id: '4',
      title: 'Dolby Atmos',
      description: 'Immersive spatial audio mixing for Apple Music and other platforms supporting Dolby Atmos.',
      icon: 'speaker'
    }
  ]);

  return { data: services, isLoading: false };
}

export function usePortfolio() {
  const [portfolio] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Midnight Echoes',
      artist: 'The Vanguards',
      role: 'Mix & Master',
      imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80'
    },
    {
      id: '2',
      title: 'Solar Flare',
      artist: 'Aura',
      role: 'Mastering',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5221b?w=800&q=80'
    },
    {
      id: '3',
      title: 'Neon Streets',
      artist: 'Synthwave Syndicate',
      role: 'Mixing',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
    },
    {
      id: '4',
      title: 'Acoustic Sessions',
      artist: 'Elena Moon',
      role: 'Recording & Mix',
      imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80'
    },
    {
      id: '5',
      title: 'Underground',
      artist: 'District 9',
      role: 'Mix & Master',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80'
    },
    {
      id: '6',
      title: 'Symphony No. 4',
      artist: 'Metropolitan Orchestra',
      role: 'Mastering',
      imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc8?w=800&q=80'
    }
  ]);

  return { data: portfolio, isLoading: false };
}
