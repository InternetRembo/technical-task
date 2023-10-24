import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { motion } from "framer-motion";

import TableItem from "./TableItem";
import UserModal from "./UserModal";
import Pagination from "./Pagination";

import {useAppSelector} from "../../redux/hooks";
import {AppDispatch} from "../../redux/redux-store";
import {getUsersDataAsync, setUserToEdit} from "../../redux/slices/userSlice";
import {User} from "../../types/types";
import {setIsAuth} from "../../redux/slices/authSlice";

const TablePage = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getUsersDataAsync({}))
	}, [])

	const users = useAppSelector((state) => state.userReducer.users);

	const [isUserModalOpen, setIsUserModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const userToEdit = useAppSelector((state) => state.userReducer.userToEdit);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const onUpdateClick = (user: User) => {
		setIsUserModalOpen(!isUserModalOpen)
		dispatch(setUserToEdit(user));
	};

	return (
		<div
			className={" h-screen flex justify-center  flex-col items-center bg-gradient-to-br from-green-400 to-blue-500"}>

			<button
				onClick={() => {
					dispatch(setIsAuth(false))
					sessionStorage.removeItem('auth')
				}}
				className="w-[200px] bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mb-2 absolute top-3 right-3"
			>
				Log Out
			</button>

			<div className="flex items-center pb-4 gap-2">
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsUserModalOpen(true)
						console.log(isUserModalOpen , 'isUserModalOpen')
						dispatch(setUserToEdit(null))
					}}
					className="w-[200px] bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md mb-2  top-3 right-3"
				>
					Create new user
				</button>

				<input
					type="text"
					id="search"
					placeholder="Find user by name"
					value={searchQuery}
					onChange={handleInputChange}
					className="border border-gray-300 rounded-md p-2 w-[300px] self-start"
				/>
			</div>

			{isUserModalOpen && <UserModal mode={userToEdit ? "update" : "create"} setIsUserModalOpen={setIsUserModalOpen} />}

			<motion.table
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.5 }}
				className="bg-white border border-gray-300 max-w-[1200px] shadow-2xl rounded-lg"
			>
				<thead>
				<tr>
					<th className="users-table-th text-center w-56 ">Name</th>
					<th className="users-table-th text-center w-56 ">Date of birth</th>
					<th className="users-table-th text-center w-56 ">Email</th>
					<th className="users-table-th text-center w-56 ">Phone number</th>
					<th className="users-table-th text-center w-72 ">Address</th>
					<th className="px-4 py-2 font-semibold text-gray-700 border-b"></th>
				</tr>
				</thead>
				<tbody>
				{users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())).map((user: User, index) => (
					<TableItem
						user={user}
						onUpdateClick={onUpdateClick}
						key={user.id || "" + index}
					/>
				))}
				</tbody>
			</motion.table>
			<Pagination/>
		</div>
	);
};

export default TablePage;