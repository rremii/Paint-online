import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useStartDrawing from "../../hooks/useStartDrawing"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import { setCanvas } from "../../store/contextSlice"
import { figure } from "../../store/types"
import { FetchCanvas, SocketApi } from "../../api/config/Api"
import useConnect from "../../hooks/useConnect"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()

  const { socket } = useTypedSelector((state) => state.Socket)
  const { sessionId } = useTypedSelector((state) => state.Socket)
  const { drawType } = useTypedSelector((state) => state.Socket)
  const { isDrawing } = useTypedSelector((state) => state.Socket)
  const { lineWidth } = useTypedSelector((state) => state.Styles)
  const { color } = useTypedSelector((state) => state.Styles)
  const { canvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)

  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const { width, height } = useResize()
  const { startX, startY } = useStartDrawing()
  useConnect()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    dispatch(setCanvas(canvas))
  }, [canvasRef])

  useEffect(() => {
    if (!sessionId || !canvas) return
    const ctx = canvas.getContext("2d")

    FetchCanvas(sessionId).then((response) => {
      const img = new Image()
      img.src = response.data
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas.width, canvas.height)
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    })
  }, [canvas, sessionId])

  const Draw = (e: MouseEvent) => {
    if (!isDrawing || !socket || !sessionId) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80

    const figure: figure = {
      drawType,
      startX,
      startY,
      X,
      Y,
      styles: {
        color,
        lineWidth,
      },
    }

    SocketApi.Draw(socket, sessionId, figure)
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
