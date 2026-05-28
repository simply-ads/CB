import Link from "next/link";
import { reader } from "@/lib/reader";
import Accented from "@/components/Accented";
import { paras } from "@/lib/text";

export default async function About() {
  const about = await reader.singletons.about.read();

  const body = paras(about?.body);
  const principles =
    about?.principles && about.principles.length > 0
      ? about.principles
      : [
          { title: "Read the reader", description: "What travellers need at each stage — inspiration, reassurance, logistics, trust — and the words that move them on." },
          { title: "Earn every claim", description: "Numbers, client names and real verbs. Specifics build credibility; adjectives don't." },
          { title: "Respect the time", description: "Short where short works, long only when there's substance. No buzzwords, no filler." },
        ];

  return (
    <>
      <section className="about-section !pt-28">
        <div className="container">
          <div className="about-grid">
            <div>
              <figure className="about-portrait">
                <div className="scrim" />
                {about?.portraitImage && <img src={about.portraitImage} alt="Claire Webb" />}
                <figcaption className="plate-label">
                  <div className="tag">{about?.portraitTag ?? "Portrait · The writer"}</div>
                  <div className="name">{about?.portraitName ?? "On assignment"}</div>
                </figcaption>
              </figure>
              {about?.portraitCredit && <div className="about-credit">{about.portraitCredit}</div>}
            </div>

            <div className="about-text">
              <div className="eyebrow eyebrow--rule mb-7">{about?.eyebrow ?? "About"}</div>
              <h2 className="fr-display text-[clamp(40px,5.5vw,76px)] leading-[0.98] tracking-[-0.018em]">
                <Accented
                  text={about?.headline ?? "I get travel, and I can help you sell it."}
                  accent={about?.headlineAccent ?? "sell it"}
                />
              </h2>
              {(body.length ? body : [
                "I know how people travel, what they're looking for, and what makes them book.",
              ]).map((para, i) => (
                <p key={i} className={i === 0 ? "has-dropcap" : ""}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / principles */}
      <section className="feature">
        <div className="container">
          <div className="feature-eyebrow-wrap"><div className="feature-eyebrow">How I work</div></div>
          <h2 className="feature-title">The brief stays the same. <em>Read, then book.</em></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-10 border-t border-ink">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-col gap-4">
                <span className="font-mono text-[13px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="fr-subhead text-[26px] leading-[1.1] text-ink">{p.title}</h4>
                <p className="fr-body text-[16px] leading-[1.6] text-ink-2 m-0">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section text-center">
        <div className="container">
          <h2 className="fr-display text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-[-0.018em] mb-10">
            Let&apos;s make your next thing <em>worth reading</em>.
          </h2>
          <Link href="/contact" className="btn btn--azure">Start a project <span className="arrow">↗</span></Link>
        </div>
      </section>
    </>
  );
}
