import { useTypedSelector } from "../store/ReduxStore"
import { styles } from "../store/types"

const useLine = () => {
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
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
    if (!ctx || !canvas) return

    const img = new Image()
    if (savedCanvas) img.src = savedCanvas
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      SetStyles(styles)
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(X, Y)
      ctx.stroke()
    }
  }
  return [Draw]
}

export default useLine
