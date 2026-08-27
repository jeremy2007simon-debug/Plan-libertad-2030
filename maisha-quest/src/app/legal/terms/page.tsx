import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Booking terms and conditions for Maisha Quest journeys in Tanzania.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The terms that apply when you book a journey with Maisha Quest."
      sections={[
        {
          heading: "Who you are booking with",
          body: [
            "Maisha Quest is a tour operator based in Arusha, Tanzania, arranging private safaris, treks and coastal stays across the country.",
            "Company registration and tour operator licence details will be published here.",
          ],
          pending: true,
        },
        {
          heading: "Quotations and confirmation",
          body: [
            "A quotation is a proposal, not a booking. Prices, camps and availability are confirmed in writing before anything is held.",
          ],
          pending: true,
        },
        {
          heading: "Payment",
          body: ["Deposit, balance and payment method terms are pending."],
          pending: true,
        },
        {
          heading: "Changes and cancellation",
          body: [
            "Cancellation terms depend on the camps and internal flights held for your journey, and will be set out in full in your booking confirmation.",
          ],
          pending: true,
        },
        {
          heading: "Insurance",
          body: [
            "Comprehensive travel and medical insurance is required for all travellers. Cover should include medical evacuation, and for Kilimanjaro climbs it must cover trekking to 6,000 metres.",
          ],
        },
        {
          heading: "Passports, visas and health",
          body: [
            "Travellers are responsible for holding a valid passport and the correct visa, and for meeting entry health requirements. We will point you to the official sources, but we cannot advise on your specific circumstances.",
          ],
        },
        {
          heading: "Safety on safari",
          body: [
            "Wildlife is wild. Guests must follow their guide's instructions at all times, including in camp, and no sighting is guaranteed.",
          ],
        },
        {
          heading: "Liability and applicable law",
          body: ["Governing law and liability wording are pending legal review."],
          pending: true,
        },
      ]}
    />
  );
}
