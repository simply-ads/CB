import Link from "next/link";
import { reader } from "@/lib/reader";
import Accented from "@/components/Accented";

const SIZE_CYCLE = ["work--lg", "work--md", "work--sm", "work--wide", "work--sm", "work--sm", "work--wide", "work--md"];

export default async function Work() {
  const allProjects = await reader.collections.projects.all();
  const projects = allProjects.sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0));

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-head">
          <div className="toc-ref"><b>Work Gallery</b>2014 — 2026</div>
          <div>
            <h2>
              Selected <em>editorial</em>, measured in bookings and sign-ups.
            </h2>
            <p className="mt-6 fr-body text-[16px] leading-[1.6] text-ink-2 max-w-[460px]">
              A curated set of brand narratives, customer magazines, market reports and verbal
              identities for travel and tourism brands across the world.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="work-grid">
          {projects.map((p, i) => {
            const e = p.entry;
            const size = e.featuredSize || SIZE_CYCLE[i % SIZE_CYCLE.length] || "work--md";
            const showDek = (size === "work--lg" || size === "work--wide") && !!e.summary;
            return (
              <Link key={p.slug} href={`/work/${p.slug}`} className={`work-card ${size}`}>
                <div className={`work-photo ${e.mood ?? "ph-villa"}`}>
                  <div className="scrim" />
                  {e.featuredImage ? (
                    <img src={e.featuredImage} alt={e.title} />
                  ) : (
                    <div className="placeholder">
                      <div>
                        <div className="tag">{e.plateTag ?? e.category}</div>
                        <div className="name">{e.plateName ?? e.client ?? e.title}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="work-caption">
                  <span>{e.client ? `${e.client} · ${e.category ?? ""}` : e.category}</span>
                  <span className="year">{e.year}</span>
                </div>
                <div className="work-title">
                  <Accented text={e.title} accent={e.titleAccent} />
                </div>
                {showDek && (
                  <div className="work-dek">
                    <Accented text={e.summary!} accent={e.summaryAccent} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-32 pt-20 border-t border-[var(--rule)] text-center">
          <div className="eyebrow mb-6 justify-center">Next step</div>
          <h2 className="fr-display text-[clamp(40px,6vw,80px)] leading-[0.98] tracking-[-0.018em] mb-10">
            Let&apos;s make your next thing <em>worth reading</em>.
          </h2>
          <Link href="/contact" className="btn btn--azure">Start a project <span className="arrow">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
