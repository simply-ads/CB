"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUp, X } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isCaseStudy = pathname.includes("/work/");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Work", path: "/work" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="relative min-h-screen bg-cream text-charcoal font-sans selection:bg-terracotta/20">
      {/* Background Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/felt.png')",
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500">
        <Link
          href="/"
          className="text-3xl font-display italic font-bold text-charcoal link-underline z-50 relative"
        >
          A.V.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 uppercase tracking-[0.1em] text-[11px] font-bold z-50">
          {isCaseStudy ? (
            <Link
              href="/work"
              className="group flex items-center space-x-4"
            >
              <span className="link-underline">Close Case Study</span>
              <span className="w-8 h-[1px] bg-charcoal/40 group-hover:w-12 transition-all duration-500 group-hover:bg-terracotta"></span>
            </Link>
          ) : (
            <>
              <Link
                href="/work"
                className={`link-underline hover:text-terracotta transition-colors ${pathname === "/work" ? "text-terracotta" : ""}`}
              >
                Work
              </Link>
              <Link
                href="/about"
                className={`link-underline hover:text-terracotta transition-colors ${pathname === "/about" ? "text-terracotta" : ""}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`link-underline hover:text-terracotta transition-colors ${pathname === "/contact" ? "text-terracotta" : ""}`}
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 text-charcoal hover:text-terracotta transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-cream z-40 flex items-center justify-center animate-fade-in">
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display italic hover:text-terracotta transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      {!isCaseStudy && (
        <footer className="relative z-10 py-12 border-t border-charcoal/5 px-6 md:px-12 lg:px-24 bg-cream">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em]">
            <div className="text-charcoal flex items-center gap-4">
              <span className="text-xl italic font-display lowercase tracking-normal">
                a.v.
              </span>
              <span>Editorial Heritage</span>
            </div>
            <div className="flex gap-8 md:gap-12">
              <a
                href="#"
                className="link-underline hover:text-terracotta transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="link-underline hover:text-terracotta transition-colors"
              >
                LinkedIn
              </a>
              <Link
                href="/work"
                className="link-underline hover:text-terracotta transition-colors"
              >
                Portfolio
              </Link>
            </div>
            <div className="text-charcoal/40">&copy; 2024 &bull; All Rights Reserved</div>
          </div>
        </footer>
      )}

      {/* Floating Scroll Top */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full border border-charcoal/10 bg-cream/80 backdrop-blur-sm text-charcoal flex items-center justify-center hover:bg-terracotta hover:text-cream hover:border-terracotta transition-all duration-500 shadow-lg group"
        >
          <ArrowUp
            size={16}
            className="group-hover:-translate-y-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
}
