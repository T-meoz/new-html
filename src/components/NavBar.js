import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

export default function NavBar({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSubmit,
  answeredCount,
}) {
  return (
    <header className="mocktest-navbar" role="navigation" aria-label="Mock test navigation">
      <div className="nav-left">
        <strong>Question {currentIndex + 1} / {total}</strong>
        <span className="progress">Answered: {answeredCount}/{total}</span>
      </div>
      <div className="nav-right">
        <button type="button" onClick={onPrev} disabled={currentIndex === 0}>
          Prev
        </button>
        {currentIndex < total - 1 ? (
          <button type="button" onClick={onNext}>
            Next
          </button>
        ) : (
          <button type="button" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </header>
  );
}

NavBar.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  answeredCount: PropTypes.number.isRequired,
};