import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { Me } from "./types"
import { WritableDraft } from "immer/dist/types/types-external"

export type drawType = "brush" | "rect" | "circle" | "line"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  drawType: drawType
  savedCanvas: string | null
}

const initialState = {
  ctx: null,
  canvas: null,
  drawType: "line",
  savedCanvas: null,
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
    saveCanvas(state, action: PayloadAction<string>) {
      state.savedCanvas = action.payload
    },
  },
})
export const { setType, setCanvas, saveCanvas } = ContextSlice.actions
export default ContextSlice.reducer
