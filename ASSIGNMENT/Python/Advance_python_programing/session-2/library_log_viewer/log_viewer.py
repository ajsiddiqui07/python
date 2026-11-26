import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_LOG_FILE = os.path.join(BASE_DIR, "issue_log.txt")


def resolve_log_path(filename=None):
    """Resolve log file path from CLI argument or default issue_log.txt."""
    if not filename:
        return DEFAULT_LOG_FILE
    if os.path.exists(filename):
        return os.path.abspath(filename)
    return os.path.join(BASE_DIR, filename)


def scan_log(file, display=False):
    """Read file with readline() and tell(), returning (line_number, position) index."""
    file.seek(0)
    line_index = []
    line_number = 1

    while True:
        pos = file.tell()
        line = file.readline()
        if line == "":
            break
        line_index.append((line_number, pos))
        if display:
            print(f"{line_number}: {line.rstrip()}")
        line_number += 1

    return line_index


def show_all(file):
    """Print every line with its line number, then print line_index."""
    print()
    line_index = scan_log(file, display=True)
    if not line_index:
        print("Log file is empty.")
    print("line_index:", line_index)
    return line_index


def jump_to_line(file, line_index):
    """Ask for a line number and seek directly to its saved position."""
    raw = input("Enter line number to jump to: ").strip()
    if not raw.isdigit():
        print("No such line")
        return

    target = int(raw)
    if target < 1 or target > len(line_index):
        print("No such line")
        return

    line_num, pos = line_index[target - 1]
    file.seek(pos)
    line = file.readline()
    print(f"{line_num}: {line.rstrip()}")


def show_last_three(file, line_index):
    """Seek to the saved position of the third-last line and read to the end."""
    tail = line_index[-3:]
    if not tail:
        print("Log file is empty.")
        return

    current_num, start_pos = tail[0]
    file.seek(start_pos)
    print()
    while True:
        line = file.readline()
        if line == "":
            break
        print(f"{current_num}: {line.rstrip()}")
        current_num += 1


def main():
    """Run the library issue log viewer menu loop."""
    arg = sys.argv[1] if len(sys.argv) > 1 else None
    log_path = resolve_log_path(arg)

    if not os.path.exists(log_path):
        print(f"Log file not found: {log_path}")
        return

    file = open(log_path, "r", encoding="utf-8")
    line_index = scan_log(file, display=False)

    while True:
        print("\n--- Library Log Viewer ---")
        print("A. Show all")
        print("J. Jump to a line")
        print("R. Show the last 3 entries")
        print("Q. Quit")

        choice = input("Choose an option (A/J/R/Q): ").strip().upper()

        if choice == "A":
            line_index = show_all(file)
        elif choice == "J":
            jump_to_line(file, line_index)
        elif choice == "R":
            show_last_three(file, line_index)
        elif choice == "Q":
            print("Goodbye.")
            break
        else:
            print("Invalid choice. Please enter A, J, R, or Q.")

    file.close()


if __name__ == "__main__":
    main()
