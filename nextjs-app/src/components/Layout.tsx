"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowUp, X } from "lucide-react";
import HomeMotion from "./HomeMotion";

const navLinks = [
  { label: "Selected Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/work/");

  const scrollToTop = () => window.dispatchEvent(new Event("editorial-scroll-top"));

  return (
    <div className="d2 relative min-h-screen">
      <HomeMotion />

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 bg-paper border-b border-[var(--rule)] py-[22px]">
        <div className="container grid grid-cols-[auto_1fr_auto] items-center gap-10">
          <Link href="/" className="relative" aria-label="Away With Words — home">
            <Image
              src="/images/logos/web/header-lockup.png"
              alt="Away With Words"
              width={1400}
              height={350}
              className="logo-header"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex gap-7 justify-center fr-label text-[12px] tracking-[0.18em] uppercase">
            {isCaseStudy ? (
              <Link href="/work" className="text-ink hover:text-azure transition-colors inline-flex items-center gap-3 whitespace-nowrap">
                <span aria-hidden>←</span> Close case study
              </Link>
            ) : (
              navLinks.map((link) => {
                const active = pathname === link.path || pathname.startsWith(link.path + "/");
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`whitespace-nowrap py-1.5 relative transition-colors hover:text-azure ${active ? "text-azure" : "text-ink"}`}
                  >
                    {link.label}
                    {active && <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-azure" />}
                  </Link>
                );
              })
            )}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden xl:inline-flex items-center gap-2.5 fr-label text-[12px] tracking-[0.18em] uppercase text-ink border-b border-ink pb-1 hover:text-azure hover:border-azure transition-colors"
          >
            Start a project <span className="not-italic text-base translate-y-px text-azure">↗</span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden justify-self-end relative text-ink hover:text-azure transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ===== Department rule ===== */}
      {!isCaseStudy && (
        <div className="border-b border-[var(--rule)] py-3.5 fr-label text-[11px] tracking-[0.2em] uppercase text-ink-2">
          <div className="container flex justify-between items-center gap-6">
            <div className="hidden sm:block">Vol. XII · No. 04 · 2026</div>
            <div className="flex items-center gap-3 text-azure">
              <Image
                src="/images/logos/web/emblem-96.png"
                alt=""
                width={18}
                height={18}
                aria-hidden
              />
              Words that get read, and acted on
            </div>
            <div className="hidden md:block">
              Travel content · marketing <span className="text-ink-3 ml-3.5">Est. 2014</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== Mobile menu ===== */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-paper z-40 flex items-center justify-center">
          <nav className="flex flex-col items-center gap-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="fr-display text-4xl text-ink hover:text-azure transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn--azure mt-4"
            >
              Start a project <span className="arrow">↗</span>
            </Link>
          </nav>
        </div>
      )}

      {/* ===== Main ===== */}
      <main className="relative">{children}</main>

      {/* ===== Footer ===== */}
      {!isCaseStudy && (
        <footer className="bg-ink text-paper pt-20 pb-8">
          <div className="container">
            <div className="pb-14 border-b border-[rgba(246,247,243,0.18)] text-center">
              <Link href="/" className="logo-footer-link" aria-label="Away With Words — home">
                <Image
                  src="/images/logos/web/footer-lockup.png"
                  alt="Away With Words"
                  width={1600}
                  height={533}
                  className="logo-footer"
                />
              </Link>
              <div className="mt-[18px] fr-label text-[11px] tracking-[0.26em] uppercase text-[rgba(246,247,243,0.55)]">
                Travel Content · Planned, Written &amp; Edited · 2014 — 2026
              </div>
            </div>

            <div className="pt-14 grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
              <p className="col-span-2 md:col-span-1 italic fr-subhead text-[23px] leading-[1.3] tracking-[-0.01em] text-paper max-w-[400px] m-0">
                Smart, practical travel content.{" "}
                <span className="not-italic text-lemon fr-display">No gloss. No filler.</span>{" "}
                Just words that respect the reader&apos;s time.
              </p>
              <div>
                <h4 className="fr-label text-[10.5px] tracking-[0.22em] uppercase text-[rgba(246,247,243,0.5)] mb-4">Site</h4>
                <Link href="/work" className="block py-1 text-paper hover:text-lemon transition-colors text-base">Work</Link>
                <Link href="/services" className="block py-1 text-paper hover:text-lemon transition-colors text-base">Services</Link>
                <Link href="/about" className="block py-1 text-paper hover:text-lemon transition-colors text-base">About</Link>
                <Link href="/contact" className="block py-1 text-paper hover:text-lemon transition-colors text-base">Contact</Link>
              </div>
              <div>
                <h4 className="fr-label text-[10.5px] tracking-[0.22em] uppercase text-[rgba(246,247,243,0.5)] mb-4">Elsewhere</h4>
                <a href="#" className="block py-1 text-paper hover:text-lemon transition-colors text-base">LinkedIn</a>
                <a href="#" className="block py-1 text-paper hover:text-lemon transition-colors text-base">Substack</a>
                <a href="#" className="block py-1 text-paper hover:text-lemon transition-colors text-base">Companion</a>
              </div>
              <div>
                <h4 className="fr-label text-[10.5px] tracking-[0.22em] uppercase text-[rgba(246,247,243,0.5)] mb-4">Currently</h4>
                <span className="block py-1 text-paper text-base">Booking Q3 &rsquo;26</span>
                <span className="block py-1 text-paper text-base">Two slots open</span>
              </div>
            </div>

            <div className="mt-14 pt-6 border-t border-[rgba(246,247,243,0.18)] flex flex-col sm:flex-row justify-between gap-4 font-mono text-[11px] tracking-[0.04em] text-[rgba(246,247,243,0.5)]">
              <span>© 2026 Claire Webb · Sole trader · UK</span>
              <span>Set in Fraunces</span>
              <span>Direction 02 · Grand Tour</span>
            </div>
          </div>
        </footer>
      )}

      {/* ===== Scroll to top ===== */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 border border-[var(--rule-strong)] bg-paper text-ink flex items-center justify-center hover:bg-azure hover:text-paper hover:border-azure transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
