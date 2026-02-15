import Link from "next/link";

export default function About() {
  return (
    <div className="pt-32 pb-16">
      {/* Background Decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          fill="none"
          viewBox="0 0 1440 4000"
        >
          <path
            className="opacity-20"
            d="M-50,300 C200,300 400,100 600,600 S900,1200 1200,800 S1500,400 1600,600"
            stroke="#C4785B"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          ></path>
        </svg>
      </div>

      <section className="relative px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 relative mt-12">
            <div className="relative z-20 border border-charcoal/10 shadow-[30px_30px_0px_0px_rgba(44,44,44,0.03)] p-4 bg-white">
              <img
                alt="Atmospheric portrait"
                className="w-full h-auto grayscale-[20%] sepia-[10%] object-cover aspect-[4/5]"
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=2669&auto=format&fit=crop"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-12 pt-12">
            <span className="uppercase tracking-[0.1em] text-[11px] font-bold text-terracotta mb-6 block">
              The Founder
            </span>
            <h1 className="text-6xl md:text-[7rem] lg:text-[8rem] font-display font-bold mb-12 tracking-tight leading-[0.95]">
              Behind <br />
              the{" "}
              <span className="italic font-normal text-terracotta">Pen.</span>
            </h1>
            <div className="max-w-[680px] space-y-8 font-serif text-lg md:text-xl text-charcoal/80 leading-[1.8]">
              <p>
                I believe that luxury isn&apos;t about excess; it&apos;s about
                the precision of choice. Based between the limestone cliffs of
                the Mediterranean and the historic libraries of London, I weave
                narratives for brands that prefer to whisper rather than shout.
              </p>
              <p>
                With a decade of experience in high-end editorial and travel
                copy, my work bridges the gap between commercial strategy and
                evocative storytelling. I don&apos;t just write descriptions; I
                build worlds where your guests already feel at home before
                they&apos;ve packed a single bag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-6">
            <h2 className="text-6xl md:text-8xl font-display mb-12">
              The <br />
              <span className="italic">Philosophy.</span>
            </h2>
            <div className="space-y-16">
              {[
                {
                  id: "01",
                  title: "Immersion",
                  desc: "Understanding the scent of the lobby, the weight of the silver, and the specific blue of the horizon.",
                },
                {
                  id: "02",
                  title: "Distillation",
                  desc: "Transforming sensory micro-moments into a clear, compelling brand voice that resonates.",
                },
                {
                  id: "03",
                  title: "Resonance",
                  desc: "Meticulous word-craft that ensures your message finds its way to the world\u2019s most discerning travelers.",
                },
              ].map((item) => (
                <div key={item.id} className="flex gap-8 items-start group">
                  <span className="text-5xl md:text-6xl font-display font-light text-terracotta/40 leading-none group-hover:text-terracotta transition-colors">
                    {item.id}
                  </span>
                  <div>
                    <h4 className="text-xl font-display mb-2 uppercase tracking-widest">
                      {item.title}
                    </h4>
                    <p className="font-sans text-charcoal/70 max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative">
              <img
                alt="Editorial details"
                className="w-3/4 ml-auto border border-charcoal/10 shadow-lg p-2 bg-white"
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2572&auto=format&fit=crop"
              />
              <img
                alt="Travel detail"
                className="absolute -bottom-12 left-0 w-1/2 border border-charcoal/10 shadow-lg p-2 bg-white z-30"
                src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2670&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="my-24 mx-6 md:mx-12 lg:mx-24">
        <div className="border-y border-charcoal/10 py-24 text-center relative bg-cream/50">
          <svg
            className="absolute top-10 right-10 w-24 opacity-30"
            viewBox="0 0 100 20"
          >
            <path
              d="M0,10 Q12.5,0 25,10 T50,10 T75,10 T100,10"
              fill="none"
              stroke="#C4785B"
              strokeWidth="2"
            ></path>
          </svg>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-display italic leading-relaxed text-charcoal/90">
              &ldquo;A storyteller who understands that the strongest narratives
              are often found in the quietest details.&rdquo;
            </h3>
          </div>
        </div>
      </section>

      <section className="py-36 px-8 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-display tracking-tight mb-12 leading-tight">
            Let&apos;s write the <br />
            <span className="italic text-terracotta">next chapter.</span>
          </h2>
          <div className="flex flex-col items-center">
            <Link
              href="/contact"
              className="text-3xl md:text-5xl font-display italic text-terracotta link-underline pb-1"
            >
              hello@alexandrav.co
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
