import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Film,
  Headphones,
  Heart,
  MapPin,
  Minus,
  Music2,
  Pause,
  PackageCheck,
  Plus,
  Play,
  Search,
  ShoppingBag,
  ShoppingCart,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  TicketCheck,
  Utensils,
  Volume2,
  Wallet,
} from "lucide-react";

const screens = [
  { id: "food", label: "Food delivery", icon: Utensils, number: "01" },
  { id: "music", label: "Playlist dashboard", icon: Headphones, number: "02" },
  { id: "movie", label: "Movie booking flow", icon: Film, number: "03" },
  { id: "cart", label: "Shopping cart", icon: ShoppingCart, number: "04" },
  { id: "rewards", label: "Rewards dashboard", icon: BadgePercent, number: "05" },
];

const restaurants = [
  { name: "Miso & Maple", detail: "Japanese · Ramen · Bowls", time: "20-30 min", rating: "4.8", mark: "M", tone: "wire-tone-one" },
  { name: "Little Punjab", detail: "North Indian · Curry", time: "25-35 min", rating: "4.6", mark: "LP", tone: "wire-tone-two" },
  { name: "Sourdough Social", detail: "Pizza · Italian", time: "30-40 min", rating: "4.7", mark: "SS", tone: "wire-tone-three" },
];

const tracks = [
  { title: "A Walk in the Park", artist: "Mira Sol", length: "3:42", color: "#d8a37e" },
  { title: "The Quiet Between", artist: "Northbound", length: "4:08", color: "#77908e" },
  { title: "Soft Light", artist: "Kaito Bloom", length: "3:18", color: "#8f9b72" },
  { title: "Slow Motion", artist: "Nina July", length: "4:21", color: "#c16b57" },
];

const products = [
  { name: "Canvas Weekender", variant: "Olive · 38L", price: 2499, image: "photo-1553062407-98eeb64c6a62", label: "Bestseller" },
  { name: "Everyday Bottle", variant: "Stone · 750 ml", price: 849, image: "photo-1602143407151-7111542de6e8", label: "Reusable" },
];

const bookingSteps = [
  { title: "Open the app", detail: "Choose your city and browse films.", icon: Film },
  { title: "Select a movie", detail: "Review language, format, and showtimes.", icon: Search },
  { title: "Pick theatre & time", detail: "Compare nearby cinemas and seats.", icon: MapPin },
  { title: "Choose seats", detail: "Select seats and check the price.", icon: TicketCheck },
  { title: "Pay securely", detail: "Apply an offer and confirm payment.", icon: CreditCard },
  { title: "Get confirmation", detail: "Receive the ticket and QR code.", icon: Check },
];

