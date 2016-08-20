# 成员函数

## 成员函数后const

表示这个成员函数只是来**读取**成员变量的值，若**试图修改**编译器会按错误处理。

## 传递成员函数

今天，写一个类的时候用到了标准库的sort，当然用到了比较函数。而我用的比较函数是一个类的**非静态**成员函数 `vs2012` 报了如下错误：

> trend_order.cpp(521): error C3867: “TrendOrder(类)::comp_trend_score(成员函数)”: 函数调用缺少参数列表；请使用“&TrendOrder::comp_trend_score”创建指向成员的指针
>
> trend_order.cpp(521): error C2780: “void std::sort(_RanIt,_RanIt)”: 应输入 2 个参数，却提供了 3 个
>
> D:\Microsoft\Microsoft Visual Studio 11.0\VC\include\algorithm(3699) : 参见“std::sort”的声明

这就在于**类静态函数**、**普通函数**、**类成员函数**的区别，主要是类成员函数有隐含的this指针，也就是说上面的错误是比较函数应该提供两个参数，确提供了3个。而一种修改方法是，将成员函数改为静态成员函数；另一种是成员函数改为普通函数。再一个说一下自认为静态成员函数和成员函数的另一个区别就是静态成员函数可以直接类名调用，再没有因为其他功能本人目前水平认为成员函数不能胜任。

另外，成员函数指针和一般函数指针也有明显区别，比如成员函数指针需要绑定对象。

```
int func(int x);
the type is "int (*)(int)" // since it is an ordinary function

int MyArray::f2(int x);
the type is "int (MyArray::*)(int)" // since it is a non-static member function of class MyArray
```

如果想输出变量的**类型**，可以包含头文件 `<typeinfo>`，

```
cout << typeid(func).name() << endl;
```

## 输出成员函数地址

```
class Base
{ 
public:
	static int a;
    static void Fun(){}
    void Fun1(){}
    virtual void Test(){}
}; 
int Base::a=1000; 

class Derived:public Base
{ 
}; 

int main(void) 
{

    Base b;

    printf("%p\n", &Base::Fun); // 3 same
    printf("%p\n", Base::Fun);
    printf("%p\n", Derived::Fun);

    void (Base::*ptr)() = &Base::Fun1; // get Fun1 address
    printf("%p\n", ptr);

    printf("%p\n", *(int*)(*(int*)&b)); // virtual function

    return 0; 
}
```