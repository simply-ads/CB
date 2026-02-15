import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { reader } from "@/lib/reader";

const MarqueeContent = ({ items }: { items: readonly string[] }) => (
  <div className="flex items-center text-5xl md:text-7xl font-display italic text-terracotta uppercase">
    {items.slice(0, 4).map((item, i) => (
      <span key={i}>
        <span className="mx-8">{item}</span>{" "}
        <span className="text-2xl">{i % 2 === 0 ? "\u2726" : "\u25C6"}</span>
      </span>
    ))}
  </div>
);

const MarqueeContentReverse = ({ items }: { items: readonly string[] }) => (
  <div className="flex items-center text-3xl md:text-5xl font-display text-charcoal uppercase">
    {items.slice(4, 8).map((item, i) => (
      <span key={i}>
        <span className="mx-8">{item}</span>{" "}
        <span className="text-xl">{i % 2 === 0 ? "\u25C6" : "\u2726"}</span>
      </span>
    ))}
  </div>
);

export default async function Home() {
  const homepage = await reader.singletons.homepage.read();
  const allProjects = await reader.collections.projects.all();
  const featuredProjects = allProjects
    .filter((p) => p.entry.featured)
    .sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0));

  const marqueeItems = homepage?.marqueeItems ?? [
    "Verbal Identity",
    "Luxury Travel",
    "Brand Storytelling",
    "Editorial Direction",
    "Mediterranean Heritage",
    "Signature Tone",
    "Content Strategy",
    "Global Reach",
  ];

  const testimonialQuote =
    homepage?.testimonialQuote ??
    "Her words don\u2019t just describe a place; they transport you there before you\u2019ve even booked your ticket.";
  const footerEmail = homepage?.footerEmail ?? "hello@alexandrav.co";

  // Map featured projects to image URLs (fallback to Unsplash placeholders)
  const projectImages: Record<string, string> = {
    "azure-retreat":
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop",
    "palazzo-segreto":
      "https://images.unsplash.com/photo-1541447271487-09612b8f49ac?q=80&w=2671&auto=format&fit=crop",
    "nomad-spirits":
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop",
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Landscape"
            className="w-full h-full object-cover grayscale opacity-30"
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-cream/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 animate-fade-in-up">
          <h1 className="text-6xl md:text-[10rem] font-display text-charcoal tracking-tighter leading-[0.95]">
            Narratives <br />
            <span className="italic font-normal text-terracotta">
              of Escape.
            </span>
          </h1>
          <p className="mt-12 text-charcoal/60 uppercase tracking-[0.15em] text-[11px] font-bold">
            {homepage?.heroSubtext ?? "Editorial Copywriter for Global Hospitality"}
          </p>
        </div>

        {/* Decorative squiggle */}
        <div className="absolute bottom-20 left-1/4 w-48 text-terracotta/40 pointer-events-none">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 200 40"
          >
            <path
              d="M0 20 Q 25 5, 50 20 T 100 20 T 150 20 T 200 20"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </header>

      {/* Marquee Section */}
      <section className="py-12 border-y border-charcoal/10 relative overflow-hidden bg-cream">
        <div className="space-y-4">
          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap">
              <MarqueeContent items={marqueeItems} />
              <MarqueeContent items={marqueeItems} />
            </div>
          </div>
          <div className="flex overflow-hidden group opacity-60">
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              <MarqueeContentReverse items={marqueeItems} />
              <MarqueeContentReverse items={marqueeItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Preview */}
      <main className="py-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto relative">
        {/* Background Doodles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible opacity-40">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 1200 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="opacity-60"
              d="M50,120 C100,100 150,250 100,350 C50,450 300,550 600,450 C900,350 1000,500 1100,600"
              stroke="#C4785B"
              strokeDasharray="10 10"
              strokeLinecap="round"
              strokeWidth="2"
            ></path>
          </svg>
        </div>

        <div className="mb-16 max-w-5xl relative z-10">
          <span className="uppercase tracking-[0.1em] text-[11px] font-bold text-terracotta mb-4 block">
            The Portfolio
          </span>
          <h2 className="text-5xl md:text-8xl lg:text-[8rem] font-display mb-8">
            Selected Works.
          </h2>
        </div>

        {/* Project 1: First featured large project */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 mb-32 relative z-10">
          {featuredProjects[0] && (
            <Link
              href={`/work/${featuredProjects[0].slug}`}
              className="md:col-span-7 group cursor-pointer relative block"
            >
              <div className="absolute -left-12 -top-12 w-32 h-32 text-terracotta z-20 pointer-events-none opacity-80 -rotate-12 hidden md:block">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 100 100"
                >
                  <path d="M50,20 C30,20 15,35 15,55 C15,75 35,90 50,90 C65,90 85,75 85,55 C85,35 70,20 50,20 Z"></path>
                  <path d="M50,20 Q55,10 65,15" strokeLinecap="round"></path>
                  <path d="M52,22 L52.5,22 M48,22 L48.5,22" strokeLinecap="round" strokeWidth="3"></path>
                  <path d="M45,45 L45.5,45 M60,55 L60.5,55 M48,70 L48.5,70 M35,58 L35.5,58" strokeLinecap="round" strokeWidth="2"></path>
                </svg>
              </div>

              <div className="overflow-hidden aspect-[16/10] mb-6 relative">
                <img
                  alt={featuredProjects[0].entry.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  src={
                    featuredProjects[0].entry.featuredImage ||
                    projectImages[featuredProjects[0].slug] ||
                    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop"
                  }
                />
                <div className="absolute inset-0 bg-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-5xl font-display mb-4 link-underline inline-block">
                  {featuredProjects[0].entry.title}
                </h3>
                <p className="text-lg md:text-xl text-charcoal/60 font-light leading-relaxed">
                  {featuredProjects[0].entry.summary}
                </p>
              </div>
            </Link>
          )}

          <div className="md:col-span-3 flex flex-col justify-end pb-12">
            <div className="p-8 border-l border-terracotta/20 italic font-display text-xl md:text-2xl text-charcoal/70 relative">
              <span className="absolute -top-6 -right-0 text-6xl text-terracotta/20 font-serif">
                &ldquo;
              </span>
              {testimonialQuote}
            </div>
          </div>
        </div>

        {/* Project 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-12 relative z-10">
          {featuredProjects[1] && (
            <Link
              href={`/work/${featuredProjects[1].slug}`}
              className="md:col-span-4 space-y-4 group cursor-pointer block"
            >
              <div className="overflow-hidden aspect-[3/4] mb-6 relative">
                <img
                  alt={featuredProjects[1].entry.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  src={
                    featuredProjects[1].entry.featuredImage ||
                    projectImages[featuredProjects[1].slug] ||
                    "https://images.unsplash.com/photo-1541447271487-09612b8f49ac?q=80&w=2671&auto=format&fit=crop"
                  }
                />
                <div className="absolute inset-0 bg-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <h3 className="text-3xl font-display mb-2 link-underline inline-block">
                {featuredProjects[1].entry.title}
              </h3>
              <p className="text-xs text-charcoal/60 uppercase tracking-widest">
                {featuredProjects[1].entry.category}
              </p>
            </Link>
          )}

          {featuredProjects[2] && (
            <Link
              href={`/work/${featuredProjects[2].slug}`}
              className="md:col-span-6 group cursor-pointer relative pt-12 block"
            >
              <div className="overflow-hidden aspect-[16/9] mb-6 relative">
                <img
                  alt={featuredProjects[2].entry.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  src={
                    featuredProjects[2].entry.featuredImage ||
                    projectImages[featuredProjects[2].slug] ||
                    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop"
                  }
                />
                <div className="absolute inset-0 bg-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-5xl font-display mb-4 link-underline inline-block">
                  {featuredProjects[2].entry.title}
                </h3>
                <p className="text-lg text-charcoal/60 font-light leading-relaxed">
                  {featuredProjects[2].entry.summary}
                </p>
              </div>
            </Link>
          )}
        </div>
      </main>

      {/* Services Section / The New Luxury */}
      <section className="py-24 bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1000 400">
            <path
              d="M100 300 C 250 50, 750 50, 900 100"
              stroke="#C4785B"
              strokeWidth="2"
              strokeDasharray="6 6"
            ></path>
          </svg>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-display mb-10 leading-[0.95] tracking-tighter">
              The New <br />
              <span className="italic text-terracotta">Luxury.</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-cream/60 leading-relaxed mb-12 max-w-lg">
              {homepage?.introBody ??
                "In an era of visual saturation, the right words are the ultimate luxury. I craft the verbal DNA of world-class properties."}
            </p>

            <div className="space-y-6">
              <Link
                href="/brand-strategy"
                className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-terracotta transition-colors cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-display italic">
                  Brand Strategy
                </span>
                <ArrowUpRight className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/website-copy"
                className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-terracotta transition-colors cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-display italic">
                  Website Copy
                </span>
                <ArrowUpRight className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/editorial-campaigns"
                className="group flex items-center justify-between border-b border-white/10 pb-4 hover:border-terracotta transition-colors cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-display italic">
                  Editorial Campaigns
                </span>
                <ArrowUpRight className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="aspect-[3/4] overflow-hidden grayscale brightness-75 relative z-10">
              <img
                alt="Luxury detail"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2564&auto=format&fit=crop"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-terracotta text-cream flex items-center justify-center italic text-3xl font-display shadow-2xl z-20">
              AV.
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Call to Action */}
      <section className="py-32 text-center px-6 relative bg-cream overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="uppercase tracking-[0.1em] text-[11px] font-bold text-terracotta mb-8 block">
            Inquiries
          </span>
          <h2 className="text-6xl md:text-[8rem] font-display mb-12 tracking-tighter leading-[0.95]">
            {homepage?.footerCTA ? (
              <>{homepage.footerCTA}</>
            ) : (
              <>
                Let&apos;s write <br />
                <span className="italic font-normal">the next chapter.</span>
              </>
            )}
          </h2>
          <a
            href={`mailto:${footerEmail}`}
            className="text-2xl md:text-4xl font-display link-underline italic"
          >
            {footerEmail}
          </a>
          <p className="mt-16 text-charcoal/40 text-xs uppercase tracking-[0.1em]">
            Based in Barcelona &mdash; Working Worldwide
          </p>
        </div>
      </section>
    </>
  );
}
