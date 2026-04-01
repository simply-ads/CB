import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

const projects: Project[] = [
  {
    id: 'ec1',
    title: 'Winter Solstice',
    category: 'Campaign • Fashion',
    description: 'A moody, atmospheric holiday campaign for a sustainable luxury knitwear brand.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop',
    slug: 'winter-solstice'
  },
  {
    id: 'ec2',
    title: 'Taste of the Earth',
    category: 'Magazine Spread • Food',
    description: 'Editorial direction for a farm-to-table feature in a leading culinary publication.',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2626&auto=format&fit=crop',
    slug: 'taste-of-earth'
  },
  {
    id: 'ec3',
    title: 'Neon Nights',
    category: 'City Guide • Lifestyle',
    description: 'A vibrant, pulse-pounding guide to the nightlife of Seoul for a global travel app.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2670&auto=format&fit=crop',
    slug: 'neon-nights'
  }
];

const EditorialCampaigns: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="mb-24 relative">
             <div className="absolute -left-10 top-0 w-48 h-48 text-terracotta/20 pointer-events-none animate-spin-slow" style={{animationDuration: '15s'}}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 100 100">
                    <path d="M10,50 Q25,25 50,50 T90,50" strokeWidth="0.5" />
                    <path d="M10,60 Q25,35 50,60 T90,60" strokeWidth="0.5" />
                    <path d="M10,40 Q25,15 50,40 T90,40" strokeWidth="0.5" />
                </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
                <h1 className="text-6xl md:text-9xl font-display text-charcoal tracking-tighter leading-none">
                    Editorial <br/><span className="italic font-normal text-terracotta">Campaigns.</span>
                </h1>
                <div className="max-w-xs mt-8 md:mt-0">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-terracotta mb-4">Storytelling in Motion</p>
                    <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
                        Crafting campaigns that do more than sell—they inspire. We blend visual direction with compelling copy to create moments that linger.
                    </p>
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
             {/* Background decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                 <svg className="w-full h-full" fill="none" viewBox="0 0 1200 1200">
                    <circle cx="600" cy="600" r="300" stroke="#C4785B" strokeWidth="0.5" opacity="0.2" strokeDasharray="10 10" />
                </svg>
            </div>

            <div className="md:col-span-8 relative z-10 mt-12">
                <ProjectCard project={projects[0]} aspectRatio="aspect-[16/9]" size="large" />
            </div>

            <div className="md:col-span-4 relative z-10 md:mt-24">
                 <div className="p-8 bg-charcoal text-cream h-full flex flex-col justify-center items-center text-center">
                    <span className="text-6xl font-display italic mb-4">"</span>
                    <p className="font-display text-2xl">Stories are the currency of human connection.</p>
                 </div>
            </div>

            <div className="md:col-span-6 relative z-10 mt-12">
                 <ProjectCard project={projects[1]} aspectRatio="aspect-square" size="medium" />
            </div>

             <div className="md:col-span-6 relative z-10 md:mt-32">
                 <ProjectCard project={projects[2]} aspectRatio="aspect-[4/5]" size="medium" alignRight />
            </div>

        </div>

        <div className="py-32 mt-24 border-t border-charcoal/10 text-center">
            <span className="uppercase tracking-[0.5em] text-[11px] font-bold text-terracotta mb-8 block">Next Step</span>
            <h2 className="text-5xl md:text-8xl font-display mb-12 tracking-tighter leading-[0.9]">
                Launch <br/><span className="italic text-terracotta">the movement.</span>
            </h2>
            <Link to="/contact" className="text-2xl font-display italic link-underline">Inquire about Campaigns</Link>
        </div>
    </div>
  );
};

export default EditorialCampaigns;