function FoodWireframe({ search, setSearch }) {
  const visibleRestaurants = restaurants.filter((restaurant) => `${restaurant.name} ${restaurant.detail}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="screen food-screen" aria-label="Low fidelity food delivery homepage wireframe">
      <div className="wire-topline"><span>WIREFRAME / 01</span><span>HOME FEED <span className="wire-separator">·</span> MOBILE FIRST</span></div>
      <div className="food-greeting"><div><span className="wire-eyebrow">DELIVERING TO</span><button className="location-select" type="button"><MapPin size={15} /> Koregaon Park, Pune <ChevronDown size={14} /></button></div><button className="wire-avatar" type="button" aria-label="Profile">P</button></div>
      <h1 className="wire-title">What sounds good?</h1>
      <label className="wire-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes or restaurants" /><SlidersHorizontal size={17} /></label>
      <div className="wire-categories"><button type="button" className="wire-category-active">All <span>08</span></button><button type="button">Biryani <span>12</span></button><button type="button">Pizza <span>06</span></button><button type="button">Healthy <span>09</span></button></div>
      <div className="wire-section-title"><div><span className="wire-eyebrow">CURATED FOR YOU</span><h2>Featured restaurants</h2></div><button className="wire-link" type="button">See all <ArrowRight size={14} /></button></div>
      <div className="restaurant-grid">
        {visibleRestaurants.map((restaurant) => <article className="restaurant-wire-card" key={restaurant.name}><div className={`restaurant-image-wire ${restaurant.tone}`}><span>{restaurant.mark}</span><small>IMAGE</small></div><div className="restaurant-wire-copy"><div className="restaurant-name-row"><h3>{restaurant.name}</h3><span className="wire-rating">★ {restaurant.rating}</span></div><p>{restaurant.detail}</p><div className="restaurant-foot"><span><Clock3 size={12} /> {restaurant.time}</span><span>FREE DELIVERY</span></div></div></article>)}
      </div>
      <div className="wire-section-title tracking-title"><div><span className="wire-eyebrow">YOUR LATEST ORDER</span><h2>On the way to you</h2></div><span className="order-id">#FD-2841</span></div>
      <article className="order-tracker"><div className="tracker-visual"><div className="tracker-step tracker-done"><span><Check size={12} /></span><small>Confirmed</small></div><div className="tracker-line tracker-line-done" /><div className="tracker-step tracker-done"><span><Check size={12} /></span><small>Preparing</small></div><div className="tracker-line" /><div className="tracker-step tracker-current"><span><PackageCheck size={13} /></span><small>On the way</small></div><div className="tracker-line" /><div className="tracker-step"><span><MapPin size={12} /></span><small>Delivered</small></div></div><div className="tracker-details"><span><strong>Arriving in 12 min</strong><small>Ravi is carrying your order</small></span><button type="button" aria-label="Track delivery"><ArrowUpRight size={16} /></button></div></article>
      {visibleRestaurants.length === 0 && <p className="empty-search">No restaurants match that search. Try another name.</p>}
    </section>
  );
}

function MusicDashboard({ playing, setPlaying }) {
  return (
    <section className="screen music-screen" aria-label="High fidelity music playlist dashboard">
      <div className="music-sidebar"><div className="music-brand"><span className="music-brand-mark"><Music2 size={17} /></span>SONORA</div><span className="music-nav-label">YOUR SPACE</span><button className="music-nav-active" type="button"><Headphones size={16} /> Listen now</button><button type="button"><Heart size={16} /> Liked songs</button><span className="music-nav-label music-playlist-label">PLAYLISTS <Plus size={14} /></span><button type="button">Sunday reset</button><button type="button">Night drive</button><button type="button">Deep focus</button><div className="music-profile"><span className="music-profile-pic">J</span><span><strong>Jamie Chen</strong><small>Premium member</small></span></div></div>
      <div className="music-main"><div className="music-topbar"><span>Good evening, Jamie</span><button type="button" className="music-user-button">J <ChevronDown size={14} /></button></div><div className="music-hero"><div className="music-hero-art"><div className="music-sun" /><span>MOOD<br />STUDY 04</span></div><div className="music-hero-copy"><span className="music-overline">MADE FOR YOUR SUNDAY</span><h1>Soft edges,<br /><em>clear mind.</em></h1><p>Unhurried sounds for a day with nowhere to be.</p><div className="music-hero-meta"><span>18 TRACKS</span><span>1 HR 06 MIN</span></div><button type="button" className="music-play-cta" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />} {playing ? "Pause mix" : "Play mix"}</button></div></div><div className="music-list-heading"><div><span className="music-overline">YOUR COLLECTION</span><h2>Made for you</h2></div><button type="button">VIEW ALL <ArrowRight size={14} /></button></div><div className="playlist-cards"><article><div className="playlist-art playlist-art-a"><span>Sunday<br />reset</span></div><strong>Sunday reset</strong><small>18 songs · just for you</small></article><article><div className="playlist-art playlist-art-b"><span>Night<br />drive</span></div><strong>Night drive</strong><small>24 songs · saved mix</small></article><article><div className="playlist-art playlist-art-c"><span>Deep<br />focus</span></div><strong>Deep focus</strong><small>32 songs · updated today</small></article></div><div className="music-queue"><div className="music-list-heading queue-heading"><div><span className="music-overline">UP NEXT</span><h2>In this mix</h2></div><button type="button"><ArrowDown size={14} /> SORT</button></div>{tracks.map((track, index) => <div className="music-track" key={track.title}><span className="music-track-number">{String(index + 1).padStart(2, "0")}</span><span className="music-track-art" style={{ backgroundColor: track.color }}>{track.title.slice(0, 1)}</span><span className="music-track-name"><strong>{track.title}</strong><small>{track.artist}</small></span><span className="music-track-length">{track.length}</span><button type="button" aria-label={`Play ${track.title}`} onClick={() => setPlaying(true)}><Play size={13} fill="currentColor" /></button></div>)}</div></div>
      <div className="now-playing-bar"><div className="np-track"><span className="np-cover">S</span><span><strong>Soft Light</strong><small>Kaito Bloom</small></span><button type="button" aria-label="Like song"><Heart size={15} /></button></div><div className="np-controls"><div><button type="button" aria-label="Previous"><SkipBack size={14} fill="currentColor" /></button><button className="np-main-play" type="button" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}</button><button type="button" aria-label="Next"><SkipForward size={14} fill="currentColor" /></button></div><div className="np-progress"><span>1:12</span><span className="np-progress-track"><i /></span><span>3:18</span></div></div><div className="np-volume"><Volume2 size={16} /><span /></div></div>
    </section>
  );
}

function MovieJourney({ step, setStep }) {
  return (
    <section className="screen movie-screen" aria-label="Movie ticket booking user journey map">
      <div className="movie-header"><div><span className="movie-kicker">BOOKING JOURNEY / 03</span><h1>From browsing to <em>the big screen.</em></h1><p>A six-step path from opening the app to holding a confirmed ticket.</p></div><span className="movie-ticket-stamp"><TicketCheck size={22} /> MOVIE NIGHT<br />PLANNED</span></div>
      <div className="movie-progress-label"><span>STEP {String(step + 1).padStart(2, "0")} OF 06</span><span>{Math.round(((step + 1) / bookingSteps.length) * 100)}% COMPLETE</span></div><div className="movie-progress"><span style={{ width: `${((step + 1) / bookingSteps.length) * 100}%` }} /></div>
      <div className="movie-journey-grid">{bookingSteps.map((item, index) => { const Icon = item.icon; return <button className={`journey-step ${index === step ? "journey-step-active" : ""} ${index < step ? "journey-step-complete" : ""}`} type="button" key={item.title} onClick={() => setStep(index)}><span className="journey-step-top"><span className="journey-count">0{index + 1}</span><Icon size={20} /></span><strong>{item.title}</strong><small>{item.detail}</small><span className="journey-connector" />{index < step && <span className="journey-check"><Check size={12} /></span>}</button>; })}</div>
      <div className="movie-current-card"><div className="movie-current-poster"><span>NOW<br />SHOWING</span><strong>THE<br />LAST<br />LIGHT</strong><small>A FILM BY N. KAPOOR</small></div><div className="movie-current-copy"><span className="movie-kicker">CURRENT SCREEN</span><h2>{bookingSteps[step].title}</h2><p>{bookingSteps[step].detail} The interface keeps the next action clear and confirms the user's choice before they move forward.</p><div className="movie-example-data"><span><MapPin size={14} /> Pune</span><span><Clock3 size={14} /> Today, 7:30 PM</span><span><TicketCheck size={14} /> 2 seats</span></div><div className="movie-step-actions"><button type="button" className="movie-back" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft size={15} /> Previous</button><button type="button" className="movie-next" onClick={() => setStep((current) => Math.min(bookingSteps.length - 1, current + 1))} disabled={step === bookingSteps.length - 1}>{step === bookingSteps.length - 1 ? "Journey complete" : "Next step"} {step < bookingSteps.length - 1 && <ArrowRight size={15} />}</button></div></div></div>
      <div className="movie-note"><CircleHelp size={15} /><span>Good flow principle: show the final price before payment, then surface the QR ticket immediately after confirmation.</span></div>
    </section>
  );
}

function ShoppingCartPrototype({ quantities, setQuantities, checkedOut, setCheckedOut }) {
  const subtotal = products.reduce((sum, product, index) => sum + product.price * quantities[index], 0);
  const delivery = subtotal > 2500 ? 0 : 99;
  const total = subtotal + delivery;
  function changeQuantity(index, amount) {
    setQuantities((current) => current.map((quantity, itemIndex) => itemIndex === index ? Math.max(0, quantity + amount) : quantity));
    setCheckedOut(false);
  }
  return (
    <section className="screen cart-screen" aria-label="Shopping cart dashboard prototype">
      <header className="cart-topbar"><span className="cart-brand">FLIP<span>+</span></span><span className="cart-crumb">YOUR BAG <span>/</span> DELIVERY</span><button type="button"><CircleHelp size={16} /> Help</button></header>
      <div className="cart-page-heading"><div><span className="cart-kicker">YOUR NEXT FAVORITES</span><h1>Shopping bag <span>{quantities.reduce((sum, quantity) => sum + quantity, 0)}</span></h1></div><button type="button" className="cart-continue"><ArrowLeft size={15} /> Continue shopping</button></div>
      <div className="cart-layout"><div className="cart-items"><div className="cart-delivery-banner"><span><PackageCheck size={18} /></span><div><strong>Free delivery unlocked</strong><small>Your order qualifies for complimentary shipping.</small></div><Check size={16} /></div><div className="cart-item-header"><span>ITEMS IN YOUR BAG</span><span>PRICE</span></div>{products.map((product, index) => <article className={`cart-item ${quantities[index] === 0 ? "cart-item-removed" : ""}`} key={product.name}><img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=240&h=240&q=80`} alt={product.name} /><div className="cart-item-info"><span className="cart-product-label">{product.label}</span><strong>{product.name}</strong><small>{product.variant}</small><div className="quantity-control"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(index, -1)}><Minus size={13} /></button><span>{quantities[index]}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(index, 1)}><Plus size={13} /></button></div></div><strong className="cart-item-price">₹{(product.price * quantities[index]).toLocaleString("en-IN")}</strong></article>)}<button className="promo-line" type="button"><BadgePercent size={17} /><span>Apply a promo code</span><ArrowRight size={15} /></button></div><aside className="order-summary"><span className="cart-kicker">THE SMALL PRINT</span><h2>Price details</h2><div className="summary-line"><span>Price ({quantities.reduce((sum, quantity) => sum + quantity, 0)} items)</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div><div className="summary-line"><span>Delivery fee</span><span>{delivery === 0 ? <b className="free-label">FREE</b> : `₹${delivery}`}</span></div><div className="summary-line savings-line"><span>You save</span><span>− ₹350</span></div><div className="summary-total"><strong>Total payable</strong><strong>₹{total.toLocaleString("en-IN")}</strong></div><div className="secure-checkout"><CreditCard size={16} /><span>Secure checkout · easy returns</span></div><button className={`checkout-button ${checkedOut ? "checkout-done" : ""}`} type="button" onClick={() => setCheckedOut(true)}>{checkedOut ? <><Check size={17} /> Ready to pay</> : <>Continue to checkout <ArrowRight size={16} /></>}</button><p className="summary-footnote">Taxes included. Delivery address selected at next step.</p></aside></div>
    </section>
  );
}

