import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { UserAuthContextComponent } from './components/UserAuthContext';
import MyBookmarks from './Pages/MyBookmarks';
import PrivateRoute from './components/PrivateRoute';
import Logout from './Pages/Logout';
import AddBookmark from './Pages/AddBookmark';

const App = () => {
    return (
        <UserAuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/mybookmarks' element={
                        <PrivateRoute>
                            <MyBookmarks />
                        </PrivateRoute>
                    } />
                    <Route path='/addbookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>
                    } />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </UserAuthContextComponent>
    );
}

export default App;