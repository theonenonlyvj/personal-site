import App from '../App'
import { renderWithRouter } from '../test-utils'

const ROUTES = ['/', '/projects', '/about', '/contact']
const FORBIDDEN = [
  /open to work/i, /seeking/i, /available for hire/i, /hire me/i,
  /\bresume\b/i, /résumé/i, /curriculum vitae/i, /\bCV\b/,
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,   // email
  /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,        // phone
]

test('no route renders any job-hunt signal or private contact info', () => {
  for (const route of ROUTES) {
    const { container, unmount } = renderWithRouter(<App />, { route })
    const text = container.textContent ?? ''
    for (const pat of FORBIDDEN) {
      expect(text, `route ${route} violated ${pat}`).not.toMatch(pat)
    }
    unmount()
  }
})
