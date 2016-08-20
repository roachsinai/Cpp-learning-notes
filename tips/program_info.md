# 获取程序信息

## 输出变量、函数类型

包含头文件`typeinfo`，假设函数名字为`func`，使用如下命令：

`cout << typeid(func).name() << endl;`

其中`typeid`是运算法，`name`是方法。