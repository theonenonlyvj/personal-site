import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

test('App renders the site owner name', () => {
  render(<App />, { wrapper: MemoryRouter })
  expect(screen.getByRole('heading', { name: /vijay ram/i })).toBeInTheDocument()
})
