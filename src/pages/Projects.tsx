import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export default function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <p style={{ color: 'var(--ink-2)', maxWidth: 560 }}>
        Things I build for fun — neurotech-adjacent tools, data toys, and games.
      </p>
      <div
        style={{
          display: 'grid', gap: 'var(--gap)', marginTop: 24,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  )
}
