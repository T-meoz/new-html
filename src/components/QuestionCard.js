import React from 'react';
import PropTypes from 'prop-types';
import Choices from './Choices';
import './QuestionCard.css';

export default function QuestionCard({ question, selectedIndex, onChoiceSelect }) {
  if (!question) return null;

  return (
    <div className="question-card" data-question-id={question.id}>
      <h2 className="question-text">{question.text}</h2>
      <Choices
        choices={question.choices}
        selectedIndex={selectedIndex}
        onSelect={(idx) => onChoiceSelect(question.id, idx)}
      />
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  selectedIndex: PropTypes.number,
  onChoiceSelect: PropTypes.func.isRequired,
};

QuestionCard.defaultProps = {
  selectedIndex: null,
};