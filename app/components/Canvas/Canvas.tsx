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
import useUndo from "../../hooks/useUndo"
import useConnect from "../../hooks/useConnect"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { drawType, sessionId, socket } = useTypedSelector(
    (state) => state.Context
  )

  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const { width, height } = useResize()
  const { isDrawing, startX, startY } = useStartDrawing()
  useConnect()

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (canvasRef.current) dispatch(setCanvas(canvasRef.current))
  }, [canvasRef])

  const Draw = (e: MouseEvent) => {
    if (!isDrawing) return
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
