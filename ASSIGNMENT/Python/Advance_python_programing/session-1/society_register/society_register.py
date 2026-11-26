import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PAYMENTS_FILE = os.path.join(BASE_DIR, "payments.txt")
SUMMARY_FILE = os.path.join(BASE_DIR, "summary.txt")


def load_payments():
    """Read payments.txt once with read() and return a list of parsed records."""
    if not os.path.exists(PAYMENTS_FILE):
        return []

    file = open(PAYMENTS_FILE, "r", encoding="utf-8")
    text = file.read()
    file.close()

    records = []
    for line in text.split("\n"):
        if not line.strip():
            continue
        parts = line.split("|")
        if len(parts) == 4:
            flat, owner, month, amount = parts
            records.append((flat, owner, month, int(amount)))
    return records


def add_payment():
    """Prompt for payment details and append a record to payments.txt."""
    flat = input("Enter flat number: ").strip()
    owner = input("Enter owner name: ").strip()
    month = input("Enter month: ").strip()

    amount_input = input("Enter maintenance amount (₹): ").strip()
    while not amount_input.isdigit():
        print("Please enter a valid whole number amount.")
        amount_input = input("Enter maintenance amount (₹): ").strip()
    amount = int(amount_input)

    file = open(PAYMENTS_FILE, "a", encoding="utf-8")
    file.write(f"{flat}|{owner}|{month}|{amount}\n")
    file.close()
    print(f"Payment recorded for {flat} ({month}).")


def view_all():
    """Display all recorded payments in an aligned table and show total collected."""
    records = load_payments()
    if not records:
        print("No payments found.")
        return

    flat_w = max(len("Flat"), max(len(r[0]) for r in records))
    owner_w = max(len("Owner"), max(len(r[1]) for r in records))
    month_w = max(len("Month"), max(len(r[2]) for r in records))
    amt_w = max(len("Amount (₹)"), max(len(str(r[3])) for r in records))

    header = (
        f"{'Flat':<{flat_w}}  "
        f"{'Owner':<{owner_w}}  "
        f"{'Month':<{month_w}}  "
        f"{'Amount (₹)':>{amt_w}}"
    )
    divider = "-" * len(header)

    print("\n" + header)
    print(divider)

    total = 0
    for flat, owner, month, amount in records:
        total += amount
        print(
            f"{flat:<{flat_w}}  "
            f"{owner:<{owner_w}}  "
            f"{month:<{month_w}}  "
            f"{amount:>{amt_w}}"
        )

    print(divider)
    print(f"Total Collected: ₹{total}\n")


def write_summary():
    """Write month-wise totals to summary.txt using file mode 'w'."""
    records = load_payments()
    month_totals = {}

    for _, _, month, amount in records:
        month_totals[month] = month_totals.get(month, 0) + amount

    file = open(SUMMARY_FILE, "w", encoding="utf-8")
    for month, total in month_totals.items():
        file.write(f"{month}: ₹{total}\n")
    file.close()
    print("Summary written to summary.txt.")


def main():
    """Run the interactive society maintenance register menu loop."""
    while True:
        print("\n--- Society Maintenance Register ---")
        print("1. Add payment")
        print("2. View all")
        print("3. Write summary")
        print("4. Exit")

        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            add_payment()
        elif choice == "2":
            view_all()
        elif choice == "3":
            write_summary()
        elif choice == "4":
            print("Exiting Society Maintenance Register.")
            break
        else:
            print("Invalid choice. Please select 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
