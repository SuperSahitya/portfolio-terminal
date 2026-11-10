// All the words on the site live here. Edit this file to change the content.

const RESUME_FILE = 'SahityaKumarChoubey_SDE.pdf'

export const profile = {
  name: 'Sahitya Kumar Choubey',
  tagline: 'Software engineer. AI systems, backend & full-stack.',
  intro:
    "Final-year dual-degree student at NIT Durgapur. I build software across the stack, from data-heavy backends to AI agents. If I don't know something yet, I learn it.",
  location: 'Durgapur, IN',
  email: 'sahityakumarchoubey@gmail.com',
  github: { label: 'github.com/SuperSahitya', href: 'https://github.com/SuperSahitya' },
  linkedin: {
    label: 'in/sahitya-kumar-choubey',
    href: 'https://www.linkedin.com/in/sahitya-kumar-choubey',
  },
  resume: {
    file: RESUME_FILE,
    href: RESUME_FILE, // relative: the PDF sits in public/ next to index.html
    size: '92 KB',
  },
}

export const sections = [
  { id: 'experience', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'stack', title: 'Stack' },
  { id: 'contact', title: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export type Job = {
  period: string
  org: string
  role: string
  place?: string
  summary: string
  link?: { label: string; href: string }
}

export const experience: Job[] = [
  {
    period: 'Jan — Mar 2026',
    org: 'Memorly.AI',
    role: 'Software Engineering Intern',
    place: 'Bangalore',
    summary:
      'Designed a no-code test-automation platform for conversational agents, used across 30+ agent deployments and 500+ automated runs, cutting manual regression testing by an estimated 85%.',
  },
  {
    period: 'May — Jul 2025',
    org: 'TCS Research & Innovation',
    role: 'Research Intern',
    place: 'Hyderabad',
    summary:
      'Built and deployed a LangGraph conversational agent for a user study. Co-authored two papers: published at HCI International 2026 and accepted at INDAM 2026.',
    link: { label: 'paper / doi', href: 'https://doi.org/10.1007/978-3-032-30860-3_28' },
  },
  {
    period: 'Mar 2024 — May 2026',
    org: 'IEEE Student Branch, NIT Durgapur',
    role: 'Vice President & Webmaster',
    summary:
      'Led web infrastructure for 12+ events, up to 200+ participants, while helping coordinate a 60+ member team.',
  },
  {
    period: '2022 — 2027',
    org: 'NIT Durgapur',
    role: 'Dual Degree, B.Tech + M.Tech',
    summary: 'Biotechnology on paper; backend, databases and AI by choice.',
  },
]

export type Project = {
  name: string
  blurb: string
  stats: { value: string; label: string }[]
  tech: string[]
  href: string
}

export const projects: Project[] = [
  {
    name: 'Relay',
    blurb: 'A real-time chat system built to scale horizontally.',
    stats: [
      { value: '15,000+', label: 'concurrent connections across 3 replicas' },
      { value: '20–30ms', label: 'p95 delivery latency under load' },
      { value: '0', label: 'messages lost across 200,000+ persisted' },
    ],
    tech: ['WebSockets', 'Redis Pub/Sub', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    href: 'https://github.com/SuperSahitya/relay-server',
  },
  {
    name: 'AutoCode',
    blurb: 'A terminal coding agent, written from scratch.',
    stats: [
      { value: '99.5%', label: 'task completion with half of all requests failing' },
      { value: '90%', label: 'of long-session context cut by compaction, roughly' },
      { value: '124', label: 'tests, plus eval harnesses with held-out checks' },
    ],
    tech: ['Agent loop', 'SSE streaming', 'MCP', 'sqlite-vec', 'BM25'],
    href: 'https://github.com/SuperSahitya/autocode-x',
  },
]

export const stack: { key: string; items: string[] }[] = [
  { key: 'Lang', items: ['TypeScript', 'Python', 'SQL', 'C++'] },
  { key: 'Backend', items: ['Node.js', 'Express', 'Next.js', 'Django REST', 'FastAPI'] },
  { key: 'Data', items: ['PostgreSQL', 'Redis', 'Kafka', 'MongoDB', 'Weaviate'] },
  { key: 'Infra', items: ['Docker', 'Kubernetes', 'Linux', 'Azure', 'GCP'] },
  { key: 'AI', items: ['LangGraph', 'LangChain', 'MCP'] },
]
