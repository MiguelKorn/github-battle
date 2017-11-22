import React from "react";
import {Route, BrowserRouter, Switch} from 'react-router-dom';

// components
import Nav from './Nav';
import Popular from './Popular';
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/battle" component={Battle}/>
                        <Route path="/battle/results" component={Results}/>
                        <Route path="/popular" component={Popular}/>
                        <Route render={() => {
                            return <p>404 NOT FOUND!</p>
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}