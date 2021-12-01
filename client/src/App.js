import {Suspense} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import {history, store} from './_helpers';
import {Home, Login, PrivateRoute, Register} from './_components';
import Navbar from './_components/NavigationBar';
import Rules from './_components/Rules';
import Footer from './_components/Footer';
import GameSelection from "./_components/GameSelection";
import Highscore from "./_components/Highscore";

function App() {

    return (
        <Suspense fallback="loading">
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
                    <Route exact path="/highscore" component={Highscore} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
            <Footer />
        </Router>
        </Provider>
        </Suspense>
    );
}

export {App}