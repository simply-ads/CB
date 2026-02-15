import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  slug: string;
}

interface ProjectCardProps {
  project: Project;
  aspectRatio: string;
  size: "small" | "medium" | "large";
  alignRight?: boolean;
}

export default function ProjectCard({
  project,
  aspectRatio,
  size,
  alignRight,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`block group cursor-pointer ${alignRight ? "text-right" : ""}`}
    >
      <div
        className={`overflow-hidden ${aspectRatio} mb-6 bg-charcoal/5 relative`}
      >
        <img
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          src={project.image}
        />
        <div className="absolute inset-0 bg-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      <div
        className={`${alignRight ? "ml-auto" : ""} ${size === "large" ? "max-w-2xl" : "max-w-md"}`}
      >
        <span className="text-[11px] uppercase tracking-[0.1em] font-bold text-terracotta block mb-3">
          {project.category}
        </span>
        <h3
          className={`${size === "large" ? "text-5xl md:text-6xl" : size === "medium" ? "text-3xl md:text-4xl" : "text-2xl"} font-display mb-4 link-underline inline-block`}
        >
          {project.title}
        </h3>
        <p
          className={`${size === "large" ? "text-lg" : "text-sm"} text-charcoal/60 font-light leading-relaxed`}
        >
          {project.description}
        </p>
      </div>
    </Link>
  );
}
