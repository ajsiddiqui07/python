import { useEffect } from 'react';

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="ticket-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close dialog"
          className="modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <span className="eyebrow">ONE NIGHT, ALL THE FEELS</span>
        <h2 id="modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}

export default Modal;
