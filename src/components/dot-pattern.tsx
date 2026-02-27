"use client"

import { useRef, useEffect, useState } from "react"

export function DotPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    resizeObserver.observe(parent)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const spacing = 10 // 点间距
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // 椭圆拱形参数
    const radiusX = dimensions.width * 0.5  // 椭圆横向半径
    const radiusY = dimensions.height * 0.4 // 椭圆纵向高度

    // 生成粒子，每个点有独立的闪烁相位和速度
    const points: { x: number; y: number; phase: number; speed: number }[] = []
    for (let x = 0; x < dimensions.width; x += spacing) {
      for (let y = 0; y < dimensions.height; y += spacing) {
        points.push({
          x,
          y,
          phase: Math.random() * Math.PI * 2,  // 随机相位
          speed: 2 + Math.random() * 4,        // 随机闪烁速度
        })
      }
    }

    let animationFrameId: number

    const draw = (time: number) => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      for (const point of points) {
        // 椭圆拱形：中间高、两侧低（使用椭圆方程）
        const dx = (point.x - centerX) / radiusX
        const dy = (point.y - centerY) / radiusY
        const ellipseFalloff = Math.max(0, 1 - dx * dx - dy * dy)
        const shapeFalloff = Math.pow(ellipseFalloff, 1.5) // 平滑边缘

        // 每个点独立随机闪烁 (x 和 y 方向亮度随机变化)
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.001 * point.speed + point.phase))

        const opacity = Math.max(0, shapeFalloff * twinkle)

        if (opacity <= 0.02) continue

        // 蓝色粒子
        // ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.fillStyle = `rgba(147, 197, 253, ${opacity})`
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = window.requestAnimationFrame(draw)
    }

    animationFrameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
