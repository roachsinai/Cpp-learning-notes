# 单虚继承

虚拟继承和继承的区别就是在语法上，在基类前添加`virtual`关键字

#### 虚拟继承单基类内存布局

代码如下：

```
class B
{
    public:
        int ib;
        char cb;
    public:
        B():ib(0),cb('B') {}
 
        virtual void f() { cout << "B::f()" << endl;}
        virtual void Bf() { cout << "B::Bf()" << endl;}
};
class B1 :  virtual public B
{
    public:
        int ib1;
        char cb1;
    public:
        B1():ib1(11),cb1('1') {}
 
        virtual void f() { cout << "B1::f()" << endl;}
        virtual void f1() { cout << "B1::f1()" << endl;}
        virtual void Bf1() { cout << "B1::Bf1()" << endl;}
 
};

typedef void(*Fun)(void);

int main()
{
    int** pVtab = NULL;
    Fun pFun = NULL;

    B1 bb1;

    pVtab = (int**)&bb1;
    cout << "[0] B1::_vptr->" << endl;
    pFun = (Fun)pVtab[0][0];
    cout << "     [0] ";
    pFun(); //B1::f();
    cout << "     [1] ";
    pFun = (Fun)pVtab[0][1];
    pFun(); //B1::f1();
    cout << "     [2] ";
    pFun = (Fun)pVtab[0][2];
    pFun();
    cout << "     [3] 0x";
    pFun = (Fun)pVtab[0][3];
    cout << pFun << endl;

    cout << "[1] B1::ib1 = ";
    cout << (int)*((int*)(&bb1)+1) <<endl; //B1::ib1
    cout << "[2] B1::cb1 = ";
    cout << (char)*((int*)(&bb1)+2) << endl; //B1::cb1

    cout << "[3] B::_vptr->" << endl;
    // cout << "基类f()地址: " << *(int*)*(int*)((int*)(&bb1)+3) << endl;
    // pFun = (Fun)*(int*)*(int*)((int*)(&bb1)+3);
    // pFun(); //B1::f(); 如果取消注释，运行到这里报error：Segmentation fault (核心已转储)
    pFun = (Fun)pVtab[3][0];
    cout << "     [0] ";
    pFun(); //B1::f();
    pFun = (Fun)pVtab[3][1];
    cout << "     [1] ";
    pFun(); //B::Bf();
    cout << "     [2] ";
    cout << "0x" << (Fun)pVtab[3][2] << endl;
   

    cout << "[4] B::ib = ";
    cout << (int)*((int*)(&bb1)+4) <<endl; //B::ib
    cout << "[5] B::cb = ";
    cout << (char)*((int*)(&bb1)+5) <<endl; //B::cb

    cout << "[6] NULL  = ";
    cout << (int)*((int*)(&bb1)+4) <<endl;

    return 0;
}
```

结果：

```
[0] B1::_vptr->
     [0] B1::f()
     [1] B1::f1()
     [2] B1::Bf1()
     [3] 0x0
[1] B1::ib1 = 11
[2] B1::cb1 = 1
[3] B::_vptr->
     [0] B1::f()
     [1] B::Bf()
     [2] 0x1
[4] B::ib = 0
[5] B::cb = B
[6] NULL  = 0
```

最明显的差别就是这个单继承中多了一个虚函数表，**单继承的情况下虚继承会增加一个基类自己的虚函数表，而非虚继承却没有**.

而两个虚函数表中的，第一虚函数都是子类的虚函数`f()`，好像是正常的（运行时多态嘛）。但是，在上面的代码中，测试了一下`pVtab[0][0]`和`pVtab[3][0]`输出的结果并不一样，也就是存在两个子类的`f()`函数，这特么刚摆好的桌子有木有啊(╯°Д°)╯.

那是不是哪里错了呢，如果取消代码中注释（添加三行代码），确实输出的是同样的东西但是函数地址不一样。并且，我不知道的原因这样程序运行不下去了。

`gcc`不好用看看`微软`怎么是什么情况吧。

ps：本来不想验证非虚继承函数是不是一个函数得，不是的话(╯°Д°)╯。幸好在`gcc 6.1.1`是它们地址是相同的┬─┬ ノ('-'ノ) 

###### visual studio 2013

上来就多出来两个概念：虚函数表指针(_vftptr)、虚基类表指针(_bvtptr)。

但是微软编译器可以直接输出对象完整的内存布局啊，真实不错，有一统江湖的气质！方法：`项目属性->配置属性->C/C++->命令行->其他选项`添加`/d1reportSingleClassLayout[类名]`[^1]。比如这里就是`/d1reportSingleClassLayoutB1`，也可以使用命令：`cl classLayout.cpp /d1reportSingleClassLayoutB1`，会得到下面的输出结果：

```
1>------ 已启动生成: 项目: Vptr, 配置: Debug Win32 ------
1>  main.cpp
1>  class B1	size(32):
1>  	+---
1>   0	| {vfptr}
1>   4	| {vbptr}
1>   8	| ib1
1>  12	| cb1
1>    	| <alignment member> (size=3)
1>  	+---
1>  16	| (vtordisp for vbase B)
1>  	+--- (virtual base B)
1>  20	| {vfptr}
1>  24	| ib
1>  28	| cb
1>    	| <alignment member> (size=3)
1>  	+---
1>  
1>  B1::$vftable@B1@:
1>  	| &B1_meta
1>  	|  0
1>   0	| &B1::f1
1>   1	| &B1::Bf1
1>  
1>  B1::$vbtable@:
1>   0	| -4
1>   1	| 16 (B1d(B1+4)B)
1>  
1>  B1::$vftable@B@:
1>  	| -20
1>   0	| &(vtordisp) B1::f
1>   1	| &B::Bf
1>  
1>  B1::f this adjustor: 20
1>  B1::f1 this adjustor: 0
1>  B1::Bf1 this adjustor: 0
1>  
1>  vbi:	   class  offset o.vbptr  o.vbte fVtorDisp
1>                 B      20       4       4 1
1>  
1>  
1>  Vptr.vcxproj -> D:\Code_Inc\VS2012\Test\Vptr\Vptr\Debug\Vptr.exe
```

我们看到`B1 vftable`中却没有它的虚函数`f()`。所以编译器都好任性~~ 不过微软这个布局输出真心赞，不用再自己猜想了T_T.

虽然不完美，**但是，我们看到虚继承类似于将虚基类的成员（虚函数和变量）放在一起，子类的放在了一起**。

有些话需要多次引用，

> Lippman说，如果一个虚基类派生自另一虚基类，而且它们都支持虚函数和非静态数据成员的时候，编译器对虚基类的支持就像迷宫一样复杂。

#### 强烈安利

[《深度探索C++对象模型》](https://book.douban.com/subject/1091086/)，不过我一点没看呢，不过好像非常值得看。ps：评论里有一句，看了之后也不用跟着写几行代码，顶多一把一把的薅头发，反正不费电！

#### References:

1. [c++对象内存模型【内存布局】](http://www.cnblogs.com/kekec/archive/2013/01/27/2822872.html)