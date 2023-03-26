import { Navigate, Route, Routes } from "react-router-dom";
import { EventDetails, Events } from "./components/Events";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { Logout } from "./components/Logout";
import { NotFoundPage } from "./components/NotFoundPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { CreateUser, Users } from "./components/Users";

export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route index element={<Navigate to="/events" />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <PrivateRoute>
              <CreateUser />
            </PrivateRoute>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
