import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useDispatch} from "react-redux";

import ErrorMessage from "../commons/ErrorMessage";

import {logInUser} from "../../redux/slices/authSlice";
import {AppDispatch} from "../../redux/redux-store";

type LoginForm = {
	username: string;
	password: string;
};

const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {

		let logInData = {
			username: data.username,
			password: data.password,
		};
		dispatch(logInUser(logInData))
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 ">
				<div className="w-full flex flex-col justify-center items-center p-6">
						<div className="mt-6 ">
							<label htmlFor="username" className="input_label">
								User Name
							</label>
							<input
								className="register_input"
								{...register("username", {
									required: "Please enter an username",
								})}
							/>
							{errors.username && <ErrorMessage error={errors.username.message} />}
						</div>



					<div className="mt-6">
						<label htmlFor="password" className="input_label">
							Password
						</label>
						<div className={"flex flex-raw relative"}>
							<input
								type={isPasswordVisible ? "text" : "password"}
								className="register_input"
								{...register("password", {
									required: "Please enter an password",
								})}
							/>
							{isPasswordVisible ? (
								<FaEye
									size={25}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
									className={"icon_input"}
								/>
							) : (
								<FaEyeSlash
									size={25}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
									className={"icon_input"}
								/>
							)}
						</div>
						{errors.password && (
							<ErrorMessage error={errors.password.message} />
						)}
					</div>
				</div>
			</div>
			<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
				<button
					type="submit"
					className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
				>
					Sign In
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
