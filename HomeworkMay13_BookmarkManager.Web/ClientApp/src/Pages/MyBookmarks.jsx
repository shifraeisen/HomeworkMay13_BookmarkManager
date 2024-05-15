import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import BookmarkTable from '../components/BookmarkTable';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/UserAuthContext';

const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);

    const { user } = useAuth();

    const getBookmarks = async () => {
        const { data } = await axios.get('/api/home/mybookmarks');
        setBookmarks(data);
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    const onDeleteClick = async id => {
        await axios.post('/api/home/delete', { id });
        getBookmarks();
    }

    return (
        <>
            <div className='container' style={{ marginTop: 80 }}>
                <h1>Welcome back {user.firstName} {user.lastName}</h1>
                <Link to='/addbookmark'><button className='btn btn-outline-primary w-25 mt-3'>Add Bookmark</button></Link>
            </div>
            <BookmarkTable bookmarks={bookmarks}
                onDeleteClick={onDeleteClick}
                getBookmarks={getBookmarks} />
        </>
    );
};
export default MyBookmarks;