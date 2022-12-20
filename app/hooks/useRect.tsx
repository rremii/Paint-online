import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { MouseEvent } from "react"

const useRect = () => {
  const { ctx } = useTypedSelector((state) => state.Context)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)
  const { lineWidth } = useTypedSelector((state) => state.Context)
  const { color } = useTypedSelector((state) => state.Context)

  const SetStyles = () => {
    if (!ctx) return
    ctx.lineJoin = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
  }

  const Draw = (e: MouseEvent, startX: number, startY: number) => {
    if (!ctx || !canvas) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80

    const width = startX - X
    const height = startY - Y

    const img = new Image()
    if (savedCanvas) img.src = savedCanvas
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      SetStyles()
      ctx.beginPath()
      ctx.rect(X, Y, width, height)
      ctx.stroke()
    }
  }
  return [Draw]
}

export default useRect
