"""Tiffin delivery desk billing with math distance/packaging and random lucky draw."""

import math
import random

PRICE_PER_TIFFIN = 70

for order_num in range(1, 4):
    print(f"\n=== Order {order_num} ===")
    x = int(input("Enter customer x coordinate (0-20): ").strip())
    y = int(input("Enter customer y coordinate (0-20): ").strip())
    tiffins = int(input("Enter number of tiffins (1-40): ").strip())

    # 1. Straight-line distance from kitchen (0, 0) to (x, y).
    distance = round(math.sqrt(x ** 2 + y ** 2), 1)
    print(f"Distance: {distance} km")
    if distance <= 5:
        print("Free delivery")
        delivery_charge = 0
    else:
        delivery_charge = math.ceil(distance) * 10

    # 2. Packaging bags and earned free tiffins.
    bags = math.ceil(tiffins / 4)
    free_tiffins = math.floor(tiffins / 5)

    # 3. Random order ID and lucky draw discount.
    order_id = f"TF-{random.randint(1000, 9999)}"
    draw_value = random.random()
    discount = 50 if draw_value < 0.2 else 0
    print(f"Lucky draw value: {round(draw_value, 2)} | Discount applied: {discount > 0}")

    # 4. Final bill at ₹70 per paid tiffin.
    total = (tiffins * PRICE_PER_TIFFIN) + delivery_charge - discount

    print("--- Tiffin Bill ---")
    print(f"Order ID: {order_id}")
    print(f"Distance: {distance} km")
    print(f"Bags needed: {bags}")
    print(f"Free tiffins earned: {free_tiffins}")
    print(f"Delivery charge: ₹{delivery_charge}")
    print(f"Lucky draw discount: ₹{discount}")
    print(f"Total payable ({tiffins} paid tiffins @ ₹{PRICE_PER_TIFFIN}): ₹{total}")

# --- Sample Output ---
# === Order 1 ===
# Enter customer x coordinate (0-20): 3
# Enter customer y coordinate (0-20): 4
# Enter number of tiffins (1-40): 10
# Distance: 5.0 km
# Free delivery
# Lucky draw value: 0.09 | Discount applied: True
# --- Tiffin Bill ---
# Order ID: TF-7158
# Distance: 5.0 km
# Bags needed: 3
# Free tiffins earned: 2
# Delivery charge: ₹0
# Lucky draw discount: ₹50
# Total payable (10 paid tiffins @ ₹70): ₹650
#
# === Order 2 ===
# Enter customer x coordinate (0-20): 12
# Enter customer y coordinate (0-20): 5
# Enter number of tiffins (1-40): 23
# Distance: 13.0 km
# Lucky draw value: 0.94 | Discount applied: False
# --- Tiffin Bill ---
# Order ID: TF-7534
# Distance: 13.0 km
# Bags needed: 6
# Free tiffins earned: 4
# Delivery charge: ₹130
# Lucky draw discount: ₹0
# Total payable (23 paid tiffins @ ₹70): ₹1740
#
# === Order 3 ===
# Enter customer x coordinate (0-20): 0
# Enter customer y coordinate (0-20): 0
# Enter number of tiffins (1-40): 1
# Distance: 0.0 km
# Free delivery
# Lucky draw value: 0.6 | Discount applied: False
# --- Tiffin Bill ---
# Order ID: TF-9867
# Distance: 0.0 km
# Bags needed: 1
# Free tiffins earned: 0
# Delivery charge: ₹0
# Lucky draw discount: ₹0
# Total payable (1 paid tiffins @ ₹70): ₹70
