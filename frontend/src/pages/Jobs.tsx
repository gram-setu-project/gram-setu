
import { useState } from "react";
import Navbar from "../components/Navbar.";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Clock,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  organization: string;
  location: string;
  type: string;
  qualification: string;
  description: string;
  category: string;
  applyUrl: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Agriculture Field Assistant",
    organization: "Sample Agriculture Opportunity",
    location: "Village / Nearby Area",
    type: "Full-time",
    qualification: "Relevant agriculture qualification or experience",
    description:
      "Support agricultural activities, farmer awareness, and field coordination.",
    category: "Agriculture",
    applyUrl: "https://www.ncs.gov.in/",
  },
  {
    id: 2,
    title: "Computer Operator",
    organization: "Sample Office Opportunity",
    location: "Nearby Area",
    type: "Full-time",
    qualification: "Basic computer skills and data entry",
    description:
      "Assist with documentation, data entry, and routine office work.",
    category: "Office",
    applyUrl: "https://www.ncs.gov.in/",
  },
  {
    id: 3,
    title: "Teaching Assistant",
    organization: "Sample Education Opportunity",
    location: "Village / Nearby Area",
    type: "Part-time",
    qualification: "Relevant education qualification",
    description:
      "Support educational activities and student learning programmes.",
    category: "Education",
    applyUrl: "https://www.ncs.gov.in/",
  },
  {
    id: 4,
    title: "Skilled Trades Worker",
    organization: "Sample Technical Opportunity",
    location: "Nearby Area",
    type: "Contract",
    qualification: "Relevant technical skills or training",
    description:
      "Explore local technical work and skilled trade opportunities.",
    category: "Technical",
    applyUrl: "https://www.ncs.gov.in/",
  },
];

const categories = [
  "All",
  "Agriculture",
  "Office",
  "Education",
  "Technical",
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const query = search.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(query) ||
      job.organization.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query);

    return (
      matchesSearch &&
      (category === "All" || job.category === category)
    );
  });

  return (
    <>
      <Navbar />

      <main className="jobs-page">
        <section className="jobs-hero">
          <span className="eyebrow">BUILD YOUR FUTURE</span>
          <h1>Jobs & Opportunities</h1>
          <p>
            Explore local employment opportunities, skill-based work,
            and career resources for your community.
          </p>

          <div className="jobs-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs or locations..."
              aria-label="Search jobs"
            />
          </div>
        </section>

        <section className="jobs-content">
          <div className="jobs-heading">
            <div>
              <h2>Explore Opportunities</h2>
              <p>{filteredJobs.length} opportunities found</p>
            </div>
            <BriefcaseBusiness size={27} />
          </div>

          <div className="jobs-filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredJobs.length === 0 ? (
            <div className="jobs-empty">
              No opportunities match your search.
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <article className="job-card" key={job.id}>
                  <div className="job-card-top">
                    <div className="job-icon">
                      <BriefcaseBusiness size={23} />
                    </div>
                    <span className="job-type">{job.type}</span>
                  </div>

                  <h3>{job.title}</h3>
                  <p className="job-organization">{job.organization}</p>
                  <p className="job-description">{job.description}</p>

                  <div className="job-detail">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>

                  <div className="job-detail">
                    <GraduationCap size={16} />
                    <span>{job.qualification}</span>
                  </div>

                  <div className="job-detail">
                    <Clock size={16} />
                    <span>Check the official listing for deadlines</span>
                  </div>

                  <a
                    className="job-apply-link"
                    href={job.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find opportunities <ExternalLink size={15} />
                  </a>
                </article>
              ))}
            </div>
          )}

          <p className="jobs-note">
            These are demonstration listings, not verified vacancies.
            Check the official recruitment notice, eligibility, employer,
            and deadline before applying.
          </p>
        </section>
      </main>
    </>
  );
}
