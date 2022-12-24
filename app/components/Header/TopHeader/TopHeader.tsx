import { ChangeEvent, FC, useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import { useAppDispatch, useTypedSelector } from "../../../store/ReduxStore"
import { drawType, setColor, setType } from "../../../store/contextSlice"
import useUndo from "../../../hooks/useUndo"
import useRedo from "../../../hooks/useRedo"
import { v4 as uuidv4 } from "uuid"

const TopHeader: FC = () => {
  const dispatch = useAppDispatch()

  const { canvas } = useTypedSelector((state) => state.Context)

  const [inputColor, setInputColor] = useState("black")
  const [Undo] = useUndo()
  const [Redo] = useRedo()

  const SetType = (type: drawType) => {
    dispatch(setType(type))
  }
  const SetColor = (e: ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.currentTarget.value)
  }

  const Download = () => {
    if (!canvas) return
    const dataUrl = canvas.toDataURL()
    const a = document.createElement("a")
    a.href = dataUrl
    const name = uuidv4().slice(0, 10)
    a.download = name + ".jpg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  useEffect(() => {
    dispatch(setColor(inputColor))
  }, [inputColor])

  return (
    <TopHeaderWrapper className="topHeader__wrapper">
      <div className="drawingTools">
        <div onClick={() => SetType("brush")} className="brush">
          <Image width={25} height={25} src="/brush.svg" alt="brush" />
        </div>
        <div onClick={() => SetType("rect")} className="rect">
          <Image width={25} height={25} src="/rect.svg" alt="brush" />
        </div>
        <div onClick={() => SetType("circle")} className="circle">
          <Image width={25} height={25} src="/circle.svg" alt="circle" />
        </div>
        <div onClick={() => SetType("eraser")} className="eraser">
          <Image width={25} height={25} src="/eraser.svg" alt="eraser" />
        </div>
        <div onClick={() => SetType("line")} className="line">
          <Image width={25} height={25} src="/line.svg" alt="line" />
        </div>
        <div className="pickColor">
          <input value={inputColor} onChange={SetColor} type="color" />
        </div>
      </div>
      <div className="helpers">
        <div onClick={Undo} className="undo">
          <Image width={25} height={25} src="/undo.svg" alt="undo" />
        </div>
        <div onClick={Redo} className="redo">
          <Image width={25} height={25} src="/redo.svg" alt="redo" />
        </div>
        <div onClick={Download} className="save">
          <Image width={25} height={25} src="/save.svg" alt="save" />
        </div>
      </div>
    </TopHeaderWrapper>
  )
}
export default TopHeader
const TopHeaderWrapper = styled.div`
  min-height: 40px;
  row-gap: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 21px;
  column-gap: 20px;
  @media screen and (max-width: 400px) {
    padding: 10px 21px;

    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .drawingTools {
    gap: 16px;
    display: flex;
    align-items: center;

    & > div {
      cursor: pointer;
    }
  }

  .helpers {
    gap: 16px;
    display: flex;
    align-items: center;

    & > div {
      cursor: pointer;
    }
  }
`
