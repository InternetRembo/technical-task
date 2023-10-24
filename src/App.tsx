import React, {useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";

import LoginPage from "./components/loginPage/LoginPage";
import TablePage from "./components/tablePage/TablePage";

import {useAppSelector} from "./redux/hooks";
import {setIsAuth} from "./redux/slices/authSlice";
import {AppDispatch} from "./redux/redux-store";

function App() {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (sessionStorage.getItem('auth')) {
			dispatch(setIsAuth(true))
		}
	}, [])

	const isAuth = useAppSelector((state) => state.authReducer.isAuth);

	const navigate = useNavigate();

	useEffect(() => {
		isAuth ? navigate('/') : navigate('/auth')
	}, [isAuth])

	return (
		<>
			<Routes>
				<Route
					path={"/auth"}
					element={
						<LoginPage/>
					}
				/>
				<Route
					path={"/"}
					element={
						<TablePage/>
					}
				/>
			</Routes>

			<ToastContainer/>
		</>
	);
}

export default App;
