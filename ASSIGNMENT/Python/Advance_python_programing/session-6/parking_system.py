import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


class Vehicle:
    """Base class for all parked vehicles."""

    def __init__(self, reg_no, owner, hours, rate):
        self.reg_no = reg_no
        self.owner = owner
        self.hours = hours
        self.rate = rate

    def parking_charge(self):
        """Return total parking charge based on parked hours and hourly rate."""
        return self.hours * self.rate


class TwoWheeler(Vehicle):
    """Two-wheeler charged at ₹10 per hour."""

    def __init__(self, reg_no, owner, hours):
        super().__init__(reg_no, owner, hours, 10)


class FourWheeler(Vehicle):
    """Four-wheeler charged at ₹30 per hour."""

    def __init__(self, reg_no, owner, hours):
        super().__init__(reg_no, owner, hours, 30)


class ElectricCar(FourWheeler):
    """Four-wheeler electric car with battery capacity and EV charging cost."""

    def __init__(self, reg_no, owner, hours, battery_kwh):
        super().__init__(reg_no, owner, hours)
        self.battery_kwh = battery_kwh

    def charging_cost(self, units):
        """Return EV charging cost at ₹12 per unit."""
        return units * 12


class ValetService:
    """Plain service mixin providing a flat valet parking fee."""

    def valet_fee(self):
        """Return the flat ₹50 valet fee."""
        return 50


class ValetElectricCar(ElectricCar, ValetService):
    """Electric car using valet service, inheriting from ElectricCar and ValetService."""

    def __init__(self, reg_no, owner, hours, battery_kwh):
        ElectricCar.__init__(self, reg_no, owner, hours, battery_kwh)

    def bill(self, units):
        """Return combined parking, EV charging, and valet charges."""
        return self.parking_charge() + self.charging_cost(units) + self.valet_fee()


def run_unit_checks():
    """Run and display the verification checks for Parts 1, 2, and 3."""
    car = FourWheeler("MH12AB1001", "Rohan Desai", 3)
    bike = TwoWheeler("MH12XY2002", "Priya Nair", 5)
    ev = ElectricCar("MH14EV3003", "Arjun Mehta", 2, 40)
    valet_ev = ValetElectricCar("MH14VE4004", "Sneha Iyer", 2, 50)

    print("--- Feature Tests ---")
    print(f"FourWheeler (3 hrs): ₹{car.parking_charge()}")
    print(f"TwoWheeler (5 hrs): ₹{bike.parking_charge()}")
    print(f"ElectricCar (2 hrs): parking=₹{ev.parking_charge()}, charging(10 units)=₹{ev.charging_cost(10)}")
    print(f"ValetElectricCar (2 hrs, 10 units): bill=₹{valet_ev.bill(10)}")


def day_end_report():
    """Print the day-end parking report for 8 vehicles across every vehicle class."""
    vehicles = [
        Vehicle("MH12TR0001", "Kiran Patel", 4, 50),
        TwoWheeler("MH12TW1011", "Aarav Sharma", 5),
        TwoWheeler("MH12TW1012", "Diya Kulkarni", 2),
        FourWheeler("MH12FW2021", "Vikram Rao", 3),
        FourWheeler("MH12FW2022", "Meera Joshi", 4),
        ElectricCar("MH14EC3031", "Kabir Verma", 2, 42),
        ElectricCar("MH14EC3032", "Ananya Shah", 3, 60),
        ValetElectricCar("MH14VE4041", "Siddharth Gupta", 2, 55),
    ]

    print("\n--- Day-End Parking Report ---")
    total_revenue = 0
    for vehicle in vehicles:
        charge = vehicle.parking_charge()
        total_revenue += charge
        print(f"{type(vehicle).__name__:<18} | {vehicle.reg_no} | ₹{charge}")

    print(f"Total Parking Revenue: ₹{total_revenue}")


def main():
    """Run unit checks and print the day-end report."""
    run_unit_checks()
    day_end_report()


if __name__ == "__main__":
    main()
