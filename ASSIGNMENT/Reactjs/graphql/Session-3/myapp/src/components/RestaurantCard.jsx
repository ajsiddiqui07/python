function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>

      <p>ID: {restaurant.id}</p>

      <p>Cuisine: {restaurant.cuisine}</p>
    </div>
  );
}

export default RestaurantCard;