import { projects, featuredProjects } from '../data/projects'

test('every project has required fields and a unique slug', () => {
  const slugs = new Set<string>()
  for (const p of projects) {
    expect(p.slug).toMatch(/^[a-z0-9-]+$/)
    expect(slugs.has(p.slug)).toBe(false)
    slugs.add(p.slug)
    expect(p.name.length).toBeGreaterThan(0)
    expect(p.blurb.length).toBeGreaterThan(0)
    expect(p.thumbnail.length).toBeGreaterThan(0)
    expect(p.cta.length).toBeGreaterThan(0)
  }
})

test('live projects have a liveUrl; coming-soon projects do not', () => {
  for (const p of projects) {
    if (p.status === 'live') expect(p.liveUrl).toBeTruthy()
    else expect(p.liveUrl).toBeNull()
  }
})

test('there is at least one featured project and all featured are live', () => {
  const f = featuredProjects()
  expect(f.length).toBeGreaterThanOrEqual(1)
  expect(f.every(p => p.status === 'live')).toBe(true)
})

test('no project text leaks contact info (stealth)', () => {
  const blob = projects.map(p => `${p.name} ${p.blurb}`).join(' ')
  expect(blob).not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)
  expect(blob).not.toMatch(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
})
