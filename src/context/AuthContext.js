import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const [authState, setAuthState] = useState({
    userInfo: null,
    isAuthenticated,
  });

  const setAuthInfo = () => {
    localStorage.setItem("isAuthenticated", true);
    setAuthState(
      Object.assign({}, authState, {
        isAuthenticated: true,
      })
    );
  };

  const logout = async () => {
    try {
      localStorage.setItem("isAuthenticated", false);
      setAuthState(
        Object.assign({}, authState, {
          isAuthenticated: false,
        })
      );
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: () => setAuthInfo(),
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
