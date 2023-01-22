import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { MouseEvent } from "react"

const useEraser = () => {
  const { ctx } = useTypedSelector((state) => state.Context)

  const Draw = (X: number, Y: number) => {
    if (!ctx) return

    ctx.lineJoin = "round"
    ctx.lineWidth = 5
    ctx.strokeStyle = "white"
    ctx.lineTo(X, Y)
    ctx.stroke()
  }
  return [Draw]
}

export default useEraser
