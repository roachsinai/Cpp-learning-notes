# 声明和定义

全局变量是整个可运行程序可见，也就是说如果程序有多个源文件（编译后有多个目标文件），那么在这些文件中的全局变量是不可以重名的。

声明仅仅是将一个符号引入到一个作用域。而定义提供了一个实体在程序中的唯一描述。

#### 声明

声明的时候确定了变量的存储区（静态、全局等）。

声明给`indentifier`名字可以让编译器顺利完成编译。比如你只要声明函数原型，虽然没有定义编译器是可以编译的。

```
extern int bar;
extern int g(int, int);
double f(int, double); // extern can be omitted for function declarations
class foo; // no extern allowed for type declarations
```

#### 定义

则是让连接器顺利完成任务，完成`obj`文件的链接。

```
int bar;
int g(int lhs, int rhs) {return lhs*rhs;}
double f(int i, double d) {return i+d;}
class foo {};
```

注意，在类的定义中是不可以重复申明一个成员函数的：

```
class A
{
public:
    int foo();
    int foo();
};
```

编译的时候发生函数`foo`无法被重载错误，因为编译器在编译生成`foo`变量名之后，有产生了相同的名字就报错。正常是不会发生这个错误的，有可能是拼写错误，所以编译器不能默认处理。

这和重复声明非成员函数是不同的，其具有外连性质，是一个引入作用域的操作。而类的定义是内连性质！

#### References

1. [What is the difference between a definition and a declaration?](http://stackoverflow.com/questions/1410563/what-is-the-difference-between-a-definition-and-a-declaration)