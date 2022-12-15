import { FC } from "react"
import styled from "styled-components"

const BottomHeader: FC = () => {
    return (
        <BottomHeaderWrapper className="bottomHeader__wrapper">
            <h2>Толщина линии</h2>
            <input min={3} max={30} type="number" />
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
