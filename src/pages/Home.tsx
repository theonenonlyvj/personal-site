import { Link } from 'react-router-dom'
import { projects, homeProjects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export default function Home() {
  return (
    <section>
      <div style={{ padding: '40px 0 16px' }}>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 76px)' }}>
          <span className="grad-text">theonenonlyvj</span>
        </h1>
        <p style={{ fontSize: 24, fontFamily: 'var(--font-display)', maxWidth: 640 }}>
          Welcome to my playground!
        </p>
        <p style={{ color: 'var(--ink-2)', fontSize: 18, maxWidth: 640 }}>
          I like thoughts, give 'em to me.
        </p>
      </div>

      <h2 style={{ margin: 0, marginTop: 24 }}>Projects</h2>
      <div
        style={{
          display: 'grid', gap: 'var(--gap)', marginTop: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {homeProjects().map(p => <ProjectCard key={p.slug} project={p} />)}
        <SeeAllCard />
      </div>
    </section>
  )
}

function SeeAllCard() {
  const onHome = new Set(homeProjects().map(p => p.slug))
  const more = projects.filter(p => !onHome.has(p.slug))
  return (
    <Link
      to="/projects"
      aria-label={`See all ${projects.length} projects`}
      style={{
        background: 'var(--grad-hero)', color: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)',
        textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        gap: 12, padding: 'var(--pad)', minHeight: 280,
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700 }}>See all {projects.length} projects <span aria-hidden="true">→</span></span>
      <span aria-hidden="true" style={{ opacity: 0.9 }}>{more.slice(0, 4).map(p => p.name).join(' · ')}{more.length > 4 ? ' · and more' : ''}</span>
    </Link>
  )
}
