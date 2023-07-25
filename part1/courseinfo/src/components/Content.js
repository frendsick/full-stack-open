import Part from './Part'

const Content = ({parts}) => {
    return (
        parts.map((part, index) =>
            <Part key={index} name={part.name} count={part.exercises} />
        )
    )
} 

export default Content
