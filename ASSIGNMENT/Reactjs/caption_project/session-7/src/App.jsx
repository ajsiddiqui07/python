import { ArrowDown, ArrowUpRight, Feather, Github, Sparkles } from 'lucide-react';
import AiQuoteGenerator from './components/AiQuoteGenerator.jsx';
import BlogSummaryForm from './components/BlogSummaryForm.jsx';
import ResumeSummaryForm from './components/ResumeSummaryForm.jsx';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Kindred home">
          <span className="brand-mark"><Feather size={17} /></span>
          <span>kindred<span className="brand-period">.</span></span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#quote">Daily spark</a>
          <a href="#resume">Resume notes</a>
          <a href="#blog">Blog digest</a>
        </nav>
        <a className="header-cta" href="#quote">Find a little clarity <ArrowUpRight size={14} /></a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-kicker"><span /> A SMALL STUDIO FOR BIG IDEAS</span>
            <h1>Words for your<br /><em>next good thing.</em></h1>
            <p>A spark to get you going. A clearer story to take you further. Thoughtful AI, with a human touch.</p>
            <a className="hero-scroll" href="#quote">WANDER A LITTLE <ArrowDown size={14} /></a>
          </div>
          <div className="hero-art">
            <div className="art-backdrop" />
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85"
              alt="Notebook and pen ready for a fresh idea"
            />
            <div className="note-card"><Sparkles size={16} /><span>A thought, just for today</span></div>
            <span className="hero-number">01 <i /> 03</span>
          </div>
        </section>

        <section className="intro-row">
          <div><span className="section-eyebrow">YOUR WORDS, WITH A LITTLE HELP</span><h2>Start anywhere.</h2></div>
          <p>Pick a prompt, bring a rough draft, or just see where a different tone takes you.</p>
        </section>

        <section className="tool-grid" aria-label="AI writing tools">
          <AiQuoteGenerator />
          <ResumeSummaryForm />
          <BlogSummaryForm />
        </section>

        <section className="closing-note">
          <span className="closing-mark"><Feather size={16} /></span>
          <p>Make it yours. <em>Then make it matter.</em></p>
          <span className="closing-decoration" aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">kindred<span>.</span></a>
        <span>THOUGHTFUL TOOLS FOR THE WORDS THAT MATTER</span>
        <a href="https://platform.openai.com/docs/api-reference/completions" target="_blank" rel="noreferrer">HOW IT WORKS <Github size={12} /></a>
      </footer>
    </div>
  );
}

export default App;
