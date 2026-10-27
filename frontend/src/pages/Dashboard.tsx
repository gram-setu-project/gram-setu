
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  UserRound,
  FileText,
  Bell,
  Landmark,
  CalendarDays,
  ArrowRight,
  LogOut,
} from "lucide-react";
import Navbar from "../components/Navbar.";

type User = {
  name: string;
  email: string;
  role: string;
};

const dashboardLinks = [
  {
    title: "My Complaints",
    description: "Submit and track local issues.",
    icon: FileText,
    path: "/complaints",
  },
  {
    title: "Announcements",
    description: "Read village notices and updates.",
    icon: Bell,
    path: "/announcements",
  },
  {
    title: "Village Services",
    description: "Explore available public services.",
    icon: Landmark,
    path: "/services",
  },
  {
    title: "Events & Calendar",
    description: "Stay updated on community events.",
    icon: CalendarDays,
    path: "/calendar",
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("gramsetu-current-user");

    if (!saved) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(saved) as User);
    } catch {
      localStorage.removeItem("gramsetu-current-user");
      navigate("/login");
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem("gramsetu-current-user");
    navigate("/login");
  }

  if (!user) return null;

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-welcome">
          <div className="dashboard-avatar">
            <UserRound size={28} />
          </div>

          <div>
            <span className="eyebrow">CITIZEN PORTAL</span>
            <h1>Welcome, {user.name}!</h1>
            <p>
              Access your village services, complaints and community updates.
            </p>
          </div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={17} /> Logout
          </button>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <h2>Your Services</h2>
              <p>Choose a module to continue.</p>
            </div>
          </div>

          <div className="dashboard-grid">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.path}
                  className="dashboard-card"
                  key={item.title}
                >
                  <div className="dashboard-card-icon">
                    <Icon size={23} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <span>
                    Open module <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="dashboard-profile">
          <h2>Profile Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account type:</strong> Citizen</p>
        </section>
      </main>
    </>
  );
}
