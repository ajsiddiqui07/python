import { ArrowDown, ArrowUpRight, Check, Cloud, Globe2, Rocket } from 'lucide-react';

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Launchpad home">
          <span className="brand-icon"><Rocket size={17} /></span>
          <span>launchpad<span className="brand-dot">.</span></span>
        </a>
        <a className="top-link" href="#deployment">
          Deployment notes <ArrowUpRight size={14} />
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow"><span /> FIRST DEPLOYMENT, NICE AND SIMPLE</span>
          <h1>React<br />Deployment<br /><em>Test</em></h1>
          <p>
            A tiny React homepage with a big job: prove the build, ship the app,
            and make sure the root URL just works.
          </p>
          <a className="primary-link" href="#deployment">
            See deployment targets <ArrowDown size={15} />
          </a>
          <div className="status-note"><Check size={14} /><span>Build-ready · SPA routing configured</span></div>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="planet"><Rocket size={41} strokeWidth={1.2} /></div>
          <span className="graphic-star star-one">✳</span>
          <span className="graphic-star star-two">✦</span>
          <span className="graphic-caption">A SMALL STEP<br />FOR THIS APP</span>
        </div>
      </section>

      <section className="deployment" id="deployment">
        <div className="section-heading">
          <div><span className="section-label">READY FOR LIFTOFF</span><h2>One build.<br /><em>Three ways to ship.</em></h2></div>
          <p>The production build lands in <code>dist/</code>. Each hosting config rewrites app routes to the homepage, preventing root and SPA refresh 404s.</p>
        </div>
        <div className="target-grid">
          <article className="target-card">
            <span className="target-icon firebase"><Cloud size={18} /></span>
            <span className="target-kicker">HOSTING TARGET 01</span>
            <h3>Firebase Hosting</h3>
            <p>Static build output and a catch-all rewrite are set up in <code>firebase.json</code>.</p>
            <span className="target-status"><span /> Needs your Firebase project</span>
          </article>
          <article className="target-card">
            <span className="target-icon netlify"><Globe2 size={18} /></span>
            <span className="target-kicker">HOSTING TARGET 02</span>
            <h3>Netlify</h3>
            <p>Build and publish settings plus the SPA redirect live in <code>netlify.toml</code>.</p>
            <span className="target-status"><span /> Ready to link a site</span>
          </article>
          <article className="target-card">
            <span className="target-icon vercel"><Rocket size={18} /></span>
            <span className="target-kicker">HOSTING TARGET 03</span>
            <h3>Vercel</h3>
            <p>The output folder and fallback rewrite are configured in <code>vercel.json</code>.</p>
            <span className="target-status"><span /> Ready to link a project</span>
          </article>
        </div>
      </section>

      <footer className="page-footer">
        <span className="footer-brand">launchpad<span>.</span></span>
        <span>A tiny React app, ready for a real URL.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

export default App;
