import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { removeLastUndo } from "../store/contextSlice"

const useUndo = () => {
  const dispatch = useAppDispatch()

  const { undoList, savedCanvas, ctx, canvas, socket, sessionId } =
    useTypedSelector((state) => state.Context)

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
          socket.send(
            JSON.stringify({
              method: "share",
              sessionId,
              img: canvas.toDataURL(),
            })
          )
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return [Undo]
}
export default useUndo
