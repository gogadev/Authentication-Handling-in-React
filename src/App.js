import React, { useState, useEffect, useCallback } from "react";

import { AuthContext } from "./context/context";

import Header from "./components/header/Header";
import Authentication from "./components/authentication/Authentication";
import ProtectedPage from "./components/protected-page/ProtectedPage";

import "./App.css";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationTime) => {
    setToken(token);
    const expiration =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        expirationTime: expiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expirationTime) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expirationTime));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Header />
      <Authentication />
      <ProtectedPage />
    </AuthContext.Provider>
  );
};

export default App;
