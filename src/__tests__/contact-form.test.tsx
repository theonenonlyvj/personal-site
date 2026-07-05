import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, test, expect, beforeEach, afterEach } from 'vitest'

// Mock the endpoint so the form is enabled in tests.
vi.mock('../config', () => ({ CONTACT_ENDPOINT: 'https://script.google.com/macros/s/TEST/exec' }))

import { ContactForm } from '../components/ContactForm'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true } as Response)))
})
afterEach(() => vi.unstubAllGlobals())

test('submits the message to the endpoint and shows a confirmation', async () => {
  render(<ContactForm />)
  fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByPlaceholderText(/on your mind/i), { target: { value: 'hey there' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
  const [url, opts] = (fetch as any).mock.calls[0]
  expect(url).toBe('https://script.google.com/macros/s/TEST/exec')
  expect(opts.method).toBe('POST')
  expect((opts.body as FormData).get('message')).toBe('hey there')

  await waitFor(() => expect(screen.getByText(/got your note/i)).toBeInTheDocument())
})

test('does not submit an empty message', () => {
  render(<ContactForm />)
  fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Ada' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(fetch).not.toHaveBeenCalled()
})

test('does not submit without a name', () => {
  render(<ContactForm />)
  fireEvent.change(screen.getByPlaceholderText(/on your mind/i), { target: { value: 'hi' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(fetch).not.toHaveBeenCalled()
})

test('honeypot submission is dropped without hitting the endpoint', () => {
  const { container } = render(<ContactForm />)
  fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByPlaceholderText(/on your mind/i), { target: { value: 'spam' } })
  const honeypot = container.querySelector('input[name="company"]') as HTMLInputElement
  fireEvent.change(honeypot, { target: { value: 'bot-filled-this' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))
  expect(fetch).not.toHaveBeenCalled()
})
