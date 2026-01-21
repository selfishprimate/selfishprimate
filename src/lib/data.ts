import type { Experience, Article, Illustration } from './types';

export const siteConfig = {
  name: "Halil İbrahim Çakıroğlu",
  handle: "selfishprimate",
  title: "UI/UX Designer",
  location: "Istanbul, Turkey",
  email: "ibrahimchll@hotmail.com",
  bio: `Hello! I'm Halil, an Istanbul-based UI/UX designer with over 10 years of experience in crafting intuitive and engaging user interfaces. My expertise spans across web and mobile platforms, and I have a strong foundation in HTML, CSS, and a touch of JavaScript.

Throughout my career, I have had the privilege of designing for a diverse range of domains, including online media, e-commerce, fintech, banking, travel, retail, education, and technology.`,
  quote: {
    text: "Simple is hard. Easy is harder. Invisible is hardest.",
    author: "Jean-Louis Gassée"
  },
  social: {
    linkedin: "https://www.linkedin.com/in/selfishprimate/",
    github: "https://github.com/selfishprimate",
    twitter: "https://twitter.com/selfishprimate",
    patreon: "https://www.patreon.com/selfishprimate"
  },
  avatar: "/images/avatar.jpg"
};

export const experiences: Experience[] = [
  {
    company: "RoofStacks",
    role: "Lead UI/UX Designer",
    period: "Dec 2024 — Present",
    description: "Spearheading design for the Bilet Dükkanı platform, collaborating across teams to deliver user-centered solutions aligned with business objectives. Leading design system initiatives and mentoring junior designers.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/roofstacks.jpg",
    url: "https://roofstacks.com/",
    skills: ["UI/UX Design", "Design Systems", "AI for Design", "Design for AI", "UX Research", "Wireframing", "Prototyping", "Usability Testing", "Figma"]
  },
  {
    company: "Turna.com",
    role: "Head of UI/UX Design",
    period: "Jul 2024 — Dec 2024",
    description: "Oversaw design strategy and execution for Turkey's leading travel booking platform. Led the UI/UX team to create user-centric designs, established design processes, and drove product improvements that enhanced user experience.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/turna.jpg",
    url: "https://www.turna.com/",
    skills: ["UI/UX Design", "UX Research", "Wireframing", "Prototyping", "Usability Testing", "Figma"]
  },
  {
    company: "Joi Gifts",
    role: "UI/UX Designer",
    period: "Oct 2022 — Jul 2024",
    description: "Conducted heuristic evaluations, gathered user requirements, and designed interfaces for the MENA region's leading gifting platform. Created comprehensive design systems, improved mobile app experience, and increased conversion rates.",
    location: "Remote",
    logo: "/images/companies/joigifts.jpg",
    url: "https://www.joigifts.com/",
    skills: ["UI/UX Design", "UX Research", "Wireframing", "Prototyping", "Usability Testing", "Figma"]
  },
  {
    company: "VavaCars",
    role: "UI/UX Designer",
    period: "Apr 2022 — Oct 2022",
    description: "Executed heuristic evaluations, requirements gathering, wireframing, prototyping, and usability testing for a used car marketplace. Optimized the vehicle inspection app, reducing inspection time by 40%.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/vavacars.jpg",
    url: "https://tr.vava.cars/",
    skills: ["UI/UX Design", "UX Research", "Wireframing", "Prototyping", "Usability Testing", "Figma"]
  },
  {
    company: "Mobven",
    role: "UI/UX Designer",
    period: "Dec 2020 — Apr 2022",
    description: "Managed user requirements evaluation, wireframing, prototyping, and interface design for enterprise software solutions. Worked on mobile applications for clients in fintech, retail, and travel sectors.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/mobven.jpg",
    url: "https://www.mobven.com/",
    skills: ["UI/UX Design", "Wireframing", "Prototyping", "Adobe XD", "Sketch App", "Figma", "Miro", "Notion"]
  },
  {
    company: "Turna.com",
    role: "UI/UX Designer",
    period: "Aug 2018 — Dec 2020",
    description: "Handled requirements gathering, wireframing, prototyping, and interface design for Turkey's major travel booking platform. Redesigned core booking flows and improved overall user experience.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/turna.jpg",
    url: "https://www.turna.com/",
    skills: ["UI/UX Design", "Wireframing", "Prototyping", "Adobe XD"]
  },
  {
    company: "Habertürk",
    role: "UI Designer",
    period: "Nov 2015 — Aug 2018",
    description: "Designed user interfaces focused on usability improvements for web and mobile applications. Worked on news consumption experiences reaching millions of daily users.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/haberturk.jpg",
    url: "https://www.haberturk.com/",
    skills: ["UI/UX Design", "Wireframing", "Prototyping", "Adobe XD", "Photoshop", "Illustrator", "Bootstrap", "HTML5", "CSS3", "Sass"]
  },
  {
    company: "Sözcü Gazetesi",
    role: "Web Designer",
    period: "Apr 2013 — Oct 2015",
    description: "Designed, developed, and maintained various websites for one of Turkey's largest newspapers. Supported the digital transformation of print media to online platforms.",
    location: "Istanbul, Turkey",
    logo: "/images/companies/sozcu.jpg",
    url: "https://www.sozcu.com.tr/",
    skills: ["UI Design", "Photoshop", "Illustrator", "HTML5", "CSS3", "WordPress"]
  }
];

