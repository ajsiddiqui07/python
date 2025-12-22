# List of strings
list1 = ['apple', 'banana', 'mango']

# Input string to search
search_item = input("Enter the fruit to search: ")

# Flag to track if the item is found
found = False

# Using a for loop and if condition to search
for fruit in list1:
    if fruit == search_item:
        found = True
        break  # Exit the loop once found

# Display result
if found:
    print(f"{search_item} is present in the list.")
else:
    print(f"{search_item} is not found in the list.")
