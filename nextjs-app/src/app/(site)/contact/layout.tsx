import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Away With Words",
  description:
    "Start a project. Tell me roughly what you need and I'll reply within two working days with whether I can help, a rate, and the next step.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
