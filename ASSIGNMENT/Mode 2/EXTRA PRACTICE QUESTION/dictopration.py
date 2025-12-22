# Update a value at a particular key in a dictionary
student = {
    "roll_no": 101,
    "name": "Rahul",
    "age": 20
}

# Update value of age
student["age"] = 21

print("Updated Dictionary:", student)

# Separate keys and values from a dictionary using keys() and values()
student = {
    "roll_no": 101,
    "name": "Rahul",
    "age": 20
}

keys = student.keys()
values = student.values()

print("Keys:", list(keys))
print("Values:", list(values))

# Convert two lists into one dictionary using a for loop
keys = ["name", "age", "city"]
values = ["Amit", 22, "Mumbai"]

my_dict = {}

for i in range(len(keys)):
    my_dict[keys[i]] = values[i]

print("Dictionary:", my_dict)

# Count how many times each character appears in a string
string = "python"

char_count = {}

for char in string:
    if char in char_count:
        char_count[char] += 1
    else:
        char_count[char] = 1

print("Character Count:", char_count)