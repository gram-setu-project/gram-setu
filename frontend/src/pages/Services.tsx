
import { useState } from "react";
import Navbar from "../components/Navbar.";
import {
  FileText,
  HeartPulse,
  GraduationCap,
  Sprout,
  Landmark,
  Search,
  ExternalLink,
  ClipboardList,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Income Certificate",
    category: "Certificates",
    description: "Information about applying for an income certificate.",
    eligibility: "Residents meeting the relevant government criteria.",
    documents: ["Identity proof", "Address proof", "Income details"],
    link: "https://aaplesarkar.mahaonline.gov.in/",
    icon: FileText,
  },
  {
    id: 2,
    title: "Caste Certificate",
    category: "Certificates",
    description: "Access information about caste certificate applications.",
    eligibility: "Applicants meeting the applicable eligibility requirements.",
    documents: ["Identity proof", "Address proof", "Supporting caste documents"],
    link: "https://aaplesarkar.mahaonline.gov.in/",
    icon: Landmark,
  },
  {
    id: 3,
    title: "Health Services",
    category: "Health",
    description: "Find information about public healthcare services.",
    eligibility: "Depends on the healthcare scheme or facility.",
    documents: ["Identity proof, if required", "Relevant health records"],
    link: "https://www.mohfw.gov.in/",
    icon: HeartPulse,
  },
  {
    id: 4,
    title: "Education Schemes",
    category: "Education",
    description: "Explore official education schemes and student support.",
    eligibility: "Varies by scheme, course, and applicant category.",
    documents: ["Student details", "Education records", "Scheme-specific documents"],
    link: "https://mahadbt.maharashtra.gov.in/",
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Agriculture Schemes",
    category: "Agriculture",
    description: "Find information about agricultural support programmes.",
    eligibility: "Depends on the specific scheme and farmer eligibility.",
    documents: ["Farmer details", "Land records, if required", "Identity proof"],
    link: "https://pmkisan.gov.in/",
    icon: Sprout,
  },
  {
    id: 6,
    title: "Government Scheme Information",
    category: "Other",
    description: "Explore government services and public welfare programmes.",
    eligibility: "Check the requirements of each individual scheme.",
    documents: ["Varies by service"],
    link: "https://www.india.gov.in/",
    icon: ClipboardList,
  },
];

const categories = [
  "All",
  "Certificates",
  "Health",
  "Education",
  "Agriculture",
  "Other",
];

export default function Services() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || service.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="services-page">
        <section className="services-hero">
          <span className="eyebrow">GOVERNMENT SERVICES</span>
          <h1>Services & Schemes</h1>
          <p>
            Discover public services, understand requirements, and find
            official portals for your applications.
          </p>

          <div className="services-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search services and schemes..."
              aria-label="Search services"
            />
          </div>
        </section>

        <section className="services-content">
          <div className="services-heading">
            <div>
              <h2>Available Services</h2>
              <p>{filteredServices.length} services found</p>
            </div>
          </div>

          <div className="service-filters">
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

          {filteredServices.length === 0 ? (
            <div className="services-empty">
              No services match your search. Try another keyword.
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                const isExpanded = selectedId === service.id;

                return (
                  <article className="service-card" key={service.id}>
                    <div className="service-icon">
                      <Icon size={25} />
                    </div>

                    <span className="service-category">
                      {service.category}
                    </span>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <button
                      className="service-details-button"
                      onClick={() =>
                        setSelectedId(isExpanded ? null : service.id)
                      }
                    >
                      {isExpanded ? "Hide details" : "View requirements"}
                    </button>

                    {isExpanded && (
                      <div className="service-details">
                        <h4>Eligibility</h4>
                        <p>{service.eligibility}</p>

                        <h4>Documents to check</h4>
                        <ul>
                          {service.documents.map((document) => (
                            <li key={document}>{document}</li>
                          ))}
                        </ul>

                        <p className="service-disclaimer">
                          Requirements may change. Confirm the latest
                          requirements with the official department.
                        </p>
                      </div>
                    )}

                    <a
                      className="service-portal-link"
                      href={service.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit official portal <ExternalLink size={15} />
                    </a>
                  </article>
                );
              })}
            </div>
          )}

          <p className="services-disclaimer">
            Gram Setu provides informational links. Application approval,
            eligibility, fees, and document requirements are determined by
            the relevant government department.
          </p>
        </section>
      </main>
    </>
  );
}
