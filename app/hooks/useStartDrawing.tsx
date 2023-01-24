import {useEffect, useState} from "react"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"
import {addToUndo, saveCanvas, setIsDrawing} from "../store/contextSlice"
import canvas from "../components/Canvas/Canvas"
import axios from "axios"

const useStartDrawing = () => {
  const dispatch = useAppDispatch()
  const {canvas} = useTypedSelector((state) => state.Context)
  const {socket} = useTypedSelector((state) => state.Context)
  const {sessionId} = useTypedSelector((state) => state.Context)
  const {isDrawing} = useTypedSelector((state) => state.Context)

  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)

  const handleMouseDown = (e: MouseEvent) => {
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80
    setClientX(X)
    setClientY(Y)
    dispatch(saveCanvas())
    dispatch(setIsDrawing(true))
    dispatch(addToUndo())
  }
  const handleMouseUp = (e: MouseEvent) => {
    if (!socket) return
    socket.send(
        JSON.stringify({
          method: "finish",
          sessionId,
        })
    )
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
