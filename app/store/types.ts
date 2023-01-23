export type drawType = "brush" | "rect" | "circle" | "line" | "eraser"

interface figure {
  X: number
  Y: number
  startX: number
  startY: number
  drawType: drawType
}

export interface message {
  figure?: figure
  method: "draw" | "connection" | "finish"
  sessionId: string
}
