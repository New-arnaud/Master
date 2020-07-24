;
; CPUDATE - Displays the date of the BIOS ROM chip.
;
code    segment
org     100h
Begin:
        mov     ax,0FFFFh
        mov     ds,ax
        mov     dx,5
        mov     bx,1            ;file handle 1
        mov     cx,8            ;8 character
        mov     ah,040h         ;function 40h - write to file handle
        int     21h             ;call DOS services
        int     20h             ;exit to DOS

code    ends
end     Begin
