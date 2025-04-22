"use client"
import { useEffect,useRef } from 'react'


class Symbol {
    constructor(x,y,fontSize,canvasHeigth) {
        this.characters = "{}[]()1234567890ABCDEFG"
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text ='';
        this.canvasHeigth = canvasHeigth;
    }
    draw(ctx){
        this.text = this.characters.charAt(Math.floor(Math.random()* this.characters.length))
        ctx.fillStyle = '#0aff0a';
        // text, x ,y
        ctx.fillText(this.text,this.x * this.fontSize,this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeigth){
            this.y = 0;
        }else{
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth,canvasHeigth){
        this.canvasWidth = canvasWidth
        this.canvasHeigth = canvasHeigth
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = []
        this.init();
        console.log(this.symbols)
    }
    init(){
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeigth);
        }
    }
}


export default function Martrix() {
    const canvasSizeRef = useRef()
    const canvasRef = useRef()
    let animationFrameId
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width  = canvasSizeRef.current.width
        canvas.height = canvasSizeRef.current.height
        const effect = new Effect(canvas.width,canvas.height)

        const animate = () => {
            ctx.font = effect.fontSize +  "px monospace"
            effect.symbols.forEach(symbols => symbols.draw(ctx))
            animationFrameId = window.requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    },
    [])
    
  return (
    <div className='container h-full' ref={canvasSizeRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
