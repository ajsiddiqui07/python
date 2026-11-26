"""Tuition class fee book and ledger using dictionaries and list helpers."""


def lists_to_dict(keys, values):
    """Build a dictionary from two lists, or return {} if lengths differ."""
    if len(keys) != len(values):
        print("Lists differ in length")
        return {}
    result = {}
    for key, value in zip(keys, values):
        result[key] = value
    return result


# 1. Create students and fees lists, build fee_book with zip(), and print lines.
students = [
    "Aarav",
    "Bhavna",
    "Chirag",
    "Diya",
    "Eshan",
    "Farah",
    "Gaurav",
    "Hina",
]
fees = [1200, 1500, 950, 2200, 1800, 850, 2400, 1100]

fee_book = dict(zip(students, fees))

print("--- Tuition Fee Book ---")
for name, fee in fee_book.items():
    print(f"{name}: ₹{fee}")

# 2. Build paid_status using range(len(students)) and print Pending students.
status = [
    "Paid",
    "Pending",
    "Paid",
    "Pending",
    "Paid",
    "Paid",
    "Pending",
    "Paid",
]

paid_status = {}
for i in range(len(students)):
    paid_status[students[i]] = status[i]

print("\n--- Students with Pending Fees ---")
for name, state in paid_status.items():
    if state == "Pending":
        print(name)

# 3. Combine into nested dictionary ledger using fee_book.items().
ledger = {}
for name, fee in fee_book.items():
    ledger[name] = {"fee": fee, "status": paid_status[name]}

total_pending = 0
paid_count = 0
for info in ledger.values():
    if info["status"] == "Pending":
        total_pending += info["fee"]
    else:
        paid_count += 1

print(f"\nTotal pending amount: ₹{total_pending}")
print(f"Number of students who have paid: {paid_count}")

# 4. Use lists_to_dict for ledger and test matching vs differing list lengths.
ledger_entries = [{"fee": f, "status": s} for f, s in zip(fees, status)]
ledger = lists_to_dict(students, ledger_entries)

print("\n--- lists_to_dict Test (8 names, 8 fees) ---")
print(lists_to_dict(students, fees))

print("\n--- lists_to_dict Test (8 names, 7 fees) ---")
print(lists_to_dict(students, fees[:7]))

# --- Sample Output ---
# --- Tuition Fee Book ---
# Aarav: ₹1200
# Bhavna: ₹1500
# Chirag: ₹950
# Diya: ₹2200
# Eshan: ₹1800
# Farah: ₹850
# Gaurav: ₹2400
# Hina: ₹1100
#
# --- Students with Pending Fees ---
# Bhavna
# Diya
# Gaurav
#
# Total pending amount: ₹6100
# Number of students who have paid: 5
#
# --- lists_to_dict Test (8 names, 8 fees) ---
# {'Aarav': 1200, 'Bhavna': 1500, 'Chirag': 950, 'Diya': 2200, 'Eshan': 1800, 'Farah': 850, 'Gaurav': 2400, 'Hina': 1100}
#
# --- lists_to_dict Test (8 names, 7 fees) ---
# Lists differ in length
# {}
