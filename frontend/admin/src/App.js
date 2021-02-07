import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path='/admin/login' component={LoginForm} />
        </Switch>
    </div>
  );
}

export default App;

// https://bootsnipp.com/snippets/bxzmb
