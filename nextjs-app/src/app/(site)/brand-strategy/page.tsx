import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { reader } from "@/lib/reader";

export default async function BrandStrategy() {
  const data = await reader.singletons.brandStrategy.read();

  const subtitleLabel = data?.subtitleLabel ?? "Core Foundations";
  const description =
    data?.description ??
    "Defining the soul of your business before a single visual asset is created. We unearth the truth of your brand and articulate it with precision.";
  const quote = data?.quote ?? "A brand is not just a logo; it is a promise kept.";
  const ctaHeading = data?.ctaHeading ?? "Define";
  const ctaSubheading = data?.ctaSubheading ?? "your truth.";
  const ctaLinkText = data?.ctaLinkText ?? "Inquire about Strategy";

  const projects = (data?.projects ?? []).map((p, i) => ({
    id: `bs${i + 1}`,
    title: p.title ?? "",
    category: p.category ?? "",
    description: p.description ?? "",
    image:
      p.image ||
      p.imageUrl ||
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
    slug: p.slug ?? "",
  }));

  return (
    <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-24 relative">
        <div
          className="absolute -left-10 top-0 w-48 h-48 text-terracotta/20 pointer-events-none animate-spin-slow"
          style={{ animationDuration: "25s" }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <rect x="45" y="10" width="10" height="80" strokeWidth="0.5" />
            <rect x="10" y="45" width="80" height="10" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
          <h1 className="text-6xl md:text-9xl font-display text-charcoal tracking-tighter leading-none">
            Brand <br />
            <span className="italic font-normal text-terracotta">
              Strategy.
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
            <path
              className="opacity-30"
              d="M0,0 C300,300 900,300 1200,0"
              stroke="#C4785B"
              strokeDasharray="2 4"
              strokeWidth="1"
            ></path>
            <path
              className="opacity-30"
              d="M0,600 C300,900 900,900 1200,600"
              stroke="#C4785B"
              strokeDasharray="2 4"
              strokeWidth="1"
            ></path>
          </svg>
        </div>

        {projects[0] && (
          <div className="md:col-span-8 relative z-10 mt-12">
            <ProjectCard
              project={projects[0]}
              aspectRatio="aspect-[16/10]"
              size="large"
            />
          </div>
        )}

        {projects[1] && (
          <div className="md:col-span-4 relative z-10 md:mt-48">
            <ProjectCard
              project={projects[1]}
              aspectRatio="aspect-[3/4]"
              size="medium"
            />
          </div>
        )}

        <div className="md:col-span-12 py-24 flex items-center justify-center text-center relative z-10">
          <div className="max-w-xl">
            <p className="text-3xl md:text-5xl font-display italic text-charcoal/80 leading-tight">
              &ldquo;{quote}&rdquo;
            </p>
            <div className="mt-8 w-12 h-[1px] bg-terracotta mx-auto"></div>
          </div>
        </div>

        {projects[2] && (
          <div className="md:col-span-7 relative z-10 mt-12 mx-auto">
            <ProjectCard
              project={projects[2]}
              aspectRatio="aspect-[16/9]"
              size="large"
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
