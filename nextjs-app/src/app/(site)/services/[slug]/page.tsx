import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reader } from "@/lib/reader";
import Accented from "@/components/Accented";
import IncludedAccordion from "@/components/IncludedAccordion";
import { HeroAtmosphere } from "@/components/HomeMotion";
import { paras } from "@/lib/text";

export async function generateStaticParams() {
  const services = await reader.collections.services.list();
  return services.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await reader.collections.services.read(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — Away With Words`,
    description: service.summary ?? undefined,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await reader.collections.services.read(slug);
  if (!service) notFound();

  const order = String((service.sortOrder ?? 0) + 1).padStart(2, "0");
  const intro = paras(service.intro);
  const body = paras(service.body);
  const included = (service.included ?? []).filter((x) => x && x.title);

  // Resolve related projects
  const relatedSlugs = (service.relatedProjects ?? []).filter(Boolean) as string[];
  const related = (
    await Promise.all(
      relatedSlugs.map(async (s) => {
        const p = await reader.collections.projects.read(s);
        return p ? { slug: s, ...p } : null;
      })
    )
  ).filter(Boolean) as Array<{ slug: string } & NonNullable<Awaited<ReturnType<typeof reader.collections.projects.read>>>>;

  return (
    <article>
      {/* ===== Header ===== */}
      <section className="feature subpage-hero !bg-paper !pt-24 !pb-0" data-hero-section>
        <HeroAtmosphere />
        <div className="container">
          <div className="feature-eyebrow-wrap" data-reveal>
            <div className="feature-eyebrow">
              {service.eyebrow ?? "Service"} · {order}
            </div>
          </div>
          <h1 className="feature-title" data-reveal="headline">
            <Accented text={service.title} accent={service.titleAccent} />
          </h1>
          {intro.length > 0 && (
            <div className="max-w-[760px] mx-auto mt-10 text-center" data-reveal>
              {intro.map((p, i) => (
                <p key={i} className="fr-subhead text-[22px] leading-[1.5] text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Body + What's included ===== */}
      <section className="section !pt-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">
            <div data-reveal>
              {body.map((p, i) => (
                <p key={i} className="fr-body text-[18px] leading-[1.68] text-ink mb-5">
                  {i === 0 && <span className="dropcap">{p[0]}</span>}
                  {i === 0 ? p.slice(1) : p}
                </p>
              ))}
            </div>

            {included.length > 0 && (
              <aside data-reveal>
                <div className="eyebrow mb-6">What&apos;s included</div>
                <IncludedAccordion items={included} />
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* ===== Related work ===== */}
      {related.length > 0 && (
        <section className="feature">
          <div className="container">
            <div className="section-head !mb-16" data-reveal>
              <div className="toc-ref">
                <b>Related work</b>
                {related.length} {related.length === 1 ? "case" : "cases"}
              </div>
              <div>
                <h2>Seen it <em>in the wild</em>.</h2>
              </div>
            </div>
            <div className="work-grid">
              {related.slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="work-card work--sm" data-reveal="clip">
                  <div className={`work-photo ${p.mood ?? "ph-villa"}`}>
                    <div className="scrim" />
                    {p.featuredImage ? (
                      <img src={p.featuredImage} alt={p.title} loading="lazy" decoding="async" />
                    ) : (
                      <div className="placeholder">
                        <div>
                          <div className="tag">{p.plateTag ?? p.category}</div>
                          <div className="name">{p.plateName ?? p.client ?? p.title}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="work-caption">
                    <span>{p.client ? `${p.client} · ${p.category ?? ""}` : p.category}</span>
                    <span className="year">{p.year}</span>
                  </div>
                  <div className="work-title">
                    <Accented text={p.title} accent={p.titleAccent} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="bg-ink text-paper py-28" data-reveal>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-8">
          <h2 className="fr-display text-[clamp(32px,4.6vw,60px)] leading-[1.0] text-paper max-w-[640px]">
            {service.ctaHeading ?? "Need this? Let's talk."}
          </h2>
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/services" className="fr-label text-[11px] tracking-[0.2em] uppercase text-[rgba(246,247,243,0.7)] hover:text-lemon transition-colors">
              ← All services
            </Link>
            <Link href="/contact" className="btn" style={{ background: "var(--color-lemon)", color: "var(--color-ink)" }}>
              Start a project <span className="arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
