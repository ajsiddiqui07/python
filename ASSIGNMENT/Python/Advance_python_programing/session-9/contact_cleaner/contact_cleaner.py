import os
from format_checker import find_mobile, is_valid_pin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTACTS_FILE = os.path.join(BASE_DIR, "contacts.txt")
VALID_FILE = os.path.join(BASE_DIR, "valid_contacts.txt")
REJECTED_FILE = os.path.join(BASE_DIR, "rejected_contacts.txt")


def clean_contacts():
    """Validate contacts.txt and write valid_contacts.txt and rejected_contacts.txt."""
    infile = open(CONTACTS_FILE, "r", encoding="utf-8")
    lines = infile.readlines()
    infile.close()

    valid_lines = []
    rejected_lines = []

    for raw_line in lines:
        line = raw_line.strip()
        if not line:
            continue

        parts = [part.strip() for part in line.split(",")]
        if len(parts) != 3:
            rejected_lines.append(f"{line} | Reason: expected 3 comma-separated fields")
            continue

        name, mobile, pin = parts
        reasons = []

        if find_mobile(mobile) != mobile:
            reasons.append("invalid mobile number")
        if not is_valid_pin(pin):
            reasons.append("invalid PIN code")

        if reasons:
            rejected_lines.append(f"{name},{mobile},{pin} | Reason: {' and '.join(reasons)}")
        else:
            valid_lines.append(f"{name},{mobile},{pin}")

    valid_out = open(VALID_FILE, "w", encoding="utf-8")
    for entry in valid_lines:
        valid_out.write(entry + "\n")
    valid_out.close()

    rejected_out = open(REJECTED_FILE, "w", encoding="utf-8")
    for entry in rejected_lines:
        rejected_out.write(entry + "\n")
    rejected_out.close()

    print(f"Processed {len(valid_lines) + len(rejected_lines)} contacts.")
    print(f"Valid: {len(valid_lines)} -> {VALID_FILE}")
    print(f"Rejected: {len(rejected_lines)} -> {REJECTED_FILE}")


if __name__ == "__main__":
    clean_contacts()
