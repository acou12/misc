def factorial(x: int) -> int:
    if x <= 1:
        1
    else:
        factorial(x - 1) * x

def main:
    print(factorial(15))