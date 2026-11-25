import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from './store.js'

function ProductCard({ product, isWishlisted, onAddToWishlist, onRemoveFromWishlist, currency }) {
  const dispatch = useDispatch()
  const quantity = useSelector((state) =>
    state.cart.find((item) => item.id === product.id)?.quantity ?? 0,
  )

  return (
    <article className="product-card">
      <div className={`product-art ${product.color}`}>
        <span className="product-icon" aria-hidden="true">{product.icon}</span>
        <span className="product-category">{product.category}</span>
        <button
          className={`wish-button${isWishlisted ? ' is-wishlisted' : ''}`}
          type="button"
          onClick={isWishlisted ? onRemoveFromWishlist : onAddToWishlist}
          aria-label={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <div>
            <h3>{product.name}</h3>
            <p className="product-subtitle">A little upgrade to your everyday</p>
          </div>
          <strong className="product-price">{currency.format(product.price)}</strong>
        </div>
        <div className="product-actions">
          <button
            className="button button-dark"
            type="button"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to bag <span aria-hidden="true">+</span>
          </button>
          <button
            className="button button-light"
            type="button"
            onClick={() => dispatch(removeFromCart(product.id))}
            disabled={quantity === 0}
          >
            Remove
          </button>
        </div>
        {quantity > 0 && <p className="cart-feedback" aria-live="polite">In your bag · {quantity}</p>}
      </div>
    </article>
  )
}

export default ProductCard
