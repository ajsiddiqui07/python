text = "Python Programming"

# Basic slicing
print(text[0:6])      # Characters from index 0 to 5
print(text[7:18])     # Characters from index 7 to 17

# Slicing with omitted indexes
print(text[:6])       # From start to index 5
print(text[7:])       # From index 7 to end

# Negative indexing
print(text[-11:-1])   # From negative index -11 to -2

# Slicing with step
print(text[::2])      # Every second character
