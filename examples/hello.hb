def main(): int =
    let x: str = "hello"
    setTimeout(\: int =
        print(x)
    , 1000)

def maintwo(): int =
    let x: str = "hello"
    def delayedPrint(): int =
        print(x)
    setTimeout(delayedPrint, 1000)