import { screen, within } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import App from '../App'

function renderAt(path: string) {
  return renderWithRouter(<App />, { route: path })
}

test('nav exposes the four pages', () => {
  renderAt('/')
  const nav = screen.getByRole('navigation')
  for (const label of ['Home', 'Projects', 'About', 'Contact']) {
    expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
  }
})

test('footer links to LinkedIn and contains no email or phone', () => {
  renderAt('/')
  const footer = screen.getByRole('contentinfo')
  const li = within(footer).getByRole('link', { name: /linkedin/i })
  expect(li).toHaveAttribute('href', 'https://www.linkedin.com/in/ramvijay')
  expect(footer.textContent ?? '').not.toMatch(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i)
  expect(footer.textContent ?? '').not.toMatch(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)
})

test('routing renders the matching page', () => {
  renderAt('/projects')
  expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
})
