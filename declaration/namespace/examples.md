# namespace across file

**精华在正文最后一句话**！

推荐定义方法的一个栗子[^1]:

{%ace edit=true, lang='c_cpp'%}
// *.h
namespace MyNamespace {
    class MyClass {
    public:
        int foo();
    };
}

// *.cpp 中最好用如下方式进行定义
int MyNamespace::MyClass::foo()
{
    //  ...
}
{%endace%}

不成功的栗子[^2]:

{%ace edit=true, lang='c_cpp'%}
// FileThree.h
#ifndef FILETHREE
#define FILETHREE
namespace blue{}
class Filethree
{
public:
    Filethree(void);
    ~Filethree(void);
};
#endif

// FileThree.cpp
#include "Filethree.h"
#include<iostream>
using namespace std ;
namespace blue{
     void blueprint(int nVar){
         cout<<"red::"<<nVar<<endl;
     }
}

Filethree::Filethree(void){}
Filethree::~Filethree(void){}

// main.cpp
#include "Filethree.h"
using namespace red ;
using namespace blue ;
int main()
{
    blueprint(12);
    return 0;
}

error: 'blueprint': identifier not found
{%endace%}

没有成功的原因就是，必须在源文件中引入namespace的声明——添加`namespace blue{}`（这一步头文件中已有），更重要的是要在其中在添加`blueprint`函数的声明。

`namespace blue{void blueprint(int nVar);}`添加到`main.cpp`中之后，**你才引入了函数`blueprint`的声明**，编译器才可以进行编译！

当然，引入的时候要带上命名空间的名字了：`namespace blue{}`

#### References

1. [C++: Namespaces — How to use in header and source files correctly?](http://stackoverflow.com/questions/10816600/c-namespaces-how-to-use-in-header-and-source-files-correctly)
2. [Namespace with multiple files](http://stackoverflow.com/questions/14229362/namespace-with-multiple-files)