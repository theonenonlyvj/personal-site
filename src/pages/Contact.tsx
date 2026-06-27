import { LINKEDIN_URL } from '../components/Footer'

export default function Contact() {
  return (
    <section style={{ maxWidth: 560 }}>
      <h1>Contact</h1>
      <p>
        Want to build something — or just nerd out about neurotech, health data, or board games?
        I'm most responsive on LinkedIn.
      </p>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block', marginTop: 8, fontWeight: 600, color: '#fff',
          background: 'var(--grad-hero)', padding: '12px 22px', borderRadius: 999, textDecoration: 'none',
        }}
      >
        Find me on LinkedIn →
      </a>
    </section>
  )
}
