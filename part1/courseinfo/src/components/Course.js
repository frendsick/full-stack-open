import Content from './Content'
import Header from './Header'
import Total from './Total';

const Course = ({name, parts}) => {
  const exerciseCounts = parts.map(part => part.exercises)
  return (
    <section>
      <Header headingLevel="h2" text={name} />
      <Content parts={parts} />
      <Total countList={exerciseCounts} />
    </section>
  )
}

export default Course
