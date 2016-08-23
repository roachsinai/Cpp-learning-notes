# 数组

#### 不仅数组里面的元素是某类型，**数组就是一种类型**

{%ace edit=true, lang='c_cpp'%}
#include<iostream>
#include<typeinfo>

using namespace std;

int main()
{
    char arr[] = "abcd";
    cout << typeid(arr).name() << endl; // output: A5_c
    cout << sizeof(arr) << endl;        // output: 5

    return 0;
}
{%endace%}

这里`arr`就是一个可以放`5`个字符的数组，而`char (*p)[5]`则`p`是一个指向和`arr`同类型的指针。

#### 数组变量退化为指针

除了以下`3`种情况，数组变量都会退化为一个指向首元素的指针:[^1]

- `sizeof(arr)`
- `&arr`
- 使用`"abcd"`来初始化`arr`时;

{%ace edit=true, lang='c_cpp'%}
int main()
{
    char arr[] = "abcd";
    cout << typeid(arr).name() << endl;     // output: A5_c
    cout << sizeof(&arr) << endl;           // output: PA5_c

    cout << typeid(&arr[0]).name() << endl; // output: Pc, pointer to char

    cout << (int) (&arr) << endl;           // 2752195
    cout << (int) (&arr+1) << endl;         // 2752200 & 运算符优先级高于 +
    cout << (int) (&arr[0]+1) << endl;      // 2752196 这个步长较短

    return 0;
}

{%endace%}

#### 二级指针和二级数组

从下面程序可以发现，`**`和`[][]`通过`*ii_a`可以得到数组第一行的结果，但是使用`**ii_a`就不正确了,而`arr[1]`得到的还是地址。

{%ace edit=true, lang='c_cpp'%}
int main()
{
    int arr[][3] = { {1,2,3},{4,5,6} };
	int** ii_a = (int**)arr;
    
    cout << typeid(arr).name() << endl; // A2_A3_i
    cout << typeid(ii_a).name() << endl;// PPi

	cout << arr << endl;       // 0xffec6d6c
	cout << &arr << endl;      // 0xffec6d6c
    cout << arr[1] << endl;    // 0xffe2d048
    
    cout << *ii_a << endl;              // 1 Pi
	cout << (int)ii_a[1] << endl;       // 2
	cout << *arr[1] << endl;            // 4
	cout << **ii_a << endl;    // error: access memory 1
    
    return 0;
}
{%endace%}

#### References

1. [数组与指针---都是"退化"惹的祸](http://www.chinaunix.net/old_jh/23/1031622.html)
2. [剑指offer 面试题33]()