import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddBookmark = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        url: ''
    });

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/home/addbookmark', formData);
        navigate('/mybookmarks');
    }

    return (
        <div className='container' style={{marginTop: 80} }>
            <div className='row' style={{minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
                <div className='col-md-6 offset-md-3 bg-light p-4 rounded shadow'>
                    <h3>Add Bookmark</h3>
                    <form onSubmit={onFormSubmit}>
                        <input onChange={onTextChange} type="text" name="title" placeholder="Title" className="form-control" value={formData.title} />
                        <br />
                        <input onChange={onTextChange} type="text" name="url" placeholder="Url" className="form-control" value={formData.url} />
                        <br />
                        <button className="btn btn-outline-info w-100">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddBookmark;