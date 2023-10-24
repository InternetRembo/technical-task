import axios from "axios";
import {toast} from "react-toastify";

import {logInDataType, User} from "../types/types";

const axiosInstance = axios.create({
	baseURL: "https://technical-task-api.icapgroupgmbh.com/api",

});

export const AUTHENTICATION_API = {
	logIn: (data: logInDataType): Promise<any> =>
		axiosInstance.post(`/login/`, data).catch((error) => {
			toast.error(`Error : ${error.response.data.error}`);
		}),
};
export const USERS_API = {
	getAll: (offset?: string) => {

		let queryParams = "";

		if (offset !== undefined) {
			queryParams += `offset=${offset}`;
		}
		const url = `/table/${queryParams ? `?${queryParams}` : ""}`

		return axiosInstance.get(url);

	},
	delete: (id: number): Promise<any> => axiosInstance.delete(`/table/${id}`).catch((error) => {
		toast.error(`Error : ${error.response.data.detail}`);
	}),
	update: (user: User) =>
		axiosInstance.put(`/table/${user.id}/`, user),
};


