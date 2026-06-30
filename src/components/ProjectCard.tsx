import type { Project } from '../types'
import { useState } from 'react'

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === 'live' && project.liveUrl
  const [imgOk, setImgOk] = useState(true)
  return (
    <article
      style={{
        background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
        boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column',
      }}
    >
      {imgOk ? (
        <img
          src={`${import.meta.env.BASE_URL}${project.thumbnail.replace(/^\//, '')}`}
          alt={project.name}
          onError={() => setImgOk(false)}
          style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', background: 'var(--hair-2)' }}
        />
      ) : (
        <div
          role="img"
          aria-label={project.name}
          style={{
            width: '100%', aspectRatio: '16 / 10', background: 'var(--grad-hero)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: 26, textAlign: 'center', padding: 16,
          }}
        >
          {project.name}
        </div>
      )}
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
              {project.cta} →
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
