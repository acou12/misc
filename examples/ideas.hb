def display(list: list[int]):
    list
        .map \x:
            x * 2
        .filter \x:
            x >= 0
        .reverse()
        .for_each(print)
        # or
          .for_each(\x: print(x))

def comments:
    # single line comments.

    # comments are indentation
      based, so you can keep going
      as long as you stay on the same level.
    
    # or inline:

    let x = 1 + 2 #{ + 3 }# + 4

    #{ nestable, #{ too! }# }#

# equivalent to "if __name__ == '__main__':"
def main:
    [1, 2, 3, 4].print_all()

def vector_test:
    # vector literals
    let x = <1, 2, 3>

    # or explicitly typed
    let y: vec(3) = <4, 5, 6> 
    let z: vec(4) = <7, 8, 9, 10>

    # all equivalent.
      '+' is element-to-element addition

    x += y
    x = x + y
    x = +(x, y)

    # x += z <-- syntax error! 3 != 4

    let two_d = <<1, 2>,
                 <3, 4>>
    
    # two_d has type vec(2, 2)

    # static error: vectors must have consistent shapes
      let other_two_d = <<1, 2>,
                         <3, 4, 5>> 

def functions:
    # local functions
    def plus(x: int, y: int): int:
        return x + y

def indentation_rules:
    # indentation is used in place of braces.
      the change in indentation is what is significant
    
    # indents can be used to continue an expression without parenthesis
    let x = 1 + 2 + 3
        + 4 + 5 + 6
        + 7 + 8 + 9

    # no indent will treat every new line as a new statement
    let x = 1 + 2 + 3 
    + 4 + 5 + 6
    + 7 + 8 + 9

    # x is 6, the other two lines do nothing

#! EXPERIMENTAL

def block_operators:
    # indentation can also be used to replace other types of brackets

    let vector = <:>
        1,
        2,
        3, 4, 5
    
    assert(vector == <1, 2, 3, 4, 5>)

    let list = [:]
        1, 2, 3,
        4, 5
    
    assert(list == [1, 2, 3, 4, 5])

    let vector2 = <:>
        <:>
            1
            2
            3
        <:>
            4
            5
            6
    
    # or?

    let vector3 = <::>
        1, 2, 3
        4, 5, 6

def id_resolution:
    # identifiers can refer to multiple things of separate types and separate scopes

    let int = 10
    let int = "string"
    let int = \s: str, i: int:
        s + str(i)

    # you can do this if you really want to.

    let int = int(int, int)

# random

def reactive:
    # (or "destiny" operator)
    let x = 10
    let react double = x * 2

    print(x, double) # 10, 20
    x += 2
    print(x, double) # 12, 24

    # differs from a function in that it is only re-calculated when needed.
      possibly this could be generalized to allow better support for
      react-like ui frameworks
    
    let react xp = really_expensive_but_also_annoyingly_long_expression(x)

    # xp is only recalculated twice in the following exprsesion

    x = 15
    print((xp + xp) * (xp - xp))

    x = 20
    print((xp + xp) * (xp - xp))

    # alternative way would be
      x = 15
      xp = really_expensive_but_also_annoyingly_long_expression(x)
      print((xp + xp) * (xp - xp))

      x = 20
      xp = really_expensive_but_also_annoyingly_long_expression(x)
      print((xp + xp) * (xp - xp))

      and it's easy to forget to sync them
    
    # readability concerns?

def lift_opertor:
    let width = 10
    let height = 20

    for i in 0..<1000:
        for j in 0..<1000:
            let lift area = width * height
            f(i, j, area)
    
    # optimized to
    
      for i in 0..<1000:
          for j in 0..<1000:
              let lift area = width * height
              f(i, j, area)

def multiline_stuff:
    let s =
        `this is a multiline string. as long
        `you keep adding backquotes, it will
        `continue. but maybe it could be better...    

    let array = reverse([
        1, 2, 3,
        4, 5, 6,
    ], axis=3)

    let arr2 = :
        let temp = (array)
        for i in indicies(array):
            temp[i] = temp[^i]
 
    print(array)

def random:
    # currying?
    def test(a: int, b: int)(c: int, d: int) -> int: (a + b) * (c + d)

    let f = test(1, 2) # : (int, int) -> (int)
    let x = f(3, 4) # : int == 21

def main:
    let x: str = "hello"
    f(\x, y: x + y, 10, 20)

    f(\(x: int, y: int) -> int: 
        x + y
    10, 20)

    f 10, \x, y:
        print(x, y)
    
    f(10, \x, y: print(x, y))

    setInterval:
        fn = \delta:
            let x = 10 * delta 
        delay = 10    

    let list = <10, 20, 30>
    print(list * 3)

def if(condition: boolean, block:)

def maintwo() -> int:
    let x: str = "hello"
    def delayedPrint(): int =
        print(x)
    setTimeout(delayedPrint, 1000)

def memory_management: 
    # todo

def generics:
    def reverse[A](list[A]:) -> list[A]:
        # ...

def syntax_overloading:
    let overload [_](shape=(3, 3), *elements) = matrix(shape)(elements)
    
    let a = [1, 2, 3,
             4, 5, 6,
             7, 8, 9]

    let b = #
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
    
    let c = [shape(2, 2),
        1, 2,
        3, 4,
    ]

    # operator underloading
    underload [_]

    print([1, 2, 3])