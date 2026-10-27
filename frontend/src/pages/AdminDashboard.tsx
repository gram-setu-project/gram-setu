
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.";

import {
  LayoutDashboard,
  Bell,
  FileText,
  Vote,
  Plus,
  Trash2,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

type Notice = {
  id: number;
  title: string;
  category: string;
  description: string;
};

type Complaint = {
  id: string;
  title: string;
  category: string;
  status: string;
  date: string;
};

const sampleNotices: Notice[] = [
  {
    id: 1,
    title: "Gram Sabha Meeting",
    category: "Meetings",
    description: "Village residents are invited to the Gram Sabha meeting.",
  },
  {
    id: 2,
    title: "Village Cleanliness Drive",
    category: "Community",
    description: "Join the upcoming village cleanliness drive.",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Meetings");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("gramsetu-current-user");
      const user = rawUser ? JSON.parse(rawUser) : null;

      if (!user || user.role !== "admin") {
        navigate("/login");
        return;
      }

      const savedNotices = localStorage.getItem("gramsetu-admin-notices");
      setNotices(savedNotices ? JSON.parse(savedNotices) : sampleNotices);

      const savedComplaints = localStorage.getItem("gramsetu-complaints");
      setComplaints(savedComplaints ? JSON.parse(savedComplaints) : []);
      setAuthorized(true);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  function addNotice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const notice: Notice = {
      id: Date.now(),
      title,
      category,
      description,
    };

    const updated = [notice, ...notices];
    setNotices(updated);
    localStorage.setItem("gramsetu-admin-notices", JSON.stringify(updated));
    setTitle("");
    setDescription("");
    setMessage("Announcement added to this browser.");
  }

  function deleteNotice(id: number) {
    const updated = notices.filter((notice) => notice.id !== id);
    setNotices(updated);
    localStorage.setItem("gramsetu-admin-notices", JSON.stringify(updated));
  }

  function updateComplaintStatus(id: string, status: string) {
    const updated = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status } : complaint
    );

    setComplaints(updated);
    localStorage.setItem("gramsetu-complaints", JSON.stringify(updated));
  }

  if (!authorized) return null;

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <section className="admin-heading">
          <div className="admin-heading-icon">
            <ShieldCheck size={28} />
          </div>
          <div>
            <span className="eyebrow">GRAM PANCHAYAT</span>
            <h1>Admin Dashboard</h1>
            <p>Manage community announcements and review complaints.</p>
          </div>
        </section>

        <section className="admin-stats">
          <article>
            <Bell size={23} />
            <span>Total Announcements</span>
            <strong>{notices.length}</strong>
          </article>
          <article>
            <FileText size={23} />
            <span>Total Complaints</span>
            <strong>{complaints.length}</strong>
          </article>
          <article>
            <Vote size={23} />
            <span>Pending Complaints</span>
            <strong>
              {complaints.filter((item) => item.status !== "Resolved").length}
            </strong>
          </article>
        </section>

        <section className="admin-panel">
          <h2><Plus size={21} /> Publish an Announcement</h2>

          <form className="admin-form" onSubmit={addNotice}>
            <label htmlFor="notice-title">Announcement title</label>
            <input
              id="notice-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
              placeholder="Enter announcement title"
            />

            <label htmlFor="notice-category">Category</label>
            <select
              id="notice-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Meetings</option>
              <option>Community</option>
              <option>Schemes</option>
              <option>Public Notice</option>
            </select>

            <label htmlFor="notice-description">Description</label>
            <textarea
              id="notice-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
              maxLength={1000}
              placeholder="Enter announcement details"
            />

            <button className="primary-button" type="submit">
              <Plus size={17} /> Publish Announcement
            </button>

            {message && <p className="form-success">{message}</p>}
          </form>
        </section>

        <section className="admin-panel">
          <h2><Bell size={21} /> Manage Announcements</h2>

          {notices.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
            <div className="admin-list">
              {notices.map((notice) => (
                <article key={notice.id} className="admin-list-item">
                  <div>
                    <strong>{notice.title}</strong>
                    <p>{notice.category} · {notice.description}</p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => deleteNotice(notice.id)}
                    aria-label={`Delete ${notice.title}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="admin-panel">
          <h2><FileText size={21} /> Review Complaints</h2>

          {complaints.length === 0 ? (
            <p>No complaints found in this browser.</p>
          ) : (
            <div className="admin-list">
              {complaints.map((complaint) => (
                <article key={complaint.id} className="admin-list-item">
                  <div>
                    <strong>{complaint.title}</strong>
                    <p>
                      {complaint.id} · {complaint.category} · {complaint.date}
                    </p>
                  </div>

                  <select
                    aria-label={`Status for ${complaint.id}`}
                    value={complaint.status}
                    onChange={(e) =>
                      updateComplaintStatus(complaint.id, e.target.value)
                    }
                  >
                    <option>Submitted</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
