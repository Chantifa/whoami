import {Container, Form} from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import {Switch} from "react-router-dom";

function Profile() {

    const [history, setHistory] = useState();
    const [profile, setProfile] = useState({name: ''});
    const [error, setError] = useState('');

    const myData = () => {
        fetch('http://localhost:5000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((json) => {
                setProfile({
                    name: json[0].name
                });
            })
            .catch((err) => console.log(err));
    };

    const myData2 = () => {
        fetch('http://localhost:5000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // send a request with credentials included on same-origin and cross-origin calls
        })
            .then((response) => response.json())
            .then((json) => {
                let ty = [];
                for (let i = 0; i < json.length; i++) {
                    ty.push(json[i].distance);
                }

                setHistory(ty);
            })
            .catch((err) => console.log(err));
    };

    // load once initially with useEffect
    useEffect(() => {
        myData();
        myData2();
    }, []);


    return (
        <Container>
            <Switch>
                <Form>
                    <Form.Group className="form" controlId="formBasicText">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="input" placeholder="Enter Username"/>
                    </Form.Group>
                    <button className="button-register" type="submit">Submit</button>
                    <ul className='profile-group'>
                        {history &&
                        history.length > 0 &&
                        history.map((data) => (
                            <li key={data}>
                                <span className='profile-label'>Route:</span>
                                <span className='profile-value'>{data}</span>
                            </li>
                        ))}
                    </ul>
                </Form>
            </Switch>
        </Container>
    );
}

export default Profile;
