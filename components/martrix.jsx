"use client";
import { useEffect, useRef, useState } from "react";

class Symbol {
  constructor(ctx, x, y, fontSize, canvasHeigth, canvasWidth) {
    this.ctx = ctx;
    this.characters = "{}[]()MINI HACKATHONBYJWC13";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeigth = canvasHeigth;
    this.canvasWidth = canvasWidth;
  }
  draw() {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    this.ctx.fillStyle = "#7700ff";
    // text, x ,y
    this.ctx.fillText(
      this.text,
      this.x * this.fontSize,
      this.y * this.fontSize
    );
    if (this.y * this.fontSize > this.canvasHeigth * 1.5) {
      this.y = 0;
    }
    this.y += 1;
  }
}

class Effect {
  constructor(ctx, canvasWidth, canvasHeigth) {
    this.ctx = ctx; 
    this.canvasWidth = canvasWidth;
    this.canvasHeigth = canvasHeigth;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.init();
  }
  init() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(
        this.ctx,
        i,
        0,
        this.fontSize,
        this.canvasHeigth,
        this.canvasWidth
      );
    }
  }
}

export default function Martrix() {
  const canvasSizeRef = useRef();
  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  let animationFrameId;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setCtx(ctx);
    const { width, height } = canvasSizeRef.current.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const effect = new Effect(ctx, canvas.width, canvas.height);
    console.log(effect);

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "white");
      gradient.addColorStop(0.5, "#F8F1E7");
      gradient.addColorStop(1, "white");

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = effect.fontSize + "px monospace";
      effect.symbols.forEach((symbols) => symbols.draw());
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 80); // 100ms = ~10fps
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="w-full h-full absolute pointer-events-none "
      ref={canvasSizeRef}
    >
      <canvas ref={canvasRef} className={`duration-200  `}></canvas>
    </div>
  );
}
