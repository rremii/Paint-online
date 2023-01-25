import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { removeLastUndo } from "../store/contextSlice"
import { SocketApi } from "../api/config/Api"

const useUndo = () => {
  const dispatch = useAppDispatch()

  const { socket } = useTypedSelector((state) => state.Socket)
  const { sessionId } = useTypedSelector((state) => state.Socket)
  const { undoList } = useTypedSelector((state) => state.Context)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)

  const Undo = () => {
    if (!canvas || !ctx || !savedCanvas) return
    if (undoList) {
      const lastUndo = undoList.at(-1)
      dispatch(removeLastUndo())
      const img = new Image()
      if (!lastUndo) return
      img.src = lastUndo
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        if (socket && sessionId && canvas)
          SocketApi.Share(socket, sessionId, canvas.toDataURL())
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return [Undo]
}
export default useUndo
