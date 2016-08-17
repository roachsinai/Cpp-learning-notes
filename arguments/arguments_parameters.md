# const形参和实参

> As we’ve seen, a pointer is an object that can point to a different object. As a result,
>
> we can talk independently about whether a pointer is const and whether the objects
>
> to which it can point are const. We use the term top-level const to indicate that the
>
> pointer itself is a const. When a pointer can point to a const object, we refer to
>
> that const as a low-level const.

你看，上面的英文是不是清晰的做出了对所谓顶层const和底层const的解释。说白了顶层const是变量自身是不能改变，而底层const是对于指针来说，指针指向的变量不能被指针修改，以后这个指针也只能赋值给指向常量数据类型的指针（不然就乱套了）。