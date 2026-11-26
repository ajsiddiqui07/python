import sys
import hardware_shop.stock as stock

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

info = stock.check_stock("Hex Bolts")
print(f"Initial Hex Bolts stock: {info['boxes']} boxes at ₹{info['price']}/box")

subtotal = stock.reduce_stock("Hex Bolts", 4)
print(f"Reduced 4 boxes of Hex Bolts -> subtotal ₹{subtotal}, remaining: {stock.check_stock('Hex Bolts')['boxes']} boxes")

try:
    stock.reduce_stock("Brass Locks", 50)
except stock.OutOfStockError as err:
    print(f"Expected error caught (over-stock): {err}")

try:
    stock.reduce_stock("Copper Pipes", 2)
except stock.OutOfStockError as err:
    print(f"Expected error caught (unknown item): {err}")
