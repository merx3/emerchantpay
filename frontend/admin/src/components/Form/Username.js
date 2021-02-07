import React from 'react';
function Username() {
    return(
        <div className="form-group">
            <label htmlFor="username" className="text-info">Username:</label><br/>
            <input type="text"
                   className="form-control"
                   id="username"
                   name="username"
                   placeholder="Enter username"
            />
        </div>
    )
}
export default Username;