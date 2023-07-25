const Total = ({countList}) => <p>Number of exercises {countList.reduce((a, b) => a + b, 0)}</p>

export default Total
