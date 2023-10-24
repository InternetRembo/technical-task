import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import TableItem from "./TableItem";
import UserUpdatingModal from "./UserUpdatingModal";
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
	},[])

	const users = useAppSelector((state) => state.userReducer.users);

	const [isUpdatingModalOpen , setIsUpdatingModalOpen] = useState(false)
	const [searchQuery , setSearchQuery] = useState('')

	const  handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const onUpdateClick = (user: User) => {
		setIsUpdatingModalOpen(!isUpdatingModalOpen)
		dispatch(setUserToEdit(user));
	};

	return (
		<div className={" h-screen flex justify-center  flex-col items-center bg-gradient-to-br from-green-400 to-blue-500"}>

			{isUpdatingModalOpen && <UserUpdatingModal  setIsUpdatingModalOpen={setIsUpdatingModalOpen}/>}

			<button
				onClick={()=> {
					dispatch(setIsAuth(false))
					sessionStorage.removeItem('auth')
				}}
				className="w-[200px] bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mb-2 absolute top-3 right-3"
			>
				Log Out
			</button>

			<div className="flex items-center pb-4">
				<input
					type="text"
					id="search"
					placeholder="Find user by name"
					value={searchQuery}
					onChange={handleInputChange}
					className="border border-gray-300 rounded-md p-2 w-[300px] self-start"
				/>
			</div>

			<table className="  bg-white border border-gray-300 max-w-[1200px] shadow-2xl rounded-lg">
				<thead>
				<tr>
					<th className="users-table-th text-center w-56 ">Name</th>
					<th className="users-table-th text-center w-56 ">Email</th>
					<th className="users-table-th text-center w-56 ">Date of birth</th>
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
			</table>
			<Pagination />
		</div>
	);
};

export default TablePage;