"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

type AnimatedNumberProps = {
  value: string;
  className?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function parseNumber(value: string) {
  const match = value.match(/^([^0-9+-]*)([+-]?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numeric, suffix] = match;
  const clean = numeric.replace(/,/g, "");
  const number = Number(clean);
  if (!Number.isFinite(number)) return null;

  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const minIntegerDigits = clean.startsWith("0") ? clean.length : 1;

  return {
    prefix,
    number,
    suffix,
    decimals,
    minIntegerDigits,
    useGrouping: numeric.includes(","),
    forcePlus: numeric.startsWith("+"),
  };
}

function formatNumber(
  number: number,
  options: ReturnType<typeof parseNumber>,
) {
  if (!options) return "";

  const formatted = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: options.decimals,
    maximumFractionDigits: options.decimals,
    minimumIntegerDigits: options.minIntegerDigits,
    useGrouping: options.useGrouping,
  }).format(number);

  const sign = options.forcePlus && number > 0 ? "+" : "";

  return `${options.prefix}${sign}${formatted}${options.suffix}`;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseNumber(value);
    const node = ref.current;

    if (!parsed || !node || prefersReducedMotion()) return;

    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      const start = performance.now();
      const duration = 1300;
      const from = parsed.number >= 0 ? 0 : parsed.number;
      const to = parsed.number;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = from + (to - from) * eased;
        setDisplay(formatNumber(next, parsed));

        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden>
      <div className="hero-atmosphere__field" />
      <div className="hero-atmosphere__grain" />
    </div>
  );
}

export function JourneyRoute() {
  return (
    <svg
      className="journey-route"
      viewBox="0 0 960 1120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        className="journey-route__ghost"
        d="M168 20 C760 98 182 256 712 378 C1010 448 88 538 416 676 C724 806 254 882 788 1092"
      />
      <path
        id="journey-route-path"
        className="journey-route__path"
        d="M168 20 C760 98 182 256 712 378 C1010 448 88 538 416 676 C724 806 254 882 788 1092"
      />
      <g id="journey-traveller" className="journey-route__traveller">
        <path d="M0 -15 L38 0 L0 15 L8 2 L-16 2 L-16 -2 L8 -2 Z" />
      </g>
    </svg>
  );
}

