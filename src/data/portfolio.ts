export const links = {
  github: 'https://github.com/Sachith-Asmadala',
  linkedin: 'https://www.linkedin.com/in/sachith-asmadala-3b185a333/',
}

export type Project = {
  number: string
  name: string
  category: string
  description: string
  focus: string
  technologies: string[]
  repositories: { label: string; url: string }[]
  visual: 'knowledge' | 'libra' | 'tasklang' | 'sustain'
  collaboration?: string
}

export const projects: Project[] = [
  {
    number: '01', name: 'Knowledge Studio', category: 'RETRIEVAL-AUGMENTED GENERATION',
    description: 'A document-grounded workspace for asking questions of lecture PDFs, exploring source passages, and generating structured summaries.',
    focus: 'Built around a persistent Chroma index, configurable retrieval, and answers grounded in the document context.',
    technologies: ['Python', 'Streamlit', 'LangChain', 'ChromaDB', 'HuggingFace', 'Groq'],
    repositories: [{ label: 'View repository', url: 'https://github.com/Sachith-Asmadala/Knowledge-Studio' }],
    visual: 'knowledge',
  },
  {
    number: '02', name: 'LibraCore', category: 'BACKEND SYSTEMS · INDIVIDUAL PROJECT',
    description: 'A library and asset management API for catalog search, member accounts, and circulation workflows.',
    focus: 'JWT role-based access, transactional issue and return flows, Flyway migrations, and ISBN validation through a native C/JNI module.',
    technologies: ['Java 21', 'Spring Boot 3', 'MySQL 8', 'Spring Security', 'Flyway', 'Docker'],
    repositories: [{ label: 'View repository', url: 'https://github.com/Sachith-Asmadala/LibraCore' }],
    visual: 'libra',
  },
  {
    number: '03', name: 'TaskLang++', category: 'LANGUAGE DESIGN · COURSEWORK',
    description: 'A small domain-specific language for describing scheduled tasks, dependencies, and simple success or failure conditions.',
    focus: 'A Flex lexer and Bison parser validate syntax and dependency relationships, then simulate an execution order. Commands are not run on the host.',
    technologies: ['C', 'Flex', 'Bison', 'Make', 'Automated tests'],
    repositories: [{ label: 'View repository', url: 'https://github.com/Sachith-Asmadala/TaskLang' }],
    visual: 'tasklang',
  },
  {
    number: '04', name: 'Sustain Insight', category: 'FULL-STACK · COLLABORATIVE PROJECT',
    description: 'A sustainability-focused news experience that brings article discovery, personalization, and saved reading together.',
    focus: 'The project pairs a React interface with a Spring Boot service and PostgreSQL persistence. Developed collaboratively; individual contribution is not itemized here.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript'],
    repositories: [
      { label: 'Backend', url: 'https://github.com/Sachith-Asmadala/Sustain-Insight---back-end' },
      { label: 'Frontend', url: 'https://github.com/Sachith-Asmadala/Sustain-Insight---front-end' },
    ],
    visual: 'sustain', collaboration: 'Collaborative project',
  },
]

export const skills = [
  { title: 'Languages', items: ['Java', 'Python', 'C', 'JavaScript', 'TypeScript', 'SQL'] },
  { title: 'Backend', items: ['Spring Boot', 'REST APIs', 'FastAPI · exposure'] },
  { title: 'Frontend', items: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
  { title: 'Data & AI', items: ['PostgreSQL', 'MySQL', 'RAG', 'LangChain', 'ChromaDB', 'Embeddings'] },
  { title: 'Tools & practice', items: ['Git', 'GitHub', 'Docker', 'Maven', 'GitHub Actions', 'JUnit', 'pytest', 'unittest'] },
]
