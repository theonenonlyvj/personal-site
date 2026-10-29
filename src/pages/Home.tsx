import { Link } from 'react-router-dom'
import { useState } from 'react'
import { projects, homeProjects } from '../data/projects'
import type { Project } from '../types'

export default function Home() {
  const onHome = new Set(homeProjects().map(p => p.slug))
  const rest = projects.filter(p => !onHome.has(p.slug))
  return (
    <section>
      <header className="hero">
        <h1>Things I build for fun.</h1>
        <p className="lede">
          Each one started as a question I could not drop. What plane is that over the house right now? Can I get from
          Dosa to Jimmy Carter in five Wikipedia clicks? Where have I actually flown? Can a baby-tracker button work with
          no cloud behind it? Can I rebuild a card game so we can play it on the couch? The answers live here. Start with
          these five.
        </p>
      </header>

      <h2 style={{ position: 'absolute', left: -9999 }}>Projects</h2>
      <div className="rows">
        {homeProjects().map((p, i) => <Row key={p.slug} project={p} flip={i % 2 === 1} />)}
      </div>

      <Link to="/projects" className="rest" aria-label={`See all ${projects.length} projects`}>
        <span className="title">See all {projects.length} projects <span aria-hidden="true">→</span></span>
        <ul aria-hidden="true">
          {rest.map(p => (
            <li key={p.slug}><b>{p.name}</b><span>{p.status === 'live' ? (p.badge ?? 'Live') : 'Coming soon'}</span></li>
          ))}
        </ul>
      </Link>
    </section>
  )
}

function Row({ project: p, flip }: { project: Project; flip: boolean }) {
  const [imgOk, setImgOk] = useState(true)
  const live = p.status === 'live' && p.liveUrl
  return (
    <article className={flip ? 'row flip' : 'row'}>
      <div className="shot">
        {imgOk ? (
          <img
            src={`${import.meta.env.BASE_URL}${p.thumbnail.replace(/^\//, '')}`}
            alt={p.name}
            onError={() => setImgOk(false)}
            style={{
              objectFit: p.thumbFit ?? 'cover',
              objectPosition: p.thumbPosition ?? '50% 0%',
              background: p.thumbFit === 'contain' ? '#fff6e5' : undefined,
            }}
          />
        ) : (
          <div className="poster" role="img" aria-label={p.name} />
        )}
      </div>
      <div>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        <div className="links">
          {live ? (
            <a href={p.liveUrl!} target="_blank" rel="noopener noreferrer">{p.cta}</a>
          ) : (
            <span className="soon">Coming soon</span>
          )}
          {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {p.secondaryLink && (
            <a href={p.secondaryLink.url} target="_blank" rel="noopener noreferrer">{p.secondaryLink.label}</a>
          )}
          {p.badge && <span className="note">{p.badge}</span>}
        </div>
      </div>
    </article>
  )
}
