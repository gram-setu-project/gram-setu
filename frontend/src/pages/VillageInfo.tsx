
import Navbar from "../components/Navbar.";
import {
  MapPin,
  Users,
  Building2,
  Phone,
  Mail,
  Clock,
  Landmark,
  Sprout,
} from "lucide-react";

const officials = [
  {
    role: "Sarpanch",
    name: "Village Sarpanch",
    description: "Elected village head",
  },
  {
    role: "Gram Sevak",
    name: "Gram Panchayat Secretary",
    description: "Village administration and records",
  },
  {
    role: "Ward Representative",
    name: "Ward Member",
    description: "Community representation",
  },
];

const facilities = [
  "Gram Panchayat Office",
  "Government School",
  "Primary Health Centre",
  "Community Hall",
  "Public Water Supply",
  "Village Library",
];

export default function VillageInfo() {
  return (
    <>
      <Navbar />

      <main className="village-page">
        <section className="village-hero">
          <span className="eyebrow">DISCOVER YOUR COMMUNITY</span>
          <h1>Village Information</h1>
          <p>
            Learn about village governance, local facilities, public offices,
            and community resources.
          </p>

          <div className="village-location">
            <MapPin size={18} />
            <span>Village Profile · Maharashtra, India</span>
          </div>
        </section>

        <section className="village-content">
          <div className="village-intro">
            <div className="village-intro-icon">
              <Landmark size={32} />
            </div>
            <div>
              <h2>About Our Village</h2>
              <p>
                Gram Setu connects residents with village information,
                Panchayat services, community updates, and local governance.
                Use this page to learn about local facilities and
                administrative contacts.
              </p>
              <p className="demo-note">
                Demonstration content — replace it with verified information
                for your actual village.
              </p>
            </div>
          </div>

          <div className="village-stats">
            <article>
              <Users size={24} />
              <strong>—</strong>
              <span>Population</span>
            </article>
            <article>
              <Building2 size={24} />
              <strong>{facilities.length}</strong>
              <span>Sample Facilities</span>
            </article>
            <article>
              <Sprout size={24} />
              <strong>Village</strong>
              <span>Community</span>
            </article>
          </div>

          <section className="village-section">
            <div className="village-section-heading">
              <div>
                <span className="eyebrow">LOCAL GOVERNANCE</span>
                <h2>Panchayat Officials</h2>
              </div>
            </div>

            <div className="officials-grid">
              {officials.map((official) => (
                <article className="official-card" key={official.role}>
                  <div className="official-icon">
                    <Users size={24} />
                  </div>
                  <span>{official.role}</span>
                  <h3>{official.name}</h3>
                  <p>{official.description}</p>
                  <p className="demo-note">
                    Add verified name and contact details
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="village-section">
            <span className="eyebrow">PUBLIC INFRASTRUCTURE</span>
            <h2>Village Facilities</h2>

            <div className="facilities-grid">
              {facilities.map((facility) => (
                <article className="facility-card" key={facility}>
                  <Building2 size={21} />
                  <span>{facility}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="village-section">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Important Contacts</h2>

            <div className="contact-grid">
              <article className="contact-card">
                <Phone size={22} />
                <h3>Gram Panchayat Office</h3>
                <p>Contact number to be added</p>
              </article>
              <article className="contact-card">
                <Mail size={22} />
                <h3>Email</h3>
                <p>Email address to be added</p>
              </article>
              <article className="contact-card">
                <Clock size={22} />
                <h3>Office Hours</h3>
                <p>Confirm timings with your local Panchayat</p>
              </article>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
