import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_ADDRESSES_FILE = os.path.join(BASE_DIR, "addresses.txt")


def is_valid_pin(text):
    """Return True if text is a 6-digit Indian PIN code not starting with 0."""
    return bool(re.match(r"[1-9][0-9]{5}$", text))


def find_mobile(text):
    """Return the first Indian mobile number (10 digits starting 6-9, optional +91) or None."""
    match = re.search(r"(?<!\d)(?:\+91)?[6-9][0-9]{9}(?!\d)", text)
    if match:
        return match.group(0)
    return None


def count_pins_in_addresses(filepath=DEFAULT_ADDRESSES_FILE):
    """Read addresses.txt, extract 6-digit PINs with re.findall(), and return frequency dict."""
    file = open(filepath, "r", encoding="utf-8")
    content = file.read()
    file.close()

    pins = re.findall(r"\b(?:[1-9][0-9]{5})\b", content)
    pin_counts = {}
    for pin in pins:
        pin_counts[pin] = pin_counts.get(pin, 0) + 1
    return pin_counts


def run_tests():
    """Run checks for PIN validation, mobile extraction, and address PIN counts."""
    print("--- PIN Validation Tests ---")
    for pin in ("380015", "110001", "056001", "38001", "3800155", "38O015"):
        print(f"{pin}: {is_valid_pin(pin)}")

    print("\n--- Mobile Extraction Tests ---")
    sentences = [
        "Call 9000012345 after 6 pm",
        "Reach me on +919000012345",
        "Flat 5000012345",
        "Ring 900001234",
    ]
    for sentence in sentences:
        print(f"'{sentence}' -> {find_mobile(sentence)}")

    print("\n--- Address PIN Frequencies ---")
    counts = count_pins_in_addresses()
    for pin, total in counts.items():
        print(f"{pin}: {total}")


if __name__ == "__main__":
    run_tests()
