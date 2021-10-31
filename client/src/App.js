import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import Rules from "./components/Rules";
import GameSelection from "./components/GameSelection";
import PrivateRoute from "./components/PrivateRoute";
import {Provider} from "react-redux";
import store from "./store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/rules" component={Rules}/>
                        <PrivateRoute path="/game"><GameSelection/></PrivateRoute>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;