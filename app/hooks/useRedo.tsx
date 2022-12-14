import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { removeLastRedo, removeLastUndo } from "../store/contextSlice"

const useRedo = () => {
  const dispatch = useAppDispatch()

  const { redoList, savedCanvas, ctx, canvas } = useTypedSelector(
    (state) => state.Context
  )

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
      }
    }
  }

  return [Redo]
}
export default useRedo
