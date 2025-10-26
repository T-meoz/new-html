const { useState } = React;

const QUESTIONS = [
  {
    id: 1,
    text: "Choose the correct sentence:",
    choices: [
      "She don't like coffee.",
      "She doesn't likes coffee.",
      "She doesn't like coffee.",
      "She not likes coffee."
    ],
    correctIndex: 2
  },
  {
    id: 2,
    text: "Complete the sentence: I have lived in this city _____ five years.",
    choices: ["since", "for", "during", "in"],
    correctIndex: 1
  },
  {
    id: 3,
    text: "Which word is a synonym of 'happy'?",
    choices: ["sad", "angry", "joyful", "tired"],
    correctIndex: 2
  },
  {
    id: 4,
    text: "Choose the correct form: If it _____ tomorrow, we will stay at home.",
    choices: ["rains", "rain", "will rain", "raining"],
    correctIndex: 0
  },
  {
    id: 5,
    text: "What is the past tense of 'go'?",
    choices: ["goed", "went", "gone", "going"],
    correctIndex: 1
  },
  {
    id: 6,
    text: "Choose the correct preposition: She is interested _____ learning languages.",
    choices: ["on", "in", "at", "to"],
    correctIndex: 1
  },
  {
    id: 7,
    text: "Which sentence is in the passive voice?",
    choices: [
      "The teacher explains the lesson.",
      "The lesson is explained by the teacher.",
      "The teacher is explaining the lesson.",
      "The lesson explains by the teacher."
    ],
    correctIndex: 1
  },
  {
    id: 8,
    text: "Choose the correct word: There aren’t _____ apples left.",
    choices: ["some", "a", "any", "the"],
    correctIndex: 2
  },
  {
    id: 9,
    text: "Find the mistake: He can to swim very well.",
    choices: [
      "He",
      "can",
      "to",
      "very well"
    ],
    correctIndex: 2
  },
  {
    id: 10,
    text: "Choose the correct sentence:",
    choices: [
      "I’m looking forward to see you.",
      "I’m looking forward seeing you.",
      "I’m looking forward to seeing you.",
      "I’m looking forward see you."
    ],
    correctIndex: 2
  }
];


function MockTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const total = QUESTIONS.length;

  const handleSelect = (choiceIdx) => {
    const qid = QUESTIONS[current].id;
    setAnswers((prev) => ({ ...prev, [qid]: choiceIdx }));
  };

  const goNext = () => setCurrent((c) => Math.min(total - 1, c + 1));
  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));

  const currentQ = QUESTIONS[current];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>Question {current + 1}</h3>
        <div>
          {answers[currentQ.id] !== undefined ? "Answered" : "Not yet answered"}
        </div>
      </div>

      <div className="question-card">
        <p>{currentQ.text}</p>
        <div className="choices">
          {currentQ.choices.map((c, i) => (
            <label key={i} style={{ display: "block", margin: "4px 0" }}>
              <input
                type="radio"
                name={`q${current}`}
                checked={answers[currentQ.id] === i}
                onChange={() => handleSelect(i)}
              />
              {String.fromCharCode(97 + i)}. {c}
            </label>
          ))}
        </div>
      </div>

      <div className="footer">
        {current > 0 && (
          <button onClick={goPrev} className="btn-prev">
            Previous page
          </button>
        )}
        <button onClick={goNext} className="btn-next">
          {current === total - 1 ? "Finish" : "Next page"}
        </button>
      </div>

      <div className="quiz-navigation">
        <strong>Quiz navigation</strong>
        <div className="nav-buttons">
          {QUESTIONS.map((q, i) => (
            <button
              key={q.id}
              className={`nav-btn ${
                current === i
                  ? "active"
                  : answers[q.id] !== undefined
                  ? "done"
                  : ""
              }`}
              onClick={() => setCurrent(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
