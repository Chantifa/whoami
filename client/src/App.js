import {useEffect} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';

import {history, store} from './_helpers';
import {alertActions} from './_actions';
import {Home, Login, PrivateRoute, Register} from './_components';
import Navbar from './_components/NavigationBar';
import Rules from './_components/Rules';
import Footer from './_components/Footer';
import GameSelection from "./_components/GameSelection";

function App() {

    const dispatch = useDispatch();

    useEffect(() => { //TODO: this once removes the alert actions when the App.js is rendered - what is the purpose of this?
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);

    return (

        <Provider store={store}>
        <Router history={history}>
            <div className="App">
                <Navbar />
                <Switch>
                    <PrivateRoute path="/game" component={GameSelection} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/rules" component={Rules} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
            <Footer />
        </Router>
        </Provider>



    );
}

export { App }