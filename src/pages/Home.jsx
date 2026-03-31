import ItemCard from '../components/ItemCard';
import { useState , useEffect } from 'react';
function Home() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/items')
        .then(res => res.json())
        .then(data => {
            console.log("fetched:", data)
            setItems(data);
        });
    }, []);
console.log(items);
    return (
        <div>
        {items.map(items => (
            <ItemCard key={items._id} item={items} />
        ))}
        </div>
    );
}
export default Home;