# 全局命名空间

> The name of the global namespace is ‘::’, even though in C++ the global namespace is unnamed.

#### 全局变量默认在全局命名空间！

> In C++, every name has its scope outside which it doesn't exist. A scope can be defined by many ways : it can be defined by namespace, functions, classes and just { }.
>
> So a namespace, global or otherwise, defines a scope. The global namespace refers to using ::, and the symbols defined in this namespace are said to have global scope. A symbol, by default, exists in a global namespace, unless it is defined inside a block starts with keyword namespace, or it is a member of a class, or a local variable of a function.[^1]

全局命名空间

#### 作用域解析符解除 hidden by inner scope

使用`::`可以的得到外部变量！

{%ace edit=true, lang='c_cpp'%}
int a = 10;

namespace N
{
    int a = 100;

    void f()
    {
         int a = 1000;
         std::cout << a << std::endl;      //prints 1000
         std::cout << N::a << std::endl;   //prints 100 
         std::cout << ::a << std::endl;    //prints 10
    }
}
{%endace%}

#### References

1. [Global scope vs global namespace](http://stackoverflow.com/questions/10269012/global-scope-vs-global-namespace)