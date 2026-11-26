import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

PLAN_FEES = {
    "Basic": 800,
    "Standard": 1200,
    "Premium": 1800,
}


class Member:
    """Represents a gym member with a subscription plan and duration."""

    def __init__(self, name, plan, months):
        self.name = name
        self.plan = plan
        self.months = months
        self.fee_per_month = PLAN_FEES[plan]

    def total_fee(self):
        """Return total membership fee for the current duration."""
        return self.fee_per_month * self.months

    def renew(self, extra_months):
        """Extend the membership duration by extra_months."""
        self.months += extra_months


def run_class_demo():
    """Demonstrate 5 Member objects and total_fee/renew behavior."""
    sample_members = [
        Member("Aarav Mehta", "Basic", 2),
        Member("Diya Kapoor", "Standard", 3),
        Member("Rohan Kulkarni", "Premium", 6),
        Member("Sneha Iyer", "Basic", 12),
        Member("Vikram Rao", "Premium", 1),
    ]

    print("--- Sample Gym Members ---")
    for member in sample_members:
        print(f"{member.name} | {member.plan} | ₹{member.fee_per_month}/month")

    standard_member = sample_members[1]
    print(f"\nStandard member ({standard_member.months} months) total: ₹{standard_member.total_fee()}")
    standard_member.renew(2)
    print(f"After renew(2) ({standard_member.months} months) new total: ₹{standard_member.total_fee()}")


def add_member(members):
    """Prompt for member details, validate plan and months (1-12), and append to members."""
    name = input("Enter member name: ").strip()
    if not name:
        print("Name cannot be empty.")
        return

    plan = input("Enter plan (Basic / Standard / Premium): ").strip().title()
    if plan not in PLAN_FEES:
        print("Invalid plan. Choose Basic, Standard, or Premium.")
        return

    months_input = input("Enter months (1-12): ").strip()
    if not months_input.isdigit():
        print("Invalid months. Please enter a number between 1 and 12.")
        return

    months = int(months_input)
    if months < 1 or months > 12:
        print("Invalid months. Duration must be between 1 and 12.")
        return

    member = Member(name, plan, months)
    members.append(member)
    print(f"Added {member.name} ({member.plan}, {member.months} months, total ₹{member.total_fee()}).")


def show_all(members):
    """Display all registered members and total gym revenue."""
    if not members:
        print("No members registered yet.")
        return

    print("\n--- Registered Members ---")
    total_revenue = 0
    for member in members:
        fee = member.total_fee()
        total_revenue += fee
        print(
            f"{member.name} | Plan: {member.plan} | "
            f"Monthly Fee: ₹{member.fee_per_month} | "
            f"Months: {member.months} | Total: ₹{fee}"
        )
    print(f"Total Revenue: ₹{total_revenue}")


def renew_membership(members):
    """Find a member by name, renew their months, and print the updated total fee."""
    target_name = input("Enter member name to renew: ").strip()
    found = None
    for member in members:
        if member.name.lower() == target_name.lower():
            found = member
            break

    if found is None:
        print("Member not found")
        return

    extra_input = input("Enter extra months to renew: ").strip()
    if not extra_input.isdigit() or int(extra_input) < 1:
        print("Invalid months. Please enter a positive whole number.")
        return

    extra_months = int(extra_input)
    found.renew(extra_months)
    print(f"Renewed {found.name} for {extra_months} more month(s). New total fee: ₹{found.total_fee()}")


def main():
    """Run the gym membership manager menu loop."""
    run_class_demo()
    members = []

    while True:
        print("\n--- Gym Membership Manager ---")
        print("1. Add member")
        print("2. Show all")
        print("3. Exit")
        print("4. Renew membership")

        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            add_member(members)
        elif choice == "2":
            show_all(members)
        elif choice == "3":
            print("Goodbye.")
            break
        elif choice == "4":
            renew_membership(members)
        else:
            print("Invalid choice. Please select 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
