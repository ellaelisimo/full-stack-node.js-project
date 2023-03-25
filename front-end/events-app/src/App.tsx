import { Navigate, Route, Routes } from "react-router-dom";
import { Events } from "./components/Events";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { Logout } from "./components/Logout";
import { NotFoundPage } from "./components/NotFoundPage";

export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route index element={<Navigate to="/events" />} />
        <Route path="/events" element={<Events />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
