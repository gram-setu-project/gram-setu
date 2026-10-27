
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar.";
import {
  Bell,
  CalendarDays,
  Search,
  ArrowRight,
  X,
} from "lucide-react";

type Announcement = {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  priority: "Important" | "General";
};

const announcements: Announcement[] = [
  {
    id: 1,
    title: "Gram Sabha Meeting",
    category: "Meetings",
    date: "2026-11-05",
    description:
      "All village residents are invited to attend the Gram Sabha meeting to discuss local development and community priorities.",
    priority: "Important",
  },
  {
    id: 2,
    title: "Village Cleanliness Drive",
    category: "Community",
    date: "2026-11-08",
    description:
      "Residents are encouraged to participate in the village cleanliness drive. Please gather at the Gram Panchayat office.",
    priority: "General",
  },
  {
    id: 3,
    title: "Government Scheme Awareness",
    category: "Schemes",
    date: "2026-11-12",
    description:
      "An awareness session about available government schemes and application procedures will be organized for residents.",
    priority: "General",
  },
  {
    id: 4,
    title: "Water Supply Maintenance",
    category: "Public Notice",
    date: "2026-11-15",
    description:
      "Residents are requested to plan ahead for scheduled water supply maintenance. Confirm timings with the local office.",
    priority: "Important",
  },
];

const categories = [
  "All",
  "Meetings",
  "Community",
  "Schemes",
  "Public Notice",
];

export default function Announcements() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] =
    useState<Announcement | null>(null);

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <Navbar />

      <main className="announcement-page">
        <section className="announcement-hero">
          <span className="eyebrow">GRAM SETU COMMUNITY</span>
          <h1>Announcements & Notices</h1>
          <p>
            Stay informed about village meetings, public notices,
            government schemes, and community activities.
          </p>

          <div className="announcement-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search announcements..."
              aria-label="Search announcements"
            />
          </div>
        </section>

        <section className="announcement-content">
          <div className="announcement-toolbar">
            <div>
              <h2>Latest Updates</h2>
              <p>{filtered.length} announcements found</p>
            </div>

            <div className="category-filters">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "filter active" : "filter"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="announcement-empty">
              No announcements match your search.
            </div>
          ) : (
            <div className="announcement-list">
              {filtered.map((item) => (
                <article className="notice-card" key={item.id}>
                  <div className="notice-icon">
                    <Bell size={23} />
                  </div>

                  <div className="notice-body">
                    <div className="notice-meta">
                      <span className="notice-category">
                        {item.category}
                      </span>
                      {item.priority === "Important" && (
                        <span className="notice-important">
                          Important
                        </span>
                      )}
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className="notice-footer">
                      <span>
                        <CalendarDays size={15} />
                        {new Date(
                          item.date + "T00:00:00"
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <button
                        className="notice-details"
                        onClick={() => setSelected(item)}
                      >
                        Read details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <section
            className="notice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="notice-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close announcement"
            >
              <X size={20} />
            </button>

            <span className="notice-category">
              {selected.category}
            </span>
            <h2 id="notice-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <p className="modal-date">
              Published date: {selected.date}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
