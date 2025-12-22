# Generator function
def generate_even_numbers(n):
    """Generate the first n even numbers."""
    for i in range(1, n + 1):
        yield i * 2  # Multiply by 2 to get even numbers

# Using the generator
even_gen = generate_even_numbers(10)

# Print the even numbers
for even in even_gen:
    print(even)
