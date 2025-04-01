
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer, { StoreProvider } from "../hooks/useGlobalReducer";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { ApiContacList } from "./apiContactList";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

export const Single = props => {
  const history = useNavigate();
  const handleNavigate = () => history("/demo");

  const { store } = useGlobalReducer()

  const { theId } = useParams()

  const singleTodo = store.todos.find(todo => todo.id === parseInt(theId));
  let id = parseInt(theId)
  const [formData, setFormData] = useState({
    name: singleTodo.name,
    phone: singleTodo.phone,
    email: singleTodo.email,
    address: singleTodo.address
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateContac = async () => {
    try {
      const data = await ApiContacList.updateContact(store.agenda,
        formData.name,
        formData.phone,
        formData.email,
        formData.address,
        id)
    } catch (error) {
      console.log(error)
    }
  };

  const handlecheckAgenda = async () => {
    try {
      const data = await ApiContacList.checkgenda(store.agenda)
      store.todos = data.contacts;
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteContact = async () => {
    try {
      const data = await ApiContacList.deleteContact(store.agenda, id)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };

  const UpdateContact = async () => {
    await
      handleUpdateContac();
    await
      handlecheckAgenda();
    setTimeout(() => {
      handleNavigate();
    }, 200);
  };

  const deleteContact = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Contact",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await
            handleDeleteContact();
          await
            handlecheckAgenda();
          swal("Poof! Your Contact file has been deleted!", {
            icon: "success",
          });
          setTimeout(() => {
            handleNavigate();
          }, 500);
        } else {
          swal("Your Contact file is safe!");
        }
      });
  };

  return (
    <div className="container  update-container">
      <div className="contacts_update">
        <li
          key={singleTodo.id}
          className="list-group-singleTodo d-flex">
          <div className="picture">
            <div className="subpicture">
              <p className="text-single">{singleTodo.name.slice(0, 1)}</p>
            </div>
          </div>
          <div className="details-single">
            <p className="update"> <input type="text" className="form-control single-update" name="name"
              value={formData.name} id="input-update" onChange={handleChange} /></p>
            <p className="update"> <FaPhone className="svg" /><input type="text" className="form-control single-update" name="phone"
              value={formData.phone} id="input-update" onChange={handleChange} /></p>
            <p className="update"> <MdEmail className="svg" /><input type="text" className="form-control single-update" name="email"
              value={formData.email} id="input-update" onChange={handleChange} /></p>
            <p className="update"> <FaLocationDot className="svg" /><input type="text" className="form-control single-update" name="address"
              value={formData.address} id="input-update" onChange={handleChange} /></p>
          </div>
          <div className="div-btn-single">
            <button className="btn btn-success btn-update"
              onClick={UpdateContact}><FaPencilAlt /></button>
            <button className="btn btn-danger btn-delete"
              onClick={deleteContact}>
              <RiDeleteBin6Fill />
            </button>
          </div>
        </li>
      </div>
      <div className="back-home-single">
        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};


Single.propTypes = {
  match: PropTypes.object
};
