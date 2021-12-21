import React from 'react'
import { render } from 'react-dom'

let memoizedState = []
let cursor = 0
function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue
  const currentCursor = cursor
    console.log('+++++++++++=before', memoizedState[cursor]);


    function dispatch(newState) {
      memoizedState[currentCursor] = newState
      cursor = 0
        console.log('+++++++++++=dispatch', memoizedState[currentCursor]);
        render(<App />, document.getElementById('root'))


    }
    return [memoizedState[cursor++], dispatch]
}

const App = () => {
  const [age, setAge] = useState(18)
    const [count, setCount] = useState(10)
    const [name, setName] = useState('airing')

    return (
        <>
            <p>You clicked {count} times</p>
            <p>Your age is {age}</p>
            <p>Your name is {name}</p>
            <button onClick={() => {
                setCount(count + 1)
                setAge(age + 1)
            }}>
                Click me
            </button>
        </>
    )
}

export default App
