import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Claire Webb",
  description:
    "Selected travel content work — customer magazines, market reports, website copy and editorial — measured in bookings, enquiries and sign-ups.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
