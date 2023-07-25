import { useState } from 'react'

function feedbackTotal(feedbacks) {
  return feedbacks.reduce((sum, feedback) => sum + feedback.count, 0)
}

function feedbackAverage(feedbacks) {
  const total = feedbackTotal(feedbacks)
  if (total === 0) return 0
  const positiveCount = feedbacks.reduce((acc, feedback) => {
    if (feedback.name === "good") return acc + feedback.count;
    if (feedback.name === "bad") return acc - feedback.count;
    return acc
  }, 0)
  return positiveCount / total
}

function positiveFeedbackPercentage(feedbacks) {
  const total = feedbackTotal(feedbacks)
  if (total === 0) return 0
  const goodFeedbackCount = feedbacks.find((feedback) => feedback.name === "good").count;
  return goodFeedbackCount / total * 100
}

const Header = ({text}) => <h1>{text}</h1>
const Feedback = ({feedback}) => <p>{feedback.name} {feedback.count}</p>
const FeedbackDisplay = ({feedbacks}) => {
  return(
    <div>
      {
        feedbacks.map((feedback, index) => <Feedback key={index} feedback={feedback} />)
      }
      <p>all {feedbackTotal(feedbacks)}</p>
      <p>average {feedbackAverage(feedbacks)}</p>
      <p>positive {positiveFeedbackPercentage(feedbacks)} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedbacks = [
    {name: "good", count: good},
    {name: "neutral", count: neutral},
    {name: "bad", count: bad},
  ]

  return (
    <div>
      <Header text="give feedback" />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header text="statistics" />
      <FeedbackDisplay feedbacks={feedbacks} />
    </div>
  )
}

export default App
