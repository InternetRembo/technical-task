import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {User, userSliceStateType} from "../../types/types";
import {USERS_API} from "../../api/api";

let initialState: userSliceStateType  = {
	users: [],
	userToEdit: null,
	totalUsersCount:0,
	next:null,
	previous:null
};

export const getUsersDataAsync = createAsyncThunk(
	"users/getAllUsers",
	async ({offset}:{offset?:string}) => {
		const result = await USERS_API.getAll(offset);
		return result.data;
	}
);
export const deleteUserAsync = createAsyncThunk(
	"users/deleteUser",
	async (id:number) => {
		const result = await USERS_API.delete(id);
		return result.data;
	}
);
export const createUserAsync = createAsyncThunk(
	"users/createUser",
	async (userData: User) => {
		const result = await USERS_API.create(userData);
		return result.data;
	}
);
export const updateUserAsync = createAsyncThunk(
	"users/updateUser",
	async (userData: User) => {
		const response = await USERS_API.update(userData);
		return response.data;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserToEdit(state, action: PayloadAction<User | null>) {
			state.userToEdit = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUsersDataAsync.fulfilled, (state, action) => {
			state.users = action.payload.results;
			state.next = action.payload.next;
			state.previous = action.payload.previous;
			state.totalUsersCount = action.payload.count;
		});
	},
});

export const userReducer = userSlice.reducer;
export const { setUserToEdit } = userSlice.actions;