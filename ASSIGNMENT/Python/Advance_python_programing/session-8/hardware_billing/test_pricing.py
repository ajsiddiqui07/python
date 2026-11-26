from hardware_shop.pricing import boxes_needed, gst_amount, round_down_to_five

gst = gst_amount(1000)
boxes = boxes_needed(120, 50)
rounded = round_down_to_five(1237)

print(f"gst_amount(1000) = {gst}")
print(f"boxes_needed(120, 50) = {boxes}")
print(f"round_down_to_five(1237) = {rounded}")

assert gst == 180
assert boxes == 3
assert rounded == 1235
print("All pricing tests passed.")
