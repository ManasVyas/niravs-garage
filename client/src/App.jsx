import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserView } from "./features/user/UserView";
import { AppointmentView } from "./features/appointment/AppointmentView";
import { GarageView } from "./features/garage/GarageView";
import { ReportView } from "./features/report/ReportView";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./components/home/Home";
import { About } from "./components/about/About";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { NotFound } from "./components/404/NotFound";
import { Profile } from "./components/user/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/users" element={<UserView />} exact />
        <Route path="/appointment" element={<AppointmentView />} exact />
        <Route path="/garage" element={<GarageView />} exact />
        <Route path="/report" element={<ReportView />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/profile" element={<Profile />} exact />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
