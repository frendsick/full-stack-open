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
const StatisticLine = ({text, value}) => <p>{text} {value}</p>
const Statistics = ({feedbacks}) => {
  const feedbackCount = feedbackTotal(feedbacks)
  if (feedbackCount === 0) return <p>No feedback given</p>
  return(
    <div>
      {
        feedbacks.map((feedback, index) => <StatisticLine key={index} text={feedback.name} value={feedback.count} />)
      }
      <StatisticLine text="all" value={feedbackCount} />
      <StatisticLine text="average" value={feedbackAverage(feedbacks)} />
      <StatisticLine text="positive" value={positiveFeedbackPercentage(feedbacks)} />
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
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App
