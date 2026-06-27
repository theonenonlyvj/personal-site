import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement } from 'react'

const FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const

/** Render a component inside a MemoryRouter (with v7 future flags set, so test output stays pristine). */
export function renderWithRouter(ui: ReactElement, { route = '/' }: { route?: string } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]} future={FUTURE}>{ui}</MemoryRouter>,
  )
}
