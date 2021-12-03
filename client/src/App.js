import {Suspense} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import NavigationBar from "./_components/NavigationBar.js";
import GameSelection from "./_components/GameSelection.js";
import PrivateRoute from "./_components/PrivateRoute.js";
import Home from "./_components/Home.js";
import Register from "./_components/Register.js";
import Login from "./_components/Login.js";
import Rules from "./_components/Rules.js";
import Highscore from "./_components/Highscore.js";
import Footer from "./_components/Footer.js";
import store from "./_helpers/store.js";
import {history} from "./_helpers/history.js";


export default function App() {

    return (
        <Suspense fallback="loading">
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <NavigationBar/>
                        <Switch>
                            <PrivateRoute path="/game" component={GameSelection}/>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/rules" component={Rules}/>
                            <Route exact path="/highscore" component={Highscore}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </div>
                    <Footer/>
                </Router>
            </Provider>
        </Suspense>
    );
}