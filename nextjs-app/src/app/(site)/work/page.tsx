import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { reader } from "@/lib/reader";

// Fallback images keyed by slug
const fallbackImages: Record<string, string> = {
  "azure-retreat":
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop",
  "palazzo-segreto":
    "https://images.unsplash.com/photo-1541447271487-09612b8f49ac?q=80&w=2671&auto=format&fit=crop",
  "sands-of-silence":
    "https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?q=80&w=2670&auto=format&fit=crop",
  "nomad-spirits":
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2670&auto=format&fit=crop",
  "the-tactile-issue":
    "https://images.unsplash.com/photo-1620392349141-86315c1e345f?q=80&w=2574&auto=format&fit=crop",
  "highland-escape":
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2670&auto=format&fit=crop",
};

export default async function Work() {
  const allProjects = await reader.collections.projects.all();
  const projects = allProjects
    .sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0))
    .map((p) => ({
      id: p.slug,
      title: p.entry.title,
      category: p.entry.category ?? "",
      description: p.entry.summary ?? "",
      image:
        p.entry.featuredImage ||
        fallbackImages[p.slug] ||
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2574&auto=format&fit=crop",
      slug: p.slug,
    }));

  return (
    <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
      {/* Header */}
      <header className="mb-24 relative">
        <div
          className="absolute -left-10 top-0 w-48 h-48 text-terracotta/20 pointer-events-none animate-spin-slow"
          style={{ animationDuration: "20s" }}
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 100 100">
            <path
              d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z"
              strokeWidth="0.5"
            ></path>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
          <h1 className="text-6xl md:text-9xl font-display text-charcoal tracking-tighter leading-none">
            Selected <br />
            <span className="italic font-normal text-terracotta">
              Editorial.
            </span>
          </h1>
          <div className="max-w-xs mt-8 md:mt-0">
            <p className="text-xs uppercase tracking-[0.1em] font-bold text-terracotta mb-4">
              Work Gallery 2022&ndash;24
            </p>
            <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
              A curated collection of brand narratives, heritage storytelling,
              and verbal identities for the world&apos;s most evocative
              destinations.
            </p>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start relative">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 1200 1200"
          >
            <path
              className="opacity-40"
              d="M100,200 C300,100 400,400 200,600 C0,800 600,900 1100,700"
              stroke="#C4785B"
              strokeDasharray="6 6"
              strokeWidth="1.5"
            ></path>
          </svg>
        </div>

        {/* Project 1 (Large) */}
        {projects[0] && (
          <div className="md:col-span-8 relative z-10 mt-12">
            <ProjectCard
              project={projects[0]}
              aspectRatio="aspect-[16/10]"
              size="large"
            />
          </div>
        )}

        {/* Project 2 (Vertical) */}
        {projects[1] && (
          <div className="md:col-span-4 relative z-10 md:mt-48">
            <ProjectCard
              project={projects[1]}
              aspectRatio="aspect-[3/4]"
              size="medium"
            />
          </div>
        )}

        {/* Project 3 (Vertical) */}
        {projects[2] && (
          <div className="md:col-span-5 relative z-10 mt-24">
            <ProjectCard
              project={projects[2]}
              aspectRatio="aspect-[4/5]"
              size="medium"
            />
          </div>
        )}

        {/* Project 4 (Wide) */}
        {projects[3] && (
          <div className="md:col-span-7 relative z-10 mt-24 md:mt-12">
            <ProjectCard
              project={projects[3]}
              aspectRatio="aspect-[16/9]"
              size="large"
              alignRight
            />
          </div>
        )}

        {/* Quote Break */}
        <div className="md:col-span-12 py-24 flex items-center justify-center text-center relative z-10">
          <div className="max-w-lg">
            <p className="text-3xl md:text-5xl font-display italic text-charcoal/80 leading-tight">
              &ldquo;In an era of visual saturation, the right words are the
              ultimate luxury.&rdquo;
            </p>
            <div className="mt-8 w-12 h-[1px] bg-terracotta mx-auto"></div>
          </div>
        </div>

        {/* Remaining projects in small grid */}
        {projects[4] && (
          <div className="md:col-span-6 relative z-10">
            <ProjectCard
              project={projects[4]}
              aspectRatio="aspect-square"
              size="small"
            />
          </div>
        )}
        {projects[5] && (
          <div className="md:col-span-6 relative z-10 md:mt-24">
            <ProjectCard
              project={projects[5]}
              aspectRatio="aspect-square"
              size="small"
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-32 mt-24 border-t border-charcoal/10 text-center">
        <span className="uppercase tracking-[0.15em] text-[11px] font-bold text-terracotta mb-8 block">
          Next Step
        </span>
        <h2 className="text-5xl md:text-8xl font-display mb-12 tracking-tighter leading-[0.95]">
          Let&apos;s build <br />
          <span className="italic text-terracotta">your legacy.</span>
        </h2>
        <Link
          href="/contact"
          className="text-2xl font-display italic link-underline"
        >
          Get in touch for new projects
        </Link>
      </div>
    </div>
  );
}
