import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Detail() {
  const { username } = useParams();  // Get username from the URL
  const { users } = useSelector((state) => state.users);  // Get users from Redux store
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = users.find((user) => user.username === username);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [username, users]);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={{ padding: '20px',display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"15px", border: "2px solid #B2B2B2", borderRadius: "4px", margin: "50px" }}>
      <h3>User Details</h3>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Website:</strong> {user.website}</p>
      </div>

    </div>
  );
}
