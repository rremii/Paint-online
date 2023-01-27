import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/types/types-external"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  savedCanvas: string | null
  undoList: string[]
  redoList: string[]
}

const initialState = {
  ctx: null,
  canvas: null,
  savedCanvas: null,
  undoList: [],
  redoList: [],
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

    saveCanvas(state) {
      const canvas = state.canvas
      if (canvas) state.savedCanvas = canvas.toDataURL()
    },

    addToUndo(state) {
      const savedCanvas = state.savedCanvas
      if (savedCanvas) state.undoList.push(savedCanvas)
    },
    removeLastUndo(state) {
      const canvas = state.canvas
      if (!canvas) return
      state.undoList.pop()
      state.redoList.push(canvas.toDataURL())
    },
    removeLastRedo(state) {
      const canvas = state.canvas
      state.redoList.pop()
      if (canvas) state.undoList.push(canvas.toDataURL())
    },

    // addToRedo(state) {
    //   const savedCanvas = state.savedCanvas
    //   if (savedCanvas) state.undoList.push(savedCanvas)
    // },
  },
})
export const {
  // addToRedo,
  removeLastRedo,
  removeLastUndo,
  addToUndo,
  setCanvas,
  saveCanvas,
} = ContextSlice.actions
export default ContextSlice.reducer
