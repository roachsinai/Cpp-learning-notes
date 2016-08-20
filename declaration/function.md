# 函数

#### 为什么不能通过返回值重载函数？

```
void foo(){}
    
int foo(){return 0}

int main()
{
    foo();
}
```

因为这样的化`mian`函数中，编译器不知道要调用哪个函数。

假如，`void foo`编译后名字为`_foo`，`int foo`编译后名字为`i_foo`；但是，`main`函数中`foo`编译器并不知道该编译成什么名字。