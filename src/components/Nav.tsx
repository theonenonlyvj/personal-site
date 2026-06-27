import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '20px 0' }}>
      <NavLink to="/" end style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, textDecoration: 'none', color: 'var(--ink)' }}>
        VR
      </NavLink>
      <div style={{ display: 'flex', gap: 18, marginLeft: 'auto' }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: 600,
              color: isActive ? 'var(--indigo)' : 'var(--ink-2)',
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
