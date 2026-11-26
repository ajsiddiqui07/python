"""Verification script for the haversine distance helper."""

from listings.utils import haversine


def main():
    """Verify Ahmedabad-to-Vadodara distance and zero self-distance."""
    ahm_to_vad = haversine(23.0225, 72.5714, 22.3072, 73.1812)
    same_point = haversine(23.0225, 72.5714, 23.0225, 72.5714)

    print(f'Ahmedabad to Vadodara: {ahm_to_vad:.2f} km')
    print(f'Same point distance: {same_point:.2f} km')

    assert 95 <= ahm_to_vad <= 115, f'Unexpected distance: {ahm_to_vad}'
    assert same_point == 0, f'Expected 0, got {same_point}'
    print('haversine_test passed!')


if __name__ == '__main__':
    main()
