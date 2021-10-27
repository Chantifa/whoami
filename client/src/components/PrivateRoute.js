import {Redirect, Route} from "react-router-dom";
import {useContext} from "react";
import {appContext} from "../appContext";


export default function PrivateRoute ({ children, ...rest }) {
    const myContext = useContext(appContext);
    return (
        <Route {...rest} render={() => {
            return myContext.loggedin === true
                ? children
                : <Redirect to='/login' />
        }} />
    )
}
