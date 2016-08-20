# 命名空间与变量符号名

下面这段代码说明，对于命名空间里的变量，只是编译后的符号名带有命名空间的信息。那么我们在对变量使用**作用域运算符**后，编译器也会在这个变量名上添加命名空间的信息，然后去匹配符号表中的变量对应的地址（符号名 -> 地址）。这样编译之后，内存中所填的地址也就是正确的。

作用域运算符还可以用在类中。同样在`cpp`中定义类的函数时使用：`void A::foo(){}`，同样使得函数名可以匹配到类的函数上，类似还有类静态变量的定义。

```
//test.cpp
#include<iostream>
using namespace std;

int xxx = 1;

void foo()
{
    int b = 0;
}

namespace roach
{
    int xxx = 1;
}

class ROACH
{
public:
    int xxx = 1;
    int fuuunc();
};

ROACH rr;
int ROACH::fuuunc(){return 0;}

int main()
{
    foo();
}
```

使用下面命令编译成目标文件：`g++ -c test.cpp -o test.o`

并查看其中符号：`objdump -t test.o`

```
test.o：     文件格式 elf64-x86-64

SYMBOL TABLE:
0000000000000000 l    df *ABS*	0000000000000000 test.cpp
0000000000000000 l    d  .text	0000000000000000 .text
0000000000000000 l    d  .data	0000000000000000 .data
0000000000000000 l    d  .bss	0000000000000000 .bss
0000000000000000 l    d  .rodata	0000000000000000 .rodata
0000000000000000 l     O .rodata	0000000000000001 _ZStL19piecewise_construct
0000000000000000 l     O .bss	0000000000000001 _ZStL8__ioinit
000000000000001e l     F .text	000000000000003e _Z41__static_initialization_and_destruction_0ii
000000000000005c l     F .text	0000000000000015 _GLOBAL__sub_I_xxx  // xxx 是cpp中的第一个变量，如果第一个变量换成其他名字，这里也会改变
0000000000000000 l    d  .init_array	0000000000000000 .init_array
0000000000000000 l    d  .note.GNU-stack	0000000000000000 .note.GNU-stack
0000000000000000 l    d  .eh_frame	0000000000000000 .eh_frame
0000000000000000 l    d  .comment	0000000000000000 .comment
0000000000000000 g     O .data	0000000000000004 xxx
0000000000000000 g     F .text	000000000000000e _Z3foov
0000000000000004 g     O .data	0000000000000004 _ZN5roach3xxxE      // 这里
000000000000000e g     F .text	000000000000000f _ZN5ROACH6fuuuncEv  // 和这里都涉及::
0000000000000008 g     O .data	0000000000000004 rr
000000000000000e g     F .text	0000000000000010 main
0000000000000000         *UND*	0000000000000000 _ZNSt8ios_base4InitC1Ev
0000000000000000         *UND*	0000000000000000 .hidden __dso_handle
0000000000000000         *UND*	0000000000000000 _ZNSt8ios_base4InitD1Ev
0000000000000000         *UND*	0000000000000000 __cxa_atexit
```