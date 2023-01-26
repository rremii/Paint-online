import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { drawType } from "./types"

interface initialStateType {
  drawType: drawType
  userName: string
  sessionId: string | null
  socket: WebSocket | null
  isDrawing: boolean
}

const initialState = {
  drawType: "rect",
  userName: "",
  sessionId: null,
  socket: null,
  isDrawing: false,
} as initialStateType

const ContextSlice = createSlice({
  name: "SocketSlice",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<drawType>) {
      state.drawType = action.payload
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload
    },
    setSocket(state, action: PayloadAction<WebSocket>) {
      state.socket = action.payload
    },
    setIsDrawing(state, action: PayloadAction<boolean>) {
      state.isDrawing = action.payload
    },
  },
})
export const { setType, setUserName, setSessionId, setSocket, setIsDrawing } =
  ContextSlice.actions
export default ContextSlice.reducer
