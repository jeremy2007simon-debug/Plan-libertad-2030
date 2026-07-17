import type { Translations } from "./types";

// Diccionario de traducción — English.
// Debe cumplir exactamente la forma de `Translations` (derivada de es.ts).
export const en: Translations = {
  nav: {
    links: [
      { href: "#historia", label: "Story" },
      { href: "#especialidades", label: "Specialties" },
      { href: "#experiencia", label: "Experience" },
      { href: "#galeria", label: "Gallery" },
      { href: "#opiniones", label: "Reviews" },
      { href: "#ubicacion", label: "Location" },
    ],
    reserve: "Book a table",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    kicker: "Guargacho · San Miguel de Abona · Tenerife",
    titleLine1: "Mexico can't be explained.",
    titleLine2: "It's lived.",
    subtitle: "Discover an authentic Mexican dining experience in Tenerife.",
    reserve: "Book a table",
    viewMenu: "View menu",
    scroll: "Scroll",
  },

  historia: {
    label: "Our story",
    titleLine1: "Mexico, served",
    titleLine2: "with calm and character.",
    paragraph:
      "In Guargacho we cook the way Mexico has always cooked: slow fire, real ingredients and a will to share. Every table is treated as if we'd just opened our doors for the first time — with the same care, the same flavor and the same warm atmosphere that has defined us since day one.",
    pillars: [
      { title: "Tradition", text: "Since 1999, the same kitchen as always." },
      { title: "Authentic flavor", text: "Mexican recipes, no shortcuts." },
      { title: "Family", text: "Cooked and served like at home." },
    ],
  },

  especialidades: {
    label: "Specialties",
    title: "What defines us",
    moreOnMenu: (n: number) => `+${n} more on the menu`,
    disclaimer:
      "Prices are indicative and subject to change. Full menu available in the restaurant.",
    categories: [
      {
        slug: "entrantes",
        icon: "plate",
        title: "Starters",
        description: "To open the appetite and share at the table.",
        dishes: [
          { name: "Authentic nachos", price: "12,50 €" },
          {
            name: "Melted cheese with mushrooms and huitlacoche",
            price: "15 €",
          },
          { name: "Chicken flautas", price: "16 €" },
          { name: "Acapulco-style shrimp cocktail", price: "13 €" },
          { name: "Sincronizadas (grilled quesadillas)", price: "10 €" },
          { name: "Gringa (pork & cheese taco)", price: "16 €" },
          { name: "First-timer's platter", price: "20 €" },
        ],
      },
      {
        slug: "tacos",
        icon: "taco",
        title: "Tacos",
        description: "Corn, fire and salsa. The foundation of it all.",
        dishes: [
          { name: "Three corn tortilla tacos", price: "12 €" },
          { name: "Baja California fish tacos", price: "13 €" },
        ],
      },
      {
        slug: "burritos",
        icon: "burrito",
        title: "Burritos",
        description: "Generous, wrapped by hand.",
        dishes: [{ name: "Burrito", price: "16 €" }],
      },
      {
        slug: "enchiladas",
        icon: "enchilada",
        title: "Enchiladas",
        description: "Oven-baked, bathed in salsa.",
        dishes: [
          { name: "Green salsa", price: "18 €" },
          { name: "Traditional", price: "18 €" },
          { name: "Mole", price: "18 €" },
          { name: "Suizas (sour cream)", price: "18 €" },
          { name: "Chipotle & peanut", price: "18 €" },
          { name: "Huitlacoche", price: "18 €" },
        ],
      },
      {
        slug: "carnes",
        icon: "flame",
        title: "Grilled meats",
        description: "Fire-grilled, full of character.",
        dishes: [],
      },
      {
        slug: "especialidades",
        icon: "sparkles",
        title: "House specials",
        description: "The house's signature dishes.",
        dishes: [],
      },
      {
        slug: "postres",
        icon: "dessert",
        title: "Desserts",
        description: "The sweet close to the night.",
        dishes: [
          { name: "Tres Leches cake", price: "7,50 €" },
          { name: "Corn flan", price: "7 €" },
          { name: "Tamarind & mezcal cheesecake", price: "7,50 €" },
          { name: "Mango cream", price: "7 €" },
          { name: "Greek yogurt with guava", price: "6 €" },
          { name: "Cajeta crepes", price: "7 €" },
          { name: "Chocolate cake", price: "7,50 €" },
        ],
      },
      {
        slug: "bebidas",
        icon: "cocktail",
        title: "Drinks",
        description: "Margaritas, beers and more.",
        dishes: [],
      },
    ],
  },

  experiencia: {
    label: "The experience",
    titleLine1: "We don't serve dishes.",
    titleLine2: {
      pre: "We serve ",
      word1: "moments",
      mid: " to ",
      word2: "share",
      post: ".",
    },
    moments: [
      {
        n: "01",
        title: "Share",
        text: "The table fills with dishes for the middle, made to pass from hand to hand.",
      },
      {
        n: "02",
        title: "Celebrate",
        text: "Birthdays, reunions, an ordinary Friday that deserves to be everything.",
      },
      {
        n: "03",
        title: "Live",
        text: "Low light, soft music, plenty of time. That's how a night stays in memory.",
      },
    ],
  },

  galeria: {
    label: "Gallery",
    title: "A look inside",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    expand: (label: string) => `Expand image: ${label}`,
    items: [
      { label: "Main dining room", ratio: "4/5" },
      { label: "Tacos al pastor", ratio: "1/1" },
      { label: "Terrace", ratio: "4/5" },
      { label: "Sizzling fajitas", ratio: "1/1" },
      { label: "Margaritas", ratio: "1/1" },
      { label: "Evening ambiance", ratio: "4/5" },
    ],
  },

  reservas: {
    label: "Reservations",
    title: "Book your table",
    paragraph:
      "Tell us when you'd like to come and we'll confirm your table. You can also call us directly if you prefer.",
    callWhatsapp: "Book via WhatsApp",
    successTitle: "Request received",
    successBody: (phone: string) =>
      `Thank you, we've registered your reservation request. We'll confirm your table as soon as possible. If it's urgent, call us directly at ${phone}.`,
    newReservation: "Make another reservation",
    errorBody: (phone: string) =>
      `We couldn't send your request. Please try again or call us at ${phone}.`,
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email (optional)",
      emailPlaceholder: "you@email.com",
      phone: "Phone",
      phonePlaceholder: "600 000 000",
      guests: "Number of guests",
      guestsPlaceholder: "2",
      date: "Date",
      time: "Time",
      notes: "Comments",
      notesPlaceholder: "Allergies, special occasion, high chair…",
      submit: "Book table",
      submitting: "Sending…",
    },
  },

  opiniones: {
    label: "Reviews",
    title: "Real, verified trust.",
    outOf5: "/ 5",
    countLabel: (n: number) => `Over ${n} verified reviews`,
    connecting: "Connecting verified reviews…",
    viewReviews: "View reviews",
    syncNote:
      "The reviews shown here will sync automatically with Google once the Google Places integration is enabled.",
    googleTitle: "What people say on Google",
    googleCount: (n: number) => `${n} reviews on Google`,
    viewOnGoogle: "View reviews on Google",
  },

  ubicacion: {
    label: "Location",
    title: "We're waiting for you in Guargacho",
    address: "Address",
    phone: "Phone",
    fromAbroad: "From abroad:",
    hours: "Opening hours",
    hoursText:
      "Mon, Tue & Thu: 19:00–23:00 · Fri & Sat: 13:00–16:00 & 19:00–23:30 · Sun: 13:00–16:00 · Closed on Wednesdays",
    directions: "Get directions",
    mapTitle: (name: string) => `Map — ${name}`,
  },

  ctaFinal: {
    titleLine1: "Every table tells a story.",
    titleLine2Pre: "The next one could be",
    titleLine2Word: "yours",
    button: "Book now",
  },

  footer: {
    tagline:
      "Authentic Mexican cuisine since 1999, in the heart of Guargacho.",
    contact: "Contact",
    whatsapp: "WhatsApp",
    location: "Location",
    followUs: "Follow us",
    rights: (year: number, name: string) =>
      `© ${year} ${name}. All rights reserved.`,
    privacy: "Privacy policy",
  },
};
