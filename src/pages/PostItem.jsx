import API from '../api';
import './PostItem.css';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function PostItem() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const defaultType = searchParams.get('type') || 'lost';

    const [form, setForm] = useState({
        type: defaultType,
        name: '',
        description: '',
        location: '',
        contact: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.location || !form.contact) {
            alert('Please fill in name, location and contact!');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => formData.append(key, val));
        if (image) formData.append('image', image);

        try {
            const res = await fetch(`${API}/items`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.possibleMatches && data.possibleMatches.length > 0) {
                alert(`🎉 ${data.possibleMatches.length} possible match(es) found!`);
            }
            navigate('/');
        } catch (err) {
            alert('Something went wrong. Is your backend running?');
        }
        setLoading(false);
    };

    return (
        <div className="post-page">
            <div className="post-form">
                <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
                <h2>Report a {form.type === 'lost' ? '🔴 Lost' : '🟢 Found'} Item</h2>

                <div className="type-toggle">
                    <button 
                        className={form.type === 'lost' ? 'active-lost' : ''} 
                        onClick={() => setForm({...form, type: 'lost'})}>
                        🔴 I Lost Something
                    </button>
                    <button 
                        className={form.type === 'found' ? 'active-found' : ''} 
                        onClick={() => setForm({...form, type: 'found'})}>
                        🟢 I Found Something
                    </button>
                </div>

                <input name="name" placeholder="Item name *" onChange={handleChange} />
                <textarea name="description" placeholder="Describe the item..." onChange={handleChange} />
                <input name="location" placeholder="Location *" onChange={handleChange} />
                <input name="contact" placeholder="Your contact (phone/email) *" onChange={handleChange} />
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Report'}
                </button>
            </div>
        </div>
    );
}

export default PostItem;