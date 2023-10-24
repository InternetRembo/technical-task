
export type User = {
	id:number,
	name:string,
	email:string,
	birthday_date:string,
	phone_number:string,
	address:string
}

export type authSliceStateType = {
	isAuth : boolean
}
export type userSliceStateType = {
	users : User[]
	userToEdit : null | User
	totalUsersCount:number
	next:null | string,
	previous:null | string
}

export type logInDataType = {
	password: string;
	username: string;
};