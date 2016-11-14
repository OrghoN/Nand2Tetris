Reading Quiz 8
==================

1. **Does Petzold's computer use a 2's complement system or not? Explain your belief.**

 It does use a 2's complement system although it keeps track of the carry bit.
2. **The circuit diagram on p208 uses a counter. Let us assume that this counter is built like the one on p176, and let us also assume that each clock cycle results in the counter incrementing twice. We assume this because the graphs on p176 labeled Clk', Q1, Q2, Q3 seem to correspond with p177's abstraction of the 8-bit ripple counter, labeled Q0, Q1, Q2 (with Clk' being Q0, the least significant bit). If Clk' is wired to Q0, the least significant bit changes twice in one clock cycle (tick,tock). How many times does your PC.hdl increment per clock cycle?**

 1.
3. **On page 209 ¶3, the author states "The first time the clock changes from 0 to 1..." For this paragraph to be true, what must be said about the labeling of the Q outputs on p177?**

 They have to be edge triggered.
4. **How many clock cycles is each instruction cycle for the machine in chapter 17?**

 4.
5. **The RAM in the circuit on page 223 is shown to be routing it's output to three different registers. What's missing for this to really work?**

 Mux.
6. **What would it mean to have the newest, hottest, baddest 128-bit Intel ChocoCore processor? (What does the 128-bit thing mean?)**

 It means that the processor works with a 128 bit bus.
8. **What is another name for the 8-bit latches in this chapter? (Hint: you've built it)**
 Register
9. **Explain the difference between the ALU you built, and the "ALU" described by Petzold.**

 The alu by him doesn't do logical operations and doesn't have as many control bits.
