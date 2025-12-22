text = "  Python Programming Language  "

# Convert to uppercase and lowercase
print("Uppercase:", text.upper())
print("Lowercase:", text.lower())

# Remove leading and trailing spaces
print("Stripped:", text.strip())

# Replace a word
print("Replaced:", text.replace("Python", "Java"))

# Check if string starts or ends with a word
print("Starts with 'Python':", text.strip().startswith("Python"))
print("Ends with 'Language':", text.strip().endswith("Language"))

# Split the string into a list
words = text.strip().split()
print("Split into words:", words)

# Join the list back into a string
joined_text = " ".join(words)
print("Joined string:", joined_text)

# Find a substring
print("Position of 'Programming':", text.find("Programming"))

# Count occurrences of a character
print("Count of 'a':", text.lower().count('a'))
