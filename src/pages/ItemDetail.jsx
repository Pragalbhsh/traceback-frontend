import { useState , useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import './ItemDetail.css';

function ItemDetail () {
    const [item , setItem] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/items/${id}`)
        .then(res => res.json())
        .then(data => setItem(data));
    }, [id]);

    if(!item) return <p>Loading...</p>;

return (
    <div className="detail-page">
        <div className="detail-card">
            <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
            <span className={`detail-badge ${item.type}`}>{item.type}</span>
            <h2>{item.name || 'Unnamed Item'}</h2>
            {item.image && <img src={item.image} alt={item.name} />}
            <p>📍 {item.location}</p>
            <p>{item.description}</p>
            <p>📅 {new Date(item.date).toLocaleDateString()}</p>
            <div className="contact-box">
                <h4>📞 Contact</h4>
                <p>{item.contact}</p>
            </div>
        </div>
    </div>
);
}
export default ItemDetail;