import os
import sys
import pymysql

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

DB_HOST = os.environ.get("MYSQL_HOST", "localhost")
DB_USER = os.environ.get("MYSQL_USER", "root")
DB_PASSWORD = os.environ.get("MYSQL_PASSWORD", "")
DB_NAME = "tuition_fee_db"

conn = None


def init_database():
    """Create database tuition_fee_db and students table if missing, and open connection."""
    global conn

    setup_conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD)
    setup_cursor = setup_conn.cursor()
    setup_cursor.execute("CREATE DATABASE IF NOT EXISTS tuition_fee_db")
    setup_cursor.close()
    setup_conn.close()

    conn = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
    )
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            class_name VARCHAR(50) NOT NULL,
            monthly_fee INT NOT NULL
        )
        """
    )
    conn.commit()
    cursor.close()
    print("Table ready")


def add_student(name, class_name, monthly_fee):
    """Insert a student row using parameterised SQL and commit."""
    cursor = conn.cursor()
    sql = "INSERT INTO students (name, class_name, monthly_fee) VALUES (%s, %s, %s)"
    cursor.execute(sql, (name, class_name, monthly_fee))
    conn.commit()
    student_id = cursor.lastrowid
    cursor.close()
    return student_id


def seed_initial_students():
    """Seed 6 sample students if the students table is currently empty."""
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM students")
    count = cursor.fetchone()[0]
    cursor.close()

    if count > 0:
        return

    sample_students = [
        ("Aarav Sharma", "Class 8", 800),
        ("Diya Nair", "Class 8", 900),
        ("Rohan Desai", "Class 9", 1200),
        ("Sneha Kulkarni", "Class 9", 1250),
        ("Kabir Verma", "Class 10", 1800),
        ("Priya Mehta", "Class 10", 1950),
    ]
    for name, class_name, monthly_fee in sample_students:
        add_student(name, class_name, monthly_fee)


def print_students_table(rows):
    """Display student rows in aligned columns."""
    if not rows:
        print("No students found")
        return

    id_w = max(len("ID"), max(len(str(r[0])) for r in rows))
    name_w = max(len("Name"), max(len(str(r[1])) for r in rows))
    class_w = max(len("Class"), max(len(str(r[2])) for r in rows))
    fee_w = max(len("Monthly Fee (₹)"), max(len(str(r[3])) for r in rows))

    header = (
        f"{'ID':>{id_w}}  "
        f"{'Name':<{name_w}}  "
        f"{'Class':<{class_w}}  "
        f"{'Monthly Fee (₹)':>{fee_w}}"
    )
    divider = "-" * len(header)
    print("\n" + header)
    print(divider)
    for student_id, name, class_name, monthly_fee in rows:
        print(
            f"{student_id:>{id_w}}  "
            f"{name:<{name_w}}  "
            f"{class_name:<{class_w}}  "
            f"{monthly_fee:>{fee_w}}"
        )
    print(divider)


def view_all_students():
    """Fetch and print all students."""
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, class_name, monthly_fee FROM students ORDER BY id")
    rows = cursor.fetchall()
    cursor.close()
    print_students_table(rows)


def search_by_class():
    """Search students by class_name using a parameterised %s query."""
    class_name = input("Enter class name (e.g. Class 8): ").strip()
    cursor = conn.cursor()
    sql = "SELECT id, name, class_name, monthly_fee FROM students WHERE class_name = %s ORDER BY id"
    cursor.execute(sql, (class_name,))
    rows = cursor.fetchall()
    cursor.close()
    print_students_table(rows)


def update_fee():
    """Update a student's monthly_fee by id."""
    id_raw = input("Enter student ID to update: ").strip()
    fee_raw = input("Enter new monthly fee (₹): ").strip()
    if not id_raw.isdigit() or not fee_raw.isdigit():
        print("ID and monthly fee must be valid whole numbers.")
        return

    student_id = int(id_raw)
    new_fee = int(fee_raw)

    cursor = conn.cursor()
    sql = "UPDATE students SET monthly_fee = %s WHERE id = %s"
    cursor.execute(sql, (new_fee, student_id))
    conn.commit()
    affected = cursor.rowcount
    cursor.close()

    if affected == 0:
        print("No such student")
    else:
        print(f"Updated monthly fee for student ID {student_id} to ₹{new_fee}.")


def delete_student():
    """Delete a student record by id."""
    id_raw = input("Enter student ID to delete: ").strip()
    if not id_raw.isdigit():
        print("Student ID must be a valid whole number.")
        return

    student_id = int(id_raw)

    cursor = conn.cursor()
    sql = "DELETE FROM students WHERE id = %s"
    cursor.execute(sql, (student_id,))
    conn.commit()
    affected = cursor.rowcount
    cursor.close()

    if affected == 0:
        print("No such student")
    else:
        print(f"Deleted student ID {student_id}.")


def main():
    """Initialize database and run the tuition fee tracker menu loop."""
    init_database()
    seed_initial_students()

    while True:
        print("\n--- Tuition Fee Tracker ---")
        print("1. Add student")
        print("2. View all students")
        print("3. Search by class")
        print("4. Update fee")
        print("5. Delete student")
        print("0. Exit")

        choice = input("Choose an option (0-5): ").strip()

        if choice == "1":
            name = input("Enter student name: ").strip()
            class_name = input("Enter class name (e.g. Class 8): ").strip()
            fee_raw = input("Enter monthly fee (₹): ").strip()
            if not name or not class_name or not fee_raw.isdigit():
                print("Invalid input. Please provide name, class, and whole-number fee.")
                continue
            new_id = add_student(name, class_name, int(fee_raw))
            print(f"Added {name} ({class_name}) with ID {new_id}.")
        elif choice == "2":
            view_all_students()
        elif choice == "3":
            search_by_class()
        elif choice == "4":
            update_fee()
        elif choice == "5":
            delete_student()
        elif choice == "0":
            print("Goodbye.")
            break
        else:
            print("Invalid choice. Please select 0 to 5.")

    conn.close()


if __name__ == "__main__":
    main()
