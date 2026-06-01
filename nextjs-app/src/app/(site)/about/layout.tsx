import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Away With Words",
  description:
    "I get travel, and I can help you sell it. A freelance travel content marketing consultant who knows how people travel — and what makes them book.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
