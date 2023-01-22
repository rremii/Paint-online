import { FC } from "react"
import styled from "styled-components"
import Header from "../components/Header/Header"
import Canvas from "../components/Canvas/Canvas"
import PopUp from "../components/PopUp/PopUp"

const HomePage: FC = () => {
  return (
    <HomeWrapper className="home__wrapper">
      <PopUp />
      <Header />
      <Canvas />
    </HomeWrapper>
  )
}
export default HomePage
const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
