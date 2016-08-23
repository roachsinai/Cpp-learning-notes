# extern

## 声明使用外部连接

extern可以置于变量或者函数前，以表示变量或者函数的定义在别的文件中，提示编译器遇到此变量和函数时在其他模块中寻找其定义。那也就是说它只是一个声明而不是定义。

同样，引入命名空间中的成员，需要在当前文件的该命名空间中引入。

## extern “C”

#### 原因

目的是实现C和C++代码的联编。

因为C++允许重载，而C中没有重载，那么`.c`调用`.cpp`文件中定义的函数，或者`.cpp`调用'.c'中定义的函数是都会出现问题。

#### 解决方法

1. 函数定义在`.c`文件中，函数声明在`.h`中，调用函数的`.cpp`文件中使用如下方式包含头文件：

    ```extern "C"{#include".h"}```

    然后，正常调用即可。

2. 函数定义在`.cpp`文件中，函数声明在`.h`中，函数在`.c`文件中调用：

{%ace edit=true, lang='c_cpp'%}
// .h
#ifndef CPP_H
#define CPP_H
extern "C" void interact();
#endif

// .cpp
#include ".h"

void interact()
{}
    
// .c
extern void interact();

int main()
{
    return 0;
}
{%endace%}

需要注意的是，`.c`文件中不能包含头文件，因为`extern "C"`在`.c`文件中会出现编译错误。

**extern "C"指令中的C，表示的一种编译和连接规约，而不是一种语言。C表示符合C语言的编译和连接规约的任何语言，如Fortran、assembler等**[^1]。

#### References

1. [C++项目中的extern "C" {}](http://www.cnblogs.com/skynet/archive/2010/07/10/1774964.html)
