import { useState } from 'react'
import { CONTACT_ENDPOINT } from '../config'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  if (!CONTACT_ENDPOINT) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value ?? ''
    if (status === 'sending' || !name.trim() || !message.trim()) return
    // Honeypot: real users leave this hidden field empty; bots fill it.
    if ((form.elements.namedItem('company') as HTMLInputElement)?.value) {
      setStatus('sent') // pretend success, drop silently
      return
    }
    setStatus('sending')
    try {
      // no-cors: the request reaches Apps Script; we can't read the response,
      // so we optimistically confirm. Fine for a low-volume personal form.
      await fetch(CONTACT_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new FormData(form) })
      setStatus('sent')
      form.reset()
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p style={{ marginTop: 28, color: 'var(--ink-2)' }}>
        Thanks — got your note. I'll see it next time I check. 🤝
      </p>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 10,
    border: '1px solid var(--hair)', background: 'var(--card)', color: 'var(--ink)',
    font: 'inherit',
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0, color: 'var(--ink-2)' }}>Or just drop a note:</p>
      <input name="name" type="text" required placeholder="Your name" style={inputStyle} autoComplete="off" />
      <input name="contact" type="text" placeholder="How to reach you back (optional)" style={inputStyle} autoComplete="off" />
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What's on your mind?"
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      {/* honeypot — visually hidden, off-screen; bots fill it, humans don't */}
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            fontWeight: 600, color: '#fff', background: 'var(--grad-hero)',
            padding: '10px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
            opacity: status === 'sending' ? 0.6 : 1,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send →'}
        </button>
        {status === 'error' && (
          <span style={{ color: 'var(--coral, #ff3d57)', fontSize: 14 }}>
            Something went wrong — LinkedIn's a safe bet.
          </span>
        )}
      </div>
    </form>
  )
}
