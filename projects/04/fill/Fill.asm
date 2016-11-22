// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
//<0
(BLACK) 	   //Fills every pixel when key is pressed
@KBD
D=M
@WHITE
D;JEQ		         //Goes to white loop if Keyboard memory register = 0
@24575		       //last pixel
D=M
@WHITE
D;JLT		         //Goes to white loop if last pixel is filled, so not to exceed register amount
@i
D=M
@SCREEN
D=A+D
A=D
M=-1            //Fills pixels in 16-bit register
@i
M=M+1		       //Increments memory, which starts at zero
@BLACK
0;JMP

(WHITE)	    //Removes every pixel when key is not pressed
@KBD
D=M
@BLACK
D;JGT		       //Jump, Goes to black loop if Keyboard memory register = 1
@i
D=M
@SCREEN
D=A+D		     //Register = @screen + i
A=D
M=0		       //removes all filled pixels in 16-bit register
@i
M=M-1		   //De-increments memory, which if the key has been pressed, has been raised to some number
@WHITE
0;JMP
   
