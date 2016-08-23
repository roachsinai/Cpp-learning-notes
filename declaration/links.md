# 内部、外部连接

#### 编译单元

当一个c或cpp文件在编译时，预处理器首先递归包含头文件，形成一个含有所有必要信息的单个源文件，这个源文件就是一个编译单元。这个编译单元会被编译成为一个与cpp 文件名同名的目标文件(.o或是.obj) 。连接程序把不同编译单元中产生的符号联系起来，构成一个可执行程序。

可以把它理解为：在#include头文件的内容后（即将头文件的内容粘贴到cpp中之后）的cpp文件就是编译单元。简单说，一个编译单元就是一个经过预处理的cpp文件。[^1]

#### free function

> The term free function in C++ simply refers to non-member functions. Every function that is not a member function is a free function.[^2]

{%ace edit=true, lang='c_cpp'%}
struct X {
    void f() {}               // not a free function
};
void g() {}                   // free function
int h(int, int) { return 1; } // also a free function
{%endace%}

#### 内部连接

如果一个名称对于它的编译单元来说是局部的, 并且在连接的时候不可能与其它编译单元中的同样的名称相冲突，则这个名称具有内部连接。即具有内部连接的名称不会引入到目标文件中。

是内部连接的情况：

- 所有的声明
- 命名空间(包括全局命名空间)中的静态自由函数、静态友元函数、静态变量的定义
- enum定义
- inline函数定义(包括自由函数和非自由函数)
- 类的定义
- 命名空间中const常量定义
- union的定义

inline函数使用的时候是编译器将其展开到源文件中，所以是内部连接。

#### 外部连接

在一个多源文件项目中,如果一个符号`symbol`在连接时可以和其他编译单元交互,那么这个名称就具有外部连接.。即具有外部连接的符号会引入到目标文件中，由有连接器进行处理。那么，这种符号在整个程序中必须是惟一的，不然会有冲突。

是外部连接的情况：

- 类非inline函数总有外部连接；包括类成员函数和类静态成员函数
- 类静态成员变量总有外部连接
- 命名空间(包括全局命名空间)中非静态自由函数、非静态友元函数及非静态变量

#### References

1. [编译单元](http://baike.baidu.com/link?url=2Mne1N9b0hfzRIL1QW28cB3gMre66ZGAdCp9Odwc4Pzcy70Das8QZwDrKUbtrdfUgkbZAKI6mACHK90ps_X-CK)
2. [What is the meaning of the term “free function” in C++?](http://stackoverflow.com/questions/4861914/what-is-the-meaning-of-the-term-free-function-in-c)