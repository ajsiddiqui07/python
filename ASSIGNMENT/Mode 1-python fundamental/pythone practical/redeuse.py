from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Use reduce() with a lambda function to find the product
product = reduce(lambda x, y: x * y, numbers)

print("List of numbers:", numbers)
print("Product of numbers:", product)
