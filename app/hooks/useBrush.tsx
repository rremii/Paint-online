import { useTypedSelector } from "../store/ReduxStore"
import { MouseEvent } from "react"

const useBrush = () => {
  const { ctx } = useTypedSelector((state) => state.Context)

  const Draw = (e: MouseEvent) => {
    if (!ctx) return
    const offsetLeft = (window.innerWidth - 1280) / 2
    const X = window.innerWidth >= 1280 ? e.clientX - offsetLeft : e.clientX
    const Y = e.clientY - 80

    ctx.lineJoin = "round"
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    ctx.lineTo(X, Y)
    ctx.stroke()
  }
  return [Draw]
}

export default useBrush
