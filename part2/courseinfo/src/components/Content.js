import Part from './Part'

const Content = ({parts}) => {
    return (
        parts.map(part =>
            <Part key={part.id} name={part.name} count={part.exercises} />
        )
    )
} 

export default Content
