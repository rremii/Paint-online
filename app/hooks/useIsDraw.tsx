import { useEffect, useState } from "react"

const useIsDraw = () => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)

  const handleMouseDown = (e: MouseEvent) => {
    const offsetLeft = (window.innerWidth - 1280) / 2
    setIsDrawing(true)
    if (window.innerWidth >= 1280) setClientX(e.clientX - offsetLeft)
    if (window.innerWidth < 1280) setClientX(e.clientX)
    setClientY(e.clientY - 80)
  }
  const handleMouseUp = (e: MouseEvent) => {
    setIsDrawing(false)
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      removeEventListener("mousedown", handleMouseDown)
      removeEventListener("mouseup", handleMouseUp)
    }
  })

  return {
    isDrawing,
    clientY,
    clientX,
  }
}
export default useIsDraw
