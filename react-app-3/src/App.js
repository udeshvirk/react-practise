import React, { useState } from 'react';
import Wrapper from './components/Helpers/Wrapper';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';


function App() {

    const [users, setUsers] = useState([]);
    const addUserHandler = (user) => {
        setUsers((prevUsers) => {
            return [user, ...prevUsers];
        })
    }
    return (
        <React.Fragment>
            <AddUser onAddUser={addUserHandler} />
            <UsersList users={users} />
        </React.Fragment>
    );
}

export default App;
