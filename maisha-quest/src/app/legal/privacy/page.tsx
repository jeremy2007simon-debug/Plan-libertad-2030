import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Maisha Quest handles the personal data you send us.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect when you contact us, why, and what we do with it."
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you use the journey planner or write to us we collect what you give us: your name, email address, optional phone number and country, and the details of the trip you are considering.",
            "We do not ask for passport or payment details through this website.",
          ],
        },
        {
          heading: "Why we hold it",
          body: [
            "To answer your enquiry and, if you book, to arrange your journey. That is the only reason. We do not sell or rent your details to anyone.",
          ],
        },
        {
          heading: "Where it goes",
          body: [
            "Enquiries reach our team in Arusha. To arrange a journey we share only what is necessary with the camps, lodges, airlines and guides on your itinerary.",
          ],
        },
        {
          heading: "How long we keep it",
          body: ["Retention periods are pending legal review."],
          pending: true,
        },
        {
          heading: "Your rights",
          body: [
            "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to the email address at the foot of this page and we will action it.",
          ],
        },
        {
          heading: "Draft saved in your browser",
          body: [
            "The journey planner saves your answers in your own browser so you do not lose them if you close the tab. That draft stays on your device, is not sent to us until you submit the form, and is cleared when you do.",
          ],
        },
      ]}
    />
  );
}
