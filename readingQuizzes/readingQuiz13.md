Reading Quiz 13
================

1. **For a digital computer, what determines the the number of discrete values you can represent?**

 The number of discrete values you can represent is directly related to the number of bits you have available. For example, if you choose to store positive integers using 32 bits, the values that you can store are the whole numbers from 0 through 4,294,967,295.
2. **What are some drawbacks to using fixed-point numbers?**

 Drawbacks are that it can't handle numbers that are very large or very small well.
3. **In a 32-bit system, what is the meaning of the bits when using the IEEE single-precision floating point standard?**

  It is broken into 3 parts; a 1-bit sign (0 for positive and 1 for negative), an 8-bit exponent, and a 23-bit significand fraction
4. **When using single-precision floating point numbers, explain why a program might yield 3.499999999999 instead of 3.50.**

 Because single-precision floating-point number is accurate to 1 part in 2^24. As such, it won't round the number.
5. **What is an FPU and what does it do?**

 FPU stands for floating point unit and it is what handles floating point arithmetic at the hardware level.
