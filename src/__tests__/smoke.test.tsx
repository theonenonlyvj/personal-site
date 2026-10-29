import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import App from '../App'

test('App renders the wordmark as the nav logo', () => {
  renderWithRouter(<App />)
  expect(screen.getByRole('link', { name: /theonenonlyvj/i })).toHaveAttribute('href', '/')
})
