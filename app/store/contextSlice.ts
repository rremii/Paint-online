import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { Me } from "./types"
import { WritableDraft } from "immer/dist/types/types-external"

export type drawType = "brush" | "rect" | "circle" | "line" | "eraser"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  drawType: drawType
  savedCanvas: string | null
  lineWidth: number
  color: string
}

const initialState = {
  ctx: null,
  canvas: null,
  drawType: "rect",
  savedCanvas: null,
  lineWidth: 1,
  color: "black",
} as initialStateType

const ContextSlice = createSlice({
  name: "ContextSlice",
  initialState,
  reducers: {
    setCanvas(state, action: PayloadAction<HTMLCanvasElement>) {
      state.canvas = action.payload as WritableDraft<HTMLCanvasElement>
      state.ctx = action.payload.getContext(
        "2d"
      ) as WritableDraft<CanvasRenderingContext2D>
    },
    setType(state, action: PayloadAction<drawType>) {
      state.drawType = action.payload
    },
    saveCanvas(state) {
      const canvas = state.canvas
      if (canvas) state.savedCanvas = canvas.toDataURL()
    },
    setLineWidth(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
  },
})
export const { setType, setCanvas, setColor, setLineWidth, saveCanvas } =
  ContextSlice.actions
export default ContextSlice.reducer
