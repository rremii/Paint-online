import { useEffect, useState } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { saveCanvas } from "../store/contextSlice"

const useStartDrawing = (canvas: HTMLCanvasElement | null) => {
  const dispatch = useAppDispatch()

  const { ctx } = useTypedSelector((state) => state.Context)

  const [isDrawing, setIsDrawing] = useState(false)
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)

  const handleMouseDown = (e: MouseEvent) => {
    if (!canvas) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    setIsDrawing(true)
    if (window.innerWidth >= 1280) setClientX(e.clientX - offsetLeft)
    if (window.innerWidth < 1280) setClientX(e.clientX)
    setClientY(e.clientY - 80)

    dispatch(saveCanvas(canvas.toDataURL()))
  }
  const handleMouseUp = (e: MouseEvent) => {
    setIsDrawing(false)
  }
  useEffect(() => {
    if (isDrawing && ctx) {
      ctx.beginPath()
      ctx?.moveTo(clientX, clientY)
    }
  }, [isDrawing])
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      removeEventListener("mousedown", handleMouseDown)
      removeEventListener("mouseup", handleMouseUp)
    }
  })

  return {
    isDrawing,
    startX: clientX,
    startY: clientY,
  }
}
export default useStartDrawing
