import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookmarkTable = ({ bookmarks, onDeleteClick, getBookmarks }) => {

    const [editingRow, setEditingRow] = useState({
        title: '',
        id: 0
    });

    const onEditClick = ({ title, id }) => {
        setEditingRow({ title, id });
    }

    const onUpdateClick = async ({ title, id }) => {
        await axios.post('/api/home/update', { title, id });
        setEditingRow({ title: '', id: 0 });
        getBookmarks();
    }
    const { title, id } = editingRow;

    return (
        <div className='container mt-5'>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b =>
                        <tr key={b.id}>
                            {id !== b.id && <td>{b.title}</td>}
                            {id === b.id && <td><input onChange={e => setEditingRow({ ...editingRow, title: e.target.value })} type='text' className='form-control' placeholder='Title' value={title} /></td>}
                            <td><Link to={`https://${b.url}`} target='_blank' style={{ textDecoration: 'none' }}>{b.url}</Link></td>
                            <td>
                                {id !== b.id && <><button onClick={() => onEditClick({ title: b.title, id: b.id })} className='btn btn-outline-warning w-50'>Edit Title</button>
                                    <button onClick={() => onDeleteClick(b.id)} className='btn btn-outline-danger w-50'>Delete</button></>}
                                {id === b.id && <><button onClick={() => onUpdateClick({ title, id })} className='btn btn-outline-success w-50'>Update</button>
                                    <button onClick={() => setEditingRow({ title: '', id: 0 })} className='btn btn-outline-info w-50'>Cancel</button></>}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default BookmarkTable;