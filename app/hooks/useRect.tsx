import { useTypedSelector } from "../store/ReduxStore"
import { useEffect } from "react"
import { styles } from "../store/types"

const useRect = () => {
  const { ctx } = useTypedSelector((state) => state.Context)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const SetStyles = ({ lineWidth, color }: styles) => {
    if (!ctx) return
    ctx.lineJoin = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
  }

  const Draw = (
    startX: number,
    startY: number,
    X: number,
    Y: number,
    styles: styles
  ) => {
    if (!ctx || !canvas || !savedCanvas) return
    const width = startX - X
    const height = startY - Y

    const img = new Image()
    img.src = savedCanvas

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      SetStyles(styles)
      ctx.beginPath()
      ctx.rect(X, Y, width, height)
      ctx.stroke()
    }
  }

  return [Draw]
}

export default useRect
