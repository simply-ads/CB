import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Edit3 } from 'lucide-react';

const CaseStudy: React.FC = () => {
    const { slug } = useParams();

    // In a real app, fetch data based on slug.
    // Displaying static content matching "The Azure Retreat" design reference.

  return (
    <div className="pt-32">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-4xl">
                    <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-terracotta mb-6 block">Case Study 01 / Hospitality Portfolio</span>
                    <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-charcoal">
                        The Azure <br/><span className="italic font-normal text-terracotta">Retreat.</span>
                    </h1>
                </div>
                <div className="md:w-1/3 pb-4">
                    <p className="text-sm uppercase tracking-widest text-charcoal/40 mb-2">Location</p>
                    <p className="text-xl font-display italic mb-6">Santorini, Greece</p>
                    <p className="text-sm uppercase tracking-widest text-charcoal/40 mb-2">Scope</p>
                    <p className="text-xl font-display italic">Brand Narrative & Digital Storytelling</p>
                </div>
            </div>

            <div className="relative group overflow-hidden aspect-[21/9]">
                <img 
                    alt="The Azure Retreat Hero" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop"
                />
            </div>
        </div>

        {/* Content Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
            
            <div className="mb-24">
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold text-terracotta mb-4 block">Process</span>
                <h2 className="text-6xl md:text-8xl font-display mb-12">The Showcase.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center mb-32">
                <div className="aspect-[4/5] shadow-2xl relative">
                    <img 
                        alt="Detail architecture" 
                        className="w-full h-full object-cover" 
                        src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop"
                    />
                </div>
                <div className="space-y-8">
                    <h3 className="text-4xl md:text-5xl font-display italic">Evoking the Silence.</h3>
                    <div className="prose prose-xl font-serif text-charcoal/80 leading-relaxed space-y-6">
                        <p>The challenge was to capture the paradoxical "vibrant silence" of a property nestled into the Oia cliffs. We moved away from standard luxury tropes, opting instead for a narrative of architectural stillness.</p>
                        <p>I crafted a verbal identity that mirrors the site's geometry: sharp, clean, but inherently warm. Every headline acts as a breath, inviting the reader to pause before they have even seen the booking engine.</p>
                    </div>
                    <div className="pt-6">
                        <span className="text-terracotta font-bold tracking-widest text-xs uppercase block mb-4">Core Narrative Pillar</span>
                        <div className="h-[1px] w-24 bg-terracotta"></div>
                    </div>
                </div>
            </div>

            {/* Blue Callout */}
            <div className="bg-med-blue text-cream py-20 px-8 md:px-24 mb-32 relative overflow-hidden rounded-sm shadow-xl">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <BookOpen size={200} />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h3 className="text-4xl md:text-5xl font-display italic mb-6">The Resonance</h3>
                        <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed">
                            By positioning the villa as a "sanctuary of narrative" rather than just a rental, we saw a 40% increase in direct bookings and a significant lift in average length of stay within the first quarter.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center border-l border-white/20 pl-12">
                        <span className="text-5xl font-display mb-2">40%</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">Increase in Direct Bookings</span>
                    </div>
                </div>
            </div>

            {/* Second Image Block */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
                 <div className="order-2 lg:order-1 space-y-8">
                    <h3 className="text-4xl md:text-5xl font-display italic">The Human Texture.</h3>
                    <div className="prose prose-xl font-serif text-charcoal/80 leading-relaxed space-y-6">
                        <p>Travel is rarely about the linens; it's about the feeling of salt on the skin and the weight of shadows in the afternoon sun. Our editorial strategy focused on these sensory micro-moments.</p>
                        <p>Through a series of digital vignettes, we explored the heritage of the Cyclades, weaving local craft and Mediterranean history into the brand's very DNA.</p>
                    </div>
                </div>
                 <div className="order-1 lg:order-2 aspect-[4/5] shadow-2xl relative">
                    <img 
                        alt="Lifestyle photography" 
                        className="w-full h-full object-cover" 
                        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
                    />
                     <div className="absolute -top-6 -left-6 w-12 h-12 bg-terracotta text-cream flex items-center justify-center rotate-12 shadow-lg">
                        <Edit3 size={20} />
                    </div>
                </div>
             </div>

        </section>

        {/* Footer Navigation */}
        <section className="py-32 bg-charcoal text-cream text-center px-8 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-6xl font-display italic mb-12">"A masterclass in restraint and evocative storytelling."</h2>
                <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-terracotta mb-16">— Managing Director, The Azure Retreat</p>
                <div className="flex justify-center gap-12">
                    <Link to="/work" className="link-underline text-sm uppercase tracking-widest font-bold hover:text-terracotta transition-colors">Next Project</Link>
                    <Link to="/" className="link-underline text-sm uppercase tracking-widest font-bold hover:text-terracotta transition-colors">Home</Link>
                </div>
            </div>
        </section>
    </div>
  );
};

export default CaseStudy;