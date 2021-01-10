import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  if (authState.isAuthenticated) {
    authAxios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${process.env.REACT_APP_TOKEN}`;
      return config;
    });
  }

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log("error code", code);
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
