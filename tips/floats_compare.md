# 浮点数比较

由于浮点数是对实数的近似表现，就会出现认为两个浮点数相同，但直接使用 == 判断结果不相同的情况。栗子[^1]：

{%ace edit=true, lang='c_cpp'%}
#include <iostream>
#include <iomanip> // for std::setprecision()

int main()
{
    std::cout << std::setprecision(17);

    double d1(1.0);
    std::cout << d1 << std::endl; // 1

    double d2(0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1); // should equal 1.0
    std::cout << d2 << std::endl; // 0.99999999999999989
}
{%endace%}

判断方法：

{%ace edit=true, lang='c_cpp'%}
#include <iostream>
#include <cmath>

#include <cfloat>
// #define FLT_EPSILON   1.19209290E-07F
// #define LDBL_EPSILON  1.084202172485504E-19

int main(int argc, char const *argv[])
{
    double d1(1.0);
    double d2(0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1);

    bool b;
    if ( abs(a-b) < FLT_EPSILON )
        b = true;
    else
        b = false;

    return 0;
}
{%endace%}

## References

1. [http://www.learncpp.com/cpp-tutorial/25-floating-point-numbers/](http://www.learncpp.com/cpp-tutorial/25-floating-point-numbers/)