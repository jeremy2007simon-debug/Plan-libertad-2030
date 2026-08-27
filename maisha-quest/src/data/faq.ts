import type { FAQ } from "@/types/content";

/**
 * Preguntas frecuentes.
 *
 * Solo contienen información verificable sobre viajar a Tanzania o sobre cómo
 * trabaja Maisha Quest según lo que el cliente ha facilitado. Ninguna
 * respuesta promete plazos, tarifas, seguros ni condiciones de cancelación:
 * eso son compromisos comerciales que tiene que fijar la empresa.
 */

export const FAQS: FAQ[] = [
  {
    slug: "best-time-to-visit",
    question: "When is the best time to visit Tanzania?",
    answer:
      "There is no single best month — there is a best month for what you want to see. June to October is the dry season, with the easiest game viewing and the northern Serengeti river crossings from July. January to March brings the calving on the southern plains and the clearest months for Kilimanjaro. November to May is the green season: fewer vehicles, dramatic skies, superb birdlife and more dispersed game. Tell us your dates and we will tell you honestly what they are good for.",
    topic: "Planning",
  },
  {
    slug: "how-far-in-advance",
    question: "How far in advance should we book?",
    answer:
      "The camps and lodges worth staying in are small, and the best-placed ones fill first — particularly for the northern Serengeti crossings and for travel over Christmas and New Year. If your dates are fixed, start the conversation early. If they are flexible, we have more room to work with.",
    topic: "Planning",
  },
  {
    slug: "what-does-private-mean",
    question: "What does a 'private' safari actually mean?",
    answer:
      "Your own vehicle, your own guide, and an itinerary that belongs to your party alone. You decide when to leave in the morning, how long to stay with an animal and when to stop for lunch. You are not sharing a vehicle with strangers or following a fixed group departure.",
    topic: "Safari",
  },
  {
    slug: "single-travellers",
    question: "Do you take solo travellers and small groups?",
    answer:
      "Yes. Every journey we build is private, whether that is one traveller or a family of ten. Single supplements apply at most camps and lodges, and we will show you what they are before you commit to anything.",
    topic: "Planning",
  },
  {
    slug: "children",
    question: "Can we travel with children?",
    answer:
      "Yes, and family journeys are one of the things we plan most. Some camps set minimum ages and some activities — walking safaris in particular — have age limits. We check those against your family before proposing anything, rather than after.",
    topic: "Planning",
  },
  {
    slug: "visa-and-entry",
    question: "Do we need a visa?",
    answer:
      "Most visitors need a visa to enter Tanzania, and for many nationalities it can be applied for online in advance through the Tanzanian immigration service. Requirements depend on your passport and change from time to time, so check the official immigration website for your country close to travel. We will point you to it when you book.",
    topic: "Travel",
  },
  {
    slug: "vaccinations",
    question: "What about vaccinations and malaria?",
    answer:
      "Tanzania is a malaria area, and a yellow fever certificate is required if you are arriving from a country where yellow fever is a risk. What you need depends on your health, your route and where you are flying from — speak to a travel clinic or your doctor well before departure. We are not able to give medical advice.",
    topic: "Health & safety",
  },
  {
    slug: "languages",
    question: "Which languages do you work in?",
    answer:
      "We plan and host in English and Swahili, and Talisa also speaks Russian and Mandarin Chinese. For other languages we will tell you plainly what we can arrange rather than promising a guide we cannot provide.",
    topic: "Planning",
  },
  {
    slug: "what-to-pack",
    question: "What should we pack?",
    answer:
      "Neutral colours, layers for cold early mornings and warm middays, a proper hat, binoculars and more camera storage than you think you need. Internal flights between parks have strict luggage limits, usually in soft bags. You will get a packing list built for your specific route.",
    topic: "Travel",
  },
  {
    slug: "how-to-start",
    question: "How does planning a journey with you work?",
    answer:
      "You tell us roughly when, roughly how long and what matters to you. We come back with a proposed route and an honest view of what it costs and what it involves. You change it as many times as you need. Nothing is confirmed until you are happy with it.",
    topic: "Planning",
  },
];

export const FAQS_BY_SLUG = new Map(FAQS.map((faq) => [faq.slug, faq]));
