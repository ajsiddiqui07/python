# Pharmacy inventory (medicine : quantity)
inventory = {
    "paracetamol": 10,
    "cupsirap": 10,
    "sumogold": 10
}

# Function to sell medicine
def sell_medicine():
    name = input("Enter medicine name: ").lower()
    if name not in inventory:
        print("Medicine not available")
        return

    quantity = int(input("Enter quantity: "))
    if quantity > inventory[name]:
        print("Not enough stock")
    else:
        inventory[name] -= quantity
        print("Sale successful")

# Function to update stock
def update_stock():
    name = input("Enter medicine name to update: ").lower()
    if name not in inventory:
        print("Medicine not found")
        return

    quantity = int(input("Enter quantity to add: "))
    inventory[name] += quantity
    print("Stock updated")

# Function to add new medicine
def add_new_medicine():
    name = input("Enter new medicine name: ").lower()
    if name in inventory:
        print("Medicine already exists")
        return

    quantity = int(input("Enter starting stock: "))
    inventory[name] = quantity
    print("New medicine added")

# Function to show stock
def show_stock():
    print("\nCurrent Stock:")
    for med, qty in inventory.items():
        print(med, ":", qty)

# Main menu
while True:
    print("\n--- QuickMed Pharmacy ---")
    print("1. Sell Medicine")
    print("2. Update Stock")
    print("3. Add New Medicine")
    print("4. Show Stock")
    print("5. Exit")

    choice = input("Choose option: ")

    if choice == "1":
        sell_medicine()
    elif choice == "2":
        update_stock()
    elif choice == "3":
        add_new_medicine()
    elif choice == "4":
        show_stock()
    elif choice == "5":
        print("Thank you!")
        break
    else:
        print("Invalid choice")
