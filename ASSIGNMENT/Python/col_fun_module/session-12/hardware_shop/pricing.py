"""Pricing and GST calculation functions."""


def gst_amount(price, rate=18):
    """Return the GST amount for a given price and tax rate percentage."""
    return price * rate / 100


def cart_total(inventory, cart):
    """Return GST-inclusive total for items in cart, skipping missing items."""
    total = 0.0
    for item_name, qty in cart.items():
        if item_name in inventory:
            line_price = inventory[item_name]["price"] * qty
            total += line_price + gst_amount(line_price)
        else:
            print(f"Item '{item_name}' is not in stock; skipping.")
    return round(total, 2)
