import { useState } from 'react'

function getRandomIndex(list) {
  return Math.floor(Math.random()*list.length)
}

function getMaxIndex(list) {
  const maxNumber = Math.max(...list)
  return list.indexOf(maxNumber)
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const incrementVote = (index) => {
    const updatedVotes = [...votes];
    updatedVotes[index] += 1;
    setVotes(updatedVotes);
    setMostVoted(getMaxIndex(updatedVotes))
  };

  return (
    <>
    <article>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={() => incrementVote(selected)} />
      <Button text="next anecdote" onClick={() => setSelected(getRandomIndex(anecdotes))} />
    </article>
    <article>
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </article>
    </>
  )
}

export default App
