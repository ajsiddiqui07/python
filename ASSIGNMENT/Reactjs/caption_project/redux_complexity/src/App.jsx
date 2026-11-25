import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard.jsx'
import {
  addToWishlist,
  fetchOffers,
  removeFromWishlist,
} from './store.js'
import './App.css'

const products = [
  { id: 'headphones', name: 'Studio headphones', category: 'Audio', price: 89, icon: '🎧', color: 'lavender' },
  { id: 'camera', name: 'Instant camera', category: 'Photography', price: 129, icon: '📷', color: 'peach' },
  { id: 'watch', name: 'Everyday watch', category: 'Accessories', price: 74, icon: '⌚', color: 'mint' },
]

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const wishlist = useSelector((state) => state.wishlist)
  const offers = useSelector((state) => state.offers)

  useEffect(() => {
    dispatch(fetchOffers())
  }, [dispatch])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main className="storefront">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Good Things home">
          <span className="brand-mark">g</span>
          <span>good things<span className="brand-period">.</span></span>
        </a>
        <nav className="topbar-links" aria-label="Store sections">
          <a href="#products">Shop</a>
          <a href="#wishlist">Wishlist <span className="nav-count">{wishlist.length}</span></a>
          <a className="cart-link" href="#cart">Bag <span className="nav-count">{cartCount}</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE LITTLE THINGS, DONE WELL</p>
          <h1>Find your next<br /><span>favorite thing.</span></h1>
          <p className="hero-description">
            Thoughtful everyday essentials, picked to make your day a little brighter.
          </p>
          <a className="primary-link" href="#products">Explore the collection <span aria-hidden="true">↘</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-shape" />
          <span className="hero-product hero-product-one">🎧</span>
          <span className="hero-product hero-product-two">📷</span>
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-sparkle sparkle-two">✦</span>
          <div className="hero-note">made for<br />your everyday</div>
        </div>
      </section>

      <section className="offer-strip" aria-live="polite">
        <div className="offer-icon">✳</div>
        <div className="offer-copy">
          <p className="eyebrow">A LITTLE SOMETHING EXTRA</p>
          {offers.status === 'loading' && <p>Finding today's best offers…</p>}
          {offers.status === 'succeeded' && (
            <p>{offers.items.map((offer) => offer.title).join('  ·  ')}</p>
          )}
        </div>
        <span className="offer-status">
          {offers.status === 'succeeded' ? 'JUST FOR YOU' : offers.status.toUpperCase()}
        </span>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2>Small joys, right this way.</h2>
          </div>
          <span className="section-meta">A few things we love <span aria-hidden="true">↗</span></span>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onAddToWishlist={() => dispatch(addToWishlist(product))}
              onRemoveFromWishlist={() => dispatch(removeFromWishlist(product.id))}
              currency={currency}
            />
          ))}
        </div>
      </section>

      <section className="lower-grid">
        <section className="collection-panel" id="cart">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR PICKS</p>
              <h2>Your bag <span className="heading-count">{cartCount}</span></h2>
            </div>
            <span className="panel-mark">01</span>
          </div>
          {cart.length === 0 ? (
            <p className="empty-state">Your bag is waiting for something lovely.</p>
          ) : (
            <>
              <ul className="item-list">
                {cart.map((item) => (
                  <li className="item-row" key={item.id}>
                    <span className={`item-icon ${item.color}`}>{item.icon}</span>
                    <div className="item-details">
                      <strong>{item.name}</strong>
                      <span>Qty {item.quantity}</span>
                    </div>
                    <span className="item-price">{currency.format(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="panel-total">
                <span>Subtotal</span>
                <strong>{currency.format(cartTotal)}</strong>
              </div>
            </>
          )}
        </section>

        <section className="collection-panel wishlist-panel" id="wishlist">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">SAVED FOR LATER</p>
              <h2>Your wishlist <span className="heading-count">{wishlist.length}</span></h2>
            </div>
            <span className="panel-mark">02</span>
          </div>
          {wishlist.length === 0 ? (
            <p className="empty-state">Tap the heart on anything you’d like to keep close.</p>
          ) : (
            <ul className="item-list">
              {wishlist.map((item) => (
                <li className="item-row" key={item.id}>
                  <span className={`item-icon ${item.color}`}>{item.icon}</span>
                  <div className="item-details">
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </div>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>

      <footer className="footer">
        <a className="brand" href="#top"><span className="brand-mark">g</span><span>good things<span className="brand-period">.</span></span></a>
        <p>Good finds. Good days.</p>
        <span>Redux-powered storefront demo</span>
      </footer>
    </main>
  )
}

export default App
