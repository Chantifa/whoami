import {Redirect, Route} from 'react-router-dom';

/**
 * This component is used to redirect not logged-in user to login page.
 * Otherwise, this just wraps the Route from react-router-dom
 *
 * @component
 * @param Component
 * @param rest the params for the Component
 * @returns {JSX.Element}
 */
export default function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }

            // logged in so return component
            return <Component {...rest} />
        }}/>
    );
}