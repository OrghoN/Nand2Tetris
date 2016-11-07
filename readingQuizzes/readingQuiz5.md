# Reading Quiz 5

1. **How many bits are needed to properly store the sum of two 32-bit numbers?**

  33 bits, assuming we want to keep track of the carry bit.

2. **Solve the following binary addition problems; provide your answer in base-2 and base-10.**

```
  1000 1010      1010 1010      1111 1111      0001 1000
+ 1110 1001    + 0101 0101    + 1000 0001    + 1011 1101
  _________      _________      _________      _________
  101110011      011111111      110000000      011010101
      |              |              |              |       
     371            255            384            213
```

3. **In your own words, explain why a half-adder is called a half-adder.**

  Because it can only do half of the problem and while it is fine for adding single bit binary numbers, anything beyond that requires more the addition of 3 bits which a half adder can't do.

4. **What are the three steps for subtracting two numbers without borrowing? (assume minuend > subtrahend)**

  First subtract the subtrahend from a string of 9's the same length as the subtrahend in number of digits to get the 9's complement. Add the 9's complement of the subtrahend to the minuend. Add 1 and subtract 1 followed by the relevant number of zeros to be the same number of digits (e.g. 1000 for 4 digits).

5. **Distill a simple formula for subtracting without borrowing (hint: pages 144/145). Solve the following base-10 subtraction problem using that formula, showing your work: 2014 - 1976.**

  minuend + (9999 - subtrahend) + 1 - 10000

  (2014) + (9999 - 1976) +1 - 10000

  = (2014) + 8023 + 1 - 10000

  = 38

6. **What is a simple way to get the one's complement of any binary number? (hint: doesn't require math)**

 Flip all the bits.

7. **Solve the following binary subtraction problems, showing the use of one's complements. Show each of the three steps of your work.**

```
  1010 1010      1111 1111      0000 1000      1000 1010      0001 1000
- 0101 0101    - 1000 0001    - 0000 0100    - 1110 1001    - 1011 1101
  _________      _________      _________      _________      _________
  001010101      001111110      000000100      101011110      110100100


  STEP 1:     

  1111 1111      1111 1111      1111 1111      1111 1111      1111 1111
- 0101 0101    - 1000 0001    - 0000 0100    - 1110 1001    - 1011 1101
  _________      _________      _________      _________      _________
  1010 1010      0111 1110      1111 1011      0001 0110      0100 0010

  STEP 2:

  1010 1010      1111 1111      0000 1000      1000 1010      0001 1000
+ 1010 1010    + 0111 1110    + 1111 1011    + 0001 0110    + 0100 0010
  _________      _________      _________      _________      _________
  101010100      101111101      100000011      010100000      001011010

  STEP 3:

  101010100      101111101      100000011      010100000      001011010
+         1    +         1    +         1    +         1     +        1
  _________      _________      _________      _________      _________
  101010101      101111110      100000100      010100001      001011011

  101010101      101111110      100000100      111111111      111111111
- 100000000    - 100000000    - 100000000    - 010100001    - 001011011
  _________      _________      _________      _________      _________
  001010101      001111110      000000100      101011110      110100100
```

8. **Using the adder diagram at the bottom of page 150, convince yourself that it works with the following problems. Note that this machine does not properly display negative numbers (p151 ¶3). Show your work by writing the numbers as they change through the circuitry, and show the use of the SUB switch/bit.**

```
0000 1000 + 0000 0100      1111 1111 + 1000 0001      0000 1000 - 0000 0100     0000 0100 - 0000 1000
```

9. **The three steps in \#2 above can be distilled into a simple rule when using ten's or two's complement to subtract two numbers (aka adding a negative number). "To subtract two decimal numbers, simply ______ the _____'s complement of the __________ to the _____________."  Hence, 65 - 138 ==> 65 + (-138) ==> 65 + ______ = ______ (or -___).**

 "To subtract two decimal numbers, simply **add** the **10's**'s complement of the **subtrahend** to the **minuend**."  Hence, 65 - 138 ==> 65 + (-138) ==> 65 + **(999-138+1)** = **927** (or -**73**).

10. **What's the easy way to figure out the two's complement of a binary number?**

 Keep the rightmost 1 and all trailing zeros and flip the rest of the bits.
