import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <nav>
      {/* <NavLink to={"/events"}>Events</NavLink> */}
      <NavLink to={"/logout"}>Logout</NavLink>
    </nav>
  );
};
