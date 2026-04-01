import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

const projects: Project[] = [
  {
    id: 'wc1',
    title: 'Velvet & Vine',
    category: 'E-commerce • Wine',
    description: 'Sumptuous product descriptions and brand storytelling for a boutique wine merchant.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop',
    slug: 'velvet-and-vine'
  },
  {
    id: 'wc2',
    title: 'The Architect’s Studio',
    category: 'Portfolio • Architecture',
    description: 'Minimalist UX writing that lets the buildings speak for themselves.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
    slug: 'architects-studio'
  },
  {
    id: 'wc3',
    title: 'Cerulean Skies',
    category: 'Landing Page • Travel',
    description: 'High-conversion copy for a luxury private jet charter service.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop',
    slug: 'cerulean-skies'
  }
];

const WebsiteCopy: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="mb-24 relative">
             <div className="absolute -left-10 top-0 w-48 h-48 text-terracotta/20 pointer-events-none animate-spin-slow" style={{animationDuration: '30s'}}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 100 100">
                    <polygon points="50,10 90,90 10,90" strokeWidth="0.5" />
                    <circle cx="50" cy="55" r="20" strokeWidth="0.5" />
                </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
                <h1 className="text-6xl md:text-9xl font-display text-charcoal tracking-tighter leading-none">
                    Website <br/><span className="italic font-normal text-terracotta">Copy.</span>
                </h1>
                <div className="max-w-xs mt-8 md:mt-0">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold text-terracotta mb-4">Digital Narratives</p>
                    <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
                        From the first headline to the final call to action, we ensure every word on your digital estate serves a purpose: to enchant and to convert.
                    </p>
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
             {/* Background decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                 <svg className="w-full h-full" fill="none" viewBox="0 0 1200 1200">
                     <line x1="100" y1="0" x2="100" y2="1200" stroke="#C4785B" strokeWidth="0.5" opacity="0.3" />
                     <line x1="1100" y1="0" x2="1100" y2="1200" stroke="#C4785B" strokeWidth="0.5" opacity="0.3" />
                </svg>
            </div>

            <div className="md:col-span-6 relative z-10 mt-12">
                <ProjectCard project={projects[0]} aspectRatio="aspect-[4/5]" size="medium" />
            </div>

             <div className="md:col-span-6 relative z-10 md:mt-32">
                 <ProjectCard project={projects[1]} aspectRatio="aspect-square" size="medium" alignRight />
            </div>

            <div className="md:col-span-12 py-24 flex items-center justify-center text-center relative z-10">
                <div className="max-w-xl">
                    <p className="text-3xl md:text-5xl font-display italic text-charcoal/80 leading-tight">
                        "User experience is written as much as it is designed."
                    </p>
                    <div className="mt-8 w-12 h-[1px] bg-terracotta mx-auto"></div>
                </div>
            </div>

            <div className="md:col-span-10 md:col-start-2 relative z-10 mt-12">
                 <ProjectCard project={projects[2]} aspectRatio="aspect-[21/9]" size="large" />
            </div>

        </div>

        <div className="py-32 mt-24 border-t border-charcoal/10 text-center">
            <span className="uppercase tracking-[0.5em] text-[11px] font-bold text-terracotta mb-8 block">Next Step</span>
            <h2 className="text-5xl md:text-8xl font-display mb-12 tracking-tighter leading-[0.9]">
                Optimize <br/><span className="italic text-terracotta">your impact.</span>
            </h2>
            <Link to="/contact" className="text-2xl font-display italic link-underline">Inquire about Web Copy</Link>
        </div>
    </div>
  );
};

export default WebsiteCopy;