import type { Metadata } from "next";
import { FullProfilePage } from "@/components/profile/full-profile-page";

export const metadata: Metadata = {
  title: "Full Profile",
  description:
    "Orgil Ulziitogtokh’s profile, current engineering focus, technical toolbox, learning timeline, and working principles.",
  openGraph: {
    title: "Full Profile — Orgil Ulziitogtokh",
    description:
      "Software engineer in Mongolia focused on polished web products and practical AI systems.",
    type: "profile",
  },
};

export default function FullProfileRoute() {
  return <FullProfilePage />;
}
