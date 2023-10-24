import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {authSliceStateType, logInDataType} from "../../types/types";
import {AUTHENTICATION_API} from "../../api/api";
import {toast} from "react-toastify";

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
			toast.success(`Authentication was successful`);
			sessionStorage.setItem('auth', action.payload.message)
		});
	},
});

export const authReducer = authSlice.reducer;
export const {setIsAuth} = authSlice.actions;
