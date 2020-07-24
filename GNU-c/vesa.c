/****************************************************************************
*
*                               Hello VBE!
*
*
* Language:     C (Keyword far is by definition not ANSI, therefore
*                  to make it true ANSI remove all far references and
*                  compile under MEDIUM model.)
*
* Environment:  IBM PC (MSDOS) 16 bit Real Mode
* Original code contributed by: Kendall Bennett, SciTech Software
* Conversion to Microsoft C by: Rex Wolfe, Western Digital Imaging
* George Bystricky, S-MOS Systems
*
* Description:  Simple 'Hello World' program to initialize a user
*               specified 256 color graphics mode, and display a simple
*               moire pattern. Tested with VBE 1.2 and above.
*
*               This code does not have any hard-coded VBE mode numbers,
*               but will use the VBE 2.0 aware method of searching for
*               available video modes, so will work with any new extended
*               video modes defined by a particular OEM VBE 2.0 version.
*
*               For brevity we don't check for failure conditions returned
*               by the VBE (but we shouldn't get any).
*
****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <dos.h>
#include <conio.h>

/* Comment out the following #define to disable direct bank switching.
   The code will then use Int 10h software interrupt method for banking. */

#define  DIRECT_BANKING
#ifdef  DIRECT_BANKING

/* only needed to setup registers BX,DX prior to the direct call.. */

extern far setbxdx(int, int);
#endif

/*---------------------- Macro and type definitions -----------------------*/
/* SuperVGA information block */

struct
{
    char    VESASignature[4];       /* 'VESA' 4 byte signature          */
    short   VESAVersion;            /* VBE version number               */
    char    far *OEMStringPtr;      /* Pointer to OEM string            */
    long    Capabilities;           /* Capabilities of video card       */
    unsigned far *VideoModePtr;     /* Pointer to supported modes       */
    short   TotalMemory;            /* Number of 64kb memory blocks     */
    char    reserved[236];          /* Pad to 256 byte block size       */
} VbeInfoBlock;

/* SuperVGA mode information block */

struct
{
    unsigned short ModeAttributes;      /* Mode attributes                 */
    unsigned char  WinAAttributes;      /* Window A attributes             */
    unsigned char  WinBAttributes;      /* Window B attributes             */
    unsigned short WinGranularity;      /* Window granularity in k         */
    unsigned short WinSize;             /* Window size in k                */
    unsigned short WinASegment;         /* Window A segment                */
    unsigned short WinBSegment;         /* Window B segment                */
    void (far *WinFuncPtr)(void);       /* Pointer to window function      */
    unsigned short BytesPerScanLine;    /* Bytes per scanline              */
    unsigned short XResolution;         /* Horizontal resolution           */
    unsigned short YResolution;         /* Vertical resolution             */
    unsigned char  XCharSize;           /* Character cell width            */
    unsigned char  YCharSize;           /* Character cell height           */
    unsigned char  NumberOfPlanes;      /* Number of memory planes         */
    unsigned char  BitsPerPixel;        /* Bits per pixel                  */
    unsigned char  NumberOfBanks;       /* Number of CGA style banks       */
    unsigned char  MemoryModel;         /* Memory model type               */
    unsigned char  BankSize;            /* Size of CGA style banks         */
    unsigned char  NumberOfImagePages;  /* Number of images pages          */
    unsigned char  res1;                /* Reserved                        */
    unsigned char  RedMaskSize;         /* Size of direct color red mask   */
    unsigned char  RedFieldPosition;    /* Bit posn of lsb of red mask     */
    unsigned char  GreenMaskSize;       /* Size of direct color green mask */
    unsigned char  GreenFieldPosition;  /* Bit posn of lsb of green mask   */
    unsigned char  BlueMaskSize;        /* Size of direct color blue mask  */
    unsigned char  BlueFieldPosition;   /* Bit posn of lsb of blue mask    */
    unsigned char  RsvdMaskSize;        /* Size of direct color res mask   */
    unsigned char  RsvdFieldPosition;   /* Bit posn of lsb of res mask     */
    unsigned char  DirectColorModeInfo; /* Direct color mode attributes    */
    unsigned char  res2[216];           /* Pad to 256 byte block size      */
} ModeInfoBlock;
typedef enum
{
    memPL       = 3,                /* Planar memory model              */
    memPK       = 4,                /* Packed pixel memory model        */
    memRGB      = 6,                /* Direct color RGB memory model    */
    memYUV      = 7,                /* Direct color YUV memory model    */
} memModels;

/*--------------------------- Global Variables ----------------------------*/

char mystr[256];
char *get_str();
int     xres,yres;                  /* Resolution of video mode used    */
int     bytesperline;               /* Logical CRT scanline length      */
int     curBank;                    /* Current read/write bank          */
unsigned int bankShift;             /* Bank granularity adjust factor   */
int     oldMode;                    /* Old video mode number            */
char    far *screenPtr;             /* Pointer to start of video memory */
void    (far *bankSwitch)(void);    /* Direct bank switching function   */

/*------------------------ VBE Interface Functions ------------------------*/
/* Get SuperVGA information, returning true if VBE found */

