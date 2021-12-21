import React from '../../facebook-react/react'
import { render } from 'react-dom'

function useState(initialValue) {
    let state = initialValue
    function dispatch(newState) {
        state = newState
        render(<App />, document.getElementById('root'))
    }
    return [state, dispatch]
}

const App = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('airing')
    const [age, setAge] = useState(18)

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
