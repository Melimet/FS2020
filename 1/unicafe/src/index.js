import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
    }
    const neutralClick = () => {
        setNeutral(neutral + 1)
    }
    const badClick = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>give feedback</h1>


            <Button func={goodClick} name="good"></Button>
            <Button func={neutralClick} name="neutral"></Button>
            <Button func={badClick} name="bad"></Button>

            <h1>Statistics</h1>

            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
const Button = (props) => {
    return (
        <button onClick={props.func}>{props.name}</button>
    )
}
const Statistics = (props) => {
    const good = props.good
    const bad = props.bad
    const neutral = props.neutral
    const calculateTotal = () => {
        return good + neutral + bad
    }
    if (calculateTotal() === 0) {
        return (
            <div>
                <h1>Statistics</h1>

                <p>No feedback given</p>
            </div>
        )
    }
    return (

        <table>
            <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>

            <StatisticLine text="total" value={calculateTotal()}/>
            <StatisticLine text="average" value={(good - bad) / calculateTotal()}/>
            <StatisticLine text="positive" value={good / calculateTotal() * 100 + "%"}/>
            </tbody>
        </table>
    )
}
const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)