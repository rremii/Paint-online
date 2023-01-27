import { useEffect, useState } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { saveCanvas } from "../store/contextSlice"
import { SocketApi } from "../api/config/Api"

const useStartDrawing = () => {
  const dispatch = useAppDispatch()
  const { socket } = useTypedSelector((state) => state.Socket)
  const { sessionId } = useTypedSelector((state) => state.Socket)
  const { canvas } = useTypedSelector((state) => state.Context)
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)

  const handleMouseDown = (e: MouseEvent) => {
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80
    setClientX(X)
    setClientY(Y)
    dispatch(saveCanvas())
    if (socket && sessionId) SocketApi.startDraw(socket, sessionId)
  }
  const handleMouseUp = () => {
    if (!socket || !sessionId) return
    SocketApi.Finish(socket, sessionId)
  }

  useEffect(() => {
    const canvas = document.querySelector("canvas")

    if (canvas && socket) {
      canvas.addEventListener("mousedown", handleMouseDown)
      canvas.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      removeEventListener("mousedown", handleMouseDown)
      removeEventListener("mouseup", handleMouseUp)
    }
  }, [canvas, socket])

  return {
    startX: clientX,
    startY: clientY,
  }
}
export default useStartDrawing
