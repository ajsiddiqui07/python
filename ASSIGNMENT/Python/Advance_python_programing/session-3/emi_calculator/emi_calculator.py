import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPORT_FILE = os.path.join(BASE_DIR, "emi_report.txt")


def calculate_emi(principal, annual_rate, months):
    """Calculate monthly EMI from principal, annual interest rate (%), and tenure in months."""
    r = annual_rate / 12 / 100
    factor = (1 + r) ** months
    return principal * r * factor / (factor - 1)


def read_number(prompt, converter):
    """Prompt repeatedly until converter succeeds without raising ValueError."""
    while True:
        raw = input(prompt).strip()
        try:
            value = converter(raw)
            return value
        except ValueError:
            print(f"Invalid input '{raw}'. Please enter a valid number.")


def run_interactive():
    """Run interactive single-loan EMI calculation with safe numeric input."""
    principal = read_number("Enter loan principal (₹): ", float)
    annual_rate = read_number("Enter annual interest rate (%): ", float)
    months = read_number("Enter tenure in months: ", int)

    try:
        emi = calculate_emi(principal, annual_rate, months)
        total_payable = emi * months
        total_interest = total_payable - principal

        print(f"Monthly EMI: ₹{emi:.2f}")
        print(f"Total Payable: ₹{total_payable:.2f}")
        print(f"Total Interest: ₹{total_interest:.2f}")
    except ZeroDivisionError:
        print("Cannot calculate EMI: interest rate or tenure results in division by zero.")


def open_batch_file():
    """Ask for a batch input filename until it opens without FileNotFoundError."""
    while True:
        filename = input("Enter batch file name: ").strip()
        candidate = filename
        if not os.path.exists(candidate):
            local_candidate = os.path.join(BASE_DIR, filename)
            if os.path.exists(local_candidate):
                candidate = local_candidate

        try:
            return open(candidate, "r", encoding="utf-8")
        except FileNotFoundError:
            print(f"File '{filename}' not found. Please try again.")


def run_batch():
    """Process loan requests from a file and write results to emi_report.txt."""
    infile = open_batch_file()
    lines = infile.readlines()
    infile.close()

    results = []
    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue

        parts = line.split(",")
        try:
            name = parts[0].strip()
            principal = float(parts[1].strip())
            annual_rate = float(parts[2].strip())
            months = int(parts[3].strip())

            emi = calculate_emi(principal, annual_rate, months)
            result_line = f"{name}: EMI ₹{emi:.2f}"
        except IndexError:
            result_line = f"{line} -> Error: missing field(s) in record"
        except ValueError:
            result_line = f"{line} -> Error: invalid numeric value"
        except ZeroDivisionError:
            result_line = f"{line} -> Error: interest rate cannot be zero"

        print(result_line)
        results.append(result_line)

    outfile = open(REPORT_FILE, "w", encoding="utf-8")
    for result_line in results:
        outfile.write(result_line + "\n")
    outfile.close()
    print(f"Report written to {REPORT_FILE}")


def main():
    """Run the EMI calculator menu."""
    while True:
        print("\n--- EMI Calculator ---")
        print("1. Single EMI calculation")
        print("2. Batch mode (from file)")
        print("3. Exit")

        choice = input("Choose an option (1-3): ").strip()

        if choice == "1":
            run_interactive()
            continue
        if choice == "2":
            run_batch()
            continue
        if choice == "3":
            print("Goodbye.")
            break
        print("Invalid choice. Please select 1, 2, or 3.")


if __name__ == "__main__":
    main()
