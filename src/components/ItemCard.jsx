function ItemCard({ item }) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.location}</p>
        </div>
    );
}

export default ItemCard;