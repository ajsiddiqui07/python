"""
This program demonstrates:
- Proper indentation
- Use of comments
- Variables following PEP 8 naming style
- Clean and readable code as recommended by PEP 8
"""

# Define a variable for the user's name (snake_case for variable names)
user_name = "Alice"

# Define a variable for the user's age
user_age = 21


def display_user_info(name, age):
    """
    Display a greeting message with the user's name and age.

    Args:
        name (str): The user's name.
        age (int): The user's age.
    """
    # Print the message using proper indentation
    print(f"Hello, {name}! You are {age} years old.")


# Call the function to display the information
display_user_info(user_name, user_age)
