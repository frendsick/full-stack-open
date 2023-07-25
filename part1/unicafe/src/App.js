import { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;
const Feedback = ({ feedback }) => <p>{feedback.name} {feedback.count}</p>
const FeedbackDisplay = ({ feedbacks }) => feedbacks.map((feedback, index) => <Feedback key={index} feedback={feedback} />)

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const incrementFeedback = (type) => {
    if (!(type in feedbacks)) return; // Guard clause for unknown feedback types
    setFeedbacks((feedbacks) => ({
      ...feedbacks,
      [type]: feedbacks[type] + 1,
    }));
  };

  return (
    <div>
      <Header text="give feedback" />
      <button onClick={() => incrementFeedback('good')}>good</button>
      <button onClick={() => incrementFeedback('neutral')}>neutral</button>
      <button onClick={() => incrementFeedback('bad')}>bad</button>
      <Header text="statistics" />
      <FeedbackDisplay feedbacks={Object.entries(feedbacks).map(([name, count]) => ({ name, count }))} />
    </div>
  );
};

export default App;
