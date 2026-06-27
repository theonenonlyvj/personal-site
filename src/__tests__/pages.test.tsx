import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Projects from '../pages/Projects'
import { projects } from '../data/projects'

function r(ui: React.ReactElement) { return renderWithRouter(ui) }

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
