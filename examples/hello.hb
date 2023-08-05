def main(): int =
    print("hello, world!")
    [1, 2, 3].map \x: int, y: int =
        print(x)
        print(y)
        x + y
