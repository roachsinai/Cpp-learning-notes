# typedef

#### 定义函数指针类型

之前，一直对`typedef int(*p)()`这种写法定义了`p`这一类型不清楚。原来是**任何声明变量的语句前面加上`typedef`之后，原来是变量的都变成一种类型**。下面是这一解释的原文，很值得一观。

Typedef does not work like `typedef [type] [new name]`. The `[new name]` part does not always come at the end.

You should look at it this way: if `[some declaration]` declares a variable, `typedef [same declaration]` would define a type.

E.g.:

 - `int x;` declares a variable named x of type int -> `typedef int x;`
   defines a type x as int.
 - `struct { char c; } s;` defines a variable named s of some struct type -> `typedef struct { char c; } s;` defines type s to be some struct type.
 - `int *p;` declares a variable named p of type pointer to int ->
   `typedef int *p;` defines a type p as pointer to int.

And also:

 - `int A[];` declares an array of ints named A -> `typedef int A[];` declares a type A as an array of ints.
 - `int f();` declares a function named f -> `typedef int f();` declares a function type f as returning an int and taking no arguments.
 - `int g(int);` declares a function name g -> `typedef int g(int);` declares a function type g as returning an int and taking one int.

As an aside: Note that all function arguments come after the new name! As those types could be complicated as well, there can be a lot of text after the [new name]. Sadly, but true.

But those are not proper function *pointers* yet, just function types. I'm not sure a function type exists in C or C++, but it is useful as an intermediate step in my explanation. // 作者并不确定是`C/C++`否有函数类型这一说

To create a real function pointer, we have to add '*' to the name. Which, sadly, has wrong precedence:

 - `typedef int *pf();` declares a function type pf as return a **int***. Oops, that's not what was intended.

So use () to group:

 - `typedef int (*pf)();` declares a function pointer type pf as returning an int and taking no arguments.
 - `typedef int (&rf)();` declares a function reference type rf as returning an int and taking no arguments.
 
 #### References:
 
 1. [C++ Syntax/Semantics Question: Reference to Function and typedef keyword](https://stackoverflow.com/questions/6905695/c-syntax-semantics-question-reference-to-function-and-typedef-keyword/6905987#6905987)