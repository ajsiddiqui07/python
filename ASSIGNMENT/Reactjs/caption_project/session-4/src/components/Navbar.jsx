const navItems = ['Home', 'Orders', 'Cart', 'Profile'];

function Navbar({ activeLink, onNavigate }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Biteclub home">
        <span className="wordmark-mark" aria-hidden="true">
          b.
        </span>
        biteclub
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const href = {
            Home: '#home',
            Orders: '#orders',
            Cart: '#tickets',
            Profile: '#profile',
          }[item];

          return (
            <a
              className={`nav-link${activeLink === item ? ' is-active' : ''}`}
              href={href}
              key={item}
              aria-current={activeLink === item ? 'page' : undefined}
              onClick={() => onNavigate(item)}
            >
              {item}
              {item === 'Cart' && <span className="cart-count">2</span>}
            </a>
          );
        })}
      </nav>
      <a className="header-cta" href="#profile">
        Join the club <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Navbar;
