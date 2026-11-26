"""Reusable utility functions and constants for the library system."""

LOAN_DAYS = 14


def days_late(issue_day, return_day):
    """Return days past LOAN_DAYS, or 0 if returned on time."""
    kept_days = return_day - issue_day
    if kept_days > LOAN_DAYS:
        return kept_days - LOAN_DAYS
    return 0


def fine_amount(late_days, per_day=2):
    """Return total late fine in rupees."""
    return late_days * per_day


def issue_book(register, member, title, issue_day):
    """Append an issued book record dictionary to the register list."""
    register.append(
        {
            "member": member,
            "title": title,
            "issue_day": issue_day,
            "returned": False,
        }
    )


def books_of(register, member):
    """Return a list of book titles issued to the specified member."""
    return [entry["title"] for entry in register if entry["member"] == member]
