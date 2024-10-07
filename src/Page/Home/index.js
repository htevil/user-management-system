import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'; // Import the Link component
import Form from '../../component/Modal/userForm';
import { getUser } from '../../Api/User';
import { addUser, filterUser, removeUser, setUser } from '../../slice/userSlice/UserSlice';
import info from '../../asset/info.png'; // Adjust the path to your image

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  console.log(users);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmitUser = (newUser) => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...selectedUser, ...newUser } : user
      );
      dispatch(setUser(updatedUsers));
      alert("User details have been updated!");
    } else {
      // Create a new user and add it to the list
      const newUserWithId = { id: users.length + 1, ...newUser };
      dispatch(addUser(newUserWithId));
      alert("New User has been added!");
    }
    handleCloseModal();
  };

  const handleDeleteUser = (user) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      console.log(user);
      dispatch(removeUser(user));
      alert("User has been deleted!");
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();  // Get the input value and convert it to lowercase
    dispatch(filterUser(value));
  };

  return (
    <div className='Container' style={{ width: "100%", maxWidth: "1560px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px 25px" }}>
      <h1 className="heading" style={{ marginBottom: "25px" }}>Users Management System</h1>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "2px solid #B2B2B2", borderRadius: "4px" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 50px" }}>
          <button className="btn btn-secondary" onClick={() => handleOpenModal()}>Add +</button>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "16px" }}>Filter:</span>
            <input type='text' placeholder="Search name" onChange={handleFilter} style={{ padding: "4px 25px", borderRadius: "4px" }} />
          </div>
        </div>

        <div style={{ width: "100%", borderTop: "2px solid #D8D9DA" }}>
          <table className="table table-striped px-2 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Address</th>
                <th>Company Name</th>
                <th>Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.username}</td>
                  <td>{user.address.street}, {user.address.city}</td>
                  <td>{user.company.name}</td>
                  <td>{user.website}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleOpenModal(user)}>Edit</button>
                    <Link 
                      to={{
                        pathname: `/Detail/${user.username}`,
                        state: { user }
                      }} 
                      className="btn btn-sm btn-secondary me-2"
                    >
                      <img src={info} alt="info" style={{width:"20px", display:"flex", justifyContent:"center", alignContent:"center"}} />
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <Form
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onSubmit={handleSubmitUser}
        />
      )}
    </div>
  );
}
