/**
 * Job entries for CV sections: date, title, company, and first-paragraph description.
 */

/** Single image with optional caption (used for alt, title, and visible caption). */
export type JobImage = {
  src: string
  /** Optional caption; when omitted, derived from filename (e.g. "Cashapp accounts" from path). */
  caption?: string
}

/** Derives a human-readable caption from an image path for alt/title when caption is not set. */
export function getCaptionFromPath(src: string): string {
  try {
    const name = src.split('/').pop() ?? src
    const withoutExt = name.replace(/\.[a-z0-9]+$/i, '')
    const decoded = decodeURIComponent(withoutExt)
    return decoded.replace(/[-_]+/g, ' ').trim() || name
  } catch {
    return src
  }
}

export type JobEntry = {
  id: string
  date: string
  jobTitle: string
  company: string
  description: string
  backgroundColor: string
  /** Optional text color (e.g. var(--color-text-on-dark) for dark backgrounds). */
  textColor?: string
  /** Optional list of images for the left column; caption is used for alt, title, and modal caption. */
  images?: readonly JobImage[]
}

export const JOBS: readonly JobEntry[] = [
  {
    id: 'cash-app',
    date: '2024',
    jobTitle: 'Principal Product Designer',
    company: 'Cash App',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/Cashapp%20accounts.jpg' },
      { src: '/images/Cashapp%20cg.jpg' },
      { src: '/images/Cashapp%20settings.jpg' },
      { src: '/images/Cashapp%20transfers.jpg' },
    ],
    description:
      'Trust at cash app is a vital part of the business, looking after users privacy, safety, and security whilst working alongside regulatory partners. As a principle designer, I have a broad scope of work I am responsible for and take an active role in uplevelling quality across the team. I am proud to work really closely with some of our earlier career team members.',
  },
  {
    id: 'personio',
    date: '2023',
    jobTitle: 'Senior Staff Product Designer',
    company: 'Personio',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/Personio1.jpg' },
      { src: '/images/Personio2.jpg' },
      { src: '/images/Personio3.jpg' },
      { src: '/images/Personio4.jpg' },
      { src: '/images/Personio5.jpg' },
      { src: '/images/Personio6.jpg' },
    ],
    description:
      'At Personio I led design for Apps - add ons to the core HR product for performance management and compensation. I am responsible for the quality of craft and the product that ships to customers, as well as developing and updating a future experience vision. I work closely with extremely senior stakeholders across the company.',
  },
  {
    id: 'twitter',
    date: '2021 – 2023',
    jobTitle: 'Staff Product Designer',
    company: 'Twitter',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/twitter-1.jpg' },
      { src: '/images/twitter-1-1.jpg' },
      { src: '/images/twitter-news.jpg' },
      { src: '/images/twitter-news-b.jpg' },
    ],
    description:
      'At Twitter, I led design for a large area within the Revenue Diversity initiative, focused on future subscription offerings. I was responsible for driving strategy and execution, alongside mentorship of more junior designers. This included driving design and strategy for Twitter consumer and business subscriptions.',
  },
  {
    id: 'Meta',
    date: '2020 – 2021',
    jobTitle: 'Product Design Lead',
    company: 'Meta',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/meta-ob-ds.jpg' },
      { src: '/images/meta-ob-ds-case.jpg' },
      { src: '/images/meta-ob-ds-user.jpg' },
    ],
    description:
      "At Meta, I led the company wide efforts for Community Integrity Legitimacy - a highly complex strategic initiative to develop defensible, viable patterns for the company to follow. This includes driving design work for The Oversight Board and Meta's transparency efforts.",
  },
  {
    id: 'spotify',
    date: '2019 – 2020',
    jobTitle: 'Principal Product Designer',
    company: 'Spotify',
    backgroundColor: '#FFFFFF',
    images: [{ src: '/images/spotify-1.png' }],
    description:
      'As one of few Principal designers at Spotify, I led design for part of the Premium mission, focusing the team on lean experimentation and a creative process.',
  },
  {
    id: 'google',
    date: '2018 – 2019',
    jobTitle: 'Lead Interaction Designer',
    company: 'Google',
    backgroundColor: '#FFFFFF',
    images: [{ src: '/images/google-retention.jpg' }],
    description:
      'A strong cross-functional partner in developing strategies and alignment, trusted with highly complex problems. Working with Geo (Maps) and Wearables/Health, I drove a user-first, questions led process, and mentored several designers across different teams.',
  },
  // {
  //   id: 'ten-group',
  //   date: '2017 – 2018',
  //   jobTitle: 'Head of Product Design',
  //   company: 'Ten Group',
  //   backgroundColor: '#ebebe8',
  //   description:
  //     'Full time head of a team of 5 designers, managing the full design process for an online concierge platform.',
  // },
  {
    id: 'Circles',
    date: '2016 – 2017',
    jobTitle: 'Founder & Designer',
    company: 'Circles',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/circles-initial.jpg' },
      { src: '/images/circles-onboarding.jpg' },
      { src: '/images/circles-chat.jpg' },
      { src: '/images/circles-events.jpg' },
      { src: '/images/circles-structure.jpg' },
      { src: '/images/circles-design-system.jpg' },
    ],
    description:
      'Founding member of a VC backed startup focused on delivering peer support for mental health.',
  },
  {
    id: 'ms',
    date: '2013 – 2016',
    jobTitle: 'Lead Product Designer',
    company: 'M&S',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/marks-cook-app.jpg' },
      { src: '/images/marks-handbags.jpg' },
      { src: '/images/marks-socks.jpg' },
      { src: '/images/marks-sparks.jpg' },
      { src: '/images/marks-tuesday.jpg' },
    ],
    description:
      "Full time UI/UX and product development role within one of the UK's oldest and most loved high street retailers. At M&S digital labs, I worked in a small team that used lean startup techniques to validate and kickstart new innovations, defining the experience within all products and championing the user at all points within the process.",
  },
  {
    id: 'agency',
    date: '2005 – 2013',
    jobTitle: 'Various roles',
    company: 'Advertising & agency',
    backgroundColor: '#FFFFFF',
    images: [
      { src: '/images/agency-a4.jpg' },
      { src: '/images/agency-honda.jpg' },
      { src: '/images/agency-network.jpg' },
    ],
    description:
      'Constant creative, design, and development input into adward winning work from concept to deployment for major blue-chip clients such as Mazda, Mercedes and Channel 4. Managed small teams of designers and creative technologists.',
  },
  // {
  //   id: 'haymarket',
  //   date: '2010 – 2013',
  //   jobTitle: 'Lead Designer',
  //   company: 'Haymarket Network',
  //   backgroundColor: '#f7f7f4',
  //   description:
  //     'Full time UI design, art direction and development role within a large editorial agency, working with internal magazine ranges as well as external clients, as well as managing a small team.',
  // },
  // {
  //   id: 'nexus-h',
  //   date: '2008 – 2010',
  //   jobTitle: 'Lead Interaction Designer',
  //   company: 'Nexus|H',
  //   backgroundColor: '#efefeb',
  //   description:
  //     'Full time design manager and interactive art direction for Nexus|H, an integrated advertising agency and the UK branch of Hakuhodo, mentoring a small team of digital designers/developers on advertising and design briefs.',
  // },
  // {
  //   id: 'vml',
  //   date: '2007 – 2008',
  //   jobTitle: 'Hypermedia Designer',
  //   company: 'VML London',
  //   backgroundColor: '#e0e0dc',
  //   description:
  //     'Creative Technologist working closely with various creative and technical teams to produce high quality, award winning work for a leading design and advertising agency (Revolution Agency of the Year 2008). I had constant creative and technical input in some outstanding projects, including mentoring junior designers.',
  // },
  // {
  //   id: 'syzygy',
  //   date: '2006 – 2007',
  //   jobTitle: 'Designer / Flash Designer',
  //   company: 'Syzygy',
  //   backgroundColor: '#f5f5f0',
  //   description:
  //     'Full time role within a large digital design and advertising agency. Constant creative input into work from concept to deployment for major blue-chip clients such as Mazda, Mercedes and Channel 4.',
  // },
] as const
