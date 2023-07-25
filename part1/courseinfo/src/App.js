const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.name} {props.count}</p>
const Content = ({parts}) => parts.map((part, index) => <Part key={index} name={part.name} count={part.exercises} />)
const Total = (props) => <p>Number of exercises {props.countList.reduce((a, b) => a + b, 0)}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const exerciseCounts = parts.map(part => part.exercises);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total countList={exerciseCounts}/>
    </div>
  )
}

export default App