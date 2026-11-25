import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

const ADD_TO_CART = 'cart/add'
const REMOVE_FROM_CART = 'cart/remove'
const ADD_TO_WISHLIST = 'wishlist/add'
const REMOVE_FROM_WISHLIST = 'wishlist/remove'
const OFFERS_REQUESTED = 'offers/requested'
const OFFERS_RECEIVED = 'offers/received'

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product })
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId })
export const addToWishlist = (product) => ({ type: ADD_TO_WISHLIST, payload: product })
export const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
})

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.find((item) => item.id === action.payload.id)
      return existingItem
        ? state.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state, { ...action.payload, quantity: 1 }]
    }
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload)
    default:
      return state
  }
}

export const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return state.some((item) => item.id === action.payload.id)
        ? state
        : [...state, action.payload]
    case REMOVE_FROM_WISHLIST:
      return state.filter((item) => item.id !== action.payload)
    default:
      return state
  }
}

const initialOffersState = { items: [], status: 'idle' }

const offersReducer = (state = initialOffersState, action) => {
  switch (action.type) {
    case OFFERS_REQUESTED:
      return { ...state, status: 'loading' }
    case OFFERS_RECEIVED:
      return { items: action.payload, status: 'succeeded' }
    default:
      return state
  }
}

export const fetchOffers = () => (dispatch, getState) => {
  if (getState().offers.status !== 'idle') return

  dispatch({ type: OFFERS_REQUESTED })
  setTimeout(() => {
    dispatch({
      type: OFFERS_RECEIVED,
      payload: [
        { id: 'welcome', title: '10% off your first order' },
        { id: 'shipping', title: 'Free shipping over $100' },
      ],
    })
  }, 800)
}

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  offers: offersReducer,
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)
