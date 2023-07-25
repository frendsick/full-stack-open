const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.name} {props.count}</p>
const Content = (props) => <Part name={props.part.name} count={props.part.exercises} />
const Total = (props) => <p>Number of exercises {props.countList.reduce((a, b) => a + b, 0)}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part1} />
      <Content part={part2} />
      <Content part={part3} />
      <Total countList={[
        part1.exercises,
        part2.exercises,
        part3.exercises
      ]}/>
    </div>
  )
}

export default App