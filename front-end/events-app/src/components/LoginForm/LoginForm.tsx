import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value);
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", { name: name, password: password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        // props.history.push("/events");
        navigate("/events");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // props.history.push("/events");
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input value={password} onChange={handlePasswordChange} />

        <button>Login</button>
      </form>
    </>
  );
};
