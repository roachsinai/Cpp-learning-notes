# sort

#### qsort compare function

`compare` 函数的参数是欲比较的两个元素的地址，那么如果有一个`char** strNumbers`，它指向`10`个一级指针，每个一级指针指向以字符串形式保存的数字[^1]。那么：

```
// int型整数用十进制表示最多只有10位
const int g_MaxNumberLength = 10;

char* g_StrCombine1 = new char[g_MaxNumberLength * 2 + 1];
char* g_StrCombine2 = new char[g_MaxNumberLength * 2 + 1];

int compare(const void* strNumber1, const void* strNumber2)
{
    // 拼接[strNumber1][strNumber2]
    // [123][78] -> [12378]
    strcpy(g_StrCombine1, *(const char**)strNumber1);
    strcat(g_StrCombine1, *(const char**)strNumber2);

    // [strNumber2][strNumber1]
    // [78][123] -> [78123]
    strcpy(g_StrCombine2, *(const char**)strNumber2);
    strcat(g_StrCombine2, *(const char**)strNumber1);

    return strcmp(g_StrCombine1, g_StrCombine2);
}

char** strNumbers = (char**)(new int[10]);

... // 给 strNumbers 赋值

qsort(strNumbers, 10, sizeof(char*), compare);
```

上面代码不清楚的就是`*(const char**)`，其实这是写`compare funtion`的套路（用词不当，请见谅）：传入形参类型`const void *a`，函数中强制转换为`*(Mytype*)a`使用。这时上面的`strNumber1`实际是`PPC: char**`.

而我试图写下面的代码：

```
char arr[] = "abcd".
cout << *((const char**)(&arr)) << endl; // 试图访问地址为 a: 97 的内存
```

这里，`&arr`虽然没有退化成指向第一个元素的指针（也不能说是指针，只是得到数组第一个元素的地址），但是还只是一个一级地址只不过是带**类型**（`+1 = +5`，走一步等于走了`5`个字节）,并非**二级地址**。

数组不退化，也只是相对一般指针步子大一点。`arr[]`初始化另算。

#### References

1. [剑指offer 面试题33]()