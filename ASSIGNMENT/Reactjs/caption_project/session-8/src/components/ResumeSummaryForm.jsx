import { useState } from 'react';
import { ArrowRight, FileText, LoaderCircle, Sparkles } from 'lucide-react';
import { generateResumeSummary } from '../api.js';

const initialDetails = { name: '', experience: '', skills: '' };

function ResumeSummaryForm() {
  const [details, setDetails] = useState(initialDetails);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await generateResumeSummary(details);
      setSummary(result.summary);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="studio-card resume-card" id="resume">
      <div className="card-topline">
        <span className="card-index">02 / YOUR NEXT CHAPTER</span>
        <span className="card-icon"><FileText size={17} /></span>
      </div>
      <h2>Your story,<br /><em>in two lines.</em></h2>
      <p className="card-description">Share the highlights. We’ll find the words that sound like you.</p>
      <form className="studio-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="resume-name">YOUR NAME</label>
        <input
          autoComplete="name"
          id="resume-name"
          maxLength={100}
          name="name"
          onChange={handleChange}
          placeholder="e.g. Alex Morgan"
          required
          value={details.name}
        />
        <label className="field-label" htmlFor="resume-experience">EXPERIENCE</label>
        <textarea
          id="resume-experience"
          maxLength={1200}
          name="experience"
          onChange={handleChange}
          placeholder="Your role, years in the field, and a win you’re proud of…"
          required
          rows={3}
          value={details.experience}
        />
        <label className="field-label" htmlFor="resume-skills">SKILLS YOU BRING</label>
        <input
          id="resume-skills"
          maxLength={600}
          name="skills"
          onChange={handleChange}
          placeholder="e.g. Product strategy, research, team leadership"
          required
          value={details.skills}
        />
        <button className="action-button" disabled={loading} type="submit">
          {loading ? <LoaderCircle className="spin" size={16} /> : <Sparkles size={16} />}
          {loading ? 'Writing your summary…' : 'Write my summary'}
          {!loading && <ArrowRight size={15} />}
        </button>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}
      {summary && (
        <div className="summary-result" aria-live="polite">
          <span className="result-label"><span /> YOUR TWO-LINE SUMMARY</span>
          {summary.split(/\r?\n/).map((line, index) => <p key={`${index}-${line}`}>{line}</p>)}
        </div>
      )}
    </section>
  );
}

export default ResumeSummaryForm;
