import { reader } from "@/lib/reader";
import Accented from "@/components/Accented";

export default async function Contact() {
  const contact = await reader.singletons.contact.read();
  const email = contact?.email ?? "claire@clairewebb.co.uk";

  return (
    <section className="contact !pt-32 min-h-[70vh] flex items-center">
      <div className="container w-full">
        <div className="contact-grid">
          <div>
            <div className="eyebrow eyebrow--rule mb-7">{contact?.eyebrow ?? "Start a project"}</div>
            <h2 className="fr-display text-[clamp(44px,6.4vw,96px)] leading-[0.96] tracking-[-0.02em]">
              <Accented
                text={contact?.headline ?? "A travel content specialist who makes your life significantly easier."}
                accent={contact?.headlineAccent ?? "makes your life significantly easier"}
              />
            </h2>
            <p className="sub">
              {contact?.body ??
                "Tell me roughly what you need. Rough scope is fine — I reply within two working days with whether I can help, a rate, and the next sensible step."}
            </p>
          </div>

          <div className="contact-card">
            <div className="row">
              <span className="k">Write to</span>
              <span className="v"><a href={`mailto:${email}`}>{email}</a></span>
            </div>
            <div className="row">
              <span className="k">Based in</span>
              <span className="v"><Accented text={contact?.basedIn ?? "UK · working worldwide"} accent="UK" /></span>
            </div>
            <div className="row">
              <span className="k">Response</span>
              <span className="v">{contact?.response ?? "Within two working days"}</span>
            </div>
            <div className="row">
              <span className="k">Currently</span>
              <span className="v"><Accented text={contact?.availability ?? "Booking Q3 2026"} accent="Q3 2026" /></span>
            </div>
            <a className="btn btn--azure mt-6 w-full justify-center" href={`mailto:${email}`}>
              Send a brief <span className="arrow">↗</span>
            </a>
            {contact?.linkedinUrl && (
              <a className="block mt-4 text-center fr-label text-[11px] tracking-[0.2em] uppercase text-ink-2 hover:text-azure transition-colors" href={contact.linkedinUrl}>
                Or find me on LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
