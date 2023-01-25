import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { removeLastRedo } from "../store/contextSlice"
import { SocketApi } from "../api/config/Api"

const useRedo = () => {
  const dispatch = useAppDispatch()

  const { socket } = useTypedSelector((state) => state.Socket)
  const { sessionId } = useTypedSelector((state) => state.Socket)
  const { savedCanvas } = useTypedSelector((state) => state.Context)
  const { ctx } = useTypedSelector((state) => state.Context)
  const { canvas } = useTypedSelector((state) => state.Context)
  const { redoList } = useTypedSelector((state) => state.Context)

  const Redo = () => {
    if (!canvas || !ctx || !savedCanvas) return
    if (redoList) {
      const lastRedo = redoList.at(-1)
      dispatch(removeLastRedo())
      const img = new Image()
      if (!lastRedo) return
      img.src = lastRedo
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        if (socket && sessionId && canvas)
          SocketApi.Share(socket, sessionId, canvas.toDataURL())
      }
    }
  }

  return [Redo]
}
export default useRedo
