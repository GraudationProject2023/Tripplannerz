import React from 'react';

function UserList({users}){
    return(
        <div className = "user-list">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;