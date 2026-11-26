from hardware_shop.bill_numbers import new_bill_number

bills = [new_bill_number() for _ in range(20)]
print("Generated 20 bill numbers:", bills)

duplicates = len(bills) - len(set(bills))
if duplicates == 0:
    print("Duplicates: 0")
else:
    print(f"Duplicates found: {duplicates}")
