function Footer({ socialLinks }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="wordmark footer-wordmark" href="#home">
          <span className="wordmark-mark" aria-hidden="true">
            b.
          </span>
          biteclub
        </a>
        <p>Good food, good music, good company.</p>
        <div className="social-links" aria-label="Social media">
          {socialLinks.map(({ name, href, icon }) => (
            <a
              className="social-link"
              href={href}
              key={name}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden="true">{icon}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Biteclub. Made for the good days.</span>
        <div>
          <a href="#home">Privacy</a>
          <a href="#home">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
