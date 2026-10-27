
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, LogOut } from "lucide-react";

export default function Navbar() {
    type CurrentUser = {
  name: string;
  email: string;
  role: "citizen" | "admin";
};

const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
const [profileOpen, setProfileOpen] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  function loadUser() {
    try {
      const saved = localStorage.getItem("gramsetu-current-user");
      setCurrentUser(saved ? JSON.parse(saved) : null);
    } catch {
      setCurrentUser(null);
    }
  }

  loadUser();

  window.addEventListener("gramsetu-auth-changed", loadUser);
  window.addEventListener("storage", loadUser);

  return () => {
    window.removeEventListener("gramsetu-auth-changed", loadUser);
    window.removeEventListener("storage", loadUser);
  };
}, []);

function handleLogout() {
  localStorage.removeItem("gramsetu-current-user");
  setCurrentUser(null);
  setProfileOpen(false);
  navigate("/");
}
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">ग्रा</span>
        <span>
          <strong>Gram Setu</strong>
          <small>Digital Bridge for Village Governance</small>
        </span>
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/services">Services</Link>
        <Link to="/complaints">Complaints</Link>
        <Link to="/polls">Polls</Link>
        <Link to="/village-info">Village Info</Link>
        <Link to="/events">Events</Link>
        <Link to="/jobs">Jobs</Link>
      </nav>

     {currentUser ? (
  <div className="profile-menu">
    <button
      type="button"
      className="profile-button"
      onClick={() => setProfileOpen((open) => !open)}
      aria-expanded={profileOpen}
    >
      <UserRound size={20} />
      <span>{currentUser.name}</span>
    </button>

    {profileOpen && (
      <div className="profile-dropdown">
        <p>{currentUser.email}</p>

        <Link
          to={currentUser.role === "admin" ? "/admin" : "/dashboard"}
          onClick={() => setProfileOpen(false)}
        >
          My Dashboard
        </Link>

        <button type="button" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login" className="primary-button">
    Login / Register
  </Link>
)}
    </header>
  );
}
