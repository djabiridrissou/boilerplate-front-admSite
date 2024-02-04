import { Route, Routes } from "react-router-dom";
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Dashboard, Layout, Register, ChangePassword, DebtList, Users, IndexUser } from "./routes/routes";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    /* const testApi = async () => {
      try {
        await axios.get(`${server}/`);
      } catch (error) {
        navigate("/");
      }
    };
    testApi(); */
  });

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="debt-system" element={<Layout />}>
            <Route index element={<Dashboard />} />
           
            <Route path="debt-list" element={<DebtList />} />
            <Route path="users" element={<Users />} />
            <Route path="index-users" element={<IndexUser />}>
              <Route path="users" element={<Users />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App;
