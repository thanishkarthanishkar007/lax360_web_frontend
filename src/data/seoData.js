export const SITE_CONFIG = {
  siteName: "Lax360",
  companyName: "Lax360 Pvt Ltd",
  domain: "https://lax360.com",
  defaultImage: "/laxLogo2.png",
  twitterHandle: "@lax360tech",
  email: "lax360tech@gmail.com",
  phoneNumbers: ["+91 9566679928", "+91 9566679958"],
  address: {
    streetAddress: "1st Floor, 16, CPS Tower, Advaitha Ashram Rd, Fairlands",
    addressLocality: "Salem",
    addressRegion: "Tamil Nadu",
    postalCode: "636007",
    addressCountry: "IN",
  },
  geo: {
    latitude: "11.6748",
    longitude: "78.1408",
  },
  socialLinks: [
    "https://www.instagram.com/lax360pvtltd",
    "https://www.linkedin.com/company/lax360-pvt-ltd/",
    "https://www.facebook.com/profile.php?id=61578145848005",
    "https://wa.me/919566679958",
  ],
};

export const SEO_DATA = {
  home: {
    title: "Lax360 | AI Solutions, Web Development & Enterprise Software in Salem & Bangalore",
    description:
      "Lax360 Pvt Ltd is a premier software and AI solutions company delivering scalable web applications, enterprise software, blockchain, cloud infrastructure, and digital marketing services.",
    keywords:
      "Lax360, Lax 360, Lax360 Pvt Ltd, AI solutions Salem, Web development company Salem, Software company Bangalore, Blockchain development, Cloud solutions, Enterprise software development, Salem IT companies",
    canonical: "/",
    ogType: "website",
    schemaType: "Organization",
  },
  about: {
    title: "About Us | Lax360 - Innovating the Future of Digital & AI Systems",
    description:
      "Learn more about Lax360 Pvt Ltd, our vision, mission, and how our team builds cutting-edge enterprise software and intelligent AI solutions for modern businesses.",
    keywords:
      "About Lax360, Lax360 team, Software company mission, AI tech company Salem, Enterprise technology partners",
    canonical: "/about",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ],
  },
  services: {
    title: "Our Services | AI, Web Development, Cloud & Cyber Security - Lax360",
    description:
      "Explore Lax360's full suite of technology services: AI solutions, Web & Mobile Development, Blockchain, Digital Marketing, Cloud Infrastructure, and Cyber Security.",
    keywords:
      "Lax360 services, AI solutions, Web development services, Blockchain development, Cloud computing, Cyber security services, Digital marketing Salem",
    canonical: "/services",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
    ],
    servicesList: [
      {
        name: "Web Development",
        description: "High-performance, scalable modern web applications and progressive web apps.",
      },
      {
        name: "AI Solutions",
        description: "Intelligent machine learning models, automation, predictive systems, and AI integrations.",
      },
      {
        name: "Blockchain Development",
        description: "Secure decentralized applications, smart contracts, and Web3 infrastructure.",
      },
      {
        name: "Cloud Solutions",
        description: "Scalable cloud architecture, DevOps, AWS/GCP integrations, and serverless hosting.",
      },
      {
        name: "Cyber Security",
        description: "End-to-end security audits, threat assessment, encryption, and enterprise protection.",
      },
      {
        name: "Digital Marketing",
        description: "Data-driven SEO, SEM, content strategy, and high-conversion social media marketing.",
      },
      {
        name: "Enterprise Software",
        description: "Custom ERP, CRM, and robust backend systems tailored for enterprise scalability.",
      },
    ],
  },
  careers: {
    title: "Careers at Lax360 | Join Our Fast-Growing Tech & AI Team",
    description:
      "Explore exciting career opportunities at Lax360. Work with cutting-edge AI technologies, modern web stacks, and join a passionate team of developers and innovators.",
    keywords:
      "Lax360 careers, Software developer jobs Salem, React developer jobs, AI engineer hiring, Tech jobs Salem Bangalore, Lax360 hiring",
    canonical: "/careers",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Careers", url: "/careers" },
    ],
  },
  contact: {
    title: "Contact Us | Lax360 Pvt Ltd - Salem & Bangalore Office",
    description:
      "Get in touch with Lax360 Pvt Ltd for project consultations, partnerships, or tech inquiries. Located in Salem, Tamil Nadu with active operations in Bangalore.",
    keywords:
      "Contact Lax360, Lax360 Salem address, Lax360 phone number, software consultation Salem, Hire developers Lax360",
    canonical: "/contact",
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ],
  },
};
