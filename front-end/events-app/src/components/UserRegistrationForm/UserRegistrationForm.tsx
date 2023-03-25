import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const UserRegistrationForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/users", {
        name,
        surname,
        email,
        dateOfBirth,
        age,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          return <Navigate to={"/events"} />;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="surname">Surname</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(event) => setSurname(event.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input
        type="text"
        id="dateOfBirth"
        value={dateOfBirth}
        onChange={(event) => setDateOfBirth(event.target.value)}
      />

      <label htmlFor="age">Age</label>
      <input
        type="text"
        id="age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
};
