import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import App from '../App'

test('App renders the site owner name', () => {
  renderWithRouter(<App />)
  expect(screen.getByRole('heading', { name: /vijay ram/i })).toBeInTheDocument()
})
