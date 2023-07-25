import Content from './Content'
import Header from './Header'

const Course = ({name, parts}) => {
    return (
      <>
      <Header text={name} />
      <Content parts={parts} />
      </>
    )
}

export default Course
