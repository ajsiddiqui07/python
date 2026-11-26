"""Kirana store billing script using zip(), sorting, and list methods."""

items = [
    "Toor Dal (1kg)",
    "Basmati Rice (1kg)",
    "Groundnut Oil (1L)",
    "Sugar (1kg)",
    "Almonds (250g)",
    "Tea Powder (500g)",
    "Ghee (500ml)",
    "Poha (1kg)",
]
prices = [145.50, 112.75, 185.00, 49.50, 240.00, 135.25, 320.00, 58.00]
qty = [2, 3, 1, 4, 1, 2, 1, 3]

# 1. Print each item and its base line amount using zip() without range() or indexes.
print("--- Kirana Bill (Before GST) ---")
for item, price, q in zip(items, prices, qty):
    line_amount = round(price * q, 2)
    print(f"{item}: ₹{price:.2f} x {q} = ₹{line_amount:.2f}")

# 2. Add 5% GST on every line and compute bill total and total GST.
line_totals = []
bill_total = 0.0
total_gst = 0.0

print("\n--- Kirana Bill (With 5% GST) ---")
for item, price, q in zip(items, prices, qty):
    base_amount = round(price * q, 2)
    line_total = round(base_amount * 1.05, 2)
    line_gst = round(line_total - base_amount, 2)

    line_totals.append(line_total)
    bill_total = round(bill_total + line_total, 2)
    total_gst = round(total_gst + line_gst, 2)

    print(f"{item}: ₹{line_total:.2f} (incl. ₹{line_gst:.2f} GST)")

print(f"Total GST: ₹{total_gst:.2f}")
print(f"Bill Total: ₹{bill_total:.2f}")

# 3. Top 3 costliest items using (amount, name) tuples and sorted(..., reverse=True).
combined = list(zip(line_totals, items))
sorted_items = sorted(combined, reverse=True)

print("\n--- Top 3 costliest items ---")
for amount, name in sorted_items[:3]:
    print(f"{name}: ₹{amount:.2f}")

# 4. Premium items priced above ₹100 sorted A to Z with .sort().
premium_items = []
for name, price in zip(items, prices):
    if price > 100:
        premium_items.append(name)

premium_items.sort()

print("\n--- Premium items ---")
for name in premium_items:
    print(name)

# --- Sample Output ---
# --- Kirana Bill (Before GST) ---
# Toor Dal (1kg): ₹145.50 x 2 = ₹291.00
# Basmati Rice (1kg): ₹112.75 x 3 = ₹338.25
# Groundnut Oil (1L): ₹185.00 x 1 = ₹185.00
# Sugar (1kg): ₹49.50 x 4 = ₹198.00
# Almonds (250g): ₹240.00 x 1 = ₹240.00
# Tea Powder (500g): ₹135.25 x 2 = ₹270.50
# Ghee (500ml): ₹320.00 x 1 = ₹320.00
# Poha (1kg): ₹58.00 x 3 = ₹174.00
#
# --- Kirana Bill (With 5% GST) ---
# Toor Dal (1kg): ₹305.55 (incl. ₹14.55 GST)
# Basmati Rice (1kg): ₹355.16 (incl. ₹16.91 GST)
# Groundnut Oil (1L): ₹194.25 (incl. ₹9.25 GST)
# Sugar (1kg): ₹207.90 (incl. ₹9.90 GST)
# Almonds (250g): ₹252.00 (incl. ₹12.00 GST)
# Tea Powder (500g): ₹284.03 (incl. ₹13.53 GST)
# Ghee (500ml): ₹336.00 (incl. ₹16.00 GST)
# Poha (1kg): ₹182.70 (incl. ₹8.70 GST)
# Total GST: ₹100.84
# Bill Total: ₹2117.59
#
# --- Top 3 costliest items ---
# Basmati Rice (1kg): ₹355.16
# Ghee (500ml): ₹336.00
# Toor Dal (1kg): ₹305.55
#
# --- Premium items ---
# Almonds (250g)
# Basmati Rice (1kg)
# Ghee (500ml)
# Groundnut Oil (1L)
# Tea Powder (500g)
# Toor Dal (1kg)
