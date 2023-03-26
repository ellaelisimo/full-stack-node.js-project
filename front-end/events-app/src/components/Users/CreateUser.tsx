import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  const [user, setUser] = useState<any>({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    age: "",
    event_ids: [],
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/events", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const handleChange = (e: any) => {
    let newUser = { ...user, [e.target.name]: e.target.value };

    if (e.target.name === "date_of_birth") {
      const age =
        new Date().getFullYear() - new Date(e.target.value).getFullYear();
      newUser = { ...newUser, age: age };
    }

    if (e.target.name === "events") {
      const event_ids = Array.from(e.selectedOptions).map((option: any) =>
        parseInt(option.value)
      );
      console.log(event_ids);

      delete newUser.events;
      newUser = { ...newUser, event_ids };
    }

    setUser(newUser);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users", user, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response); //
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <label htmlFor="surname">Surname</label>
        <input
          type="text"
          name="surname"
          value={user.surname}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={user.date_of_birth}
          onChange={handleChange}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={user.age}
          readOnly
          onChange={handleChange}
        />

        <label htmlFor="events">Events</label>
        <select name="events" multiple onChange={handleChange}>
          {events.map((event: any) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>

        <button>Create User</button>
      </form>
    </>
  );
};
