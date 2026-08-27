import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What this website stores in your browser, and why.",
  alternates: { canonical: "/legal/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="What this website stores in your browser."
      sections={[
        {
          heading: "This site sets no tracking cookies",
          body: [
            "As built, this website does not set advertising or analytics cookies, and does not load third-party trackers. Fonts are served from this site rather than from an external provider, and the map is drawn by the site itself rather than fetched from a mapping service.",
          ],
        },
        {
          heading: "What is stored locally",
          body: [
            "The journey planner saves your unfinished answers in your browser's local storage so you do not lose them. It never leaves your device until you submit the form, and it is removed once you do. Clearing your browser data removes it immediately.",
          ],
        },
        {
          heading: "If analytics are added later",
          body: [
            "If Maisha Quest adds analytics or advertising tools, this page will be updated and a consent banner will be added before any such cookie is set.",
          ],
          pending: true,
        },
      ]}
    />
  );
}
