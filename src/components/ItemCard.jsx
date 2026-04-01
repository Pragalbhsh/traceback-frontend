import {useNavigate} from 'react-router-dom';
import './ItemCard.css';
function ItemCard({ item }) {
    const navigate = useNavigate();
    return (
        <div
            className = "item-card" onClick={() => navigate(`/item/${item._id}`)}>
            <div className="card-image-wrapper">
                <span className= {`status-badge ${item.type}`}>{item.type}</span>
                {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <span className="no-image"></span>}
                </div>
                <div className="card-meta">
                 <h3 className="card-title">{item.name}</h3>
                      <div className="meta-item">📍 {item.location}</div>
                </div>
        <div className="card-footer">
        <button>View Details & Contact</button>
    </div>
    </div> 
    );
}

export default ItemCard;