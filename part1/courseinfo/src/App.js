const Header = (props) => <h1>{props.course}</h1>
const Part = (props) => <p>{props.name} {props.count}</p>
const Content = (props) => <Part name={props.part} count={props.count} />
const Total = (props) => <p>Number of exercises {props.countList.reduce((a, b) => a + b, 0)}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} count={exercises1} />
      <Content part={part2} count={exercises2} />
      <Content part={part3} count={exercises3} />
      <Total countList={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App