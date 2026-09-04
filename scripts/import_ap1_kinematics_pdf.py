from pathlib import Path
import fitz
from PIL import Image, ImageChops, ImageDraw
import json, re

SRC=Path('/Users/mikewang/Desktop/ap-phys1_kinematics-1d-multiple-choice_2026-08-12.pdf')
OUT=Path('public/fma-ap-physics1-kinematics-assets')
OUT.mkdir(parents=True, exist_ok=True)
D=fitz.open(SRC)
SCALE=2.0
# Page coordinates in points. Each question is composed from one or more page segments.
R={
1:[(0,190,340)], 2:[(0,340,480),(0,480,638)], 3:[(0,340,480),(0,630,760)],
4:[(1,70,475)], 5:[(1,380,685)], 6:[(1,680,762),(2,70,205)], 7:[(1,680,762),(2,180,340)],
8:[(2,330,590),(2,590,725)], 9:[(2,330,590),(2,725,755),(3,70,205)], 10:[(3,205,255),(3,250,390,60,330),(3,250,430,350,570)], 11:[(3,205,255),(3,250,430,350,570),(3,405,540,60,330)], 12:[(3,630,755),(4,70,145)],
13:[(4,150,320)],14:[(4,320,490)],15:[(4,490,665)],16:[(4,665,755),(5,70,180)],
17:[(5,180,350)],18:[(5,480,670)],19:[(5,670,755),(6,70,160)],20:[(6,390,560)],
21:[(7,300,535)],22:[(7,545,705)],23:[(8,345,525)],24:[(9,345,515)],25:[(9,520,755)],
26:[(10,70,515)],27:[(10,520,690)],28:[(11,70,290)],29:[(11,290,700)],
30:[(11,700,764),(12,70,390)],31:[(11,700,764),(12,390,700)],32:[(11,700,764),(12,700,755),(13,70,190)],
33:[(13,200,420)],34:[(13,420,610)],35:[(14,70,300)],36:[(14,365,620)],37:[(14,635,755),(15,70,130)],
38:[(15,125,290)],39:[(15,300,470)],40:[(15,480,680)],41:[(16,270,430)],42:[(16,465,680)],43:[(16,680,755),(17,70,190)],
44:[(17,200,385)],45:[(17,650,755),(18,70,140)],46:[(18,425,610)],47:[(19,350,530)],48:[(20,70,500)],
49:[(20,500,755),(21,70,755),(22,60,450)],50:[(22,450,700)],51:[(23,280,450)]
}
ANS='DBAA AADB BCDC DBB BDA BDA C D C B C D B D D C B A D B C B C D B C C D C D D D C D C B A A B B C A D D B C B D C'.split()
# Correct map copied from the source answer key (page 25), with all 51 entries.
ANS={1:'D',2:'B',3:'A',4:'A',5:'A',6:'A',7:'D',8:'B',9:'B',10:'C',11:'D',12:'C',13:'B',14:'D',15:'B',16:'A',17:'B',18:'D',19:'A',20:'D',21:'B',22:'C',23:'C',24:'B',25:'C',26:'B',27:'C',28:'C',29:'D',30:'B',31:'D',32:'D',33:'D',34:'C',35:'D',36:'C',37:'B',38:'A',39:'A',40:'B',41:'B',42:'C',43:'A',44:'D',45:'D',46:'B',47:'C',48:'B',49:'D',50:'C',51:'D'}

def token_bbox(page,n):
    # Prefer the printed `n.` at the left margin; avoid references such as
    # `questions 2 and 3` in a shared context paragraph.
    words=page.get_text('words')
    for w in words:
        x0,y0,x1,y1,word=w[:5]
        if word.strip() == f'{n}.' and x0 < 110:
            return (x0,y0,x1,y1)
    for w in words:
        x0,y0,x1,y1,word=w[:5]
        if word.strip() == str(n) and x0 < 110:
            return (x0,y0,x1,y1)
    return None

def render_seg(page, top, bottom, n, left=0, right=None):
    pix=page.get_pixmap(matrix=fitz.Matrix(SCALE,SCALE), alpha=False)
    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    box=(int(left*SCALE),int(top*SCALE),pix.width if right is None else int(right*SCALE),min(pix.height,int(bottom*SCALE)))
    im=im.crop(box)
    # Mask only the printed source number when it is safely identifiable.
    bb=token_bbox(page,n)
    if bb:
        x0,y0,x1,y1=bb
        if top-3 <= y0 <= bottom+3 and x1 >= left and (right is None or x0 <= right):
            draw=ImageDraw.Draw(im)
            pad=3*SCALE
            draw.rectangle((max(0,int((x0-left)*SCALE-pad)),max(0,int((y0-top)*SCALE-pad)),min(im.width,int((x1-left)*SCALE+pad)),min(im.height,int((y1-top)*SCALE+pad))), fill='white')
    # trim blank margins while retaining a small, intentional white border
    bg=Image.new('RGB',im.size,'white')
    diff=ImageChops.difference(im,bg)
    bbox=diff.getbbox()
    if bbox:
        pad=int(14*SCALE)
        bbox=(max(0,bbox[0]-pad),max(0,bbox[1]-pad),min(im.width,bbox[2]+pad),min(im.height,bbox[3]+pad))
        im=im.crop(bbox)
    return im

def compose(n):
    parts=[]
    for seg in R[n]:
        pi,top,bottom,*xs=seg
        parts.append(render_seg(D[pi],top,bottom,n,*xs))
    w=max(p.width for p in parts)
    gap=int(10*SCALE)
    h=sum(p.height for p in parts)+gap*(len(parts)-1)
    canvas=Image.new('RGB',(w,h),'white'); y=0
    for i,p in enumerate(parts):
        canvas.paste(p,((w-p.width)//2,y)); y+=p.height
        if i<len(parts)-1: y+=gap
    return canvas

for n in range(1,52):
    if n not in R: raise RuntimeError(f'missing range {n}')
    im=compose(n)
    im.save(OUT/f'q{n:02d}.png',optimize=True)
# Record source and crop ranges for auditability.
(OUT/'source-inventory.json').write_text(json.dumps({
  'source_file': SRC.name, 'page_count': len(D), 'question_count': 51,
  'answer_key_page': 25, 'answers': ANS, 'ranges': {str(k):v for k,v in R.items()},
  'image_first': True, 'crop_scale': SCALE
},indent=2),encoding='utf-8')
print(f'generated {len(R)} images in {OUT}')
