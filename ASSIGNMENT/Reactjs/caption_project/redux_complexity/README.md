# Good Things Store

A small React + Redux shopping storefront demonstrating cart and wishlist reducers, thunk middleware, asynchronous offers, and Redux DevTools.

## Run locally

```sh
npm install
npm run dev
```

## Redux state

- `cart` is an array managed by `cartReducer`. Adding an existing product increments its quantity; removing it removes that product.
- `wishlist` is managed independently by `wishlistReducer`.
- `offers` tracks the mocked offer request and its loading status.
- `fetchOffers` uses redux-thunk and a short timeout to simulate an API response.
- `combineReducers` combines the three state slices. The Redux DevTools Extension enhancer is wired into the store in `src/store.js`.

## Track changes with Redux DevTools

Install the Redux DevTools browser extension for your browser, open the app, and open the extension panel. The store is configured with `@redux-devtools/extension`, so dispatched actions and state snapshots appear there automatically. Use the product buttons to add/remove cart items and the heart buttons to add/remove wishlist items. Wait briefly for the `OFFERS_RECEIVED` action.

The extension's panel is provided by the browser extension and is not included in the app itself.
