#  Print a string using a function
def print_string():
    print("Hello, Python")

print_string()

# Parameterized function to take two arguments and print their sum
def add(a, b):
    print("Sum:", a + b)

add(10, 20)

#  Lambda function with one expression
square = lambda x: x * x

print("Square:", square(5))

# Lambda function with two expressions
result = lambda x, y: x + y

print("Result:", result(10, 15))