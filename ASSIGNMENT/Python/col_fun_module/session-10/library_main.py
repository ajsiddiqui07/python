"""Library management program using library_utils module."""

import library_utils as lib

# 1. Sample fine calculation (issued day 10, returned day 31).
sample_late = lib.days_late(10, 31)
sample_fine = lib.fine_amount(sample_late)
print(f"Loan period: {lib.LOAN_DAYS} days")
print(f"Issued day 10, returned day 31 -> Late: {sample_late} days | Fine: ₹{sample_fine}")

# 2. Issue 5 books to 3 invented members and print each member's titles.
register = []
lib.issue_book(register, "Ananya", "Python Basics", 1)
lib.issue_book(register, "Ananya", "Data Structures", 3)
lib.issue_book(register, "Kabir", "Clean Code", 5)
lib.issue_book(register, "Kabir", "Algorithms Unlocked", 7)
lib.issue_book(register, "Riya", "Database Systems", 10)

print("\n--- Issued Books by Member ---")
for member in ("Ananya", "Kabir", "Riya"):
    print(f"{member}: {lib.books_of(register, member)}")

# 3. Interactive while-loop menu.
while True:
    print("\n--- Library Menu ---")
    print("1 Issue book")
    print("2 Return book and show fine")
    print("3 Exit")

    choice = input("Enter choice (1-3): ").strip()

    if choice == "1":
        member = input("Enter member name: ").strip()
        title = input("Enter book title: ").strip()
        issue_day = int(input("Enter issue day (number): ").strip())
        lib.issue_book(register, member, title, issue_day)
        print(f"Issued '{title}' to {member} on day {issue_day}.")
    elif choice == "2":
        issue_day = int(input("Enter issue day (number): ").strip())
        return_day = int(input("Enter return day (number): ").strip())
        late = lib.days_late(issue_day, return_day)
        fine = lib.fine_amount(late)
        print(f"Late days: {late} | Fine: ₹{fine}")
    elif choice == "3":
        print("Exiting...")
        break
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

# --- Sample Output ---
# Loan period: 14 days
# Issued day 10, returned day 31 -> Late: 7 days | Fine: ₹14
#
# --- Issued Books by Member ---
# Ananya: ['Python Basics', 'Data Structures']
# Kabir: ['Clean Code', 'Algorithms Unlocked']
# Riya: ['Database Systems']
#
# --- Library Menu ---
# 1 Issue book
# 2 Return book and show fine
# 3 Exit
# Enter choice (1-3): 2
# Enter issue day (number): 1
# Enter return day (number): 10
# Late days: 0 | Fine: ₹0
#
# --- Library Menu ---
# 1 Issue book
# 2 Return book and show fine
# 3 Exit
# Enter choice (1-3): 2
# Enter issue day (number): 1
# Enter return day (number): 22
# Late days: 7 | Fine: ₹14
#
# --- Library Menu ---
# 1 Issue book
# 2 Return book and show fine
# 3 Exit
# Enter choice (1-3): 2
# Enter issue day (number): 1
# Enter return day (number): 45
# Late days: 30 | Fine: ₹60
#
# --- Library Menu ---
# 1 Issue book
# 2 Return book and show fine
# 3 Exit
# Enter choice (1-3): 3
# Exiting...
