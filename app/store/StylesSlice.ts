import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/types/types-external"
import { drawType } from "./types"

interface initialStateType {
  lineWidth: number
  color: string
}

const initialState = {
  lineWidth: 1,
  color: "black",
} as initialStateType

const ContextSlice = createSlice({
  name: "StylesSlice",
  initialState,
  reducers: {
    setLineWidth(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload
    },
    setColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    },
  },
})
export const { setColor, setLineWidth } = ContextSlice.actions
export default ContextSlice.reducer
