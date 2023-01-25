import { useTypedSelector } from "../store/ReduxStore"
import { styles } from "../store/types"

const useCircle = () => {
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const SetStyles = ({ color }: styles) => {
    if (!ctx) return
    ctx.lineWidth = 1
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = "transparent"
  }
  const Draw = (
    startX: number,
    startY: number,
    X: number,
    Y: number,
    styles: styles
  ) => {
    if (!ctx || !canvas) return

    const width = startX - X
    const height = startY - Y

    const radius = Math.sqrt(Math.abs(width * width + height * height))

    const img = new Image()
    if (savedCanvas) img.src = savedCanvas
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      SetStyles(styles)
      ctx.beginPath()
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI, false)
      ctx.stroke()
    }
  }
  return [Draw]
}

export default useCircle
