import { projects } from '../data/projects'
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
        {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
