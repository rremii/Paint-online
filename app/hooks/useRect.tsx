import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { MouseEvent } from "react"
import { saveCanvas } from "../store/contextSlice"

const useRect = () => {
  const { ctx } = useTypedSelector((state) => state.Context)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const Draw = (e: MouseEvent, startX: number, startY: number) => {
    if (!ctx || !canvas) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80

    ctx.lineJoin = "round"
    ctx.lineWidth = 5
    ctx.strokeStyle = "green"

    const width = startX - X
    const height = startY - Y

    const img = new Image()
    if (savedCanvas) img.src = savedCanvas
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.rect(X, Y, width, height)
      ctx.stroke()
    }
  }
  return [Draw]
}

export default useRect
