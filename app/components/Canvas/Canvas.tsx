import { FC, MouseEvent, useEffect, useRef } from "react"
import styled from "styled-components"
import useResize from "../../hooks/useResize"
import useStartDrawing from "../../hooks/useStartDrawing"
import { useAppDispatch, useTypedSelector } from "../../store/ReduxStore"
import {
  saveCanvas,
  setCanvas,
  setIsDrawing,
  setSessionId,
  setSocket,
} from "../../store/contextSlice"
import { useRouter } from "next/router"
import useBrush from "../../hooks/useBrush"
import useRect from "../../hooks/useRect"
import useCircle from "../../hooks/useCircle"
import useLine from "../../hooks/useLine"
import { message } from "../../store/types"
import axios from "axios"

const Canvas: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { userName } = useTypedSelector((state) => state.Context)
  const { ctx, canvas, savedCanvas } = useTypedSelector(
    (state) => state.Context
  )
  const { drawType, isDrawing, sessionId, socket } = useTypedSelector(
    (state) => state.Context
  )
  const { lineWidth } = useTypedSelector((state) => state.Context)
  const { color } = useTypedSelector((state) => state.Context)

  const canvasRef = useRef<null | HTMLCanvasElement>(null)
  const { width, height } = useResize()
  const { startX, startY } = useStartDrawing()
  // useConnect()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    dispatch(setCanvas(canvas))
  }, [canvasRef])
  useEffect(() => {
    if (!sessionId || !canvas) return
    const ctx = canvas.getContext("2d")
    axios
      .get(`http://localhost:5000/image?id=${sessionId}`)
      .then((response) => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height)
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      })
  }, [canvas, sessionId])

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
          styles: {
            color,
            lineWidth,
          },
        },
      })
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  // const { savedCanvas } = useTypedSelector((state) => state.Context)

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (!userName || !router.query.id) return

    const socket = new WebSocket(`ws://localhost:5000/`)
    dispatch(setSocket(socket))
    const id = router.query.id as string
    dispatch(setSessionId(id))
    dispatch(saveCanvas())

    socket.onopen = () => {
      console.log("Подключение установлено")
      socket.send(
        JSON.stringify({
          sessionId: router.query.id,
          username: userName,
          method: "connection",
        })
      )
    }
  }, [userName])

  useEffect(() => {
    if (!socket) return
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      switch (msg.method) {
        case "connection":
          console.log(`пользователь ${msg.username} присоединился`)
          ctx?.beginPath()
          break
        case "draw":
          drawHandler(msg)
          break
        case "share":
          shareHandler(msg)
          break
        case "finish":
          dispatch(setIsDrawing(false))
          ctx?.beginPath()
          dispatch(saveCanvas())
          if (sessionId && canvas)
            axios
              .post(`http://localhost:5000/image?id=${sessionId}`, {
                img: canvas.toDataURL(),
              })
              .then((response) => console.log(response.data))
          break
      }
    }
  }, [savedCanvas])

  const shareHandler = (msg: any) => {
    if (!canvas) return
    const img = new Image()
    img.src = msg.img
    img.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }

  const drawHandler = (msg: message) => {
    if (!msg.figure) return
    const { drawType, startX, startY, X, Y, styles } = msg.figure

    dispatch(setIsDrawing(true))
    if (drawType === "brush") DrawBrush(X, Y, styles)
    if (drawType === "rect") DrawRect(startX, startY, X, Y, styles)
    if (drawType === "circle") DrawCircle(startX, startY, X, Y, styles)
    if (drawType === "line") DrawLine(startX, startY, X, Y, styles)
    if (drawType === "eraser") DrawBrush(X, Y, styles, true)
  }

  //////////////////////////////////////////////////////////////////////////////

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
