import { useState } from 'react';
import { ArrowRight, LoaderCircle, Quote, RefreshCw, Sparkles } from 'lucide-react';
import { generateQuote } from '../api.js';

const tones = ['inspirational', 'funny', 'serious'];

function AiQuoteGenerator() {
  const [tone, setTone] = useState('inspirational');
  const [quote, setQuote] = useState('');
  const [generatedTone, setGeneratedTone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError('');
    try {
      const result = await generateQuote(tone);
      setQuote(result.quote);
      setGeneratedTone(result.tone);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="studio-card quote-card" id="quote">
      <div className="card-topline">
        <span className="card-index">01 / DAILY SPARK</span>
        <span className="card-icon"><Quote size={17} /></span>
      </div>
      <h2>A thought to<br /><em>carry with you.</em></h2>
      <p className="card-description">A fresh little nudge, shaped to the mood you need today.</p>
      <label className="field-label" htmlFor="quote-tone">SET THE TONE</label>
      <div className="tone-picker" id="quote-tone" role="group" aria-label="Quote tone">
        {tones.map((option) => (
          <button
            aria-pressed={tone === option}
            className={tone === option ? 'tone-option selected' : 'tone-option'}
            key={option}
            onClick={() => setTone(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <button className="action-button" disabled={loading} onClick={handleGenerate} type="button">
        {loading ? <LoaderCircle className="spin" size={16} /> : <Sparkles size={16} />}
        {loading ? 'Finding your words…' : quote ? 'Another little nudge' : 'Find me a quote'}
        {!loading && <ArrowRight size={15} />}
      </button>
      {error && <p className="error-message" role="alert">{error}</p>}
      {quote && (
        <div className="quote-result" aria-live="polite">
          <span className="result-label"><span /> {generatedTone.toUpperCase()} NOTE</span>
          <blockquote>“{quote}”</blockquote>
          <button className="subtle-button" onClick={handleGenerate} type="button">
            <RefreshCw size={13} /> Try another tone
          </button>
        </div>
      )}
    </section>
  );
}

export default AiQuoteGenerator;
