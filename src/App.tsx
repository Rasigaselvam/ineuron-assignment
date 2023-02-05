import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUser from './features/users/AddUser';
import EditUser from './features/users/EditUser';
import UserList from './features/users/UserList';
function App() {
  return (
    <div>
        <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
   
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
