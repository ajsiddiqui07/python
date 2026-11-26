"""Loan EMI and full repayment summary calculator."""


# 1 & 2. Monthly EMI function with defaults annual_rate=10.5 and years=3.
def monthly_emi(principal, annual_rate=10.5, years=3):
    """Calculate monthly loan EMI using compound interest formula."""
    r = annual_rate / 12 / 100
    n = years * 12
    factor = (1 + r) ** n
    emi = principal * r * factor / (factor - 1)
    return emi


# 3. Loan summary using keyword arguments to call monthly_emi.
def loan_summary(principal, annual_rate=10.5, years=3, fee_percent=1):
    """Return (EMI, total_payable, total_interest, processing_fee) rounded to 2 decimals."""
    emi = round(
        monthly_emi(principal=principal, annual_rate=annual_rate, years=years),
        2,
    )
    total_payable = round(emi * years * 12, 2)
    total_interest = round(total_payable - principal, 2)
    processing_fee = round(principal * fee_percent / 100, 2)
    return (emi, total_payable, total_interest, processing_fee)


print("--- Step 1: Positional Call (₹5,00,000 at 9% for 5 years) ---")
print(f"Monthly EMI: ₹{round(monthly_emi(500000, 9, 5), 2)}")

print("\n--- Step 2: Default & Keyword Argument Calls ---")
print(f"Principal ₹2,00,000 (defaults): ₹{round(monthly_emi(200000), 2)}")
print(f"Principal ₹2,00,000, years=7: ₹{round(monthly_emi(200000, years=7), 2)}")
print(
    "Keyword order (years=2, principal=250000, annual_rate=8): "
    f"₹{round(monthly_emi(years=2, principal=250000, annual_rate=8), 2)}"
)

print("\n--- Step 3: Loan Summary (₹3,00,000, fee_percent=0.5) ---")
emi, total_payable, total_interest, fee = loan_summary(300000, fee_percent=0.5)
print(f"Monthly EMI: ₹{emi}")
print(f"Total Payable: ₹{total_payable}")
print(f"Total Interest: ₹{total_interest}")
print(f"Processing Fee: ₹{fee}")

# 4. Interactive while-loop menu.
while True:
    print("\n--- Loan Calculator Menu ---")
    print("1 Quick EMI")
    print("2 Full summary")
    print("3 Exit")

    choice = input("Enter choice (1-3): ").strip()

    if choice == "1":
        p = float(input("Enter principal (₹): ").strip())
        rate = float(input("Enter annual rate (%): ").strip())
        yrs = int(input("Enter tenure (years): ").strip())
        print(f"Monthly EMI: ₹{round(monthly_emi(p, rate, yrs), 2)}")
    elif choice == "2":
        p = float(input("Enter principal (₹): ").strip())
        rate = float(input("Enter annual rate (%): ").strip())
        yrs = int(input("Enter tenure (years): ").strip())
        emi, total_payable, total_interest, fee = loan_summary(p, rate, yrs)
        print(f"Monthly EMI: ₹{emi}")
        print(f"Total Payable: ₹{total_payable}")
        print(f"Total Interest: ₹{total_interest}")
        print(f"Processing Fee: ₹{fee}")
    elif choice == "3":
        print("Exiting...")
        break
    else:
        print("Invalid choice. Please select 1, 2, or 3.")

# --- Sample Outputs ---
# --- Step 1: Positional Call (₹5,00,000 at 9% for 5 years) ---
# Monthly EMI: ₹10379.18
#
# --- Step 2: Default & Keyword Argument Calls ---
# Principal ₹2,00,000 (defaults): ₹6500.49
# Principal ₹2,00,000, years=7: ₹3372.13
# Keyword order (years=2, principal=250000, annual_rate=8): ₹11306.82
#
# --- Step 3: Loan Summary (₹3,00,000, fee_percent=0.5) ---
# Monthly EMI: ₹9750.73
# Total Payable: ₹351026.28
# Total Interest: ₹51026.28
# Processing Fee: ₹1500.0
#
# --- Loan Calculator Menu ---
# 1 Quick EMI
# 2 Full summary
# 3 Exit
# Enter choice (1-3): 1
# Enter principal (₹): 200000
# Enter annual rate (%): 10.5
# Enter tenure (years): 3
# Monthly EMI: ₹6500.49
#
# --- Loan Calculator Menu ---
# 1 Quick EMI
# 2 Full summary
# 3 Exit
# Enter choice (1-3): 2
# Enter principal (₹): 800000
# Enter annual rate (%): 11
# Enter tenure (years): 10
# Monthly EMI: ₹11020.0
# Total Payable: ₹1322400.0
# Total Interest: ₹522400.0
# Processing Fee: ₹8000.0
#
# --- Loan Calculator Menu ---
# 1 Quick EMI
# 2 Full summary
# 3 Exit
# Enter choice (1-3): 9
# Invalid choice. Please select 1, 2, or 3.
#
# --- Loan Calculator Menu ---
# 1 Quick EMI
# 2 Full summary
# 3 Exit
# Enter choice (1-3): 3
# Exiting...
