import React, { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLogged, setIsLogged] = React.useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setCurrentUser(res);
        } else {
          setIsLogged(false);
          setCurrentUser(null);
        }
      })
      .catch(({ message: globalContextError }) => {
        console.log({ globalContextError });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLogged,
        setIsLogged,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
