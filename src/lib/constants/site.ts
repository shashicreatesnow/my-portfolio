export const siteMetadata = {
  title: "Shashi Pratap Singh",
  description:
    "A design strategist and AI systems builder creating research-driven product stories, systems, and creative pipelines.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  ogImage: "/og-image.svg",
};

export const defaultSiteSettings = {
  hero: {
    eyebrow: "Product & Brand Designer",
    title: "A designer who can design",
    title_accent: "AI Systems",
    subtitle:
      "Anyone can design a screen. I design the system and the agent that runs it.",
    cta_text: "enter the work",
    cta_link: "/works",
    secondary_cta_text: "say hello",
    secondary_cta_link: "/about",
  },
  about: {
    headline: "Crafting the Vision",
    subheadline: "A designer who thinks in systems, not just surfaces",
    profile_image_url: "",
  },
  contact: {
    email: "shashiprofessionalacc@gmail.com",
    phone: "",
    linkedin: "https://www.linkedin.com/in/shashi-pratap-singh-3957b922b",
    behance: "https://www.behance.net/shashipsingh",
    twitter: "",
    github: "",
  },
  seo: {
    site_title: "Shashi Pratap Singh — Design Strategist & AI Systems Builder",
    site_description:
      "I research, strategize, and build AI-powered design systems that produce at scale.",
    og_image_url: "",
  },
  navigation: {
    items: [
      { label: "Works", href: "/works" },
      { label: "Lab", href: "/lab" },
      { label: "About", href: "/about" },
    ],
  },
};
