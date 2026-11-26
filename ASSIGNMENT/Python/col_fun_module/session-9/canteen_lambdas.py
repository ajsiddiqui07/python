"""College canteen pricing, filtering, and discounts using lambdas."""

from functools import reduce

menu = [
    ("Masala Dosa", 55, True),
    ("Paneer Roll", 85, True),
    ("Veg Puff", 25, True),
    ("Chicken Biryani", 140, False),
    ("Idli Sambar", 40, True),
    ("Egg Omelette", 50, False),
    ("Chole Bhature", 75, True),
    ("Cold Coffee", 60, True),
]

# 1. Map lambda: uppercase item name and price with 5% GST rounded to 2 decimals.
with_gst = list(
    map(lambda item: (item[0].upper(), round(item[1] * 1.05, 2)), menu)
)
print("--- Menu with 5% GST ---")
print(with_gst)

# 2. Filter lambda: True only for vegetarian items priced at ₹60 or less.
budget_veg = list(filter(lambda item: item[2] and item[1] <= 60, menu))
print("\n--- Veg Items Priced <= ₹60 ---")
print(budget_veg)


# 3. Order total using reduce() and conditional discount lambda.
def order_total(prices):
    """Return sum of item prices using reduce() with a lambda."""
    return reduce(lambda acc, price: acc + price, prices, 0)


apply_discount = lambda total: total - 15 if total > 200 else total

print("\n--- Order Total & Discount Tests ---")
test_orders = [
    [55, 85, 40],       # Total: ₹180
    [140, 60],          # Total: ₹200
    [140, 75, 45],      # Total: ₹260
]

for order in test_orders:
    raw_total = order_total(order)
    final_total = apply_discount(raw_total)
    print(f"Order {order} -> Total: ₹{raw_total} | Final Payable: ₹{final_total}")

# --- Sample Output ---
# --- Menu with 5% GST ---
# [('MASALA DOSA', 57.75), ('PANEER ROLL', 89.25), ('VEG PUFF', 26.25), ('CHICKEN BIRYANI', 147.0), ('IDLI SAMBAR', 42.0), ('EGG OMELETTE', 52.5), ('CHOLE BHATURE', 78.75), ('COLD COFFEE', 63.0)]
#
# --- Veg Items Priced <= ₹60 ---
# [('Masala Dosa', 55, True), ('Veg Puff', 25, True), ('Idli Sambar', 40, True), ('Cold Coffee', 60, True)]
#
# --- Order Total & Discount Tests ---
# Order [55, 85, 40] -> Total: ₹180 | Final Payable: ₹180
# Order [140, 60] -> Total: ₹200 | Final Payable: ₹200
# Order [140, 75, 45] -> Total: ₹260 | Final Payable: ₹245
