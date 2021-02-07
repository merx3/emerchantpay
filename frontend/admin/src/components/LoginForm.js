import React from 'react';
import Header from './LoginHeader';
import Username from './Form/Username';
import Password from './Form/Password';

function LoginForm() {
    return(
        <div id="login">
            <Header/>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Login</h3>
                                <Username/>
                                <Password/>
                                <div className="form-group">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;