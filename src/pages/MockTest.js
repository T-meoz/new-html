import React, { useState, useMemo } from 'react';
import QuestionCard from '../components/QuestionCard';
import NavBar from '../components/NavBar';
import './MockTest.css';

/*
  Mock data: bạn có thể thay bằng dữ liệu thật hoặc fetch từ API.
  Mỗi câu có id, text, choices (mảng).
*/
const initialQuestions = [
  {
    id: 1,
    text: 'What is the capital of France?',
    choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctIndex: 2,
  },
  {
    id: 2,
    text: 'Which language runs in a web browser?',
    choices: ['Java', 'C', 'Python', 'JavaScript'],
    correctIndex: 3,
  },
  {
    id: 3,
    text: 'What does CSS stand for?',
    choices: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    correctIndex: 1,
  },
];

export default function MockTest() {
  const [questions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  // selectedAnswers: object { [questionId]: selectedIndex }
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const answeredCount = useMemo(() => Object.keys(selectedAnswers).length, [selectedAnswers]);

  const handleChoiceSelect = (questionId, choiceIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: choiceIndex,
    }));
  };

  const goPrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const currentQuestion = questions[currentIndex];
  const selectedIndexForCurrent = selectedAnswers[currentQuestion.id] ?? null;

  const score = useMemo(() => {
    if (!submitted) return null;
    let s = 0;
    for (const q of questions) {
      const sel = selectedAnswers[q.id];
      if (typeof sel === 'number' && sel === q.correctIndex) s += 1;
    }
    return s;
  }, [submitted, selectedAnswers, questions]);

  return (
    <div className="mocktest-container">
      <NavBar
        currentIndex={currentIndex}
        total={total}
        onPrev={goPrev}
        onNext={goNext}
        onSubmit={handleSubmit}
        answeredCount={answeredCount}
      />

      {!submitted ? (
        <main className="mocktest-main">
          <QuestionCard
            question={currentQuestion}
            selectedIndex={selectedIndexForCurrent}
            onChoiceSelect={handleChoiceSelect}
          />
        </main>
      ) : (
        <main className="mocktest-summary">
          <h2>Summary</h2>
          <p>
            You answered {answeredCount} out of {total} questions.
          </p>
          <p>
            Score: {score} / {total}
          </p>
          <ol>
            {questions.map((q) => {
              const sel = selectedAnswers[q.id];
              return (
                <li key={q.id}>
                  <div className="summary-question">{q.text}</div>
                  <div className="summary-answers">
                    Your answer:{' '}
                    {typeof sel === 'number' ? (
                      <strong>{q.choices[sel]}</strong>
                    ) : (
                      <em>Not answered</em>
                    )}
                    {typeof sel === 'number' && sel === q.correctIndex && (
                      <span className="correct"> ✓</span>
                    )}
                    {typeof sel === 'number' && sel !== q.correctIndex && (
                      <span className="incorrect"> ✗ (Correct: {q.choices[q.correctIndex]})</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </main>
      )}
    </div>
  );
}