import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export default function Projects() {
  return (
    <section>
      <h1>Projects</h1>
      <p style={{ color: 'var(--ink-2)', maxWidth: 560 }}>
        Twelve things I wanted to exist. Games you can play right now, small tools for the house, and a couple still in the oven.
      </p>
      <h2 style={{ position: 'absolute', left: -9999 }}>Everything, live and in progress</h2>
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
