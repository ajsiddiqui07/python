function DynamicForm({ title, fields, submitLabel, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(new FormData(event.currentTarget));
  }

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {title && <h3>{title}</h3>}
      <div className="form-grid">
        {fields.map((field) => (
          <label
            className={`form-field${field.fullWidth ? ' full-width' : ''}`}
            htmlFor={field.name}
            key={field.name}
          >
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select
                autoComplete={field.autoComplete}
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
              >
                <option disabled value="">
                  {field.placeholder}
                </option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                autoComplete={field.autoComplete}
                id={field.name}
                max={field.max}
                min={field.min}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                type={field.type}
              />
            )}
          </label>
        ))}
      </div>
      <button className="button button-dark form-submit" type="submit">
        {submitLabel} <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

export default DynamicForm;
