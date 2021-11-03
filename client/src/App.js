import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { GameSelection } from './_components';
import { Login } from './_components';
import { Register } from './_components';
import { Home } from './_components';
import Navbar from './_components/Navbar';
import Rules from './_components/Rules';
import Footer from './_components/Footer';
import { Provider } from 'react-redux';

import { store } from './_helpers';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (

        <Provider store={store}>
        <Router history={history}>
            <div className="App">
                <Navbar />
                <Switch>
                    <PrivateRoute exact path="/game" component={GameSelection} />
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