function RewardsDashboard() {
  const [activeReward, setActiveReward] = useState("All rewards");
  const rewards = [
    { title: "Dining, on us", partner: "THE TABLE · DINING", points: "2,500", category: "Dining", tint: "reward-coral", icon: Utensils },
    { title: "A better brew", partner: "GROUNDWORK · CAFE", points: "800", category: "Lifestyle", tint: "reward-olive", icon: Sparkles },
    { title: "Weekend escape", partner: "STAYFOLIO · TRAVEL", points: "4,200", category: "Travel", tint: "reward-blue", icon: MapPin },
  ];
  const filtered = activeReward === "All rewards" ? rewards : rewards.filter((reward) => reward.category === activeReward);
  return (
    <section className="screen rewards-screen" aria-label="Rewards dashboard redesign">
      <header className="rewards-topbar"><a className="cred-mark" href="#rewards">C<span>.</span></a><nav><a className="reward-nav-active" href="#overview">Overview</a><a href="#rewards-list">Rewards</a><a href="#activity">Activity</a></nav><button className="reward-profile" type="button"><span>PK</span><ChevronDown size={14} /></button></header>
      <div className="reward-content" id="overview"><div className="rewards-welcome"><div><span className="reward-eyebrow">MONDAY, 02 NOVEMBER 2026</span><h1>Good afternoon,<br /><em>Priya.</em></h1><p>Your everyday spends are adding up to something good.</p></div><div className="member-stamp"><span>MEMBER SINCE</span><strong>2023</strong><span>FOUNDING CIRCLE</span></div></div>
        <div className="points-band"><div><span className="reward-eyebrow">YOUR REWARD BALANCE</span><div className="points-number">12,840 <small>pts</small></div><span className="points-progress"><i /></span><small className="points-next">2,160 points to your next milestone</small></div><div className="points-band-divider" /><div className="points-side"><span className="points-spark"><Sparkles size={17} /></span><span><strong>Good things,<br />well earned.</strong><small>Explore rewards picked for you.</small></span><ArrowUpRight size={17} /></div></div>
        <div className="rewards-heading" id="rewards-list"><div><span className="reward-eyebrow">A LITTLE SOMETHING BACK</span><h2>Worth your points.</h2></div><a href="#all-rewards">VIEW ALL <ArrowRight size={14} /></a></div><div className="reward-filters">{["All rewards", "Dining", "Lifestyle", "Travel"].map((filter) => <button key={filter} type="button" className={activeReward === filter ? "reward-filter-active" : ""} onClick={() => setActiveReward(filter)}>{filter}</button>)}</div><div className="reward-grid">{filtered.map((reward) => { const Icon = reward.icon; return <article className={`reward-card ${reward.tint}`} key={reward.title}><div className="reward-card-top"><span>{reward.partner}</span><Icon size={20} /></div><div className="reward-card-title"><h3>{reward.title}</h3><p>A considered little treat, just for you.</p></div><div className="reward-card-bottom"><span><strong>{reward.points}</strong> POINTS</span><button type="button" aria-label={`Redeem ${reward.title}`}><ArrowUpRight size={16} /></button></div></article>; })}</div><footer className="rewards-footer"><span>GOOD TASTE. GOOD KARMA.</span><span>THE CIRCLE <span>·</span> REWARDS THAT FEEL LIKE YOU</span></footer>
      </div>
    </section>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState("food");
  const [foodSearch, setFoodSearch] = useState("");
  const [playing, setPlaying] = useState(false);
  const [movieStep, setMovieStep] = useState(0);
  const [quantities, setQuantities] = useState([1, 1]);
  const [checkedOut, setCheckedOut] = useState(false);
  const currentScreen = useMemo(() => screens.find((screen) => screen.id === activeScreen), [activeScreen]);
  const CurrentIcon = currentScreen.icon;

  return (
    <main className="design-app">
      <aside className="design-rail"><div className="studio-logo"><span>02</span><div><strong>FIELD<br />NOTES</strong><small>DESIGN STUDIO</small></div></div><div className="rail-caption">SESSION CONTENT</div><nav className="screen-nav" aria-label="Session 2 prototypes">{screens.map((screen) => { const Icon = screen.icon; return <button type="button" key={screen.id} className={activeScreen === screen.id ? "screen-nav-active" : ""} onClick={() => setActiveScreen(screen.id)}><span className="nav-number">{screen.number}</span><Icon size={16} /><span>{screen.label}</span>{activeScreen === screen.id && <span className="nav-active-dot" />}</button>; })}</nav><div className="rail-bottom-note"><span className="rail-note-mark"><Sparkles size={14} /></span><span><strong>Five small worlds.</strong><small>One interaction lab.</small></span></div></aside>
      <section className="design-workspace"><header className="workspace-header"><div><span className="workspace-path">COURSEWORK <span>/</span> REACT FUNDAMENTALS</span><h1><CurrentIcon size={19} /> {currentScreen.label}</h1></div><div className="workspace-user"><span>DESIGN EXERCISE</span><span className="user-initial">P</span></div></header><div className="prototype-wrap">{activeScreen === "food" && <FoodWireframe search={foodSearch} setSearch={setFoodSearch} />}{activeScreen === "music" && <MusicDashboard playing={playing} setPlaying={setPlaying} />}{activeScreen === "movie" && <MovieJourney step={movieStep} setStep={setMovieStep} />}{activeScreen === "cart" && <ShoppingCartPrototype quantities={quantities} setQuantities={setQuantities} checkedOut={checkedOut} setCheckedOut={setCheckedOut} />}{activeScreen === "rewards" && <RewardsDashboard />}</div></section>
    </main>
  );
}