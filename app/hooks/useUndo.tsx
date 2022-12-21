import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { removeLastUndo } from "../store/contextSlice"

const useUndo = () => {
  const dispatch = useAppDispatch()

  const { undoList, redoList, savedCanvas, ctx, canvas } = useTypedSelector(
    (state) => state.Context
  )

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
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  return [Undo]
}
export default useUndo
