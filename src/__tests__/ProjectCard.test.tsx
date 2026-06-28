import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectCard } from '../components/ProjectCard'
import type { Project } from '../types'

const live: Project = {
  slug: 'demo', name: 'Demo App', blurb: 'A demo.', repo: 'https://github.com/x/demo',
  liveUrl: 'https://demo.example.com/', status: 'live', thumbnail: '/screenshots/demo.png', featured: false,
  cta: 'Play',
}
const soon: Project = {
  slug: 'soon', name: 'Soon App', blurb: 'Later.', repo: null,
  liveUrl: null, status: 'coming-soon', thumbnail: '/screenshots/soon.png', featured: false,
  cta: 'Use',
}

test('live card shows name, blurb, a live link to the URL, and a GitHub link', () => {
  render(<ProjectCard project={live} />)
  expect(screen.getByText('Demo App')).toBeInTheDocument()
  expect(screen.getByText('A demo.')).toBeInTheDocument()
  const liveLink = screen.getByRole('link', { name: /live|play|demo|open/i })
  expect(liveLink).toHaveAttribute('href', 'https://demo.example.com/')
  expect(liveLink).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('link', { name: /github|code/i })).toHaveAttribute('href', 'https://github.com/x/demo')
})

test('coming-soon card shows a badge and no live link', () => {
  render(<ProjectCard project={soon} />)
  expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  expect(screen.queryByRole('link', { name: /live|play|demo|open/i })).toBeNull()
})

test('thumbnail uses the project name as alt text', () => {
  render(<ProjectCard project={live} />)
  expect(screen.getByAltText('Demo App')).toHaveAttribute('src', '/screenshots/demo.png')
})

test('falls back to a gradient poster when the thumbnail fails to load', () => {
  render(<ProjectCard project={live} />)
  fireEvent.error(screen.getByAltText('Demo App'))
  // after error, the <img> is replaced by a poster div exposing the name via aria-label
  const poster = screen.getByRole('img', { name: 'Demo App' })
  expect(poster.tagName).toBe('DIV')
})
