import { Route, Routes } from "react-router-dom";
import EditEmployee from "./components/EditEmployee";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import AddEmployes from "./components/AddEmployes";
import { useAppContext } from "./context/AppContext";

function App() {
  const { username } = useAppContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addemployee" element={<AddEmployes />} />
        <Route path="/editemployee" element={<EditEmployee />} />
      </Route>
    </Routes>
  );
}

export default App;
