# qualified-id 什么意思？

来来，学习英语的时间到了！^_^

#### 欧陆词典

> qualified: 有资格的、合格的、胜任的；有限制的、不完全的；
> modified, limited, or restricted in some way: qualified approval.

词组：`well-qualified`博览群书的,`qualified candidate`合格候选人,`qualified expression`限定表达式,`qualified majority`特定多数`,`qualified opinion`附条件意见书、保留意见书；

绝不是zhuangbi，只是先表达在中文翻译没有解答疑惑的时候，就应该捡起英语了。

#### qualified-id

这里`qualified`就表示受限的意思，`qualified-id`自然表示受限制的标识符。那么有没有不受限的呢？非受限标识符2333

这里的受限是指的什么呢？作用域，受作用域或命名空间限制。

如下模式就是`qualified-id`:`[name]::[name::[name::]]id`，也就是说标识符的作用域受它们限制的是受限标识符。

`unqualified-id`自然是光光滑滑的啥也不能有。

#### nested-name-specifier

`qualified-id`中`name`出现了就有`nested-name-specifier`。

#### 小结

拿`stack overflow`上的一个回答作为总结[^1]：

`::S` is a qualified-id.

In the qualified-id `::S::f`, `S::` is a *nested-name-specifier*.

In informal terms1, a *nested-name-specifier* is the part of the id that

- begins either at the very beginning of a *qualified-id* or after the initial scope resolution operator (`::`) if one appears at the very beginning of the id and
- ends with the last scope resolution operator in the *qualified-id*.

Very informally[^2], an *id* is either a *qualified-id* or an *unqualified-id*. If the *id* is a *qualified-id*, it is actually composed of two parts: a *nested-name specifier* followed by an *unqualified-id*.

Given:
```
struct  A {
    struct B {
        void F();
    };
};
```

- `A` is an *unqualified-id*.
- `::A` is a *qualified-id* but has no *nested-name-specifier*.
- `A::B` is a *qualified-id* and `A::` is a *nested-name-specifier*.
- `::A::B` is a *qualified-id* and `A::` is a *nested-name-specifier*.
- `A::B::F` is a *qualified-id* and both `B::` and `A::B::` are *nested-name-specifiers*.
- `::A::B::F` is a *qualified-id* and both `B::` and `A::B::` are *nested-name-specifiers*.

[1] This is quite an inexact description. It's hard to describe a grammar in plain English...

> 类似的栗子比如：正则化。

#### References:

1. [What is a nested name specifier?](http://stackoverflow.com/questions/4103756/what-is-a-nested-name-specifier)