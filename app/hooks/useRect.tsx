import { useTypedSelector } from "../store/ReduxStore"
import { styles } from "../store/types"

const useRect = () => {
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const SetStyles = ({ lineWidth, color }: styles) => {
    if (!ctx) return
    ctx.lineJoin = "round"
    ctx.lineWidth = lineWidth
    ctx.fillStyle = color
    ctx.fill()
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
    }
  }

  return [Draw]
}

export default useRect
