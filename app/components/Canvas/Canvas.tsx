import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useStartDrawing from "../../hooks/useStartDrawing"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import { setCanvas } from "../../store/contextSlice"
import useBrush from "../../hooks/useBrush"
import useRect from "../../hooks/useRect"
import useCircle from "../../hooks/useCircle"
import useLine from "../../hooks/useLine"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { drawType } = useTypedSelector((state) => state.Context)

  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const { width, height } = useResize()
  const { isDrawing, startX, startY } = useStartDrawing()

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (canvasRef.current) dispatch(setCanvas(canvasRef.current))
  }, [canvasRef])

  const Draw = (e: MouseEvent) => {
    if (!isDrawing) return
    if (drawType === "brush") DrawBrush(e)
    if (drawType === "rect") DrawRect(e, startX, startY)
    if (drawType === "circle") DrawCircle(e, startX, startY)
    if (drawType === "line") DrawLine(e, startX, startY)
    if (drawType === "eraser") DrawBrush(e)
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
