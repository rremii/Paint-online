import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useStartDrawing from "../../hooks/useStartDrawing"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import { setCanvas } from "../../store/contextSlice"
import useConnect from "../../hooks/useConnect"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { drawType, isDrawing, sessionId, socket } = useTypedSelector(
    (state) => state.Context
  )

  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const { width, height } = useResize()
  const { startX, startY } = useStartDrawing()
  useConnect()

  useEffect(() => {
    if (canvasRef.current) dispatch(setCanvas(canvasRef.current))
  }, [canvasRef])

  const Draw = (e: MouseEvent) => {
    if (!isDrawing || !socket) return

    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80

    socket.send(
      JSON.stringify({
        method: "draw",
        sessionId,
        figure: {
          drawType,
          startX,
          startY,
          X,
          Y,
        },
      })
    )
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
