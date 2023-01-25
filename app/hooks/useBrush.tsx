import { useTypedSelector } from "../store/ReduxStore"
import { styles } from "../store/types"

const useBrush = () => {
  const { ctx } = useTypedSelector((state) => state.Context)

  const SetStyles = ({ lineWidth, color }: styles, isEraser: boolean) => {
    if (!ctx) return
    ctx.lineJoin = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = isEraser ? "white" : color
  }

  const Draw = (
    X: number,
    Y: number,
    styles: styles,
    isEraser: boolean = false
  ) => {
    if (!ctx) return

    SetStyles(styles, isEraser)
    ctx.lineTo(X, Y)
    ctx.stroke()
  }
  return [Draw]
}

export default useBrush
