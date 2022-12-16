import { useEffect, useState } from "react"

const headerHeight = 83

const useResize = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  const handleResize = () => {
    if (window.innerWidth <= 1280) setWidth(window.innerWidth - 5)
    else setWidth(1280)
    setHeight(window.innerHeight - headerHeight)
  }
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    width,
    height,
  }
}
export default useResize