export const skills = [
  "UI Design",
  "UX Design",
  "Design Systems",
  "Prototyping",
  "User Research",
  "Wireframing",
  "Figma",
  "HTML/CSS",
  "JavaScript",
  "React"
];

export const domains = [
  "E-commerce",
  "Fintech",
  "Banking",
  "Travel",
  "Retail",
  "Education",
  "Technology",
  "Online Media"
];

export const articles: Article[] = [
  {
    title: "Design in Figma is Dead, Long Live Design in Code!",
    description: "How AI-powered code generation tools are transforming design workflows by enabling designers to create directly in code editors rather than traditional design applications.",
    date: "November 25, 2025",
    url: "https://medium.com/design-bootcamp/design-in-figma-is-dead-long-live-design-in-code-56cd97a19173",
    tags: ["Design", "AI", "Web Development"],
    coverImage: "/images/articles/design-in-code.jpg"
  },
  {
    title: "First we shaped Figma, and now it shapes us",
    description: "A critical examination of Figma's rapid expansion into multiple product categories and what it means for designers.",
    date: "May 20, 2025",
    url: "https://medium.com/design-bootcamp/first-we-shaped-figma-and-now-it-shapes-us-319520a0ede2",
    tags: ["Figma", "Design Tools", "Product Design"],
    coverImage: "/images/articles/figma-ecosystem.jpg"
  },
  {
    title: "Do not try to design the box. Instead, only try to realize the truth… there is no box.",
    description: "Guidance for junior designers on adopting a compose-first approach using Figma's layout features.",
    date: "October 7, 2024",
    url: "https://medium.com/design-bootcamp/do-not-try-to-design-the-box-instead-only-try-to-realize-the-truth-there-is-no-box-9cc3b81cb9ae",
    tags: ["Figma", "UI Design", "Design Tips"],
    coverImage: "/images/articles/no-box.jpg"
  },
  {
    title: "The benefits of incrementalism in UI/UX Design over the holistic approach",
    description: "Why iterative, incremental design approaches lead to better outcomes than comprehensive upfront design.",
    date: "April 3, 2023",
    url: "https://medium.com/design-bootcamp/the-benefits-of-incrementalism-in-ui-ux-design-over-holistic-approach-fd2d33891244",
    tags: ["UX Design", "Design Thinking", "Process"]
  },
  {
    title: "Streamline your CSS with Gerillass: A Sass library for efficient styling",
    description: "Introduction to Gerillass, a Sass mixins library designed to streamline CSS development through reusable components.",
    date: "March 5, 2023",
    url: "https://medium.com/gerillass/streamline-your-css-with-gerillass-a-sass-library-for-efficient-styling-6e297bb658b5",
    tags: ["Sass", "CSS", "Web Development"],
    coverImage: "/images/articles/gerillass-streamline.jpg"
  },
  {
    title: "Up and running with Sass and Gerillass",
    description: "Practical tutorial covering Sass installation methods and an overview of the Gerillass library for web development.",
    date: "September 26, 2020",
    url: "https://medium.com/gerillass/up-and-running-with-sass-and-gerillass-b2e9ab2a85c1",
    tags: ["Sass", "CSS", "Tutorial"],
    coverImage: "/images/articles/gerillass-setup.jpg"
  }
];

export const illustrations: Illustration[] = [
  {
    title: "Lee Van Cleef - Western Series",
    description: "They say revenge is a dish best served cold. I prefer mine with a side of justice.",
    image: "/images/illustrations/lee-van-cleef-western-series.jpg"
  },
  {
    title: "Imaro: The Count of Istanbul",
    description: "Imaro: The Count of Istanbul.",
    image: "/images/illustrations/imaro-the-count-of-istanbul.jpg"
  },
  {
    title: "Clickers Buddha Concert Poster",
    description: "It will be a night to remember. Don't miss it out!",
    image: "/images/illustrations/clickers-buddha-concert-poster.jpg"
  },
  {
    title: "3D View-Master",
    description: "An AI-powered retro 3D View-Master.",
    image: "/images/illustrations/3d-view-master.jpg"
  }
];
