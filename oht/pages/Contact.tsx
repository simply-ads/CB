import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center pt-32 pb-24 relative overflow-hidden">
        {/* Background texture SVG */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible opacity-30">
             <svg className="w-full h-full" fill="none" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                <path className="opacity-40" d="M100,600 C300,500 400,200 600,300 C800,400 900,100 1100,200" stroke="#C4785B" strokeDasharray="12 12" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <span className="uppercase tracking-[0.5em] text-[12px] font-bold text-terracotta mb-12 block">Get in Touch</span>
            
            <h1 className="text-7xl md:text-[10rem] font-display mb-16 tracking-tighter leading-[0.9]">
                Let's write <br/>
                <span className="italic font-normal">the next chapter.</span>
            </h1>

            <div className="space-y-12">
                <p className="text-xl md:text-2xl font-light text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
                    Whether you’re unveiling a new boutique hideaway or redefining a legacy brand, I’m here to find the words that matter.
                </p>
                
                <a href="mailto:hello@alexandrav.co" className="text-3xl md:text-6xl font-display text-terracotta font-bold link-underline inline-block mt-8">
                    hello@alexandrav.co
                </a>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-charcoal/40 border-t border-charcoal/5 pt-12">
                <div>
                    <span className="block text-terracotta mb-2">Location</span>
                    Barcelona, Spain
                </div>
                <div>
                    <span className="block text-terracotta mb-2">Availability</span>
                    Q3 / Q4 2024
                </div>
                <div>
                    <span className="block text-terracotta mb-2">Social</span>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="hover:text-charcoal transition-colors">IG</a>
                        <a href="#" className="hover:text-charcoal transition-colors">LI</a>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Decorative Bottom Graphic */}
         <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-hidden z-[-1]">
            <svg className="w-full h-full" fill="none" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,50 C200,80 400,280 700,180 C1000,80 1200,220 1500,200" opacity="0.4" stroke="#C4785B" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="1.5"></path>
            </svg>
        </div>
    </div>
  );
};

export default Contact;