export default function HomeMotion() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const root = document.documentElement;
    const isRouteChange = previousPathname.current !== pathname;
    previousPathname.current = pathname;
    const reduce = prefersReducedMotion();
    const saveData =
      "connection" in navigator &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData,
      );
    root.classList.add("motion-ready");
    root.classList.remove("route-arriving");

    let initialCurtainStartTimer = 0;
    let initialCurtainCompleteTimer = 0;
    let initialCurtainFallbackTimer = 0;
    let isCancelled = false;
    const completeInitialCurtain = () => {
      root.classList.remove("initial-curtain-leaving");
      root.classList.add("initial-curtain-complete");
    };
    const leaveInitialCurtain = () => {
      if (
        root.classList.contains("initial-curtain-complete") ||
        root.classList.contains("initial-curtain-leaving")
      ) {
        return;
      }

      root.classList.add("initial-curtain-leaving");
      initialCurtainCompleteTimer = window.setTimeout(
        completeInitialCurtain,
        620,
      );
    };
    const resetIncompleteInitialCurtain = () => {
      if (!root.classList.contains("initial-curtain-complete")) {
        root.classList.remove("initial-curtain-leaving");
      }
    };

    if (reduce || saveData) {
      completeInitialCurtain();
    } else if (!root.classList.contains("initial-curtain-complete")) {
      initialCurtainFallbackTimer = window.setTimeout(
        leaveInitialCurtain,
        1400,
      );
      void document.fonts.ready.then(() => {
        if (isCancelled) return;
        window.clearTimeout(initialCurtainFallbackTimer);
        initialCurtainStartTimer = window.setTimeout(leaveInitialCurtain, 120);
      });
    }

    const routeFrame = isRouteChange && root.classList.contains("initial-curtain-complete")
      ? requestAnimationFrame(() => {
          root.classList.add("route-arriving");
        })
      : 0;
    const routeTimer = routeFrame
      ? window.setTimeout(() => {
          root.classList.remove("route-arriving");
        }, 820)
      : 0;
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    window.addEventListener("editorial-scroll-top", scrollToTop);

    if (reduce || saveData) {
      root.classList.add("motion-reduced");
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
      return () => {
        isCancelled = true;
        cancelAnimationFrame(routeFrame);
        window.clearTimeout(initialCurtainStartTimer);
        window.clearTimeout(initialCurtainCompleteTimer);
        window.clearTimeout(initialCurtainFallbackTimer);
        window.clearTimeout(routeTimer);
        resetIncompleteInitialCurtain();
        window.removeEventListener("editorial-scroll-top", scrollToTop);
        root.classList.remove("motion-ready", "motion-reduced");
      };
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.16 },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInitiallyVisible =
          rect.bottom >= 0 && rect.top <= window.innerHeight * 0.92;

        if (isInitiallyVisible) {
          el.classList.add("is-visible");
        } else {
          revealObserver.observe(el);
        }
      });

    const hero = document.querySelector<HTMLElement>("[data-hero-section]");
    const quote = document.querySelector<HTMLElement>("[data-quote-section]");
    const journey = document.querySelector<HTMLElement>("[data-journey-section]");
    const feature = document.querySelector<HTMLElement>("[data-feature-section]");
    const path = document.querySelector<SVGPathElement>("#journey-route-path");
    const traveller = document.querySelector<SVGGElement>("#journey-traveller");
    const band = document.querySelector<HTMLElement>(".illus-band");
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn"));
    const activeSections = new Set<Element>();
    const motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-motion-active", entry.isIntersecting);
          if (entry.isIntersecting) {
            activeSections.add(entry.target);
          } else {
            activeSections.delete(entry.target);
          }
        });
        requestUpdate();
      },
      { rootMargin: "28% 0px" },
    );

    [hero, quote, journey, feature, band].forEach((section) => {
      if (section) motionObserver.observe(section);
    });

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let frame = 0;
    let routeLength = 0;

    const setPointerVars = (target: HTMLElement, event: PointerEvent) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      target.style.setProperty("--pointer-x", x.toFixed(3));
      target.style.setProperty("--pointer-y", y.toFixed(3));
    };

    const heroPointer = (event: PointerEvent) => {
      if (hero) setPointerVars(hero, event);
    };
    const quotePointer = (event: PointerEvent) => {
      if (quote) setPointerVars(quote, event);
    };

    hero?.addEventListener("pointermove", heroPointer);
    quote?.addEventListener("pointermove", quotePointer);

    const buttonCleanups = buttons.map((button) => {
      const move = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.setProperty("--mag-x", `${x * 0.12}px`);
        button.style.setProperty("--mag-y", `${y * 0.18}px`);
      };
      const leave = () => {
        button.style.removeProperty("--mag-x");
        button.style.removeProperty("--mag-y");
      };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", leave);
      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", leave);
      };
    });

    const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

    const updateRoute = (progress: number) => {
      if (!path || !traveller) return;

      const length = routeLength || path.getTotalLength();
      routeLength = length;
      const eased = clamp(progress);
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length * (1 - eased)}`;

      const point = path.getPointAtLength(length * eased);
      const next = path.getPointAtLength(length * clamp(eased + 0.01));
      const angle =
        (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;

      traveller.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle})`,
      );
    };

    const updateScrollEffects = (now: number) => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastY;
      const dt = Math.max(now - lastTime, 16);

      velocity = velocity * 0.84 + (delta / dt) * 90 * 0.16;
      if (hero && activeSections.has(hero)) {
        const rect = hero.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(rect.height, 1));
        hero.style.setProperty("--hero-progress", progress.toFixed(3));
      }

      if (feature && activeSections.has(feature)) {
        const rect = feature.getBoundingClientRect();
        const progress = clamp(
          (window.innerHeight * 0.72 - rect.top) /
            Math.max(rect.height + window.innerHeight * 0.2, 1),
        );
        feature.style.setProperty("--feature-progress", progress.toFixed(3));
      }

      if (journey && activeSections.has(journey)) {
        const rect = journey.getBoundingClientRect();
        const progress = clamp(
          (window.innerHeight * 0.64 - rect.top) /
            Math.max(rect.height - window.innerHeight * 0.42, 1),
        );
        journey.style.setProperty("--journey-progress", progress.toFixed(3));
        updateRoute(progress);
      }

      lastY = scrollY;
      lastTime = now;
    };

    const update = (now: number) => {
      frame = 0;
      updateScrollEffects(now);

      if (Math.abs(velocity) > 0.04) {
        frame = requestAnimationFrame(update);
      }
    };

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      isCancelled = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(routeFrame);
      window.clearTimeout(initialCurtainStartTimer);
      window.clearTimeout(initialCurtainCompleteTimer);
      window.clearTimeout(initialCurtainFallbackTimer);
      window.clearTimeout(routeTimer);
      resetIncompleteInitialCurtain();
      revealObserver.disconnect();
      motionObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("editorial-scroll-top", scrollToTop);
      hero?.removeEventListener("pointermove", heroPointer);
      quote?.removeEventListener("pointermove", quotePointer);
      buttonCleanups.forEach((cleanup) => cleanup());
      root.classList.remove("motion-ready", "motion-reduced");
    };
  }, [pathname]);

  return (
    <div className="route-wipe" aria-hidden>
      <Image
        src="/images/logos/web/curtain-emblem-yellow.png"
        alt=""
        width={900}
        height={900}
        className="route-wipe__logo"
        priority
      />
    </div>
  );
}
