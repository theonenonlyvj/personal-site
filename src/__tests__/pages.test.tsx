import { screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { renderWithRouter } from '../test-utils'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import { projects, featuredProjects } from '../data/projects'

function r(ui: ReactElement) { return renderWithRouter(ui) }

test('Projects page renders a card for every project', () => {
  r(<Projects />)
  for (const p of projects) {
    expect(screen.getByText(p.name)).toBeInTheDocument()
  }
})

test('Projects page links live projects to their demo URLs', () => {
  r(<Projects />)
  const live = projects.filter(p => p.status === 'live')
  const hrefs = screen.getAllByRole('link').map(a => a.getAttribute('href'))
  for (const p of live) expect(hrefs).toContain(p.liveUrl)
})

test('Home shows the name heading and the builder tagline', () => {
  r(<Home />)
  expect(screen.getByRole('heading', { name: /vijay ram/i })).toBeInTheDocument()
  expect(screen.getByText(/builder/i)).toBeInTheDocument()
})

test('Home features at least one project with a link into Projects', () => {
  r(<Home />)
  expect(featuredProjects().length).toBeGreaterThan(0)
  expect(screen.getAllByText(featuredProjects()[0].name).length).toBeGreaterThan(0)
  // a "see all" route link to /projects exists
  const toProjects = screen.getByRole('link', { name: /projects|all|see/i })
  expect(toProjects).toHaveAttribute('href', '/projects')
})
