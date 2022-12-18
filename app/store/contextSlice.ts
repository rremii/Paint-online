import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { Me } from "./types"
import { WritableDraft } from "immer/dist/types/types-external"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  drawType: "brush" | "rect"
  savedCanvas: string | null
}

const initialState = {
  ctx: null,
  canvas: null,
  drawType: "brush",
  savedCanvas: null,
} as initialStateType

const ContextSlice = createSlice({
  name: "ContextSlice",
  initialState,
  reducers: {
    setContext(state, action: PayloadAction<CanvasRenderingContext2D>) {
      state.ctx = action.payload as WritableDraft<CanvasRenderingContext2D>
    },
    setCanvas(state, action: PayloadAction<HTMLCanvasElement>) {
      state.canvas = action.payload as WritableDraft<HTMLCanvasElement>
    },
    saveCanvas(state, action: PayloadAction<string>) {
      state.savedCanvas = action.payload
    },
  },
})
export const { setContext, setCanvas, saveCanvas } = ContextSlice.actions
export default ContextSlice.reducer
