// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { ApiContacList } from "./apiContactList.js";

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  const history = useNavigate();
  const handleNavigate = () => history("/");

  const handlecheckAgenda = async () => {
    try {
      const data = await ApiContacList.checkgenda(store.agenda)
      store.todos = data.contacts;
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteAgenda = async () => {
    try {
      const data = await ApiContacList.deleteAgenda(store.agenda)
    } catch (error) {
    }
  };

  const deleteAgenda = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Agenda",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await
            handleDeleteAgenda();
          await
            handlecheckAgenda();
          swal(`Poof! Agenda ${store.agenda} has been deleted!`, {
            icon: "success",
          });
          dispatch({ type: "visibilityAgenda", value: "visible" });
          dispatch({ type: "visibilityContacts", value: "hidden" });
          handleNavigate();
        } else {
          swal(`Your Agenda ${store.agenda} is safe!`);
        }
      });

  };

  const visibillity = async () => {
    await
      dispatch({ type: "visibilityAgenda", value: "hidden" });
    await
      dispatch({ type: "visibilityContacts", value: "visible" });
    handleNavigate();
  };

  return (
    <div className="container">
      <div className="btn-demo">
        <button className="btn btn-danger btn-d" onClick={deleteAgenda}>
          <RiDeleteBin6Fill /> Delete Agenda
        </button>
        <h1>AGENDA: {store.agenda}    </h1>
        <button className="btn btn-success btn-s" onClick={visibillity}>
          <FaPencilAlt /> Add New Contacts
        </button>
      </div>
      <ul className="list-group">
        {store && store.todos?.map((item) => {
          return (
            <div className="contacts">
              <li
                key={item.id}
                className="list-group-item d-flex "
                style={{ background: item.background }}>
                <div className="picture">
                  <div className="subpicture">
                    <p className="text-subpicture"> {item.name.slice(0, 1)} </p>
                  </div>
                </div>
                <div className="details">
                  <div className="details-total">
                    <h6> {item.name} </h6>
                    <p><FaPhone /> {item.phone}</p>
                    <p><MdEmail />{item.email}</p>
                    <p><FaLocationDot />{item.address}</p>
                  </div>
                  <div className="editDelete-contacts">
                    <Link to={"/single/" + item.id}>
                      <button className="btn btn-success">
                        <FaPencilAlt /> Edit Contact
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
      <br />
      <br />
      <Link to="/">
        <button className="btn btn-primary btn-bh">Back home</button>
      </Link>
    </div>
  );
};
