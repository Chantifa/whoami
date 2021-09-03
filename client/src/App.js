import logo from './img/logo.png';
import './App.css';
import React, {useEffect, useState} from 'react';

function App() {

    const [state, setState] = useState("noene")
    const [show, setShow] = useState(false)


    useEffect(() => {
        fetch("/express_backend")
            .then(r => r.json())
            .then(data => {
                setState(data.express)
                setShow(true)
            })
            .catch(e => console.error(e))

    }, [])


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                {show ? <h2> Loook {state}</h2> : <p>None yet</p>}
            </header>
        </div>
    );
}

export default App;
