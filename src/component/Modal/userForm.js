import React, { useState, useEffect } from 'react';

export default function UserForm({ isOpen, onClose, onSubmit, user }) {
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: { name: "" },
    website: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: { name: "" },
    website: ""
  });

  useEffect(() => {
    if (user) {
      setNewUser({
        ...user,
        username: `USER-${user.name}`,
        company: { name: user.company.name },
        address: { street: user.address.street, city: user.address.city }
      });
    } else {
      setNewUser({
        id: "",
        name: "",
        email: "",
        phone: "",
        username: "",
        address: { street: "", city: "" },
        company: { name: "" },
        website: ""
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!newUser.name || newUser.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Allow 'www.email.com' type email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!newUser.email || !emailRegex.test(newUser.email)) {
      newErrors.email = "Email is required and must be a valid format";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!newUser.phone || !/^\d{10}$/.test(newUser.phone)) {
      newErrors.phone = "Phone is required and must be a 10-digit number.";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    if (!newUser.username || newUser.username.length < 3) {
      newErrors.username = "Username is required and must be at least 3 characters.";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    if (!newUser.address.street || !newUser.address.city) {
      newErrors.address.street = "Street is required.";
      newErrors.address.city = "City is required.";
      isValid = false;
    } else {
      newErrors.address.street = "";
      newErrors.address.city = "";
    }

    if (newUser.company.name && newUser.company.name.length < 3) {
      newErrors.company.name = "Company name must be at least 3 characters.";
      isValid = false;
    } else {
      newErrors.company.name = "";
    }

    if (newUser.website && !/^(www\.)?[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/i.test(newUser.website)) {
      newErrors.website = "Website must be a valid URL.e.g. www.xyz.com.";
      isValid = false;
    } else {
      newErrors.website = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(newUser);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "street" || name === "city") {
      setNewUser((prevUser) => ({
        ...prevUser,
        address: { ...prevUser.address, [name]: value },
      }));
    } else if (name === "company") {
      setNewUser((prevUser) => ({
        ...prevUser,
        company: { ...prevUser.company, name: value },
      }));
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  return (
    <div style={{
      display: isOpen ? 'block' : 'none',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      width: '400px',
      borderRadius: '8px',
    }}>
      <button onClick={onClose} style={{ float: 'right', marginBottom: '10px', backgroundColor:"transparent", border:"none" }}>X</button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <div>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={newUser.address.street}
              onChange={handleChange}
              className="form-control"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            {errors.address.street && <div style={{ color: 'red' }}>{errors.address.street}</div>}
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={newUser.address.city}
              onChange={handleChange}
              className="form-control"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            {errors.address.city && <div style={{ color: 'red' }}>{errors.address.city}</div>}
          </div>

        </div>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            value={newUser.company.name}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.company.name && <div style={{ color: 'red' }}>{errors.company.name}</div>}
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={newUser.website}
            onChange={handleChange}
            className="form-control"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          {errors.website && <div style={{ color: 'red' }}>{errors.website}</div>}
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Submit
        </button>
      </form>
    </div>
  );
}
