"""Monthly expense matrix analysis using list comprehensions."""

months = ["January", "February", "March", "April", "May", "June"]
categories = ["food", "transport", "rent share", "entertainment"]

# Rows: Jan-Jun | Columns: food, transport, rent share, entertainment
expenses = [
    [4800, 1600, 12000, 2200],
    [5200, 1400, 12000, 1800],
    [4500, 2100, 12000, 3200],
    [5600, 1900, 12500, 2500],
    [5100, 2300, 12500, 4100],
    [6100, 1750, 12500, 2900],
]

# 1. Monthly totals with a list comprehension.
month_totals = [sum(row) for row in expenses]
print("--- Monthly Totals ---")
for month, total in zip(months, month_totals):
    print(f"{month}: ₹{total}")

# 2. Transpose into by_category using a nested list comprehension.
by_category = [[row[c] for row in expenses] for c in range(4)]
print("\n--- Category Totals ---")
for category, amounts in zip(categories, by_category):
    print(f"{category}: ₹{sum(amounts)}")

# 3. Flat list of (month, category, amount) for amounts > ₹5,000.
big_expenses = [
    (months[r], categories[c], expenses[r][c])
    for r in range(6)
    for c in range(4)
    if expenses[r][c] > 5000
]
print("\n--- Big Expenses (> ₹5,000) ---")
for entry in big_expenses:
    print(entry)

# 4. Savings plan: cut transport (col 1) and entertainment (col 3) by 10%.
savings_plan = [
    [round(row[c] * 0.9) if c in (1, 3) else row[c] for c in range(4)]
    for row in expenses
]
new_totals = [sum(row) for row in savings_plan]

print("\n--- Savings Plan (Old vs New Monthly Totals) ---")
[
    print(f"{m}: Old ₹{old} -> New ₹{new}")
    for m, old, new in zip(months, month_totals, new_totals)
]

# --- Sample Output ---
# --- Monthly Totals ---
# January: ₹20600
# February: ₹20400
# March: ₹21800
# April: ₹22500
# May: ₹24000
# June: ₹23250
#
# --- Category Totals ---
# food: ₹31300
# transport: ₹11050
# rent share: ₹73500
# entertainment: ₹16700
#
# --- Big Expenses (> ₹5,000) ---
# ('January', 'rent share', 12000)
# ('February', 'food', 5200)
# ('February', 'rent share', 12000)
# ('March', 'rent share', 12000)
# ('April', 'food', 5600)
# ('April', 'rent share', 12500)
# ('May', 'food', 5100)
# ('May', 'rent share', 12500)
# ('June', 'food', 6100)
# ('June', 'rent share', 12500)
#
# --- Savings Plan (Old vs New Monthly Totals) ---
# January: Old ₹20600 -> New ₹20220
# February: Old ₹20400 -> New ₹20080
# March: Old ₹21800 -> New ₹21270
# April: Old ₹22500 -> New ₹22060
# May: Old ₹24000 -> New ₹23360
# June: Old ₹23250 -> New ₹22785
