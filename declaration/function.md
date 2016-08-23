# 函数

#### 为什么不能通过返回值重载函数？

{%ace edit=true, lang='c_cpp'%}
void foo(){}
    
int foo(){return 0}

int main()
{
    foo();
}
{%endace%}

因为这样的化`mian`函数中，编译器不知道要调用哪个函数。

假如，`void foo`编译后名字为`_foo`，`int foo`编译后名字为`i_foo`；但是，`main`函数中`foo`编译器并不知道该编译成什么名字。

#### 函数调用还是函数地址？ 

看下面的代码：

{%ace edit=true, lang='c_cpp'%}
#include<iostream>
#include<cstdio>
using namespace std;

int foo(){ return 0;}

int main()
{
    int (*p)() = foo;

    (*p)(); // call foo
    p();    // call foo too

    printf("%p\n, &p)   // address of pointer p

    printf("%p\n, *p)       // address of foo
    printf("%p\n, **p)      // address of foo
    printf("%p\n, foo)      // address of foo
    printf("%p\n, &foo)     // address of foo
    printf("%p\n, **foo)    // address of foo

    return 0;
}
{%endace%}

`stackoverflow` 上面的一个回答，很好的解释了这个问题。

> Why is using the function name as a function pointer equivalent to applying the address-of operator to the function name?
>
>
> It's a feature inherited from C.
>
> In C, it's allowed primarily because there's not much else the name of a function, by itself, could mean. All you can do with an actual function is call it. If you're not calling it, the only thing you can do is take the address. Since there's no ambiguity, any time a function name isn't followed by a `(` to signify a call to the function, the name evaluates to the address of the function.

翻译一下：

`问题`：为什么使用函数名输出的就是函数的地址呢？

`回答`：`C`语言就是这么用的，而`C++`则延续了这个用法。因为函数名在`C`语言中代表的意思并不多，只有两种：调用该函数或者得到该函数的地址。而这两种情况的一个明显区别就是有没有`()`；如果函数名后面有**函数调用运算符**，就表明是调用该函数，没有就是得到函数的地址。另外，函数调用运算符的优先级仅仅低于作用域解析符（但是和数组访问、自增、自减等并列）。

至于，为什么不用`cout`，因为`cout << foo << endl;`输出结果为`1`。`ostream`重载了`<<`，会将函数指针转化为`bool`输出[^2]。

#### References:

1. [Why is using the function name as a function pointer equivalent to applying the address-of operator to the function name?](http://stackoverflow.com/a/12152212/6074780)

2. [How to print function pointers with cout?](http://stackoverflow.com/a/2064722/6074780)
