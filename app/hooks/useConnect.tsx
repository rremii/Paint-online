import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { useRouter } from "next/router"
import { saveCanvas } from "../store/contextSlice"
import useBrush from "./useBrush"
import useRect from "./useRect"
import useCircle from "./useCircle"
import useLine from "./useLine"
import { message } from "../store/types"
import { SendCanvas, SocketApi } from "../api/config/Api"
import { setIsDrawing, setSessionId, setSocket } from "../store/SocketSlice"
import { API_URL_WS } from "../api/config"

const useConnect = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { socket } = useTypedSelector((state) => state.Socket)
  const { userName } = useTypedSelector((state) => state.Socket)
  const { sessionId } = useTypedSelector((state) => state.Socket)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (!userName || !router.query.id) return

    const socket = new WebSocket(API_URL_WS)
    dispatch(setSocket(socket))
    const id = router.query.id as string
    dispatch(setSessionId(id))
    dispatch(saveCanvas())

    socket.onopen = () => {
      console.log("Подключение установлено")
      const id = router.query.id as string
      SocketApi.Connect(socket, id, userName)
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
          ctx?.beginPath()
          dispatch(setIsDrawing(false))
          dispatch(saveCanvas())
          if (sessionId && canvas)
            SendCanvas(sessionId, canvas.toDataURL()).then((response) =>
              console.log(response)
            )
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

    ctx?.beginPath()
    if (drawType === "brush") DrawBrush(X, Y, styles)
    if (drawType === "rect") DrawRect(startX, startY, X, Y, styles)
    if (drawType === "circle") DrawCircle(startX, startY, X, Y, styles)
    if (drawType === "line") DrawLine(startX, startY, X, Y, styles)
    if (drawType === "eraser") DrawBrush(X, Y, styles, true)
  }
}
export default useConnect
