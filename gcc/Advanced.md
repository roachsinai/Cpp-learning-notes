# Advanced

## view symbols in object files

这个其实在[命名空间与变量符号名]()部分已经介绍。

源文件为：`test.cpp`

那么命令如下：

```
g++ -c test.cpp -o test.o
objdump -t test.o
```

`gcc`命令请看上篇。

进阶：[The ELF Object File Format by Dissection](http://www.linuxjournal.com/article/1060)

## Linux 64位电脑编译32位程序

在学习虚函数表的时候，需要将代码编译成32位运行，假设源文件：`test.cpp`

```
sudo dnf install libstdc++-devel.i686 glibc-devel.i686 // 安装32位库和头文件
g++ -m32 *.cpp                                         // 编译程序->a.out
```

#### References

1. [How to view symbols in object files?](http://stackoverflow.com/questions/3880924/how-to-view-symbols-in-object-files)