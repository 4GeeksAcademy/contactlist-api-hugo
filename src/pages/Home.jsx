
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { ApiContacList } from "./apiContactList.js";
import swal from 'sweetalert';




export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	const history = useNavigate();
	const handleNavigate = () => history("/demo");

	const handleCreateAgenda = async () => {
		try {
			const data = await ApiContacList.createAgenda(store.agenda)
		} catch (error) {

		}
	};

	const addAgenda = async () => {
		if (store.agenda === "") {
			swal({
				title: "WELLCOME",
				text: `The fild Check/Create Agenda can´t be empty.
			           please type agendas´s name`,
				icon: "warning",
				button: "ACEPT",
				timer: 7000
			});

		} else {
			await
				handlecheckAgenda();
		}

	};

	const createContact = async () => {
		if (store.name !== ""
			&& store.phone !== ""
		) {
			await
				handleCreateContact();
			await
				handlecheckAgenda();
			store.name = ""
			store.phone = ""
			store.email = ""
			store.address = ""
			handleNavigate();
		}
	};

	const handlecheckAgenda = async () => {
		try {
			const data = await ApiContacList.checkgenda(store.agenda)
			console.log(data)
			if (data.detail === `Agenda "${store.agenda}" doesn't exist.`) {
				swal({
					title: "WELLCOME",
					text: `The Agenda ${store.agenda} doesn´t exist.
				    it will be created`,
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
					.then(async (willDelete) => {
						if (willDelete) {
							inputAble();
							handleCreateAgenda()
							swal(`Poof! Your Agenda ${store.agenda}  has been created!`, {
								icon: "success",
							});
							handleNavigate();
						} else {
							swal("Try Again");
						}
					});
			}
			else {
				inputAble();
				store.todos = data.contacts;
				handleNavigate();
			}
		} catch (error) {
			console.log(error)
		}
	};

	const handleCreateContact = async () => {
		try {
			const data = await ApiContacList.creaContact(store.agenda, store.name, store.phone, store.email, store.address)
		} catch (error) {

		}
	};
	const inputAble = () => {
		dispatch({ type: 'inputAble', value: false })
	};

	return (
		<div className="text-left mt-2">
			<div className="mmy-input" style={{ visibility: store.visibilityAgenda }}>
				<h1 className="title">Check or Create Agenda</h1>
				<label className="form-label">Create Contac List</label>
				<input type="text" className="form-control inp-agenda"
					placeholder="Check/Create Agenda"
					value={store.agenda} onChange={(e) => dispatch({ type: "addAgenda", value: e.target.value })} />
				<button className="btn btn-primary" type="button"
					onClick={addAgenda} >Check/Create</button>
			</div>
			<div className="contacts" style={{ visibility: store.visibilityContacs }}>
				<h1 className="title">Add New Contact</h1>
				<label className="form-label">Full Name</label>
				<input type="text" className="form-control" placeholder="Full Name"
					value={store.name} onChange={(e) => dispatch({ type: "addName", value: e.target.value })} readOnly={store.disabled} />
				<label className="form-label">Enter Phone</label>
				<input type="text" className="form-control" placeholder="Enter Phone"
					value={store.phone} onChange={(e) => dispatch({ type: "addPhone", value: e.target.value })} readOnly={store.disabled} />
				<label className="form-label">Enter Email</label>
				<input type="text" className="form-control" placeholder="Enter Email"
					value={store.email} onChange={(e) => dispatch({ type: "addEmail", value: e.target.value })} readOnly={store.disabled} />
				<label className="form-label">Enter Address</label>
				<input type="text" className="form-control" placeholder="Enter Adress"
					value={store.address} onChange={(e) => dispatch({ type: "addAddress", value: e.target.value })} readOnly={store.disabled} />
				<button type="button" id="formButton" className="btn btn-primary" onClick={createContact}>Save</button>
			</div>

		</div>
	);
}; 