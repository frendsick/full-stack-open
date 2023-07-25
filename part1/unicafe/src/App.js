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
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({feedbacks}) => {
  const feedbackCount = feedbackTotal(feedbacks)
  if (feedbackCount === 0) return <p>No feedback given</p>
  return(
    <table>
      <tbody>
        {
          feedbacks.map((feedback, index) => <StatisticLine key={index} text={feedback.name} value={feedback.count} />)
        }
        <StatisticLine text="all" value={feedbackCount} />
        <StatisticLine text="average" value={feedbackAverage(feedbacks)} />
        <StatisticLine text="positive" value={positiveFeedbackPercentage(feedbacks) + " %"} />
      </tbody>
    </table>
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
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App
