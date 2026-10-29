export const LINKEDIN_URL = 'https://www.linkedin.com/in/ramvijay'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--ink)', marginTop: 64, padding: '36px 0 40px', color: 'var(--ink-2)' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>© Vijay Ram</span>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontWeight: 600 }}>
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
