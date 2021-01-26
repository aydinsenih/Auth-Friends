import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import Friends from "./components/Friends";
import Friend from "./components/Friend";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    {/* <li>
                        <Link>Logout</Link>
                    </li> */}
                    <li>
                        <Link to="/friends">Friends</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute exact path="/friends" component={Friends} />
                    <PrivateRoute exact path="/friend/:id" component={Friend} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
