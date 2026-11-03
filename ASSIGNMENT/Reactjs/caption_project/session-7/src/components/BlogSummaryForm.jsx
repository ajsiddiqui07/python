import { useState } from 'react';
import { ArrowRight, BookOpenText, LoaderCircle, Sparkles } from 'lucide-react';
import { fetchBlogSummary } from '../api.js';

function BlogSummaryForm() {
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await fetchBlogSummary(prompt);
      setSummary(result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="studio-card blog-card" id="blog">
      <div className="card-topline">
        <span className="card-index">03 / A CLEARER PICTURE</span>
        <span className="card-icon"><BookOpenText size={17} /></span>
      </div>
      <h2>Big ideas,<br /><em>made simple.</em></h2>
      <p className="card-description">Drop in a blog topic or draft. Get the heart of it, minus the scroll.</p>
      <form className="studio-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="blog-prompt">BLOG TOPIC OR DRAFT</label>
        <textarea
          id="blog-prompt"
          maxLength={3000}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What’s the big idea?"
          required
          rows={4}
          value={prompt}
        />
        <span className="character-count">{prompt.length}/3000</span>
        <button className="action-button" disabled={loading} type="submit">
          {loading ? <LoaderCircle className="spin" size={16} /> : <Sparkles size={16} />}
          {loading ? 'Finding the throughline…' : 'Summarize this idea'}
          {!loading && <ArrowRight size={15} />}
        </button>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}
      {summary && (
        <div className="summary-result blog-result" aria-live="polite">
          <span className="result-label"><span /> THE SHORT VERSION</span>
          <p>{summary}</p>
        </div>
      )}
    </section>
  );
}

export default BlogSummaryForm;
