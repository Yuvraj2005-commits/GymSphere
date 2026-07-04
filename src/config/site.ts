export const siteConfig = {
  name: "GymSphere",

  description:
    "AI-powered Gym Management SaaS for modern fitness businesses.",

  url: "http://localhost:3000",

  links: {
    github: "",
    twitter: "",
    linkedin: "",
  },

  navigation: [
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ],
};

export type SiteConfig = typeof siteConfig;