
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Announcements from "./pages/Announcements";
import Complaints from "./pages/Complaints";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Polls from "./pages/Polls";
import VillageInfo from "./pages/VillageInfo";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";


const moduleNames: Record<string, string> = {
  login: "Login",
  register: "Register",
  dashboard: "Citizen Dashboard",
  announcements: "Announcements",
  complaints: "Complaints & Tracking",
  polls: "Community Polls",
  "village-info": "Village Information",
  services: "Village Services",
  calendar: "Calendar & Events",
  chatbot: "AI Chatbot",
  "plant-disease": "Plant Disease Detection",
  admin: "Admin Dashboard",
};

function ModulePlaceholder({ title }: { title: string }) {
  return (
    <main className="module-page">
      <h1>{title}</h1>
      <p>
        This Gram Setu module will be implemented in the next stage.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/announcements"
    element={<Announcements />}
  />

  <Route path="/complaints" element={<Complaints />} />

  <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/polls" element={<Polls />} />
<Route path="/village-info" element={<VillageInfo />} />
<Route path="/services" element={<Services />} />
<Route path="/events" element={<Events />} />
<Route path="/jobs" element={<Jobs />} />

  {Object.entries(moduleNames)
    .filter(([path]) => path !== "announcements")
    .map(([path, title]) => (
      <Route
        key={path}
        path={`/${path}`}
        element={<ModulePlaceholder title={title} />}
      />
    ))}
</Routes>
    </BrowserRouter>
  );
}
