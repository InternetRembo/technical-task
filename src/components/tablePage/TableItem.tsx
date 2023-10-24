import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {TfiMenu} from "react-icons/tfi";
import {GrUpdate} from "react-icons/gr";
import {BsTrash3} from "react-icons/bs";

import ClickOutsideHandler from "../commons/ClickOutsideHandler";

import {AppDispatch} from "../../redux/redux-store";
import {User} from "../../types/types";
import {deleteUserAsync, getUsersDataAsync} from "../../redux/slices/userSlice";

type TableItemProps = {
	user: User;
	onUpdateClick: (user: User) => void;
};

const TableItem: React.FC<TableItemProps> = ({user , onUpdateClick}) => {
	const dispatch = useDispatch<AppDispatch>();
	
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<tr> 
			<td className="users-table-td">
				{user.name}
			</td>
			<td className="users-table-td">
				{user.birthday_date}
			</td>
			<td className="users-table-td">{user.email}</td>
			<td className="users-table-td">
				{user.phone_number}
			</td>
			<td className="users-table-td">
				{user.address}
			</td>

			<td className="border-b relative text-xs ">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsDropdownOpen((prev) => !prev);
						}}
					>
						<TfiMenu size={20} />
					</button>

				{isDropdownOpen && (
					<ClickOutsideHandler onAwayClick={() => setIsDropdownOpen(false)}>
						<div
							className={
								"bg-white shadow-2xl rounded-lg border-2 border-gray-200 flex flex-col absolute top-15 right-5  w-[140px] h-[120px] p-2 gap-2 z-10"
							}
						>
              <span
				  className={
					  "flex-grow w-full block bg-white font-medium text-[18px] flex justify-center items-center cursor-pointer shadow-2xl rounded-lg border-2 border-black-600 "
				  }
				  onClick={(e) => {
					  e.stopPropagation();
					   onUpdateClick(user);
				  }}
			  >
                Update&nbsp; <GrUpdate />
              </span>
							<div
								className={
									" flex-grow w-full block bg-white font-medium text-[18px] flex justify-center items-center cursor-pointer shadow-2xl rounded-lg border-2 border-black-600 "
								}
								onClick={() => {
									dispatch(deleteUserAsync(user.id))
									dispatch(getUsersDataAsync({}))
								}}
							>
								Delete&nbsp; <BsTrash3 />
							</div>
						</div>
					</ClickOutsideHandler>
				)}
			</td>
		</tr>
	);
};

export default TableItem;