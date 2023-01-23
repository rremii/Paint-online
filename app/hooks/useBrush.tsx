import { useTypedSelector } from "../store/ReduxStore"
import { MouseEvent } from "react"

const useBrush = () => {
  const { ctx } = useTypedSelector((state) => state.Context)
  const { drawType } = useTypedSelector((state) => state.Context)
  const { lineWidth } = useTypedSelector((state) => state.Context)
  const { color } = useTypedSelector((state) => state.Context)

  const SetStyles = () => {
    if (!ctx) return
    ctx.lineJoin = "round"
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = drawType === "eraser" ? "white" : color
  }

  const Draw = (X: number, Y: number) => {
    if (!ctx) return

    SetStyles()
    ctx.lineTo(X, Y)
    ctx.stroke()
  }
  return [Draw]
}

export default useBrush
