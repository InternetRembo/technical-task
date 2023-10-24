import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authSliceStateType, logInDataType} from "../../types/types";
import {AUTHENTICATION_API} from "../../api/api";

let initialState: authSliceStateType = {
	isAuth: false,
};

export const logInUser = createAsyncThunk(
	"authentication/logInUser",
	async (data: logInDataType) => {
		const response = await AUTHENTICATION_API.logIn(data);
		return response.data;
	})

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logInUser.fulfilled, (state, action) => {
			state.isAuth = true;
			console.log(action , 'login action')
			sessionStorage.setItem('auth' , action.payload.message)
		});
	},
});

export const authReducer = authSlice.reducer;
export const { setIsAuth } = authSlice.actions;
