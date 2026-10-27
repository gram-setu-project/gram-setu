
import { useState } from "react";
import Navbar from "../components/Navbar.";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Search,
} from "lucide-react";

type VillageEvent = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

const events: VillageEvent[] = [
  {
    id: 1,
    title: "Gram Sabha Meeting",
    category: "Meetings",
    date: "2026-11-05",
    time: "10:00 AM",
    location: "Gram Panchayat Office",
    description:
      "Discuss village development priorities and community concerns.",
  },
  {
    id: 2,
    title: "Village Cleanliness Drive",
    category: "Community",
    date: "2026-11-09",
    time: "8:00 AM",
    location: "Village Community Hall",
    description:
      "Residents are invited to participate in the village cleanliness drive.",
  },
  {
    id: 3,
    title: "Health Awareness Camp",
    category: "Health",
    date: "2026-11-15",
    time: "9:00 AM",
    location: "Primary Health Centre",
    description:
      "A sample community health awareness event. Confirm details locally.",
  },
  {
    id: 4,
    title: "Farmers Information Session",
    category: "Agriculture",
    date: "2026-11-20",
    time: "11:00 AM",
    location: "Community Hall",
    description:
      "Learn about agricultural schemes and available farmer resources.",
  },
];

const filters = [
  "All",
  "Meetings",
  "Community",
  "Health",
  "Agriculture",
];

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      return (
        matchesSearch &&
        (category === "All" || event.category === category)
      );
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <Navbar />

      <main className="events-page">
        <section className="events-hero">
          <span className="eyebrow">STAY CONNECTED</span>
          <h1>Community Calendar & Events</h1>
          <p>
            Stay informed about Gram Sabha meetings, public activities,
            health camps, and village programmes.
          </p>

          <div className="events-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search events..."
              aria-label="Search events"
            />
          </div>
        </section>

        <section className="events-content">
          <div className="events-heading">
            <div>
              <h2>Upcoming Events</h2>
              <p>{filteredEvents.length} events found</p>
            </div>
            <div className="events-heading-icon">
              <CalendarDays size={24} />
            </div>
          </div>

          <div className="events-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={category === filter ? "active" : ""}
                onClick={() => setCategory(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="events-empty">
              No events match your search.
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <div className="event-card-top">
                    <span className="event-category">
                      {event.category}
                    </span>
                    <CalendarDays size={21} />
                  </div>

                  <h3>{event.title}</h3>
                  <p className="event-description">
                    {event.description}
                  </p>

                  <div className="event-detail">
                    <CalendarDays size={16} />
                    <span>
                      {new Date(
                        `${event.date}T12:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="event-detail">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>

                  <div className="event-detail">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>

                  <div className="event-card-footer">
                    <Users size={16} />
                    <span>Community event</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="events-note">
            These are sample events for frontend testing. Confirm actual
            dates, timings, and locations with the Gram Panchayat before
            publishing them as official announcements.
          </p>
        </section>
      </main>
    </>
  );
}
