import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


class FestPass:
    """Base festival pass with standard entry pricing and perks."""

    def __init__(self, holder_name):
        self.holder_name = holder_name

    def price(self):
        """Return base ticket price."""
        return 500

    def perks(self):
        """Return base pass perks description."""
        return "General entry to all main stage events"

    def group_price(self, count=1, discount_percent=0):
        """Return total price for count passes after discount_percent."""
        total = self.price() * count * (100 - discount_percent) / 100
        return int(total) if total == int(total) else round(total, 2)


class StudentPass(FestPass):
    """Discounted pass for students."""

    def price(self):
        return 300

    def perks(self):
        return "General entry + student workshops and gaming zone"


class AlumniPass(FestPass):
    """Pass for college alumni."""

    def price(self):
        return 800

    def perks(self):
        return "General entry + alumni lounge and networking dinner"


class VIPPass(FestPass):
    """Premium pass with VIP access."""

    def price(self):
        return 2000

    def perks(self):
        return "Front-row seating + backstage access + VIP hospitality"


PASS_CLASSES = {
    "G": FestPass,
    "S": StudentPass,
    "A": AlumniPass,
    "V": VIPPass,
}


def print_receipt(pass_obj):
    """Print pass holder name, price, and perks using polymorphism."""
    print(f"Holder: {pass_obj.holder_name} | Price: ₹{pass_obj.price()} | Perks: {pass_obj.perks()}")


def run_demos():
    """Run checks for Parts 1, 2, and 3."""
    print("--- Part 1: One Object of Each Pass Class ---")
    sample_passes = [
        FestPass("Kiran Patel"),
        StudentPass("Diya Nair"),
        AlumniPass("Rohan Mehta"),
        VIPPass("Sneha Kulkarni"),
    ]
    for p in sample_passes:
        print(f"{type(p).__name__}: ₹{p.price()} - {p.perks()}")

    print("\n--- Part 2: 8-Pass Receipt List ---")
    passes = [
        StudentPass("Aarav"),
        StudentPass("Priya"),
        StudentPass("Kabir"),
        AlumniPass("Meera"),
        AlumniPass("Vikram"),
        VIPPass("Ananya"),
        FestPass("Siddharth"),
        FestPass("Neha"),
    ]
    total = 0
    for p in passes:
        print_receipt(p)
        total += p.price()
    print(f"Total Receipts Amount: ₹{total}")

    print("\n--- Part 3: group_price() Checks ---")
    student = StudentPass("Diya Nair")
    alumni = AlumniPass("Rohan Mehta")
    print(f"StudentPass group_price(): ₹{student.group_price()}")
    print(f"StudentPass group_price(4): ₹{student.group_price(4)}")
    print(f"StudentPass group_price(4, 10): ₹{student.group_price(4, 10)}")
    print(f"AlumniPass group_price(2, 25): ₹{alumni.group_price(2, 25)}")


def run_registration_menu():
    """Interactive registration menu calculating per-type totals and grand total."""
    registrations = []

    while True:
        print("\n--- Fest Pass Registration ---")
        print("1. Register pass")
        print("2. Finish and print summary")

        choice = input("Choose an option (1-2): ").strip()
        if choice == "2":
            break
        if choice != "1":
            print("Invalid choice. Please select 1 or 2.")
            continue

        holder_name = input("Enter holder name: ").strip()
        if not holder_name:
            print("Holder name cannot be empty.")
            continue

        pass_code = input("Enter pass type (G, S, A, or V): ").strip().upper()
        pass_cls = PASS_CLASSES.get(pass_code)
        if pass_cls is None:
            print("Invalid pass type. Choose G, S, A, or V.")
            continue

        count_raw = input("Enter count: ").strip()
        if not count_raw.isdigit() or int(count_raw) < 1:
            print("Invalid count. Enter a positive whole number.")
            continue
        count = int(count_raw)

        discount_raw = input("Enter discount percent: ").strip()
        try:
            discount_percent = float(discount_raw)
        except ValueError:
            print("Invalid discount percent.")
            continue

        if discount_percent < 0 or discount_percent > 100:
            print("Discount percent must be between 0 and 100.")
            continue

        pass_obj = pass_cls(holder_name)
        amount = pass_obj.group_price(count, discount_percent)
        registrations.append((pass_obj, count, discount_percent, amount))
        print(f"Registered {type(pass_obj).__name__} x{count} for {holder_name}: ₹{amount}")

    print("\n--- Registration Totals ---")
    if not registrations:
        print("No passes registered.")
        return

    per_type_totals = {}
    grand_total = 0
    for pass_obj, _, _, amount in registrations:
        type_name = type(pass_obj).__name__
        per_type_totals[type_name] = per_type_totals.get(type_name, 0) + amount
        grand_total += amount

    for type_name, subtotal in per_type_totals.items():
        formatted_sub = int(subtotal) if subtotal == int(subtotal) else round(subtotal, 2)
        print(f"{type_name}: ₹{formatted_sub}")

    formatted_grand = int(grand_total) if grand_total == int(grand_total) else round(grand_total, 2)
    print(f"Grand Total: ₹{formatted_grand}")


def main():
    """Run fest pass demos followed by the registration menu."""
    run_demos()
    run_registration_menu()


if __name__ == "__main__":
    main()
