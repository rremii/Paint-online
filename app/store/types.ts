export type drawType = "brush" | "rect" | "circle" | "line" | "eraser"

export interface styles {
  color: string
  lineWidth: number
}

export interface figure {
  X: number
  Y: number
  startX: number
  startY: number
  styles: styles
  drawType: drawType
}

export interface message {
  figure?: figure
  method: "draw" | "connection" | "finish"
  sessionId: string
}
