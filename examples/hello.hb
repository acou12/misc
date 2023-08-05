def main(): int =
    let x: int = 1 + 2
    let y: int = x * x
    let z: int = x ~@@#@@~ y
    print(x / y / z)

    let q: int = 1 + 2 + (3 * 4 * 5)

    let z: str = f(x + y)((x + z) - y) + (g(1 + 2 + 3)) + z(z(z(z(z))))
    