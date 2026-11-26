"""Driver script for the hardware_shop package."""

from hardware_shop import shop_name, add_item, low_stock, gst_amount, cart_total

print(f"Welcome to {shop_name}")

inventory = {}
add_item(inventory, "Hammer", 12, 250)
add_item(inventory, "Screwdriver Set", 4, 420)
add_item(inventory, "Measuring Tape", 3, 180)
add_item(inventory, "Drill Machine", 2, 2400)
add_item(inventory, "Paint Brush", 20, 95)
add_item(inventory, "Wrench Set", 8, 650)

print("\nLow-stock items (<= 5):", low_stock(inventory))
print(f"Sample 18% GST on ₹250: ₹{gst_amount(250):.2f}")

# Cart 1: Valid cart of 3 items
valid_cart = {
    "Hammer": 2,
    "Paint Brush": 4,
    "Wrench Set": 1,
}
print("\n--- Cart 1 (Valid) ---")
print(f"Total (incl. 18% GST): ₹{cart_total(inventory, valid_cart)}")

# Cart 2: Cart containing an item not in stock
mixed_cart = {
    "Drill Machine": 1,
    "Chainsaw": 1,
    "Measuring Tape": 2,
}
print("\n--- Cart 2 (With Missing Item) ---")
print(f"Total (incl. 18% GST): ₹{cart_total(inventory, mixed_cart)}")

# --- Sample Output ---
# Welcome to Patel Hardware & Tools
#
# Low-stock items (<= 5): ['Screwdriver Set', 'Measuring Tape', 'Drill Machine']
# Sample 18% GST on ₹250: ₹45.00
#
# --- Cart 1 (Valid) ---
# Total (incl. 18% GST): ₹1805.4
#
# --- Cart 2 (With Missing Item) ---
# Item 'Chainsaw' is not in stock; skipping.
# Total (incl. 18% GST): ₹3256.8
