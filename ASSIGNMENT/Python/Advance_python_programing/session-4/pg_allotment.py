class InvalidRoomError(Exception):
    pass


class RoomFullError(Exception):
    pass


class DuplicateStudentError(Exception):
    pass


class StudentNotFoundError(Exception):
    pass


ROOM_CAPACITY = {
    "R101": 2,
    "R102": 2,
    "R103": 3,
    "R104": 3,
    "R105": 2,
    "R106": 3,
}

room_occupants = {room: [] for room in ROOM_CAPACITY}


def allot(student_name, room_no):
    """Allot a student to a room after validating room, duplicate student, and capacity."""
    student_name = student_name.strip()
    room_no = room_no.strip().upper()

    if room_no not in ROOM_CAPACITY:
        raise InvalidRoomError(f"Room '{room_no}' does not exist.")

    for assigned_room, students in room_occupants.items():
        if student_name in students:
            raise DuplicateStudentError(
                f"Student '{student_name}' is already allotted to room {assigned_room}."
            )

    if len(room_occupants[room_no]) >= ROOM_CAPACITY[room_no]:
        raise RoomFullError(
            f"Room {room_no} is full (capacity {ROOM_CAPACITY[room_no]})."
        )

    room_occupants[room_no].append(student_name)
    return f"Confirmed: {student_name} allotted to {room_no}."


def vacate(student_name):
    """Remove an allotted student from their room using remove()."""
    student_name = student_name.strip()

    for room_no, students in room_occupants.items():
        if student_name in students:
            students.remove(student_name)
            return f"Confirmed: {student_name} vacated {room_no}."

    raise StudentNotFoundError(f"Student '{student_name}' is not allotted to any room.")


def show_rooms():
    """Display current occupancy and capacity for all rooms."""
    print("\n--- Room Occupancy ---")
    for room_no, capacity in ROOM_CAPACITY.items():
        students = room_occupants[room_no]
        occupant_str = ", ".join(students) if students else "Empty"
        print(f"{room_no} ({len(students)}/{capacity}): {occupant_str}")


def seed_initial_allotments():
    """Test allot() from code with 4 invented students across 2 rooms."""
    initial_entries = [
        ("Aarav Sharma", "R102"),
        ("Diya Nair", "R102"),
        ("Kabir Verma", "R103"),
        ("Sneha Iyer", "R103"),
    ]
    print("--- Initial Allotments ---")
    for student_name, room_no in initial_entries:
        print(allot(student_name, room_no))


def main():
    """Run the PG hostel room allotment menu loop."""
    seed_initial_allotments()

    while True:
        print("\n--- PG Room Allotment ---")
        print("1. Allot room")
        print("2. Vacate room")
        print("3. View rooms")
        print("4. Exit")

        choice = input("Choose an option (1-4): ").strip()

        if choice == "1":
            student_name = input("Enter student name: ")
            room_no = input("Enter room number (R101-R106): ")
            try:
                print(allot(student_name, room_no))
            except InvalidRoomError as err:
                print(f"Error: {err}")
            except RoomFullError as err:
                print(f"Error: {err}")
            except DuplicateStudentError as err:
                print(f"Error: {err}")
        elif choice == "2":
            student_name = input("Enter student name to vacate: ")
            try:
                print(vacate(student_name))
            except StudentNotFoundError as err:
                print(f"Error: {err}")
        elif choice == "3":
            show_rooms()
        elif choice == "4":
            print("Goodbye.")
            break
        else:
            print("Invalid choice. Please select 1, 2, 3, or 4.")


if __name__ == "__main__":
    main()
