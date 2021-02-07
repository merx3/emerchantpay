import React from 'react';
function Password() {
    return(
        <div className="form-group">
            <label htmlFor="password" className="text-info">Password:</label><br/>
            <input type="text"
                   className="form-control"
                   id="password"
                   name="password"
                   placeholder="Enter password"
            />
        </div>
    )
}
export default Password;