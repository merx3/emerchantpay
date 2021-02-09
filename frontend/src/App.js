import './App.css';
import React from 'react';
import LoginForm from "./components/Admin/Login/LoginForm";
import AdminPostList from "./components/Admin/Post/List";
import AdminPostEdit from "./components/Admin/Post/Edit";
import ListPosts from "./components/ListPosts";
import ViewPost from "./components/ViewPost";
import PageNotFound from "./components/PageNotFound";
import RedirectProtected from "./components/Admin/RedirectProtected";
import Navbar from "./components/Navbar";
import { ProvideAuth } from "./helpers/hooks/use-auth";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <ProvideAuth>
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path='/' component={ListPosts} />
                    <Route path='/posts/:postId' component={ViewPost} />
                    <Route path='/admin/login' component={LoginForm} />
                    <RedirectProtected exact path='/admin/posts' >
                        <AdminPostList />
                    </RedirectProtected>
                    <RedirectProtected path='/admin/posts/:postId/edit'>
                        <AdminPostEdit />
                    </RedirectProtected>
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        </ProvideAuth>
    </div>
  );
}

export default App;
