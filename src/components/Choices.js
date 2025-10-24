import React from 'react';
import PropTypes from 'prop-types';
import './Choices.css';

export default function Choices({ choices, selectedIndex, onSelect }) {
  return (
    <ul className="choices-list" role="list">
      {choices.map((choice, idx) => (
        <li key={idx} className="choice-item">
          <button
            type="button"
            className={`choice-button ${selectedIndex === idx ? 'selected' : ''}`}
            onClick={() => onSelect(idx)}
            aria-pressed={selectedIndex === idx}
          >
            <span className="choice-label">{String.fromCharCode(65 + idx)}.</span>
            <span className="choice-text">{choice}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

Choices.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

Choices.defaultProps = {
  selectedIndex: null,
};