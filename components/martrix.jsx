"use client"
import React, { use } from 'react'


class Effect = {
    con
}


export default function Martrix() {
    const canvasSizeRef = useRef()
    const canvasRef = useRef()
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width  = canvasSizeRef.current.width
        canvas.height = canvasSizeRef.current.height
    },
    [])
  return (
    <div className='container h-full' ref={canvasSizeRef}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
