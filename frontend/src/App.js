import logo from './logo.svg';
import './App.css';
import React from 'react';
import LoginForm from "./components/Admin/Login/LoginForm";
import AdminPostList from "./components/Admin/Post/List";
import AdminPostEdit from "./components/Admin/Post/Edit";
import ListPosts from "./components/ListPosts";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path='/' component={ListPosts} />
                <Route path='/admin/login' component={LoginForm} />
                <Route exact path='/admin/posts' component={AdminPostList} />
                <Route path='/admin/posts/:postId/edit' component={AdminPostEdit} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;

// https://bootsnipp.com/snippets/bxzmb
// https://ui.dev/react-router-v4-protected-routes-authentication/