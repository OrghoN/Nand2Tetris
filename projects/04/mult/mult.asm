// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
//<0
@R2 //set output to 0
M=0
(START) //begin loop
@R1
M=M-1  // R1=R1-1
D=M
@END
D;JLT //End Loop if R1<0
@R0
D=M    // D=R0
@R2
M=D+M //R2=R2+R0
@START
0;JMP //Go back to beginning of loop
(END)
@END
0;JMP  // Infinite loop
