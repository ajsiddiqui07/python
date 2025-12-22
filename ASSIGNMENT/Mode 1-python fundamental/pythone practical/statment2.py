# Program to check if a number is prime using if-else

num = int(input("Enter a number: "))

# Prime numbers must be greater than 1
if num <= 1:
    print(f"{num} is not a prime number.")
else:
    # Assume the number is prime
    is_prime = True

    # Check divisibility from 2 to num-1
    for i in range(2, num):
        if num % i == 0:
            is_prime = False
            break

    # Final result
    if is_prime:
        print(f"{num} is a prime number.")
    else:
        print(f"{num} is not a prime number.")
