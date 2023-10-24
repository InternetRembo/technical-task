import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/redux-store";
import { useAppSelector } from "../../redux/hooks";
import {getUsersDataAsync} from "../../redux/slices/userSlice";

const Pagination = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [currentPage, setCurrentPage] = useState(1);

	const totalUsersCount = useAppSelector(
		(state) => state.userReducer.totalUsersCount
	);
	const previous = useAppSelector(
		(state) => state.userReducer.previous
	);
	const next = useAppSelector(
		(state) => state.userReducer.next
	);

	const getPageNumbers = () => {
		const pageNumbers = [];

		let pages = Math.ceil(totalUsersCount / 10);

		if (pages <= 10) {
			for (let i = 1; i <= pages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= 5) {
				for (let i = 1; i <= 10; i++) {
					pageNumbers.push(i);
				}
			} else if (currentPage >= pages - 5) {
				for (let i = pages - 10 + 1; i <= pages; i++) {
					pageNumbers.push(i);
				}
			} else {
				for (let i = currentPage - 5; i <= currentPage + 5; i++) {
					pageNumbers.push(i);
				}
			}
		}
		return pageNumbers;
	};

	const onPageChange = (page: number) => {

		console.log(page , 'page')

		let offset =  page === 1 ? '' : ((page - 1) * 10).toString();

		dispatch(
			getUsersDataAsync({
				offset
			})
		);
		setCurrentPage(page);
	};

	return (
		<nav className="flex justify-center mt-4">
			<ul className="flex space-x-3">
				<li>
					<button
						onClick={() =>
							previous && onPageChange(currentPage - 1)
						}
						className={`bg-green-600  hover:bg-green-500 text-white px-4 py-2 rounded-l-md w-28 `}
					>
						Previous
					</button>
				</li>
				{getPageNumbers().map((pageNumber) => (
					<li key={pageNumber}>
						<button
							onClick={() => onPageChange(pageNumber)}
							className={`${
								currentPage === pageNumber
									? "border-2  font-bold"
									: " border hover:bg-blue-100 "
							}  px-4 py-2 rounded-md box-border shadow-2xl border-blue-500 bg-white `}
						>
							{pageNumber}
						</button>
					</li>
				))}
				<li>
					<button
						onClick={() =>
							next && onPageChange(currentPage + 1)
						}
						className={`bg-green-600 hover:bg-green-500  text-white px-4 py-2 rounded-r-md w-28 `}
					>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
