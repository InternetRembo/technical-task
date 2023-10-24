import React from 'react';
import {SubmitHandler, useForm , Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import {useDispatch} from "react-redux";

import ErrorMessage from "../commons/ErrorMessage";
import ClickOutsideHandler from "../commons/ClickOutsideHandler";

import {useAppSelector} from "../../redux/hooks";
import {getUsersDataAsync, updateUserAsync} from "../../redux/slices/userSlice";
import {AppDispatch} from "../../redux/redux-store";

const moment = require('moment');

type UserUpdatingForm = {
	name: string;
	email: string;
	birthday_date: string;
	phone_number: string;
	address: string;
};

type  UserUpdatingModalProps = {
	setIsUpdatingModalOpen: (bool: boolean) => void
}

const UserUpdatingModal: React.FC<UserUpdatingModalProps> = ({setIsUpdatingModalOpen}) => {

	const dispatch = useDispatch<AppDispatch>();

	const userToEdit = useAppSelector((state) => state.userReducer.userToEdit);

	const formattedBirthdayDate = userToEdit?.birthday_date
		? moment(userToEdit?.birthday_date, 'DD-MM-YY').format('YYYY-MM-DD')
		: '';

	const initialFormValues = {
		name: userToEdit?.name,
		email: userToEdit?.email,
		birthday_date: formattedBirthdayDate ,
		phone_number: userToEdit?.phone_number,
		address: userToEdit?.address,
	};

	const {
		register,
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<UserUpdatingForm>({defaultValues: initialFormValues});


	const onSubmit: SubmitHandler<UserUpdatingForm> = async (data) => {

		let UpdatedUserData = {
			id: userToEdit?.id || 1,
			name: data.name,
			email: data.email,
			birthday_date: data.birthday_date ? moment.utc(data.birthday_date).format('YYYY-MM-DD') : '',
			phone_number: data.phone_number,
			address: data.address,
		};

		dispatch(updateUserAsync(UpdatedUserData))
		dispatch(getUsersDataAsync({}))
		setIsUpdatingModalOpen(false)
	};
	return (

		<div className=" flex items-center justify-center  shadow-2xl absolute ">
			<ClickOutsideHandler onAwayClick={() => setIsUpdatingModalOpen(false)}>
				<div className="bg-white rounded-lg shadow-md w-[480px] min-h-[200px] ">
					<h1 className={"pt-3 px-3 text-center text-4xl"}>User Updating</h1>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 ">
							<div className="w-full flex flex-col justify-center items-center p-6">

								<div className="mt-6 ">
									<label htmlFor="name" className="input_label">
										Name
									</label>
									<input
										className="register_input"
										{...register("name", {
											required: "Please enter a new name",
										})}
									/>
									{errors.name && <ErrorMessage error={errors.name.message}/>}
								</div>

								<div className="mt-6 ">
									<label htmlFor="email" className="input_label">
										Email
									</label>
									<input
										className="register_input"
										{...register("email", {
											required: "Please enter a new email",
										})}
									/>
									{errors.name && <ErrorMessage error={errors.name.message}/>}
								</div>

								<div className="mt-6 ">

									<label htmlFor="birthday_date" className="input_label">
										Date of birth
									</label>

									<Controller
										name={"birthday_date"}
										control={control}
										render={({ field: { onChange, value, name, ref } }) => {
											return (
												<DatePicker
													selected={value ? new Date(value) : null}
													onChange={(date , event) => {
														event?.stopPropagation()
														onChange(date);
													}}
													dateFormat="MM/dd/yyyy"
													placeholderText="Pick date"
													className="w-full py-[6px] pl-3 pr-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"												/>
											);
										}}
									/>
									{errors.birthday_date && <ErrorMessage error={errors.birthday_date.message}/>}
								</div>

								<div className="mt-6 ">
									<label htmlFor="phoneNumber" className="input_label">
										Phone number
									</label>
									<input
										className="register_input"
										{...register("phone_number", {
											required: "Please enter a new phone number",
										})}
									/>
									{errors.phone_number && <ErrorMessage error={errors.phone_number.message}/>}
								</div>

								<div className="mt-6 ">
									<label htmlFor="address" className="input_label">
										Address
									</label>
									<input
										className="register_input"
										{...register("address", {
											required: "Please enter a new address",
										})}
									/>
									{errors.address && <ErrorMessage error={errors.address.message}/>}
								</div>


							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="submit"
								className=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Update
							</button>
						</div>
					</form>

				</div>
			</ClickOutsideHandler>
		</div>
	);
};

export default UserUpdatingModal