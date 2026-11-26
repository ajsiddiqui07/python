import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

import hardware_shop.pricing as pricing
from hardware_shop.stock import reduce_stock, OutOfStockError
from hardware_shop import new_bill_number


def process_customer(customer_name, item, item_qty, pack_size):
    """Bill a customer order showing bill number, boxes, GST, and rounded total."""
    boxes = pricing.boxes_needed(item_qty, pack_size)
    print(f"\n=== Customer: {customer_name} ===")
    print(f"Item: {item} | Requested pieces: {item_qty} (pack size {pack_size} -> {boxes} box(es))")

    try:
        subtotal = reduce_stock(item, boxes)
        bill_no = new_bill_number()
        gst = pricing.gst_amount(subtotal)
        raw_total = subtotal + gst
        final_total = pricing.round_down_to_five(raw_total)

        print(f"Bill No : {bill_no}")
        print(f"Boxes   : {boxes}")
        print(f"Subtotal: ₹{subtotal}")
        print(f"GST (18%): ₹{gst}")
        print(f"Total (rounded down to 5): ₹{final_total}")
    except OutOfStockError as err:
        print(f"Order Failed: {err}")


def main():
    """Bill 3 customer orders including one exceeding available stock."""
    orders = [
        ("Rohan Desai", "Wood Screws", 120, 50),
        ("Meera Joshi", "Brass Locks", 120, 10),
        ("Arjun Patel", "Door Hinges", 45, 10),
    ]

    for customer_name, item, qty, pack_size in orders:
        process_customer(customer_name, item, qty, pack_size)


if __name__ == "__main__":
    main()
