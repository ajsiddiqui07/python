"""Housing society maintenance dues and payments register."""


def add_flat(register, wing, flat, owner, due):
    """Store owner and due amount under register[wing][flat]."""
    if wing not in register:
        register[wing] = {}
    register[wing][flat] = {"owner": owner, "due": due}


def record_payment(register, wing, flat, month, amount):
    """Record a monthly payment for a flat, or print 'Flat not found'."""
    if wing not in register or flat not in register[wing]:
        print("Flat not found")
        return
    if "payments" not in register[wing][flat]:
        register[wing][flat]["payments"] = {}
    register[wing][flat]["payments"][month] = amount


# 1. Build society register using a while loop until wing == 'done'.
register = {}
print("Enter flat details (type 'done' for wing to finish):")
while True:
    wing = input("Wing: ").strip()
    if wing.lower() == "done":
        break
    flat = input("Flat number: ").strip()
    owner = input("Owner name: ").strip()
    due = int(input("Annual maintenance due (₹): ").strip())
    add_flat(register, wing, flat, owner, due)

# 2. Record 5 payments (including 2 months for one flat and 1 unknown flat).
print("\n--- Recording Payments ---")
record_payment(register, "A", "101", "January", 1500)
record_payment(register, "A", "101", "February", 1500)
record_payment(register, "A", "102", "January", 2000)
record_payment(register, "B", "201", "January", 2500)
record_payment(register, "C", "999", "January", 1000)

# 3. Wing-wise and society-wide outstanding report.
print("\n--- Society Maintenance Report ---")
society_outstanding = 0
for wing, flats in register.items():
    wing_dues = 0
    wing_paid = 0
    print(f"\nWing {wing}:")
    for flat_no, details in flats.items():
        paid = sum(details["payments"].values()) if "payments" in details else 0
        wing_dues += details["due"]
        wing_paid += paid
        print(
            f"  Flat {flat_no} ({details['owner']}) | "
            f"Due: ₹{details['due']} | Paid: ₹{paid}"
        )
    wing_outstanding = wing_dues - wing_paid
    society_outstanding += wing_outstanding
    print(
        f"  Wing {wing} Totals -> Dues: ₹{wing_dues} | "
        f"Paid: ₹{wing_paid} | Outstanding: ₹{wing_outstanding}"
    )

print(f"\nTotal Society Outstanding: ₹{society_outstanding}")

# --- Sample Output ---
# Enter flat details (type 'done' for wing to finish):
# Wing: A | Flat: 101 | Owner: Ramesh | Due: 6000
# Wing: A | Flat: 102 | Owner: Sunita | Due: 6000
# Wing: A | Flat: 103 | Owner: Vikram | Due: 6000
# Wing: B | Flat: 201 | Owner: Meena | Due: 7500
# Wing: B | Flat: 202 | Owner: Arjun | Due: 7500
# Wing: B | Flat: 203 | Owner: Kavita | Due: 7500
# Wing: done
#
# --- Recording Payments ---
# Flat not found
#
# --- Society Maintenance Report ---
#
# Wing A:
#   Flat 101 (Ramesh) | Due: ₹6000 | Paid: ₹3000
#   Flat 102 (Sunita) | Due: ₹6000 | Paid: ₹2000
#   Flat 103 (Vikram) | Due: ₹6000 | Paid: ₹0
#   Wing A Totals -> Dues: ₹18000 | Paid: ₹5000 | Outstanding: ₹13000
#
# Wing B:
#   Flat 201 (Meena) | Due: ₹7500 | Paid: ₹2500
#   Flat 202 (Arjun) | Due: ₹7500 | Paid: ₹0
#   Flat 203 (Kavita) | Due: ₹7500 | Paid: ₹0
#   Wing B Totals -> Dues: ₹22500 | Paid: ₹2500 | Outstanding: ₹20000
#
# Total Society Outstanding: ₹33000
