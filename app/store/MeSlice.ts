import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Me,} from "./types"


interface initialStateType {
	me: Me
}

const initialState = {
	me: {}
} as initialStateType

const MeSlice = createSlice({
	name: "MeSlice",
	initialState,
	reducers: {
		setMe(state, action: PayloadAction<Me>) {
			state.me = action.payload
		},

		resetMeSlice() {
			return initialState
		}
	},

})
export const {resetMeSlice, setMe} = MeSlice.actions
export default MeSlice.reducer
