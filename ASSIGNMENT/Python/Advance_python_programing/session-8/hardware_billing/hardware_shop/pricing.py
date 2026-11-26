import math


def gst_amount(amount, rate=18):
    """Return the GST amount for a given base amount and percentage rate."""
    gst = amount * rate / 100
    return int(gst) if gst == int(gst) else round(gst, 2)


def boxes_needed(quantity, box_size):
    """Return the number of boxes required using ceiling division."""
    return math.ceil(quantity / box_size)


def round_down_to_five(amount):
    """Round an amount down to the nearest multiple of 5."""
    return math.floor(amount / 5) * 5
