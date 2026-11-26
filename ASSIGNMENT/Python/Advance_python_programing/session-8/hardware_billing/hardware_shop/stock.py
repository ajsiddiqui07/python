class OutOfStockError(Exception):
    pass


INVENTORY = {
    "Wood Screws": {"boxes": 25, "price": 180},
    "Hex Bolts": {"boxes": 18, "price": 240},
    "Wall Plugs": {"boxes": 30, "price": 120},
    "Steel Nails": {"boxes": 20, "price": 150},
    "Door Hinges": {"boxes": 12, "price": 420},
    "Brass Locks": {"boxes": 8, "price": 650},
    "Drill Bits": {"boxes": 15, "price": 520},
    "PVC Clamps": {"boxes": 40, "price": 95},
}


def check_stock(item):
    """Return stock dictionary (boxes and price) for an item, or raise OutOfStockError."""
    if item not in INVENTORY:
        raise OutOfStockError(f"Unknown item '{item}'.")
    return INVENTORY[item]


def reduce_stock(item, qty):
    """Deduct qty boxes from inventory and return subtotal in ₹, or raise OutOfStockError."""
    if item not in INVENTORY:
        raise OutOfStockError(f"Unknown item '{item}' is not carried in stock.")
    if qty <= 0:
        raise OutOfStockError(f"Invalid quantity {qty} for '{item}'.")

    available = INVENTORY[item]["boxes"]
    if qty > available:
        raise OutOfStockError(
            f"Not enough stock for '{item}': requested {qty} box(es), only {available} available."
        )

    INVENTORY[item]["boxes"] -= qty
    return qty * INVENTORY[item]["price"]
