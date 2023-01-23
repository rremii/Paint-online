import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/types/types-external"
import { drawType } from "./types"

interface initialStateType {
  ctx: CanvasRenderingContext2D | null
  canvas: HTMLCanvasElement | null
  drawType: drawType
  savedCanvas: string | null
  lineWidth: number
  color: string
  undoList: string[]
  redoList: string[]
  userName: string
  sessionId: string | null
  socket: WebSocket | null
  isDrawing: boolean
}

const initialState = {
  ctx: null,
  canvas: null,
  drawType: "rect",
  savedCanvas: null,
  lineWidth: 1,
  color: "black",
  undoList: [],
  redoList: [],
  userName: "",
  sessionId: null,
  socket: null,
  isDrawing: false,
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

    addToRedo(state) {
      const savedCanvas = state.savedCanvas
      if (savedCanvas) state.undoList.push(savedCanvas)
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
export const {
  addToRedo,
  removeLastRedo,
  removeLastUndo,
  addToUndo,
  setType,
  setCanvas,
  setColor,
  setLineWidth,
  saveCanvas,
  setUserName,
  setSessionId,
  setSocket,
  setIsDrawing,
} = ContextSlice.actions
export default ContextSlice.reducer
