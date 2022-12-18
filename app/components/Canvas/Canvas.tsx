import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useStartDrawing from "../../hooks/useStartDrawing"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import { setCanvas, setContext } from "../../store/contextSlice"
import useBrush from "../../hooks/useBrush"
import useRect from "../../hooks/useRect"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { drawType } = useTypedSelector((state) => state.Context)

  const { width, height } = useResize()

  const canvasRef = useRef<null | HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx && canvasRef.current) {
      dispatch(setCanvas(canvasRef.current))
      dispatch(setContext(ctx))
    }
  }, [])

  const { isDrawing, startX, startY } = useStartDrawing(canvasRef.current)
  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()

  const Draw = (e: MouseEvent) => {
    if (!isDrawing) return
    if (drawType === "brush") DrawBrush(e)
    if (drawType === "rect") DrawRect(e, startX, startY)
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
