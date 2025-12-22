# Custom iterator class
class MyIterator:
    def __init__(self, data):
        self.data = data  # Store the list
        self.index = 0    # Initialize index

    def __iter__(self):
        return self  # Iterator object returns itself

    def __next__(self):
        if self.index < len(self.data):
            result = self.data[self.index]
            self.index += 1
            return result
        else:
            raise StopIteration  # End of iteration

# List of integers
numbers = [10, 20, 30, 40, 50]

# Create an iterator object
num_iterator = MyIterator(numbers)

# Iterate using the custom iterator
for num in num_iterator:
    print(num)
