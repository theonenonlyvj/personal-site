import { Link } from 'react-router-dom'
import { featuredProjects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export default function Home() {
  const featured = featuredProjects()
  return (
    <section>
      <div style={{ padding: '40px 0 16px' }}>
        <h1 style={{ fontSize: 'clamp(40px, 7vw, 76px)' }}>
          <span className="grad-text">Vijay Ram</span>
        </h1>
        <p style={{ fontSize: 24, fontFamily: 'var(--font-display)', maxWidth: 640 }}>
          Engineer turned Sales Leader and Operator.
        </p>
        <p style={{ color: 'var(--ink-2)', fontSize: 18, maxWidth: 640 }}>
          I've spent 15+ years getting medical technology to patients.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
        <h2 style={{ margin: 0 }}>Featured</h2>
        <Link to="/projects" style={{ fontWeight: 600 }}>All projects →</Link>
      </div>
      <div
        style={{
          display: 'grid', gap: 'var(--gap)', marginTop: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
