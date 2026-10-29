import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 20, alignItems: 'baseline', padding: '26px 0', borderBottom: '1px solid var(--ink)' }}>
      <NavLink to="/" end className="brand" aria-label="theonenonlyvj, home">
        theonenonly<em>vj</em>
      </NavLink>
      <div className="nav-links" style={{ display: 'flex', gap: 28, marginLeft: 'auto', fontSize: 15 }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: 600,
              color: isActive ? 'var(--red)' : 'var(--ink-2)',
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
