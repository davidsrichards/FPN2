
import Download from "./DashBoard/Component/MainPage/Download/Download";
import MainPage from "./DashBoard/Component/MainPage/MainPage";
import DashBoard from "./DashBoard/DashBoard";
import Login from "./Login/Login";
import { Routes, Route } from "react-router-dom";

function Components() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />}>
      <Route path="download" element={<Download/>}/>
      <Route index element={<MainPage/>}/>
      </Route>
    </Routes>
  );
}

export default Components;
