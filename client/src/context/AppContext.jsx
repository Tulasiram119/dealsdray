import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default function AppcontextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [employes, setEmployes] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  useEffect(() => {
    const data = localStorage.getItem("token");
    setUsername(data?.username);
  }, []);
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        employes,
        setEmployes,
        selectedEmployee,
        setSelectedEmployee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
