"""Gym member records manager for a fictional gym in Ahmedabad."""


def display_members(member_list):
    """Print each member record on one line by reading fields by index."""
    for record in member_list:
        print(
            f"Name: {record[0]} | Age: {record[1]} | City: {record[2]} | "
            f"Fee: ₹{record[3]} | Active: {record[4]}"
        )


# 1. Create the members list with 6 records and print each field by index.
members = [
    ["Aarav Patel", 26, "Ahmedabad", 1200, True],
    ["Diya Shah", 24, "Ahmedabad", 1500, True],
    ["Rohan Mehta", 31, "Gandhinagar", 1400, True],
    ["Kavya Joshi", 28, "Ahmedabad", 1300, True],
    ["Vivaan Desai", 35, "Ahmedabad", 1600, False],
    ["Nisha Trivedi", 22, "Surat", 1100, True],
]

print("--- Initial Members ---")
display_members(members)

# 2. Update values in place by index (without rebuilding the list).
for i in range(len(members)):
    if members[i][2] == "Ahmedabad":
        members[i][3] += 200

members[1][4] = False
members[3][2] = "Rajkot"

print("\n--- Updated Members List ---")
print(members)

# 3. Clean-up: remove every inactive member using remove(), then pop(0).
for record in members[:]:
    if not record[4]:
        members.remove(record)

removed_first = members.pop(0)
print(f"\nRemoved: {removed_first}")

# 4. Interactive while-loop menu.
while True:
    print("\n--- Gym Menu ---")
    print("1 Show all")
    print("2 Update fee by name")
    print("3 Remove by name")
    print("4 Exit")

    choice = input("Enter choice (1-4): ").strip()

    if choice == "1":
        if not members:
            print("No members in the list.")
        else:
            display_members(members)
    elif choice == "2":
        target_name = input("Enter member name: ").strip()
        new_fee = int(input("Enter new monthly fee (₹): ").strip())
        found = False
        for i in range(len(members)):
            if members[i][0] == target_name:
                members[i][3] = new_fee
                print(f"Updated fee for {members[i][0]} to ₹{members[i][3]}")
                found = True
                break
        if not found:
            print("Member not found")
    elif choice == "3":
        target_name = input("Enter member name to remove: ").strip()
        found = False
        for i in range(len(members)):
            if members[i][0] == target_name:
                removed = members.pop(i)
                print(f"Removed: {removed[0]}")
                found = True
                break
        if not found:
            print("Member not found")
    elif choice == "4":
        print("Exiting...")
        break
    else:
        print("Invalid choice. Please enter 1 to 4.")

# --- Sample Output ---
# --- Initial Members ---
# Name: Aarav Patel | Age: 26 | City: Ahmedabad | Fee: ₹1200 | Active: True
# Name: Diya Shah | Age: 24 | City: Ahmedabad | Fee: ₹1500 | Active: True
# Name: Rohan Mehta | Age: 31 | City: Gandhinagar | Fee: ₹1400 | Active: True
# Name: Kavya Joshi | Age: 28 | City: Ahmedabad | Fee: ₹1300 | Active: True
# Name: Vivaan Desai | Age: 35 | City: Ahmedabad | Fee: ₹1600 | Active: False
# Name: Nisha Trivedi | Age: 22 | City: Surat | Fee: ₹1100 | Active: True
#
# --- Updated Members List ---
# [['Aarav Patel', 26, 'Ahmedabad', 1400, True], ['Diya Shah', 24, 'Ahmedabad', 1700, False], ['Rohan Mehta', 31, 'Gandhinagar', 1400, True], ['Kavya Joshi', 28, 'Rajkot', 1500, True], ['Vivaan Desai', 35, 'Ahmedabad', 1800, False], ['Nisha Trivedi', 22, 'Surat', 1100, True]]
#
# Removed: ['Aarav Patel', 26, 'Ahmedabad', 1400, True]
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 1
# Name: Rohan Mehta | Age: 31 | City: Gandhinagar | Fee: ₹1400 | Active: True
# Name: Kavya Joshi | Age: 28 | City: Rajkot | Fee: ₹1500 | Active: True
# Name: Nisha Trivedi | Age: 22 | City: Surat | Fee: ₹1100 | Active: True
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 2
# Enter member name: Kavya Joshi
# Enter new monthly fee (₹): 1800
# Updated fee for Kavya Joshi to ₹1800
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 3
# Enter member name to remove: Rohan Mehta
# Removed: Rohan Mehta
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 3
# Enter member name to remove: Zoya
# Member not found
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 1
# Name: Kavya Joshi | Age: 28 | City: Rajkot | Fee: ₹1800 | Active: True
# Name: Nisha Trivedi | Age: 22 | City: Surat | Fee: ₹1100 | Active: True
#
# --- Gym Menu ---
# 1 Show all
# 2 Update fee by name
# 3 Remove by name
# 4 Exit
# Enter choice (1-4): 4
# Exiting...
