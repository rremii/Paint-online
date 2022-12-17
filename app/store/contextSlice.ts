import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { Me } from "./types"
import { WritableDraft } from "immer/dist/types/types-external"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
}

const initialState = {
  ctx: null,
} as initialStateType

const ContextSlice = createSlice({
  name: "ContextSlice",
  initialState,
  reducers: {
    setContext(state, action: PayloadAction<CanvasRenderingContext2D>) {
      state.ctx = action.payload as WritableDraft<CanvasRenderingContext2D>
    },
  },
})
export const { setContext } = ContextSlice.actions
export default ContextSlice.reducer
