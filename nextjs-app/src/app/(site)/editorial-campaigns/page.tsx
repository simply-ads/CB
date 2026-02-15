import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { reader } from "@/lib/reader";

export default async function EditorialCampaigns() {
  const data = await reader.singletons.editorialCampaigns.read();

  const subtitleLabel = data?.subtitleLabel ?? "Storytelling in Motion";
  const description =
    data?.description ??
    "Crafting campaigns that do more than sell\u2014they inspire. We blend visual direction with compelling copy to create moments that linger.";
  const quote = data?.quote ?? "Stories are the currency of human connection.";
  const quoteStyle = data?.quoteStyle ?? "dark-box";
  const ctaHeading = data?.ctaHeading ?? "Launch";
  const ctaSubheading = data?.ctaSubheading ?? "the movement.";
  const ctaLinkText = data?.ctaLinkText ?? "Inquire about Campaigns";

  const projects = (data?.projects ?? []).map((p, i) => ({
    id: `ec${i + 1}`,
    title: p.title ?? "",
    category: p.category ?? "",
    description: p.description ?? "",
    image:
      p.image ||
      p.imageUrl ||
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop",
    slug: p.slug ?? "",
  }));

  return (
    <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-24 relative">
        <div
          className="absolute -left-10 top-0 w-48 h-48 text-terracotta/20 pointer-events-none animate-spin-slow"
          style={{ animationDuration: "15s" }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 100 100">
            <path d="M10,50 Q25,25 50,50 T90,50" strokeWidth="0.5" />
            <path d="M10,60 Q25,35 50,60 T90,60" strokeWidth="0.5" />
            <path d="M10,40 Q25,15 50,40 T90,40" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
          <h1 className="text-6xl md:text-9xl font-display text-charcoal tracking-tighter leading-none">
            Editorial <br />
            <span className="italic font-normal text-terracotta">
              Campaigns.
            </span>
          </h1>
          <div className="max-w-xs mt-8 md:mt-0">
            <p className="text-xs uppercase tracking-[0.1em] font-bold text-terracotta mb-4">
              {subtitleLabel}
            </p>
            <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
              {description}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 1200 1200"
          >
            <circle
              cx="600"
              cy="600"
              r="300"
              stroke="#C4785B"
              strokeWidth="0.5"
              opacity="0.2"
              strokeDasharray="10 10"
            />
          </svg>
        </div>

        {projects[0] && (
          <div className="md:col-span-8 relative z-10 mt-12">
            <ProjectCard
              project={projects[0]}
              aspectRatio="aspect-[16/9]"
              size="large"
            />
          </div>
        )}

        <div className="md:col-span-4 relative z-10 md:mt-24">
          {quoteStyle === "dark-box" ? (
            <div className="p-8 bg-charcoal text-cream h-full flex flex-col justify-center items-center text-center">
              <span className="text-6xl font-display italic mb-4">
                &ldquo;
              </span>
              <p className="font-display text-2xl">{quote}</p>
            </div>
          ) : (
            <div className="p-8 flex flex-col justify-center items-center text-center">
              <p className="text-2xl md:text-3xl font-display italic text-charcoal/80 leading-tight">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="mt-6 w-12 h-[1px] bg-terracotta mx-auto"></div>
            </div>
          )}
        </div>

        {projects[1] && (
          <div className="md:col-span-6 relative z-10 mt-12">
            <ProjectCard
              project={projects[1]}
              aspectRatio="aspect-square"
              size="medium"
            />
          </div>
        )}

        {projects[2] && (
          <div className="md:col-span-6 relative z-10 md:mt-32">
            <ProjectCard
              project={projects[2]}
              aspectRatio="aspect-[4/5]"
              size="medium"
              alignRight
            />
          </div>
        )}
      </div>

      <div className="py-32 mt-24 border-t border-charcoal/10 text-center">
        <span className="uppercase tracking-[0.15em] text-[11px] font-bold text-terracotta mb-8 block">
          Next Step
        </span>
        <h2 className="text-5xl md:text-8xl font-display mb-12 tracking-tighter leading-[0.95]">
          {ctaHeading} <br />
          <span className="italic text-terracotta">{ctaSubheading}</span>
        </h2>
        <Link
          href="/contact"
          className="text-2xl font-display italic link-underline"
        >
          {ctaLinkText}
        </Link>
      </div>
    </div>
  );
}
