# gcc编译链接相关命令

## 单文件生成可执行程序

```
/* helloworld.cpp */
#include <iostream>
int main(int argc,char *argv[])
{
    std::cout << "hello, world" << std::endl;
    return(0);
}
```

#### 默认生成 a.out

`$ g++ helloworld.cpp`

#### 生成指定可执行程序名

‘$ g++ helloworld.cpp -o helloworld’

#### 使用`gcc`编译`cpp`

这需要知道使用哪个库文件，这里需要静态库`libstdc++.a`，动态库后缀是`.so`.那么编译命令就是：

`$ gcc helloworld.cpp -lstdc++ -o helloworld`

选项 -l (ell) 通过添加前缀 lib 和后缀 .a 将跟随它的名字变换为库的名字 libstdc++.a。而后它在标准库路径中查找该库。

## 多个源文件生成可执行程序

比如程序有`hellospeak.h hellospeak.cpp speak.cpp`三个文件，`cpp`中包含了头文件那编译命令为：

`g++ hellospeak.cpp speak.cpp -o speak`

## 源文件生成对象文件

选项 -c 用来告诉编译器编译源代码但不要执行链接，输出结果为对象文件。文件默认名与源码文件名相同，只是将其后缀变为 .o。例如，下面的命令将编译源码文件 hellospeak.cpp 并生成对象文件 hellospeak.o：

`$ g++ -c hellospeak.cpp`

命令 g++ 也能识别 .o 文件并将其作为输入文件传递给链接器。

```
$ g++ -c hellospeak.cpp 
$ g++ -c speak.cpp 
$ g++ hellospeak.o speak.o -o hellospeak
```

选项 -o 不仅仅能用来命名可执行文件。它也用来命名编译器输出的其他文件。

```
$ g++ -c hellospeak.cpp -o hspk1.o 
$ g++ -c speak.cpp -o hspk2.o 
$ g++ hspk1.o hspk2.o -o hellospeak
```

## 编译预处理

选项 -E 使 g++ 将源代码用编译预处理器处理后不再执行其他动作。

预处理过的文件的 GCC 后缀为 .ii，它可以通过 -o 选项来指定名字，例如：

`$ gcc -E helloworld.cpp -o helloworld.ii`

## 生成汇编代码

选项 -S 指示编译器将程序编译成汇编语言，输出汇编语言代码而後结束。下面的命令将由 C++ 源码文件生成汇编语言文件 helloworld.s：

`$ g++ -S helloworld.cpp`

## 小结

在以上这些编译选项后面都可以加上 `-Wall` 意思是`Warning all`。

#### References

1. [Compiling Cpp](http://wiki.ubuntu.org.cn/Compiling_Cpp)