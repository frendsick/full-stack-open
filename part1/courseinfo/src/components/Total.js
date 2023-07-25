const Total = ({countList}) => {
    const total = countList.reduce((a, b) => a + b, 0)
    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

export default Total
