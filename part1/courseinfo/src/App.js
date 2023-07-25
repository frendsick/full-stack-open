import Course from './components/Course'
import Header from './components/Header'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // Display course information and the number of exercises for each course
  return (
    <article>
      <Header headingLevel="h1" text="Web development curriculum" />
      {
        courses.map((course) => {
          return (
            <Course key={course.id} name={course.name} parts={course.parts} />
          )
        })
      }
    </article>
  )
}

export default App
