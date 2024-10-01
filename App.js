import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddUser } from "./Components/AddUser";
import { Dashboard } from "./Components/Dashboard";
import { SideNav } from "./Components/SideNav";
import { Departments } from "./Components/Departments";
import { NotFound } from "./Components/NotFound";
import { Userview } from "./Components/Userview";
import { DeptView } from "./Components/Departments/DeptView";
import Register from "./Components/Register/Register";
import Login from "./Components/Login";

function App() {
  const HideSideNavRoutes = ["/", "/login", "/register"];

  const RenderSideNav = () => {
    const currentPath = window.location.pathname;
    if (!HideSideNavRoutes.includes(currentPath)) {
      return <SideNav />;
    }
    return null;
  };

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Router>
        {RenderSideNav()}
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/userview" element={<Userview />} />
          <Route path="/deptview" element={<DeptView />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
