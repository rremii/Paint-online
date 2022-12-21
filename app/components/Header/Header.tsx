import { FC } from "react"
import styled from "styled-components"
import BottomHeader from "./ButtomHeader/BottomHeader"
import TopHeader from "./TopHeader/TopHeader"

const Header: FC = () => {
  return (
    <HeaderWrapper className="header__wrapper">
      <TopHeader />
      <BottomHeader />
    </HeaderWrapper>
  )
}
export default Header
const HeaderWrapper = styled.header`
  z-index: 1;
  width: 100%;
`
