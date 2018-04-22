import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Bundle from './Bundle';
import Loading from './../components/common/Loading/Loading';
import Login from './../views/Login/Login';

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading />
        }
    </Bundle>
);

const getRouter = () => {
    <Router>
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
}
export default getRouter;