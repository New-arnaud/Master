BEGIN

data SEGMENT RW dw 1000 dup(?)
DATA ENDS

stack stackseg 800
CODE SEGMENT ER use 32 PUBLIC

main:
 nop
 nop
 nop
 CODE ENDS
  
 END main, ds:data, ss:stack 