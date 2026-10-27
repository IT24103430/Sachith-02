import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'
import { links, projects, skills, type Project } from './data/portfolio'

const navItems = [['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Education', '#education'], ['Contact', '#contact']]

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'knowledge') return <div className="visual visual-knowledge" aria-label="Illustrated document retrieval workflow">
    <div className="visual-top"><span>KNOWLEDGE STUDIO</span><span>DOCUMENT → ANSWER</span></div>
    <div className="knowledge-flow"><div className="flow-card"><span className="flow-icon">01</span><b>Lecture notes.pdf</b><small>Document input</small></div><span className="flow-line"/><div className="flow-card highlighted"><span className="flow-icon">02</span><b>Semantic search</b><small>Persistent vector index</small></div><span className="flow-line"/><div className="flow-card"><span className="flow-icon">03</span><b>Grounded response</b><small>Context with sources</small></div></div>
    <div className="visual-caption"><span>RETRIEVAL PIPELINE</span><span>PYTHON / CHROMA</span></div>
  </div>
  if (type === 'libra') return <div className="visual visual-libra" aria-label="Illustrated library API architecture">
    <div className="visual-top"><span>LIBRACORE</span><span>API ARCHITECTURE</span></div>
    <div className="libra-layout"><div className="libra-node">CLIENT REQUEST<small>REST · JSON</small></div><span className="connector"/><div className="libra-core"><b>SPRING BOOT</b><span>SECURITY FILTER</span><span>DOMAIN SERVICES</span><span>REPOSITORIES</span></div><span className="connector"/><div className="libra-node">MYSQL<small>FLYWAY MIGRATIONS</small></div></div>
    <div className="libra-stamp"><span>01</span><span>AUTH<br/>CATALOG<br/>CIRCULATION</span></div>
    <div className="visual-caption"><span>SECURITY · DATA · OPERATIONS</span><span>JAVA 21</span></div>
  </div>
  if (type === 'tasklang') return <div className="visual visual-task" aria-label="Illustrated TaskLang parser output">
    <div className="visual-top"><span>TASKLANG++</span><span>PARSE / VALIDATE / SIMULATE</span></div>
    <div className="code-window"><div className="code-line"><em>01</em><span><i>TASK</i> prepare { '{' }</span></div><div className="code-line"><em>02</em><span>  RUN <strong>"fetch_sources.sh"</strong></span></div><div className="code-line"><em>03</em><span>  EVERY DAY AT 08:30</span></div><div className="code-line"><em>04</em><span>{ '}' }</span></div><div className="code-output"><span className="output-mark">✓</span><span>Syntax valid</span><span className="output-divider"/><span>Order simulated</span></div></div>
    <div className="visual-caption"><span>FLEX LEXER + BISON PARSER</span><span>COMMANDS SIMULATED</span></div>
  </div>
  return <div className="visual visual-sustain" aria-label="Illustrated sustainability news interface">
    <div className="visual-top"><span>SUSTAIN INSIGHT</span><span>READING, WITH CONTEXT</span></div>
    <div className="news-layout"><div className="news-sidebar"><span className="news-brand">S<span>.</span>I</span><i className="news-active"/><i/><i/><i/></div><div className="news-main"><div className="news-kicker">A MORE CONSCIOUS BRIEFING</div><div className="news-headline">Ideas for a<br/><i>living world.</i></div><div className="news-row"><span className="news-thumb"/><div><small>CLIMATE · 6 MIN READ</small><b>Designing cities for a changing climate</b></div><ArrowUpRight size={14}/></div></div><div className="news-note"><span>YOUR READING</span><b>Saved stories</b><div/><b>Interests</b></div></div>
    <div className="visual-caption"><span>NEWS · PERSONALIZATION · SAVED ITEMS</span><span>REACT / SPRING</span></div>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Sachith Asmadala, home"><span>SA</span><i/></a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navigation-links">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-availability" href="#contact"><span/>Open to internships</a>
        </div>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="navigation-links" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20}/> : <Menu size={20}/>}<span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </nav>
    </header>

    <main id="main">
      <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-line"/> COMPUTER SCIENCE UNDERGRADUATE <span className="eyebrow-dot">·</span> SLIIT</p>
          <h1 id="hero-title">Sachith<br/><span>Asmadala.</span></h1>
          <div className="hero-bottom">
            <div className="hero-statement"><span className="statement-mark">↳</span><p>Building thoughtful software<br className="desktop-break"/> for real-world problems.</p></div>
            <div className="hero-intro"><p>I’m a Computer Science undergraduate exploring backend engineering, full-stack development, and intelligent applications through hands-on projects.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={16}/></a><a className="text-link" href={links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a><a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15}/></a></div></div>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-core"><span>SA</span><i/></div><span className="art-coordinate coord-top">COMPUTER<br/>SCIENCE</span><span className="art-coordinate coord-bottom">SRI LANKA<br/>UTC +5:30</span><span className="art-index">FIG. 01 / PERSONAL INDEX</span></div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
      </section>

      <section className="section-wrap about-section" id="about" aria-labelledby="about-title">
        <SectionHeading number="01" label="A LITTLE ABOUT ME" title="Curious by nature.\nGrounded in the craft." id="about-title" />
        <div className="about-grid reveal"><div className="about-lead"><p>I’m studying Computer Science at the Sri Lanka Institute of Information Technology, where each project gives me another way to turn a problem into something useful.</p></div><div className="about-copy"><p>Most of my work so far has been hands-on: building APIs, connecting application layers, experimenting with retrieval-augmented generation, and learning what makes software easier to reason about.</p><p>I’m strengthening the fundamentals alongside the projects: data structures, testing, clear architecture, and collaborative development. I’m now looking for a software engineering internship where I can contribute thoughtfully and keep growing.</p><a className="inline-link" href="#contact">A little more about working together <ArrowRight size={15}/></a></div></div>
        <div className="interest-strip reveal"><span>WHERE I’M FOCUSED</span>{['Backend engineering', 'Full-stack systems', 'Applied AI & RAG', 'Architecture & DevOps'].map((item, i) => <div key={item}><small>0{i + 1}</small>{item}</div>)}</div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title"><div className="section-wrap">
        <SectionHeading number="02" label="SELECTED WORK" title="Projects with a point of view." id="work-title" aside="A selection of coursework, personal builds, and collaborative software." />
        <div className="projects-list">{projects.map((project, i) => <article key={project.number} className={`project-card reveal ${i % 2 ? 'project-reverse' : ''}`}>
          <div className="project-visual-wrap"><ProjectVisual type={project.visual}/></div>
          <div className="project-information"><div className="project-meta"><span>{project.number} / 04</span><span>{project.category}</span></div><h3>{project.name}</h3>{project.collaboration && <span className="collab-note">{project.collaboration}</span>}<p className="project-description">{project.description}</p><p className="project-focus"><span>ENGINEERING FOCUS</span>{project.focus}</p><div className="project-tech">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links">{project.repositories.map((repo) => <a key={repo.label} href={repo.url} target="_blank" rel="noreferrer">{repo.label} <ArrowUpRight size={15}/></a>)}</div></div>
        </article>)}</div>
        <div className="projects-foot reveal"><span>More experiments and coursework live on GitHub.</span><a className="inline-link" href={links.github} target="_blank" rel="noreferrer">Browse all repositories <ArrowUpRight size={15}/></a></div>
      </div></section>

      <section className="section-wrap skills-section" id="skills" aria-labelledby="skills-title">
        <SectionHeading number="03" label="TOOLS & TECHNOLOGIES" title="A toolkit in progress." id="skills-title" aside="Technologies I’ve encountered through projects and coursework. Familiarity varies by project." />
        <div className="skills-grid reveal">{skills.map((group, i) => <div className="skill-group" key={group.title}><span className="skill-index">0{i + 1}</span><div><h3>{group.title}</h3><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div></div>)}</div>
      </section>

      <section className="education-section" id="education" aria-labelledby="education-title"><div className="section-wrap">
        <SectionHeading number="04" label="EDUCATION & DEVELOPMENT" title="Learning, then building." id="education-title" />
        <div className="education-grid reveal"><div className="education-main"><span className="mono-label">UNDERGRADUATE</span><h3>Bachelor’s Degree in<br/>Computer Science</h3><p>Sri Lanka Institute of Information Technology <span>·</span> SLIIT</p><span className="study-status"><i/> Third-year undergraduate</span></div><div className="education-learning"><span className="mono-label">CURRENTLY STRENGTHENING</span>{['Data structures & algorithms', 'Programming fundamentals', 'Backend development', 'Software testing', 'Problem-solving'].map((item, i) => <div key={item}><span>0{i + 1}</span>{item}<ArrowUpRight size={14}/></div>)}</div></div>
      </div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-wrap contact-inner reveal"><div><p className="eyebrow"><span className="eyebrow-line"/> OPEN TO SOFTWARE ENGINEERING INTERNSHIPS</p><h2 id="contact-title">Let’s build<br/><i>something meaningful.</i></h2><p className="contact-copy">Open to internship opportunities, collaborative projects, and good conversations about software.</p><a className="button button-primary" href={links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16}/></a></div><div className="contact-side"><span className="contact-index">05 / CONTACT</span><a href={links.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={16}/></a><a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={16}/></a><span className="contact-location">BASED IN<br/><b>Sri Lanka · UTC +5:30</b></span></div></div></section>
    </main>

    <footer className="site-footer"><div className="footer-inner"><a className="footer-name" href="#home">Sachith Asmadala<span>Computer Science Undergraduate · Software Engineering</span></a><a className="back-top" href="#home">Back to top <ArrowUp size={14}/></a><span className="copyright">© {new Date().getFullYear()} · MADE WITH INTENTION</span></div></footer>
  </>
}

function SectionHeading({ number, label, title, id, aside }: { number: string; label: string; title: string; id: string; aside?: string }) {
  return <div className="section-heading reveal"><div className="section-heading-main"><span className="section-number">{number}</span><div><p className="eyebrow">{label}</p><h2 id={id}>{title.split('\n').map((line, i) => <span key={line}>{i > 0 && <br/>}{line}</span>)}</h2></div></div>{aside && <p className="section-aside">{aside}</p>}</div>
}

export default App
