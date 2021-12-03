import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
    /**
     * This component is used to redirect not logged in user to login page.
     * If the user is logged in, the components from private routes are return.
     *
     * @component
     * @param {Object} component component property defined on props
     * @param {Object} roles State of this Alert
     * @param {Object} ...rest State of this Alert
     * @return PopupAlert component
     */
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };