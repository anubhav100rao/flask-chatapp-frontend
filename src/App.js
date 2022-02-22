import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import './App.css';

const END_POINT = "http://localhost:5000"
const socket = io.connect(END_POINT)



function App() {
    const [messages, setMessages] = useState(["Welcome"])
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        socket.on("message", msg => {
            setMessages([...messages, msg])
        })
    })

    const onChange = (event) => {
        setMessage(event.target.value)
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        if(message !== "") {
            socket.emit("message", message)
            setMessage("")
        } else {
            alert("please add a message")
        }
    } 

    return (
        <div className="App">
            <header className="App-header">
                <h1>Messenger</h1>
                {messages.length > 0 && 
                    messages.map((msg, index) => {
                        return (
                            <p key={index}> { msg }</p>
                        )
                    })
                }
                <form onSubmit={ onFormSubmit }>
                    <input type="text" name="message" 
                        placeholder='send chat'
                        value={ message }
                        onChange = {(event) => {
                            onChange(event)
                        }}
                    />
                    <button type='submit'> send </button>
                </form>
            </header>
        </div>
    );
}

export default App;
