import { screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { renderWithRouter } from '../test-utils'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import About from '../pages/About'
import Contact from '../pages/Contact'
import { projects } from '../data/projects'

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

test('Home shows the playground hero', () => {
  r(<Home />)
  expect(screen.getByRole('heading', { name: /theonenonlyvj/i })).toBeInTheDocument()
  expect(screen.getByText(/welcome to my playground/i)).toBeInTheDocument()
})

test('Home shows every project', () => {
  r(<Home />)
  for (const p of projects) {
    expect(screen.getByText(p.name)).toBeInTheDocument()
  }
})

test('About surfaces the real proof points', () => {
  r(<About />)
  const text = document.body.textContent ?? ''
  expect(text).toMatch(/Sales Leader and Operator/i)
  expect(text).toMatch(/Duke/)
  expect(text).toMatch(/NeuroPace/)
  expect(text).toMatch(/Podimetrics/)
  expect(text).toMatch(/epilepsy/i)
})

test('About contains no job-hunt signal (stealth)', () => {
  r(<About />)
  const text = (document.body.textContent ?? '').toLowerCase()
  for (const bad of ['open to work', 'seeking', 'available for hire', 'hire me', 'resume', 'résumé', 'curriculum vitae']) {
    expect(text).not.toContain(bad)
  }
})

test('Contact offers LinkedIn and nothing that leaks private info', () => {
  r(<Contact />)
  const li = screen.getByRole('link', { name: /linkedin/i })
  expect(li).toHaveAttribute('href', 'https://www.linkedin.com/in/ramvijay')
  const text = document.body.textContent ?? ''
  expect(text).not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)  // no email
  expect(text).not.toMatch(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)      // no phone
  expect(screen.queryByText(/resume|résumé/i)).toBeNull()             // no résumé
})
