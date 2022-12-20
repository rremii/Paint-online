import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react"
import styled from "styled-components"
import { useAppDispatch } from "../../../store/ReduxStore"
import { setLineWidth } from "../../../store/contextSlice"

const BottomHeader: FC = () => {
  const dispatch = useAppDispatch()

  const [lineInputWidth, setLineInputWidth] = useState(5)

  const SetLineWidth = (e?: ChangeEvent<HTMLInputElement>) => {
    if (e && e?.currentTarget) setLineWidth(+e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(setLineWidth(lineInputWidth))
  }, [])

  return (
    <BottomHeaderWrapper className="bottomHeader__wrapper">
      <h2>Толщина линии</h2>
      <input
        value={lineInputWidth}
        onChange={SetLineWidth}
        min={3}
        max={99}
        type="number"
      />
    </BottomHeaderWrapper>
  )
}
export default BottomHeader
const BottomHeaderWrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  gap: 12px;
  height: 40px;
  align-items: center;
  z-index: 1;

  h2 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
  }

  input {
    border: black 1px solid;
    width: 40px;
    height: 20px;
  }
`
