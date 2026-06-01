"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type IncludedItem = { title: string; detail?: string | null };

export default function IncludedAccordion({ items }: { items: IncludedItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="border-t border-ink m-0 p-0 list-none">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b border-[var(--rule)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full grid grid-cols-[40px_1fr_auto] gap-4 py-4 items-baseline text-left group cursor-pointer"
            >
              <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`fr-subhead text-[19px] leading-[1.3] transition-colors ${
                  isOpen ? "text-azure" : "text-ink group-hover:text-azure"
                }`}
              >
                {item.title}
              </span>
              <ChevronDown
                size={17}
                className={`text-azure translate-y-[2px] transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="fr-body text-[15px] leading-[1.6] text-ink-2 pl-[56px] pr-4 pb-5 max-w-[48ch] m-0">
                  {item.detail}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
