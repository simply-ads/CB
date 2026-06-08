import Link from "next/link";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import PdfViewerClient from "@/components/PdfViewerClient";
import MagazineViewerClient from "@/components/MagazineViewerClient";
import Accented from "@/components/Accented";
import { AnimatedNumber } from "@/components/HomeMotion";
import { paras } from "@/lib/text";

export async function generateStaticParams() {
  const projects = await reader.collections.projects.list();
  return projects.map((slug) => ({ slug }));
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);
  if (!project) notFound();

  const bodyLeft = paras(project.bodyLeft ?? project.summary);
  const bodyRight = paras(project.bodyRight);

  let nextTitle = "";
  if (project.nextProject) {
    const next = await reader.collections.projects.read(project.nextProject);
    if (next) nextTitle = next.title;
  }

  return (
    <article className="pt-8 case-study" data-feature-section>
      {/* ===== Header ===== */}
      <div className="feature cinematic-feature !bg-paper !pt-8 !pb-0">
        <div className="container">
          <div className="feature-eyebrow-wrap" data-reveal>
            <div className="feature-eyebrow">
              Case Study {project.number ?? "01"} · {project.category ?? "Travel content"}
            </div>
          </div>
          <h1 className="feature-title" data-reveal="headline">
            <Accented text={project.title} accent={project.titleAccent} />
          </h1>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-4 mt-10 fr-label text-[11px] tracking-[0.2em] uppercase text-ink-2" data-reveal>
            {project.client && (
              <div className="text-center">
                <span className="text-ink-3 block mb-1">Client</span>
                <span className="text-ink">{project.client}</span>
              </div>
            )}
            {project.scope && (
              <div className="text-center">
                <span className="text-ink-3 block mb-1">Scope</span>
                <span className="text-ink">{project.scope}</span>
              </div>
            )}
            {project.year && (
              <div className="text-center">
                <span className="text-ink-3 block mb-1">Year</span>
                <span className="text-ink font-mono normal-case tracking-normal">{project.year}</span>
              </div>
            )}
          </div>

          <figure className={`feature-cover ${project.mood ?? "ph-villa"}`} data-reveal="clip">
            <div className="scrim" />
            {project.featuredImage && <img src={project.featuredImage} alt={project.title} loading="eager" decoding="async" fetchPriority="high" />}
            <figcaption className="plate-label">
              <div className="tag">{project.plateTag ?? project.category}</div>
              <div className="name">{project.plateName ?? project.client ?? project.title}</div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* ===== Body ===== */}
      {(bodyLeft.length > 0 || bodyRight.length > 0 || project.pullQuote) && (
        <section className="section !pt-20">
          <div className="container">
            <div className="feature-body !mt-0" data-reveal>
              <div>
                {bodyLeft.map((para, i) => (
                  <p key={i} className={i === 0 ? "has-dropcap" : ""}>{para}</p>
                ))}
              </div>
              <div>
                {project.pullQuote && (
                  <blockquote className="feature-pull">&ldquo;{project.pullQuote}&rdquo;</blockquote>
                )}
                {bodyRight.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {project.stats && project.stats.length > 0 && (
              <div className="feature-numbers">
                {project.stats.map((s, i) => (
                  <div className="num" key={i} data-reveal>
                    <div className="n"><AnimatedNumber value={s.number} /></div>
                    <div className="l">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== Documents ===== */}
      {project.documents && project.documents.length > 0 && (
        <section className="section !pt-0">
          <div className="container">
            <div className="mb-12" data-reveal>
              <div className="eyebrow mb-4">The work</div>
              <h2 className="fr-display text-[clamp(36px,5vw,64px)] leading-[1.0]">Read the samples.</h2>
            </div>
            <div className="space-y-12">
              {project.documents.map(
                (doc, i) => {
                  const hasPages = (doc as any).pagesPath && (doc as any).pageCount;
                  if (!doc.file && !hasPages) return null;
                  return (
                    <div key={i} className="border border-[var(--rule-strong)] bg-paper-soft overflow-hidden" data-reveal="clip">
                      {hasPages ? (
                        <MagazineViewerClient
                          basePath={(doc as any).pagesPath}
                          pageCount={(doc as any).pageCount}
                          label={doc.label ?? "Document"}
                          downloadUrl={doc.file ?? undefined}
                        />
                      ) : (
                        <PdfViewerClient file={doc.file!} label={doc.label ?? "Document"} />
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== Testimonial ===== */}
      {project.testimonialQuote && (
        <section className="quote-section" data-quote-section data-reveal>
          <div className="container">
            <blockquote>
              <span className="opener">&ldquo;</span>
              {project.testimonialQuote}
            </blockquote>
            <cite>
              <b>{project.testimonialAuthor}</b>
              {project.testimonialRole}
            </cite>
          </div>
        </section>
      )}

      {/* ===== Closing nav ===== */}
      <section className="bg-ink text-paper py-28" data-reveal>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-8">
          {project.nextProject ? (
            <Link href={`/work/${project.nextProject}`} className="group">
              <div className="fr-label text-[11px] tracking-[0.22em] uppercase text-[rgba(246,247,243,0.55)] mb-3">
                Next case study
              </div>
              <div className="fr-headline text-[clamp(28px,4vw,48px)] leading-[1.05] text-paper group-hover:text-lemon transition-colors">
                {nextTitle || "Next project"} <span className="text-lemon">↗</span>
              </div>
            </Link>
          ) : (
            <div className="fr-headline text-[clamp(28px,4vw,48px)] text-paper">More work below.</div>
          )}
          <Link href="/work" className="btn btn--lemon shrink-0" style={{ background: "var(--color-lemon)", color: "var(--color-ink)" }}>
            All work <span className="arrow">↗</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
