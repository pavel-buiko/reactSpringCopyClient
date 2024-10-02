import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutAction } from "./store/actions/actions";
import { loginThunk } from "./store/actions/actions";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/test")
      .then((value) => value.json())
      .then((data) => console.log(data.message))
      .catch((message) => {
        throw new Error(message);
      });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(loginThunk(storedUser));
    } else {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  return (
    <BrowserRouter basename="/reactSpringCopy/">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Main />
              </>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
