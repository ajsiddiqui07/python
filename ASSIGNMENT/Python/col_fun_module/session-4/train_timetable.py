"""Train timetable and fare calculator using immutable tuples."""

# 1. Tuple of 6 fictional trains between real Indian cities.
routes = (
    ("Sabarmati Express", "Ahmedabad", "Mumbai", "06:15", 492, True),
    ("Deccan Arrow", "Pune", "Hyderabad", "08:30", 560, True),
    ("Pink City Mail", "Jaipur", "Delhi", "10:45", 308, False),
    ("Kaveri Runner", "Bengaluru", "Chennai", "14:20", 362, True),
    ("Ganga Horizon", "Varanasi", "Kolkata", "17:05", 678, False),
    ("Malabar Coastal", "Kochi", "Thiruvananthapuram", "20:10", 206, True),
)

print("--- All Routes ---")
for route in routes:
    print(
        f"{route[0]} | {route[1]} -> {route[2]} | "
        f"Dep: {route[3]} | {route[4]} km | AC: {route[5]}"
    )

# 2. Tuple slicing demonstrations.
print("\n--- Slicing Each Route ---")
for route in routes:
    print(f"{route[0]}: Cities {route[1:3]} | Distance & AC {route[-2:]}")

print("\n--- First Three Routes (routes[:3]) ---")
for route in routes[:3]:
    print(route)

print("\n--- Every Second Route (routes[::2]) ---")
for route in routes[::2]:
    print(route)


# 3. Reschedule departure time by converting tuples to lists and back.
def reschedule(routes_tuple, index, new_time):
    """Return a new routes tuple with updated departure time at index."""
    if index < 0 or index >= len(routes_tuple):
        print("Invalid route number")
        return routes_tuple

    route_list = list(routes_tuple)
    updated_route = list(route_list[index])
    updated_route[3] = new_time
    route_list[index] = tuple(updated_route)
    return tuple(route_list)


# 4. Fare calculation function and fare table.
def fare(route):
    """Return ticket fare rounded to 2 decimals based on AC availability."""
    rate = 2.10 if route[5] else 1.20
    return round(route[4] * rate, 2)


print("\n--- Fare Table ---")
for route in routes:
    print(f"{route[0]} | {route[1]} -> {route[2]} | Fare: ₹{fare(route):.2f}")

print("\n--- Reschedule Test: Index 2 to 11:30 ---")
print("Old routes:", routes)
routes_updated = reschedule(routes, 2, "11:30")
print("New routes:", routes_updated)

print("\n--- Reschedule Test: Index 8 to 09:00 ---")
routes_invalid = reschedule(routes_updated, 8, "09:00")
print("Returned routes:", routes_invalid)

# --- Sample Output ---
# --- All Routes ---
# Sabarmati Express | Ahmedabad -> Mumbai | Dep: 06:15 | 492 km | AC: True
# Deccan Arrow | Pune -> Hyderabad | Dep: 08:30 | 560 km | AC: True
# Pink City Mail | Jaipur -> Delhi | Dep: 10:45 | 308 km | AC: False
# Kaveri Runner | Bengaluru -> Chennai | Dep: 14:20 | 362 km | AC: True
# Ganga Horizon | Varanasi -> Kolkata | Dep: 17:05 | 678 km | AC: False
# Malabar Coastal | Kochi -> Thiruvananthapuram | Dep: 20:10 | 206 km | AC: True
#
# --- Slicing Each Route ---
# Sabarmati Express: Cities ('Ahmedabad', 'Mumbai') | Distance & AC (492, True)
# Deccan Arrow: Cities ('Pune', 'Hyderabad') | Distance & AC (560, True)
# Pink City Mail: Cities ('Jaipur', 'Delhi') | Distance & AC (308, False)
# Kaveri Runner: Cities ('Bengaluru', 'Chennai') | Distance & AC (362, True)
# Ganga Horizon: Cities ('Varanasi', 'Kolkata') | Distance & AC (678, False)
# Malabar Coastal: Cities ('Kochi', 'Thiruvananthapuram') | Distance & AC (206, True)
#
# --- First Three Routes (routes[:3]) ---
# ('Sabarmati Express', 'Ahmedabad', 'Mumbai', '06:15', 492, True)
# ('Deccan Arrow', 'Pune', 'Hyderabad', '08:30', 560, True)
# ('Pink City Mail', 'Jaipur', 'Delhi', '10:45', 308, False)
#
# --- Every Second Route (routes[::2]) ---
# ('Sabarmati Express', 'Ahmedabad', 'Mumbai', '06:15', 492, True)
# ('Pink City Mail', 'Jaipur', 'Delhi', '10:45', 308, False)
# ('Ganga Horizon', 'Varanasi', 'Kolkata', '17:05', 678, False)
#
# --- Fare Table ---
# Sabarmati Express | Ahmedabad -> Mumbai | Fare: ₹1033.20
# Deccan Arrow | Pune -> Hyderabad | Fare: ₹1176.00
# Pink City Mail | Jaipur -> Delhi | Fare: ₹369.60
# Kaveri Runner | Bengaluru -> Chennai | Fare: ₹760.20
# Ganga Horizon | Varanasi -> Kolkata | Fare: ₹813.60
# Malabar Coastal | Kochi -> Thiruvananthapuram | Fare: ₹432.60
#
# --- Reschedule Test: Index 2 to 11:30 ---
# Old routes: (('Sabarmati Express', 'Ahmedabad', 'Mumbai', '06:15', 492, True), ('Deccan Arrow', 'Pune', 'Hyderabad', '08:30', 560, True), ('Pink City Mail', 'Jaipur', 'Delhi', '10:45', 308, False), ('Kaveri Runner', 'Bengaluru', 'Chennai', '14:20', 362, True), ('Ganga Horizon', 'Varanasi', 'Kolkata', '17:05', 678, False), ('Malabar Coastal', 'Kochi', 'Thiruvananthapuram', '20:10', 206, True))
# New routes: (('Sabarmati Express', 'Ahmedabad', 'Mumbai', '06:15', 492, True), ('Deccan Arrow', 'Pune', 'Hyderabad', '08:30', 560, True), ('Pink City Mail', 'Jaipur', 'Delhi', '11:30', 308, False), ('Kaveri Runner', 'Bengaluru', 'Chennai', '14:20', 362, True), ('Ganga Horizon', 'Varanasi', 'Kolkata', '17:05', 678, False), ('Malabar Coastal', 'Kochi', 'Thiruvananthapuram', '20:10', 206, True))
#
# --- Reschedule Test: Index 8 to 09:00 ---
# Invalid route number
# Returned routes: (('Sabarmati Express', 'Ahmedabad', 'Mumbai', '06:15', 492, True), ('Deccan Arrow', 'Pune', 'Hyderabad', '08:30', 560, True), ('Pink City Mail', 'Jaipur', 'Delhi', '11:30', 308, False), ('Kaveri Runner', 'Bengaluru', 'Chennai', '14:20', 362, True), ('Ganga Horizon', 'Varanasi', 'Kolkata', '17:05', 678, False), ('Malabar Coastal', 'Kochi', 'Thiruvananthapuram', '20:10', 206, True))
