"""PG room register and monthly billing system for a fictional PG in Surat."""


def print_register(room_dict):
    """Print room number, occupant (or Vacant), and rent for all rooms."""
    for room_no, info in room_dict.items():
        occupant_label = info["occupant"] if info["occupant"] is not None else "Vacant"
        print(f"{room_no} | Occupant: {occupant_label} | Rent: ₹{info['rent']}")


def calculate_monthly_bill(room_info):
    """Calculate monthly bill from rent plus 30 days of opted meals."""
    daily_meal_cost = 0
    if room_info["meals"]["breakfast"]:
        daily_meal_cost += 30
    if room_info["meals"]["lunch"]:
        daily_meal_cost += 60
    if room_info["meals"]["dinner"]:
        daily_meal_cost += 60
    return room_info["rent"] + (daily_meal_cost * 30)


# 1 & 3. Build nested rooms dictionary (with meals dictionary inside each room).
rooms = {
    "R101": {
        "occupant": "Aarav",
        "rent": 8000,
        "sharing": 1,
        "meals": {"breakfast": True, "lunch": True, "dinner": True},
    },
    "R102": {
        "occupant": "Neha",
        "rent": 5500,
        "sharing": 2,
        "meals": {"breakfast": True, "lunch": False, "dinner": True},
    },
    "R103": {
        "occupant": "Rohan",
        "rent": 4200,
        "sharing": 3,
        "meals": {"breakfast": False, "lunch": True, "dinner": True},
    },
    "R104": {
        "occupant": "Karan",
        "rent": 8500,
        "sharing": 1,
        "meals": {"breakfast": True, "lunch": True, "dinner": False},
    },
    "R105": {
        "occupant": None,
        "rent": 6000,
        "sharing": 2,
        "meals": {"breakfast": False, "lunch": False, "dinner": False},
    },
    "R106": {
        "occupant": "Priya",
        "rent": 4500,
        "sharing": 3,
        "meals": {"breakfast": True, "lunch": True, "dinner": True},
    },
}

# 2. Print before updates, apply in-place updates, then print after updates.
print("--- Register Before Changes ---")
print_register(rooms)

for info in rooms.values():
    if info["sharing"] == 1:
        info["rent"] = round(info["rent"] * 1.10)

rooms["R103"]["occupant"] = "Meera"
rooms["R104"]["occupant"] = None

print("\n--- Register After Changes ---")
print_register(rooms)

# 3. Print monthly bill line for every occupied room.
print("\n--- Monthly Bills (Occupied Rooms) ---")
for room_no, info in rooms.items():
    if info["occupant"] is not None:
        bill = calculate_monthly_bill(info)
        print(f"{room_no} ({info['occupant']}): ₹{bill}")

# 4. Look up a room entered by the user without try/except.
room_query = input("\nEnter room number: ").strip()
if room_query in rooms:
    room_info = rooms[room_query]
    if room_info["occupant"] is None:
        print("Vacant")
    else:
        bill = calculate_monthly_bill(room_info)
        print(f"Occupant: {room_info['occupant']} | Monthly Bill: ₹{bill}")
else:
    print("Room not found")

# --- Sample Outputs (Three Test Runs) ---
#
# Test 1 (Vacant room: R104):
# --- Register Before Changes ---
# R101 | Occupant: Aarav | Rent: ₹8000
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Rohan | Rent: ₹4200
# R104 | Occupant: Karan | Rent: ₹8500
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Register After Changes ---
# R101 | Occupant: Aarav | Rent: ₹8800
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Meera | Rent: ₹4200
# R104 | Occupant: Vacant | Rent: ₹9350
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Monthly Bills (Occupied Rooms) ---
# R101 (Aarav): ₹13300
# R102 (Neha): ₹8200
# R103 (Meera): ₹7800
# R106 (Priya): ₹9000
#
# Enter room number: R104
# Vacant
#
# Test 2 (Occupied room with all three meals: R101):
# --- Register Before Changes ---
# R101 | Occupant: Aarav | Rent: ₹8000
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Rohan | Rent: ₹4200
# R104 | Occupant: Karan | Rent: ₹8500
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Register After Changes ---
# R101 | Occupant: Aarav | Rent: ₹8800
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Meera | Rent: ₹4200
# R104 | Occupant: Vacant | Rent: ₹9350
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Monthly Bills (Occupied Rooms) ---
# R101 (Aarav): ₹13300
# R102 (Neha): ₹8200
# R103 (Meera): ₹7800
# R106 (Priya): ₹9000
#
# Enter room number: R101
# Occupant: Aarav | Monthly Bill: ₹13300
#
# Test 3 (Unknown room: R999):
# --- Register Before Changes ---
# R101 | Occupant: Aarav | Rent: ₹8000
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Rohan | Rent: ₹4200
# R104 | Occupant: Karan | Rent: ₹8500
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Register After Changes ---
# R101 | Occupant: Aarav | Rent: ₹8800
# R102 | Occupant: Neha | Rent: ₹5500
# R103 | Occupant: Meera | Rent: ₹4200
# R104 | Occupant: Vacant | Rent: ₹9350
# R105 | Occupant: Vacant | Rent: ₹6000
# R106 | Occupant: Priya | Rent: ₹4500
#
# --- Monthly Bills (Occupied Rooms) ---
# R101 (Aarav): ₹13300
# R102 (Neha): ₹8200
# R103 (Meera): ₹7800
# R106 (Priya): ₹9000
#
# Enter room number: R999
# Room not found
