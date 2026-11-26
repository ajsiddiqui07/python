import random

_issued_numbers = []


def new_bill_number():
    """Generate a unique bill number like HW-4821 without repeating in one run."""
    while True:
        candidate = f"HW-{random.randint(1000, 9999)}"
        if candidate not in _issued_numbers:
            _issued_numbers.append(candidate)
            return candidate
