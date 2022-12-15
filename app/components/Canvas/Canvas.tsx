import { FC } from "react"
import styled from "styled-components"

const Canvas: FC = () => {
  return (
    <CanvasWrapper className="canvas__wrapper">
      <canvas />
    </CanvasWrapper>
  )
}
export default Canvas
const CanvasWrapper = styled.main`
  height: 100%;

  canvas {
    height: 100%;
    width: 100%;
  }
`
