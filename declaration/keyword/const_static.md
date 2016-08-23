# const and static

个人感觉这个很重要！

{%ace edit=true, lang='c_cpp'%}
#include "iostream"
using namespace std;

class A
{
private:
	static int m_i; // 声明
	static const int p = 1; // 定义 确定变量的内存、名称
};

int A::m_i = 1; // 定义

class B
{
private:
	const int m_i;
	static const int p;
};

const int B::p = 1;

int main(int argc, char const *argv[])
{
    extern int a; // 声明 将某个变量引入当前作用域
    extern int a; // 可以重复

    return 0;
}
{%endace%}

上面的代码可以正确执行。可以发现虽然成员变量在 A 中是私有变量，但是允许在类外直接定义（不然也没有其他方法），而类内对于 m_i 只是一个声明。A 的成员变量 p 则可以定义初始化，区别就在于 p 定义为 const 变量， 如果允许 m_i 在类中定义会出现如下问题：已经定义了 A 的一个实例，并且该实例对 m_i 进行了修改，但是这个修改被重新定义的 A 的另一个实例抹除了。类 B 的定义表明类的 const 静态成员也可以在类定义之外进行初始化。而 B 类中的常量成员则需要通过构造函数进行列表初始化。

**但是在实际应用中，这些初始化操作都需要在 .cpp 中实现，不然其他文件包含了头文件之后会发生错误。**

另外，没有发现const与static的不同呢！类静态变量，类外定义的时候不能写static，而如果声明的时候加了const则定义的时候const又不可缺少。因为static是存储说明符，就是说已经声明了是一个static变量，已经知道要放在静态存储区，那么定义的时候直接去静态存储去赋值就可以了。而 const 是编译器对编译符号附加的一个属性表示只读，跟类型是结合在一起的 就是说 const int 和 int 是不同的类型，不然去掉const表明下面遇到B::p时，p都是可变的了。

## static

类的静态成员在对象实例化之前已经分配空间。

类的静态成员函数无法调用非静态成员（函数和变量），只能访问静态成员变量或做其他处理工作。因为，类静态方法中没有指向调用该方法的对象的指针，无法访问该对象的成员。