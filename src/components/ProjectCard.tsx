import type { Project } from '../types'
import { useState } from 'react'

export function ProjectCard({ project }: { project: Project }) {
  const isLive = project.status === 'live' && project.liveUrl
  const [imgOk, setImgOk] = useState(true)
  return (
    <article
      style={{
        background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden',
        boxShadow: project.highlight ? 'var(--shadow), 0 0 0 4px rgba(255,61,87,.14)' : 'var(--shadow)',
        border: project.highlight ? '2px solid var(--coral)' : '2px solid transparent',
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
              width: '100%', aspectRatio: '16 / 10', background: 'var(--grad-hero)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600,
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
              background: 'var(--grad-hero)', color: '#fff', fontWeight: 700, fontSize: 13,
              padding: '6px 12px', borderRadius: 999, letterSpacing: '.2px',
              boxShadow: '0 2px 10px rgba(0,0,0,.28)',
            }}
          >
            {project.badge}
          </span>
        )}
      </div>
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
