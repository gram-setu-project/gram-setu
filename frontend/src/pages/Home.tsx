
import Navbar from "../components/Navbar.";
import {
  ArrowRight,
  Bell,
  FileText,
  Landmark,
  BriefcaseBusiness,
  CalendarDays,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    title: "Announcements",
    description: "Latest village notices and updates",
    icon: Bell,
    path: "/announcements",
  },
  {
    title: "Submit a Complaint",
    description: "Share local problems and concerns",
    icon: FileText,
    path: "/complaints",
  },
  {
    title: "Government Services",
    description: "Explore useful public services",
    icon: Landmark,
    path: "/services",
  },
  {
    title: "Local Jobs",
    description: "Discover village employment updates",
    icon: BriefcaseBusiness,
    path: "/jobs",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR VILLAGE, CONNECTED
            </span>

            <h1>
              Bridging Villages
              <br />
              with <span>Digital Governance</span>
            </h1>

            <p>
              One platform for village announcements, public
              services, community participation and transparent
              governance.
            </p>

            <div className="hero-actions">
              <Link to="/services" className="primary-button">
                Explore Services <ArrowRight size={18} />
              </Link>

              <Link to="/village-info" className="secondary-button">
                About Our Village
              </Link>
            </div>

            <div className="hero-trust">
              <Users size={19} />
              <span>Connecting citizens and local governance</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="village-illustration">
              <span className="sun">☀</span>
              <span className="hill hill-one" />
              <span className="hill hill-two" />

              <div className="house">
                <div className="roof" />
                <div className="house-body">
                  <span className="window" />
                  <span className="door" />
                </div>
              </div>

              <div className="tree tree-one">
                <span />
              </div>
              <div className="tree tree-two">
                <span />
              </div>
            </div>

            <div className="floating-note">
              <span className="note-icon">
                <Bell size={19} />
              </span>
              <span>
                <strong>Stay Informed</strong>
                <small>Village updates in one place</small>
              </span>
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <Landmark />
            <span>
              <strong>Village First</strong>
              <small>Local governance</small>
            </span>
          </div>
          <div>
            <Users />
            <span>
              <strong>Community</strong>
              <small>Citizen participation</small>
            </span>
          </div>
          <div>
            <CalendarDays />
            <span>
              <strong>Stay Updated</strong>
              <small>Events and notices</small>
            </span>
          </div>
        </section>

        <section className="quick-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EVERYTHING IN ONE PLACE</span>
              <h2>How can we help you?</h2>
              <p>
                Access important village information and services
                with just a few clicks.
              </p>
            </div>

            <Link to="/services" className="text-link">
              View all services <ArrowRight size={17} />
            </Link>
          </div>

          <div className="quick-grid">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.path}
                  className="quick-card"
                  key={item.title}
                >
                  <div className="quick-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="card-link">
                    Explore <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="announcement-section">
          <div>
            <span className="eyebrow">FROM YOUR VILLAGE</span>
            <h2>Latest Announcements</h2>
            <p>
              Important updates and public notices for residents.
            </p>
          </div>

          <div className="announcement-card">
            <div className="announcement-icon">
              <Bell size={22} />
            </div>
            <div>
              <span className="announcement-tag">NOTICE</span>
              <h3>Welcome to Gram Setu</h3>
              <p>
                Your digital gateway to village information,
                community services and local governance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>Gram Setu</strong>
          <p>Connecting communities through digital governance.</p>
        </div>
        <span>Built for a connected village community.</span>
      </footer>
    </>
  );
}
