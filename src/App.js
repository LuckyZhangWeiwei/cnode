import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login/Login';
import Topics from './views/Topic/Topic';
import Article from './views/Article/Article';
import User from './views/User/User';
import Collections from './views/Collections/Collections';
import UserMessage from './views/UserMessage/UserMessage';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router>
                    <Switch>
                        <Redirect exact from="/" to="/login" />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/topic/:id" component={Topics} />
                        <Route exact path="/article/:id" component={Article} />
                        <Route exact path="/user/:userId" component={User} />
                        <Route exact path="/user/collection/:loginname" component={Collections} />
                        <Route exact path="/message" component={UserMessage}/>
                    </Switch>
                </Router>
            </div>
            );
    }
}
export default App;
