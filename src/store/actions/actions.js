import { login, logout, searchTerm as searchType } from "./types";

export const loginThunk = (username, password) => async (dispatch) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(loginAction(data));
      localStorage.setItem("user", JSON.stringify(data));
      return { success: true };
    } else {
      dispatch(loginError(data.message));
      return { success: false, message: data.message };
    }
  } catch (error) {
    dispatch(loginError(error.toString()));
    return { success: false, message: error.toString() };
  }
};

export function setSearchTerm(searchTerm) {
  return {
    type: searchType,
    value: searchTerm,
  };
}

export function logoutAction() {
  return {
    type: logout,
  };
}

export function loginError(message) {
  return {
    type: loginError,
    value: message,
  };
}

export function loginAction(user) {
  return {
    type: login,
    value: user,
  };
}

export function fetchSearchItems(searchTerm) {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/cards?search=${searchTerm}`);
      const data = await response.json();
      dispatch({
        type: "set_filtered_objects",
        value: data,
      });
    } catch (error) {
      alert("Happend error: \n", error);
    }
  };
}
