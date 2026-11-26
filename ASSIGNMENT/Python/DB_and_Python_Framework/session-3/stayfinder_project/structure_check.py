"""Check presence and line counts of core stayfinder_project files."""

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

FILES_TO_CHECK = [
    'manage.py',
    'stayfinder_project/settings.py',
    'stayfinder_project/urls.py',
    'stayfinder_project/wsgi.py',
    'stayfinder_project/asgi.py',
    'stayfinder_project/models.py',
]


def main():
    """Open each expected project file and print its line count or MISSING."""
    for rel_path in FILES_TO_CHECK:
        file_path = BASE_DIR / rel_path
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                line_count = sum(1 for _ in f)
            print(f'{rel_path}: {line_count} lines')
        except FileNotFoundError:
            print(f'{rel_path}: MISSING')


if __name__ == '__main__':
    main()
