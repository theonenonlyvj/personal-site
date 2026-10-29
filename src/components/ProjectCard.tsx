import type { Project } from '../types'
import { useState } from 'react'

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === 'live' && project.liveUrl
  const [imgOk, setImgOk] = useState(true)
  return (
    <article
      style={{
        background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--hair)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative' }}>
        {imgOk ? (
          <img
            src={`${import.meta.env.BASE_URL}${project.thumbnail.replace(/^\//, '')}`}
            alt={project.name}
            onError={() => setImgOk(false)}
            style={{ display: 'block', width: '100%', aspectRatio: '16 / 10', objectFit: project.thumbFit ?? 'cover', objectPosition: project.thumbPosition ?? 'center', background: project.thumbFit === 'contain' ? '#ffffff' : 'var(--hair-2)' }}
          />
        ) : (
          <div
            role="img"
            aria-label={project.name}
            style={{
              width: '100%', aspectRatio: '16 / 10', background: 'var(--hair-2)', color: 'var(--ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 600,
              fontSize: 26, textAlign: 'center', padding: 16,
            }}
          >
            {project.name}
          </div>
        )}
        {project.badge && (
          <span
            style={{
              position: 'absolute', bottom: 12, left: 12,
              background: '#fff', color: 'var(--red)', fontWeight: 700, fontSize: 13,
              padding: '5px 10px', borderRadius: 'var(--radius-sm)',
            }}
          >
            {project.badge}
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--pad)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 28 }}>{project.name}</h3>
        <p style={{ margin: 0, color: 'var(--ink-2)', flex: 1 }}>{project.blurb}</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {isLive ? (
            <a
              href={project.liveUrl!}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 700, color: 'var(--ink)',
              }}
            >
              {project.cta} →
            </a>
          ) : (
            <span
              style={{
                fontWeight: 700, color: 'var(--ink-2)',
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
        {project.secondaryLink && (
          <a
            href={project.secondaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}
          >
            {project.secondaryLink.label} →
          </a>
        )}
      </div>
    </article>
  )
}
