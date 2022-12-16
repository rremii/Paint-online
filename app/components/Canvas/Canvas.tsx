import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"

const Canvas: FC = () => {
  const { width, height } = useResize()

  const canvasRef = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    ctx?.beginPath()
    ctx?.moveTo(100, 100)
    ctx?.lineTo(110, 110)
    ctx?.stroke()
    // ctx.fillStyle = "blue"
    // ctx.scale(2, 1)
  })

  return (
    <CanvasWrapper className="canvas__wrapper">
      <canvas width={width} height={height} ref={canvasRef} />
    </CanvasWrapper>
  )
}
export default Canvas
const CanvasWrapper = styled.main`
  height: 100%;
  width: 100%;
  position: relative;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`
