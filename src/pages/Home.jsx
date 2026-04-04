import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // usestate is used to automatically update the state of the component and re render the page
import ItemCard from '../components/ItemCard'; // useeffect is used to fetch the data from the backend
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [filter , setFilter] = useState('all');
    const displayed = filter === 'all' ? items : items.filter(i => i.type === filter);
    useEffect(() => {
        fetch('https://traceback-api-55fy.onrender.com')
        .then(res => res.json())
        .then(data => {
            setItems(data);
        });
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Help reunite people with their stuff.</h1>
                        <p>Welcome to the digital bulletin board. Fast, friendly, and community-driven.</p>
                    </div>
                    <div className="hero-cards">
                        <div className="hero-card">
                            <span>😟</span>
                            <button className="btn-primary" onClick={() => navigate('/post?type=lost')}>Report Lost Item</button>
                        </div>
                        <div className="hero-card">
                            <span>✅</span>
                            <button className="btn-secondary" onClick={() => navigate('/post?type=found')} > I Found Something </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Items Grid */}
            <main className="main-content">
                <div className="toolbar">
                    <div className="filters">
                        <span className="filter-label">View:</span>
                        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Items</button>
                        <button className={`filter-btn ${filter === 'lost' ? 'active' : ''}`} onClick={() => setFilter('lost')}>Lost Only</button>
                        <button className={`filter-btn ${filter === 'found' ? 'active' : ''}`} onClick={() => setFilter('found')}>Found Only</button>
                    </div>
                </div>
                <div className="item-grid">
                    {displayed.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;