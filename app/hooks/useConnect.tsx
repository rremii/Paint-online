import {useEffect} from "react"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"
import {useRouter} from "next/router"
import {setIsDrawing, setSessionId, setSocket} from "../store/contextSlice"
import useBrush from "./useBrush"
import useRect from "./useRect"
import useCircle from "./useCircle"
import useLine from "./useLine"
import {message} from "../store/types"

const useConnect = () => {

}
export default useConnect
