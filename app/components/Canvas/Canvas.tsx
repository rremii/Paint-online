import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useIsDraw from "../../hooks/useIsDraw"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import { setContext } from "../../store/contextSlice"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { ctx } = useTypedSelector((state) => state.Context)

  const { width, height } = useResize()

  const canvasRef = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    dispatch(setContext(ctx))
  }, [])

  const { isDrawing, clientY, clientX } = useIsDraw()

  useEffect(() => {
    if (isDrawing && ctx) {
      ctx.beginPath()

      ctx?.moveTo(clientX, clientY)
    }
  }, [isDrawing])

  const Draw = (e: MouseEvent) => {
    if (!isDrawing || !ctx) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    ctx.lineJoin = "round"
    ctx.lineWidth = 50
    ctx.strokeStyle = "red"
    if (width >= 1280) {
      ctx?.lineTo(e.clientX - offsetLeft, e.clientY - 80)
      ctx?.stroke()
    } else {
      ctx?.lineTo(e.clientX, e.clientY - 80)
      ctx?.stroke()
    }
  }

  return (
    <CanvasWrapper className="canvas__wrapper">
      <canvas
        onMouseMove={Draw}
        width={width}
        height={height}
        ref={canvasRef}
      />
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
