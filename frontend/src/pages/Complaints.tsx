
import { useState } from "react";
import Navbar from "../components/Navbar.";
import {
  FileText,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Complaint = {
  id: string;
  title: string;
  category: string;
  status: "Submitted" | "In Progress" | "Resolved";
  date: string;
};

const initialComplaints: Complaint[] = [
  {
    id: "GS-1001",
    title: "Street light not working",
    category: "Electricity",
    status: "In Progress",
    date: "2026-10-25",
  },
  {
    id: "GS-1002",
    title: "Garbage collection delay",
    category: "Cleanliness",
    status: "Resolved",
    date: "2026-10-23",
  },
];

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem("gramsetu-complaints");
      return saved ? JSON.parse(saved) as Complaint[] : initialComplaints;
    } catch {
      return initialComplaints;
    }
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Water Supply");
  const [description, setDescription] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [message, setMessage] = useState("");

  function submitComplaint(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const complaint: Complaint = {
      id: `GS-${Date.now().toString().slice(-6)}`,
      title,
      category,
      status: "Submitted",
      date: new Date().toISOString().slice(0, 10),
    };

    const updated = [complaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem("gramsetu-complaints", JSON.stringify(updated));

    setMessage(`Complaint submitted successfully. Your reference ID is ${complaint.id}.`);
    setTitle("");
    setDescription("");
  }

  const trackedComplaint = complaints.find(
    (item) => item.id.toLowerCase() === trackingId.trim().toLowerCase()
  );

  return (
    <>
      <Navbar />

      <main className="complaints-page">
        <section className="complaints-hero">
          <span className="eyebrow">CITIZEN SERVICES</span>
          <h1>Complaints & Grievances</h1>
          <p>
            Report village issues and follow the progress of your complaint.
          </p>
        </section>

        <div className="complaints-grid">
          <section className="complaint-panel">
            <h2><FileText size={22} /> Submit a Complaint</h2>
            <p className="panel-description">
              Provide the details of the issue you want to report.
            </p>

            <form onSubmit={submitComplaint} className="complaint-form">
              <label htmlFor="complaint-title">Complaint title</label>
              <input
                id="complaint-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Street light not working"
                required
                maxLength={100}
              />

              <label htmlFor="complaint-category">Category</label>
              <select
                id="complaint-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option>Water Supply</option>
                <option>Electricity</option>
                <option>Roads</option>
                <option>Cleanliness</option>
                <option>Public Safety</option>
                <option>Other</option>
              </select>

              <label htmlFor="complaint-description">Description</label>
              <textarea
                id="complaint-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the issue and its location..."
                rows={5}
                required
                maxLength={1000}
              />

              <button type="submit" className="primary-button">
                Submit Complaint
              </button>

              {message && <p className="form-success" role="status">{message}</p>}
            </form>
          </section>

          <section className="complaint-panel">
            <h2><Search size={22} /> Track a Complaint</h2>
            <p className="panel-description">
              Enter the reference ID received after submission.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="tracking-form"
            >
              <input
                value={trackingId}
                onChange={(event) => setTrackingId(event.target.value)}
                placeholder="e.g. GS-1001"
                aria-label="Complaint reference ID"
              />
            </form>

            {trackingId.trim() && (
              trackedComplaint ? (
                <div className="tracked-result">
                  <strong>{trackedComplaint.title}</strong>
                  <p>Reference: {trackedComplaint.id}</p>
                  <p>Category: {trackedComplaint.category}</p>
                  <p>Status: <b>{trackedComplaint.status}</b></p>
                </div>
              ) : (
                <p className="panel-description">
                  No matching complaint found in this browser.
                </p>
              )
            )}

            <h3 className="recent-heading">Recent Sample Complaints</h3>

            <div className="complaint-list">
              {complaints.map((item) => (
                <article key={item.id} className="complaint-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.id} · {item.category}</p>
                  </div>

                  <span className={`status status-${item.status.toLowerCase().replace(" ", "-")}`}>
                    {item.status === "Resolved" ? (
                      <CheckCircle size={14} />
                    ) : item.status === "In Progress" ? (
                      <Clock size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    {item.status}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
