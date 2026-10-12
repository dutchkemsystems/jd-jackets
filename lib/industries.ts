export interface Industry {
  slug: string;
  name: string;
  description: string;
  detail: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "corporate-office",
    name: "Corporate & Office Teams",
    description:
      "Professional jackets that unify your workforce and project a polished company image.",
    detail:
      "Corporate and office teams need outerwear that balances professionalism with practicality. Whether it's a lightweight softshell for daily commutes or a branded puffer for winter, custom jackets keep your team looking cohesive while representing your brand. We work with HR departments and office managers to deliver consistent sizing, colours, and logo placement across your entire organization.",
  },
  {
    slug: "logistics-transport",
    name: "Logistics & Transport",
    description:
      "Durable, high-visibility jackets built for drivers, warehouse staff, and delivery teams.",
    detail:
      "Logistics and transport teams operate in demanding conditions — rain, cold, and long hours. Our custom jackets for this sector prioritize durability, visibility, and comfort. From high-visibility vests to insulated parkas, we help fleet managers and logistics coordinators outfit their teams with gear that works as hard as they do, while keeping your brand front and centre on every delivery route.",
  },
  {
    slug: "security-operational",
    name: "Security & Operational Teams",
    description:
      "Functional, authoritative jackets for security personnel and operational staff.",
    detail:
      "Security and operational teams require jackets that project authority while allowing full range of motion. We design custom outerwear with practical features like reinforced seams, multiple pockets, and radio loops. Whether you're outfitting a corporate security team or a large-scale event operation, our jackets help your personnel look professional and stay prepared for any situation.",
  },
  {
    slug: "schools-education",
    name: "Schools & Education",
    description:
      "Branded jackets for school staff, teams, and student organizations.",
    detail:
      "Schools and educational institutions use custom jackets to build community spirit and staff identity. From teacher appreciation gifts to sports team uniforms, we help schools create jackets that students and staff are proud to wear. Our team works within school budgets and timelines, delivering quality outerwear that stands up to daily wear while showcasing your school's colours and crest.",
  },
  {
    slug: "tourism-hospitality",
    name: "Tourism & Hospitality",
    description:
      "Welcoming, professional jackets for hotels, restaurants, and tourism operators.",
    detail:
      "Tourism and hospitality staff are the face of your brand. Custom jackets help hotels, restaurants, and tour operators create a polished, welcoming appearance for their teams. From front-of-house concierge jackets to kitchen staff outerwear, we design pieces that are comfortable for long shifts while maintaining the professional image your guests expect.",
  },
  {
    slug: "sports-events",
    name: "Sports & Events",
    description:
      "Team jackets and event staff outerwear that unite participants and staff.",
    detail:
      "Sports teams and event organizations need jackets that build excitement and unity. Whether it's a marathon, a corporate retreat, or a local league, custom jackets help participants feel like part of something bigger. We work with event coordinators and team managers to deliver jackets on time and on budget, with designs that capture the spirit of your event or team.",
  },
  {
    slug: "construction-mining-engineering",
    name: "Construction, Mining & Engineering",
    description:
      "Heavy-duty, safety-compliant jackets for worksites and industrial environments.",
    detail:
      "Construction, mining, and engineering teams need jackets that meet safety standards while providing comfort in harsh conditions. We supply custom outerwear with reinforced stitching, reflective elements, and weather-resistant materials. Our team understands the compliance requirements of industrial worksites and helps project managers outfit their crews with gear that protects and performs.",
  },
  {
    slug: "healthcare-care",
    name: "Healthcare & Care Teams",
    description:
      "Clean, professional jackets for healthcare workers and care organizations.",
    detail:
      "Healthcare and care teams need jackets that are easy to clean, comfortable for long shifts, and professional in appearance. We work with hospitals, clinics, and care agencies to provide custom outerwear that meets hygiene standards while keeping staff warm and comfortable. From lightweight fleece to insulated jackets, we help care organizations outfit their teams with pride.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
