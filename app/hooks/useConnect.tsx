import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { useRouter } from "next/router"
import { setIsDrawing, setSessionId, setSocket } from "../store/contextSlice"
import useBrush from "./useBrush"
import useRect from "./useRect"
import useCircle from "./useCircle"
import useLine from "./useLine"
import { message } from "../store/types"

const useConnect = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { userName } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  // const { savedCanvas } = useTypedSelector((state) => state.Context)

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (!userName || !router.query.id) return

    const socket = new WebSocket(`ws://localhost:5000/`)
    dispatch(setSocket(socket))
    dispatch(setSessionId(router.query.id))

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
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      switch (msg.method) {
        case "connection":
          console.log(`пользователь ${msg.username} присоединился`)
          break
        case "draw":
          drawHandler(msg)
          break
        case "finish":
          dispatch(setIsDrawing(false))
          ctx?.beginPath()
          break
      }
    }
  }, [userName])

  const drawHandler = (msg: message) => {
    if (!msg.figure) return
    const { drawType, startX, startY, X, Y } = msg.figure

    if (drawType === "brush") DrawBrush(X, Y)
    if (drawType === "rect") DrawRect(startX, startY, X, Y)
    if (drawType === "circle") DrawCircle(startX, startY, X, Y)
    if (drawType === "line") DrawLine(startX, startY, X, Y)
    if (drawType === "eraser") DrawBrush(X, Y)
  }
}
export default useConnect
