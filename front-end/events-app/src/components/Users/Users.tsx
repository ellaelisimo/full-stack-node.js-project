import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./User";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <button
        onClick={() => {
          navigate("/users/create");
        }}
      >
        Create User
      </button>

      {users.map((user: any) => (
        <User key={user.id} user={user} />
      ))}
    </>
  );
};