int getVbeInfo()
{
    union REGS in,out;
    struct SREGS segs;
    char far *VbeInfo = (char far *)&VbeInfoBlock;
    in.x.ax = 0x4F00;
    in.x.di = FP_OFF(VbeInfo);
    segs.es = FP_SEG(VbeInfo);
    int86x(0x10, &in, &out, &segs);
    return (out.x.ax == 0x4F);
}

/* Get video mode information given a VBE mode number. We return 0 if
   if the mode is not available, or if it is not a 256 color packed
   pixel mode. */

int getModeInfo(int mode)
{
    union REGS in,out;
    struct SREGS segs;
    char far *modeInfo = (char far *)&ModeInfoBlock;
    if (mode < 0x100) return 0;     /* Ignore non-VBE modes             */
    in.x.ax = 0x4F01;
    in.x.cx = mode;
    in.x.di = FP_OFF(modeInfo);
    segs.es = FP_SEG(modeInfo);
    int86x(0x10, &in, &out, &segs);
    if (out.x.ax != 0x4F) return 0;
    if ((ModeInfoBlock.ModeAttributes & 0x1)
            && ModeInfoBlock.MemoryModel == memPK
            && ModeInfoBlock.BitsPerPixel == 8
            && ModeInfoBlock.NumberOfPlanes == 1)
        return 1;
    return 0;
}

/* Set a VBE video mode */

    {
        if (getModeInfo(*p))
        {
            printf("    %4d x %4d %d bits per pixel\n",
                ModeInfoBlock.XResolution, ModeInfoBlock.YResolution,
                ModeInfoBlock.BitsPerPixel);
        }
    }
    printf("Usage: hellovbe <xres> <yres>\n");
    exit(1);
}

/* Initialize the specified video mode. Notice how we determine a shift
   factor for adjusting the Window granularity for bank switching. This
   is much faster than doing it with a multiply (especially with direct
   banking enabled). */

void initGraphics(unsigned int x, unsigned int y)
{
    unsigned far    *p;
    if (!getVbeInfo())
    {
        printf("No VESA VBE detected\n");
        exit(1);
    }
    for (p = VbeInfoBlock.VideoModePtr; *p != (unsigned)-1; p++)
    {
        if (getModeInfo(*p) && ModeInfoBlock.XResolution == x
                && ModeInfoBlock.YResolution == y)
        {
           xres = x;   yres = y;
           bytesperline = ModeInfoBlock.BytesPerScanLine;
           bankShift = 0;
           while ((unsigned)(64 >> bankShift) != ModeInfoBlock.WinGranularity)
               bankShift++;
           bankSwitch = ModeInfoBlock.WinFuncPtr;
           curBank = -1;
           screenPtr = (char far *)( ((long)0xA000)<<16 | 0);
           oldMode = getVBEMode();
           setVBEMode(*p);
           return;
        }
    }
    printf("Valid video mode not found\n");
    exit(1);
}

/* Main routine. Expects the x & y resolution of the desired video mode
 * to be passed on the command line. Will print out a list of available
 * video modes if no command line is present.
 */

void main(int argc,char *argv[])
{
    int x,y;
    if (argc != 3)
        availableModes();       /* Display list of available modes      */
    x = atoi(argv[1]);          /* Get requested resolution             */
    y = atoi(argv[2]);
    initGraphics(x,y);          /* Start requested video mode           */
    drawMoire();                /* Draw a moire pattern                 */
    getch();                    /* Wait for keypress                    */
    setVBEMode(oldMode);        /* Restore previous mode                */
}

/*----------------------------------------------------------------------*/
/* The following commented-out routines are for Planar modes            */
/* outpw() is for word output, outp() is for byte output                */
/*----------------------------------------------------------------------*/
/* Initialize Planar (Write mode 2)
 * Should be Called from initGraphics

void initPlanar()
{
   outpw(0x3C4,0x0F02);
   outpw(0x3CE,0x0003);
   outpw(0x3CE,0x0205);
}

*/

/* Reset to Write Mode 0
 * for BIOS default draw text

void setWriteMode0()
{
   outpw(0x3CE,0xFF08);
   outpw(0x3CE,0x0005);
}
*/

/* Plot a pixel in Planar mode
void putPixelP(int x, int y, int color)
{
    char dummy_read;
    long addr = (long)y * bytesperline + (x/8);
    setBank((int)(addr >> 16));
    outp(0x3CE,8);
    outp(0x3CF,0x80 >> (x & 7));
    dummy_read = *(screenPtr + (addr & 0xFFFF));
    *(screenPtr + (addr & 0xFFFF)) = (char)color;
}
*/
Assembly Language Module
Below is the Assembly Language module required for the direct bank switching.  In Borland C or
other C compilers, this can be converted to in-line assembly code.

public _setbxdx
.MODEL SMALL            ;whatever
.CODE
set_struc       struc
        dw      ?       ;old bp
        dd      ?       ;return addr (always far call)
p_bx    dw      ?       ;reg bx value
p_dx    dw      ?       ;reg dx value
set_struc       ends
_setbxdx        proc far     ; must be FAR
        push    bp
        mov     bp,sp
        mov     bx,[bp]+p_bx
        mov     dx,[bp]+p_dx
        pop     bp
        ret
_setbxdx        endp
END
*/