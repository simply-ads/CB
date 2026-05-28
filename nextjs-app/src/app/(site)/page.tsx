import Link from "next/link";
import { reader } from "@/lib/reader";
import IllustrationBand from "@/components/IllustrationBand";
import Accented from "@/components/Accented";
import { paras } from "@/lib/text";

const SIZE_CYCLE = ["work--lg", "work--md", "work--sm", "work--sm", "work--sm", "work--wide", "work--wide"];

export default async function Home() {
  const home = await reader.singletons.homepage.read();
  const feature = await reader.singletons.featuredCase.read();
  const allProjects = await reader.collections.projects.all();

  const featured = allProjects
    .filter((p) => p.entry.featured)
    .sort((a, b) => (a.entry.sortOrder ?? 0) - (b.entry.sortOrder ?? 0));

  const heroPhotos =
    home?.heroPhotos && home.heroPhotos.length > 0
      ? home.heroPhotos
      : [
          { tag: "Jordan · Day tours", name: "The road to Petra", mood: "ph-petra" },
          { tag: "New York · City walks", name: "Uptown", mood: "ph-nyc" },
          { tag: "Caribbean · Sailing", name: "At anchor", mood: "ph-carib" },
        ];

  const clients =
    home?.clients && home.clients.length > 0
      ? home.clients
      : [
          { name: "Intrepid Travel", emphasis: false },
          { name: "Atlas Obscura", emphasis: false },
          { name: "Kyero", emphasis: true },
          { name: "Vintage Travel", emphasis: false },
          { name: "NYT Journeys", emphasis: false },
          { name: "Cruise Nation", emphasis: false },
          { name: "Tourpreneur", emphasis: true },
          { name: "Urban Adventures", emphasis: false },
        ];

  const services =
    home?.services && home.services.length > 0
      ? home.services
      : [
          { title: "Website & destination copy.", accent: "destination", dek: "Landing pages, destination guides, hotel and experience descriptions written to inspire and convert.", link: "" },
          { title: "Magazines & print editorial.", accent: "print editorial", dek: "Customer magazines, lookbooks, 50–150pp buying guides — the work most freelancers can't credibly pitch for.", link: "" },
          { title: "B2B reports & lead generation.", accent: "lead generation", dek: "Market reports, white papers, by-lines, sales-enablement content. Position you as the authority.", link: "" },
          { title: "Podcasts & interview content.", accent: "interview content", dek: "Series concept, editorial planning, interviewing as a service, episode scripting and repurposing.", link: "" },
          { title: "Strategy, audits & training.", accent: "training", dek: "Content audits, editorial planning, SEO-informed calendars, and travel copywriting workshops.", link: "" },
        ];

  const featureNumbers =
    feature?.numbers && feature.numbers.length > 0
      ? feature.numbers
      : [
          { number: "+22%", label: "Increase in bookings post-mailing" },
          { number: "8,000", label: "Copies printed and mailed to customers" },
          { number: "150pp", label: "Of original editorial — end to end" },
          { number: "04", label: "Countries covered in depth" },
        ];

  const featBodyLeft = paras(feature?.bodyLeft);
  const featBodyRight = paras(feature?.bodyRight);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-20" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--rule mb-8">{home?.heroEyebrow ?? "Freelance travel content marketing"}</div>
          <h1
            className="fr-display text-[clamp(56px,7.4vw,116px)] leading-[0.98] tracking-[-0.02em] text-ink max-w-[1160px]"
            style={{ textWrap: "balance" }}
          >
            <Accented
              text={home?.heroHeadline ?? "Travel content that feels like the good old days of going somewhere — and still gets them to book."}
              accent={home?.heroAccent ?? "good old days"}
            />
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-[72px] mt-13 pt-8 border-t border-ink items-start" style={{ marginTop: 52 }}>
            <div>
              <div className="eyebrow--ink eyebrow mb-3">{home?.standfirstLeftLabel ?? "By the writer"}</div>
              <p className="fr-subhead text-[21px] leading-[1.5] text-ink m-0">
                <span className="dropcap">{(home?.standfirstLeft ?? "I")[0]}</span>
                {(home?.standfirstLeft ?? "I'm a freelance content marketing consultant for travel and tourism brands of every shape — a day-tour operator in Jordan, a New York walking-tour company, a European villa collection, a Caribbean sailing line. I write, plan and produce content for them: website copy, customer magazines, market reports, podcasts, lead magnets.").slice(1)}
              </p>
            </div>
            <div>
              <div className="eyebrow--ink eyebrow mb-3">{home?.standfirstRightLabel ?? "The brief, always"}</div>
              <p className="fr-subhead text-[21px] leading-[1.5] text-ink m-0">
                <Accented
                  text={home?.standfirstRight ?? "Whatever the format or the destination, the brief stays the same. Make the place feel enchanting, glamorous and worth the journey — then make it easy to book. Words that get read, and words that get acted on."}
                  accent="enchanting, glamorous and worth the journey"
                />
              </p>
              <div className="mt-7 flex gap-3 flex-wrap items-center">
                <Link href="/contact" className="btn btn--azure">Start a project <span className="arrow">↗</span></Link>
                <Link href="/work" className="btn btn--ghost">See the selected work</Link>
              </div>
            </div>
          </div>

          {/* Hero photo row */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-4 mt-[72px]">
            {heroPhotos.slice(0, 3).map((p, i) => (
              <figure
                key={i}
                className={`photo ${p.mood ?? "ph-villa"} m-0 ${i === 0 ? "aspect-[5/4]" : "aspect-[3/4]"}`}
              >
                <div className="scrim" />
                <figcaption className="plate-label">
                  <div className="tag">{p.tag}</div>
                  <div className="name">{p.name}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ILLUSTRATION BAND ===== */}
      <div className="mt-24">
        <IllustrationBand />
      </div>

      {/* ===== FEATURED-IN ===== */}
      <section className="featured-in">
        <div className="container inner">
          <div className="label">{home?.clientsLabel ?? "Selected clients, 2014 – 2026"}</div>
          <div className="clients">
            {clients.map((c, i) => (
              <span key={i}>{c.emphasis ? <em>{c.name}</em> : c.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORK PREVIEW ===== */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head">
            <div className="toc-ref"><b>The Portfolio</b>{home?.workCount ?? "06 of 40+"}</div>
            <div>
              <h2>
                <Accented
                  text={home?.workHeadline ?? "Selected work — measured in bookings, enquiries and sign-ups."}
                  accent={home?.workAccent ?? "measured"}
                />
              </h2>
            </div>
          </div>

          <div className="work-grid">
            {featured.slice(0, 7).map((p, i) => {
              const e = p.entry;
              const size = e.featuredSize || SIZE_CYCLE[i] || "work--md";
              const showDek = size === "work--lg" || size === "work--wide";
              return (
                <Link key={p.slug} href={`/work/${p.slug}`} className={`work-card ${size}`}>
                  <div className={`work-photo ${e.mood ?? "ph-villa"}`}>
                    <div className="scrim" />
                    {e.featuredImage && <img src={e.featuredImage} alt={e.title} />}
                    {!e.featuredImage && (
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
                  {showDek && e.summary && (
                    <div className="work-dek">
                      <Accented text={e.summary} accent={e.summaryAccent} />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED CASE ===== */}
      <section className="feature">
        <div className="container">
          <div className="feature-eyebrow-wrap"><div className="feature-eyebrow">{feature?.eyebrow ?? "Feature · Plate 01"}</div></div>
          <h2 className="feature-title">
            <Accented
              text={feature?.title ?? "The villa magazine that brought back 22% more bookings."}
              accent={feature?.titleAccent ?? "22% more bookings"}
            />
          </h2>

          <figure className={`feature-cover ${feature?.coverMood ?? "ph-azure"}`}>
            <div className="scrim" />
            <figcaption className="plate-label">
              <div className="tag">{feature?.coverTag ?? "Vintage Travel · Magazine · 150pp"}</div>
              <div className="name">{feature?.coverName ?? "Contents spread"}</div>
            </figcaption>
          </figure>

          <div className="feature-body">
            <div>
              {(featBodyLeft.length ? featBodyLeft : [
                "Vintage Travel asked for a customer magazine that would inspire existing customers to book again — without ever feeling like a sales brochure.",
              ]).map((para, i) => (
                <p key={i} className={i === 0 ? "has-dropcap" : ""}>{para}</p>
              ))}
            </div>
            <div>
              <blockquote className="feature-pull">
                &ldquo;{feature?.pull ?? "The aim was to spark ideas, build trust and gently guide readers towards booking. The magazine did all three — and Vintage saw bookings rise 22% in the months that followed."}&rdquo;
              </blockquote>
              {(featBodyRight.length ? featBodyRight : []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="feature-numbers">
            {featureNumbers.map((n, i) => (
              <div className="num" key={i}>
                <div className="n">{n.number}</div>
                <div className="l">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES TOC ===== */}
      <section className="toc-section" id="services">
        <div className="container">
          <h2>{home?.servicesTitle ?? "The contents."}</h2>
          <div className="toc-meta">{home?.servicesMeta ?? "Five things I'm good at — and a few I won't pretend to be"}</div>
          <div className="toc-list">
            {services.map((s, i) => {
              const Inner = (
                <>
                  <div className="n">{String(i + 1).padStart(2, "0")}</div>
                  <div className="title"><Accented text={s.title} accent={s.accent} /></div>
                  <div className="dek">{s.dek}</div>
                  <div className="page">↗</div>
                </>
              );
              return s.link ? (
                <Link key={i} href={s.link} className="toc-item">{Inner}</Link>
              ) : (
                <div key={i} className="toc-item">{Inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section className="quote-section">
        <svg className="quote-deco" style={{ top: 28, right: 48 }} width="170" height="170" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 22 L 61 50 L 50 78 L 39 50 Z" />
          <line x1="50" y1="6" x2="50" y2="14" /><line x1="50" y1="86" x2="50" y2="94" />
          <line x1="6" y1="50" x2="14" y2="50" /><line x1="86" y1="50" x2="94" y2="50" />
        </svg>
        <div className="container">
          <blockquote>
            <span className="opener">&ldquo;</span>
            <Testimonial
              quote={home?.testimonialQuote ?? "Claire is a one-woman content swiss army knife. She overhauled our advice articles and location guides, producing journalistic-quality pieces that drove a tenfold increase in traffic."}
              highlight={home?.testimonialHighlight ?? "tenfold increase in traffic."}
            />
          </blockquote>
          <cite>
            <b>{home?.testimonialAuthor ?? "Jennifer Down"}</b>
            {home?.testimonialRole ?? "Performance Marketing Manager · Kyero"}
          </cite>
        </div>
      </section>
    </>
  );
}

function Testimonial({ quote, highlight }: { quote: string; highlight?: string | null }) {
  if (!highlight) return <>{quote}</>;
  const idx = quote.indexOf(highlight);
  if (idx === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, idx)}
      <b>{highlight}</b>
      {quote.slice(idx + highlight.length)}
    </>
  );
}
