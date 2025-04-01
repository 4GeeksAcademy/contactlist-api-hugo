import { Link, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
export const Navbar = () => {
	const { store } = useGlobalReducer()
	const history=useNavigate();
	const handleNavigate=()=>history("/demo")

	const navigateDemo=()=>{
		if(store.agenda !==""){
			handleNavigate();
		}
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
			
					<span className="navbar-brand mb-0 h1">Contact List</span>
				
				<div className="ml-auto">
						<button className="btn btn-primary btn-nav" onClick={navigateDemo}>Contacts</button>
				</div>
			</div>
		</nav>
	);
};