"""Inventory stock management functions."""


def add_item(inventory, name, qty, price):
    """Add or update an item record in the inventory dictionary."""
    inventory[name] = {"qty": qty, "price": price}


def low_stock(inventory, limit=5):
    """Return a list of item names whose quantity is at or below limit."""
    return [name for name, details in inventory.items() if details["qty"] <= limit]
