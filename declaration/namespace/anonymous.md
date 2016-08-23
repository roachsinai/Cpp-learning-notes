# 匿名命名空间

当定义一个命名空间时，可以忽略这个命名空间的名称：

{%ace edit=true, lang='c_cpp'%}
namespce {
    char c;
    int i;
    double d;
}
{%endace%}

编译器在内部会为这个命名空间生成一个唯一的名字，而且还会为这个匿名的命名空间生成一条using指令。所以上面的代码在效果上等同于：

{%ace edit=true, lang='c_cpp'%}
namespace __UNIQUE_NAME_ {
    char c;
    int i;
    double d;
}
using namespace __UNIQUE_NAME_;
{%endace%}

在匿名命名空间中声明的名称也将被编译器转换，与编译器为这个匿名命名空间生成的唯一内部名称(即这里的__UNIQUE_NAME_)绑定在一起。还有一点很重要，就是这些名称具有internal链接属性，这和声明为static的全局名称的链接属性是相同的，即名称的作用域被限制在当前文件中，无法通过在另外的文件中使用extern声明来进行链接。如果不提倡使用全局static声明一个名称拥有internal链接属性，则匿名命名空间可以作为一种更好的达到相同效果的方法。
 
注意:命名空间都是具有external 连接属性的,只是匿名的命名空间产生的__UNIQUE_NAME__在别的文件中无法得到,这个唯一的名字是不可见的.
 
C++ 新的标准中提倡使用匿名命名空间，而不推荐使用static，因为static用在不同的地方，涵义不同容易造成混淆。比如：带static的类成员为类共享，而变量前的static又表示内部链接、存储范围。

另外，static不能修饰class定义，那样就可以将类定义放在匿名命名空间中达到同样的效果。[^1]

#### References

1. [C++匿名命名空间](http://www.cnblogs.com/youxin/p/4308364.html)