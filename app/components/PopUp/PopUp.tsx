import { FC, useRef, useState } from "react"
import styled from "styled-components"
import { AdaptiveValue } from "../../../styles/functions/mixins"
import { bool } from "prop-types"
import { useAppDispatch } from "../../store/ReduxStore"
import { setUserName } from "../../store/contextSlice"

const PopUp: FC = () => {
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(true)

  const handleConnect = () => {
    if (!inputRef.current) return
    dispatch(setUserName(inputRef.current?.value))
    setIsOpen(false)
  }

  return (
    <PopUpWrapper isOpen={isOpen}>
      <div className="popUp__container">
        <h2>Enter your name</h2>
        <input ref={inputRef} type="text" />
        <button onClick={handleConnect}>Log in</button>
      </div>
    </PopUpWrapper>
  )
}
export default PopUp
const PopUpWrapper = styled.div<{
  isOpen: boolean
}>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);

  .popUp__container {
    background-color: #757575;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: ${AdaptiveValue(300, 200)};
    align-items: center;
    padding: 30px 10px;

    h2 {
      color: white;
      font-size: ${AdaptiveValue(25, 16)};
    }

    input {
      width: 90%;
    }

    button {
      padding: 5px;
      width: 50%;
      background-color: white;
    }
  }
`
