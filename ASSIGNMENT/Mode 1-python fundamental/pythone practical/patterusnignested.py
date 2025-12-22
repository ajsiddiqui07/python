# Number of rows for the pattern
rows = 5

# Outer loop for each row
for i in range(1, rows + 1):
    # Inner loop to print stars in each row
    for j in range(i):
        print("*", end="")  # Print star without newline
    print()  # Move to next line after each row
