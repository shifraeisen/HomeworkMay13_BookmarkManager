import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/home/');
            setBookmarks(data);
        }
        getBookmarks();
    }, []);

    return (
        <>
            <div className='container' style={{ marginTop: 80 }}>
                <h1>Welcome to Bookmark Manager</h1>
                <h3>Top 5 Most Bookmarked Links</h3>
            </div>
            <div className='container mt-3'>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b =>
                            <tr key={b.url}>
                                <td><Link to={`https://${b.url}`} target='_blank' style={{ textDecoration: 'none' }}>{b.url}</Link></td>
                                <td>{b.count}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default Home;