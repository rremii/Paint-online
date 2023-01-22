import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { useRouter } from "next/router"
import { setSessionId, setSocket } from "../store/contextSlice"
import useBrush from "./useBrush"
import useRect from "./useRect"
import useCircle from "./useCircle"
import useLine from "./useLine"

const useConnect = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { userName } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const [DrawBrush] = useBrush()
  const [DrawRect] = useRect()
  const [DrawCircle] = useCircle()
  const [DrawLine] = useLine()

  useEffect(() => {
    if (!userName || !router.query.id) return
    const socket = new WebSocket(`ws://localhost:5000/`)
    dispatch(setSocket(socket))
    dispatch(setSessionId(+router.query.id))
    socket.onopen = () => {
      console.log("Подключение установлено")
      socket.send(
        JSON.stringify({
          id: router.query.id,
          username: userName,
          method: "connection",
        })
      )
    }
    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data)
      switch (msg.method) {
        case "connection":
          console.log(`пользователь ${msg.username} присоединился`)
          break
        case "draw":
          drawHandler(msg)
          break
      }
    }
  }, [userName])

  const drawHandler = (msg: any) => {
    const { drawType, startX, startY, X, Y } = msg

    // switch (figure.type) {
    //   case "brush":

    if (drawType === "brush") DrawBrush(X, Y)
    if (drawType === "rect") DrawRect(startX, startY, X, Y)
    if (drawType === "circle") DrawCircle(startX, startY, X, Y)
    if (drawType === "line") DrawLine(startX, startY, X, Y)
    if (drawType === "eraser") DrawBrush(X, Y)
    // break
    // case "rect":
    //   Rect.staticDraw(
    //     ctx,
    //     figure.x,
    //     figure.y,
    //     figure.width,
    //     figure.height,
    //     figure.color
    //   )
    //   break
    // case "finish":
    //   ctx.beginPath()
    //   break
    // }
  }
}
export default useConnect
