import { FC } from "react"
import styled from "styled-components"
import Image from "next/image"

const TopHeader: FC = () => {
    return (
        <TopHeaderWrapper className="topHeader__wrapper">
            <div className="drawingTools">
                <div className="brush">
                    <Image
                        width={25}
                        height={25}
                        src="/brush.svg"
                        alt="brush"
                    />
                </div>
                <div className="rect">
                    <Image width={25} height={25} src="/rect.svg" alt="brush" />
                </div>
                <div className="circle">
                    <Image
                        width={25}
                        height={25}
                        src="/circle.svg"
                        alt="circle"
                    />
                </div>
                <div className="eraser">
                    <Image
                        width={25}
                        height={25}
                        src="/eraser.svg"
                        alt="eraser"
                    />
                </div>
                <div className="line">
                    <Image width={25} height={25} src="/line.svg" alt="line" />
                </div>
                <div className="pickColor">
                    <Image
                        width={25}
                        height={25}
                        src="/pick-color.svg"
                        alt="pickColor"
                    />
                </div>
            </div>
            <div className="helpers">
                <div className="undo">
                    <Image width={25} height={25} src="/undo.svg" alt="undo" />
                </div>
                <div className="redo">
                    <Image width={25} height={25} src="/redo.svg" alt="redo" />
                </div>
                <div className="save">
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