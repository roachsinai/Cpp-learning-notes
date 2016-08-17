# 传递字符串

Any functions into which you pass string literals `"I am a string literal"` should use `char const *` as the type instead of `char*`[^1].

## References

1. [How to get rid of `deprecated conversion from string constant to ‘char*’` warnings in GCC?](http://stackoverflow.com/questions/59670/how-to-get-rid-of-deprecated-conversion-from-string-constant-to-char-warnin/16867229#16867229)