import type { Project } from '../types'

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === 'live' && project.liveUrl
  return (
    <article
      style={{
        background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
        boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column',
      }}
    >
      <img
        src={project.thumbnail}
        alt={project.name}
        style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', background: 'var(--hair-2)' }}
      />
      <div style={{ padding: 'var(--pad)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ margin: 0 }}>{project.name}</h3>
        <p style={{ margin: 0, color: 'var(--ink-2)', flex: 1 }}>{project.blurb}</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {isLive ? (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 600, textDecoration: 'none', color: '#fff',
                background: 'var(--grad-hero)', padding: '8px 16px', borderRadius: 999,
              }}
            >
              Live demo →
            </a>
          ) : (
            <span
              style={{
                fontWeight: 600, color: 'var(--ink-2)', background: 'var(--hair-2)',
                padding: '8px 16px', borderRadius: 999,
              }}
            >
              Coming soon
            </span>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
