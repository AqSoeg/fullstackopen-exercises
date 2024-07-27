import { useState } from 'react'


const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ comments }) => {
  const numbers = Object.values(comments)
  const validComments = numbers.filter(item => item != 0)
  let all = 0
  let average = 0
  let positive = 0

  all = numbers.reduce((sum, cur) => sum += cur)  
  average = (comments.good - comments.bad) / all
  positive = (comments.good) / all

  if (validComments.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <>
        <StatisticLine text='good' value={comments.good}></StatisticLine>
        <StatisticLine text='neutral' value={comments.neutral}></StatisticLine>
        <StatisticLine text='bad' value={comments.bad}></StatisticLine>
        <StatisticLine text='all' value={all}></StatisticLine>
        <StatisticLine text='average' value={average}></StatisticLine>
        <StatisticLine text='positive' value={positive}></StatisticLine>
      </>
    )

  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const comments = {
    'good': good,
    'neutral': neutral,
    'bad': bad
  }

  function handleClickGood() {
    setGood(good + 1)
  }

  function handleClickNeutral() {
    setNeutral(neutral + 1)
  }

  function handleClickBad() {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleClickGood}>good</button>
      <button onClick={handleClickNeutral}>neutral</button>
      <button onClick={handleClickBad}>bad</button>
      <h1>statistics</h1>
      <Statistics comments={comments}></Statistics>
    </div>
  )
}

export default App