
import { useState } from "react";
import Navbar from "../components/Navbar.";
import { Vote, CheckCircle, Users, Clock } from "lucide-react";

type Poll = {
  id: number;
  question: string;
  description: string;
  options: string[];
  endDate: string;
};

const initialPolls: Poll[] = [
  {
    id: 1,
    question: "Which village development project should be prioritized?",
    description: "Help the Gram Panchayat understand residents' priorities.",
    options: [
      "Road improvement",
      "Clean drinking water",
      "Street lighting",
      "Waste management",
    ],
    endDate: "30 Nov 2026",
  },
  {
    id: 2,
    question: "What is the best time for community meetings?",
    description: "Share your preferred time for future Gram Sabha meetings.",
    options: ["Morning", "Afternoon", "Evening"],
    endDate: "15 Dec 2026",
  },
];

export default function Polls() {
  const [polls] = useState(initialPolls);
  const [votes, setVotes] = useState<Record<number, number[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem("gramsetu-poll-votes") || "{}");
    } catch {
      return {};
    }
  });

  const [selectedOptions, setSelectedOptions] =
    useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [messages, setMessages] = useState<Record<number, string>>({});

  function castVote(pollId: number) {
    const optionIndex = selectedOptions[pollId];

    if (optionIndex === undefined) {
      setMessages((old) => ({
        ...old,
        [pollId]: "Please select an option before voting.",
      }));
      return;
    }

    if (votes[pollId] !== undefined) {
      setMessages((old) => ({
        ...old,
        [pollId]: "You have already voted in this poll on this browser.",
      }));
      return;
    }

    const updated = { ...votes, [pollId]: [optionIndex] };
    setVotes(updated);
    localStorage.setItem("gramsetu-poll-votes", JSON.stringify(updated));
    setMessages((old) => ({
      ...old,
      [pollId]: "Your vote has been recorded in this browser.",
    }));
    setShowResults((old) => ({ ...old, [pollId]: true }));
  }

  function getVoteCount(pollId: number, optionIndex: number) {
    return (votes[pollId] || []).filter(
      (vote) => vote === optionIndex
    ).length;
  }

  return (
    <>
      <Navbar />

      <main className="polls-page">
        <section className="polls-hero">
          <span className="eyebrow">YOUR VOICE MATTERS</span>
          <h1>Community Polls</h1>
          <p>
            Share your opinion on village development and community decisions.
          </p>
        </section>

        <section className="polls-content">
          <div className="polls-heading">
            <div>
              <h2>Active Polls</h2>
              <p>Participate in decisions that affect your community.</p>
            </div>
            <span className="polls-count">
              <Vote size={16} /> {polls.length} polls
            </span>
          </div>

          <div className="polls-grid">
            {polls.map((poll) => {
              const hasVoted = votes[poll.id] !== undefined;
              const totalVotes = (votes[poll.id] || []).length;

              return (
                <article className="poll-card" key={poll.id}>
                  <div className="poll-card-top">
                    <span className="poll-status">Active</span>
                    <span className="poll-votes">
                      <Users size={15} /> {totalVotes} local vote(s)
                    </span>
                  </div>

                  <h3>{poll.question}</h3>
                  <p className="poll-description">{poll.description}</p>

                  <div className="poll-options">
                    {poll.options.map((option, index) => (
                      <label className="poll-option" key={option}>
                        <input
                          type="radio"
                          name={`poll-${poll.id}`}
                          checked={selectedOptions[poll.id] === index}
                          disabled={hasVoted}
                          onChange={() =>
                            setSelectedOptions((old) => ({
                              ...old,
                              [poll.id]: index,
                            }))
                          }
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>

                  {messages[poll.id] && (
                    <p className="poll-message" role="status">
                      {messages[poll.id]}
                    </p>
                  )}

                  <div className="poll-card-footer">
                    <span>
                      <Clock size={15} /> Ends {poll.endDate}
                    </span>

                    <button
                      className="primary-button"
                      disabled={hasVoted}
                      onClick={() => castVote(poll.id)}
                    >
                      {hasVoted ? (
                        <>
                          <CheckCircle size={16} /> Voted
                        </>
                      ) : (
                        "Submit Vote"
                      )}
                    </button>
                  </div>

                  {hasVoted && (
                    <button
                      className="poll-results-button"
                      onClick={() =>
                        setShowResults((old) => ({
                          ...old,
                          [poll.id]: !old[poll.id],
                        }))
                      }
                    >
                      {showResults[poll.id] ? "Hide results" : "View results"}
                    </button>
                  )}

                  {hasVoted && showResults[poll.id] && (
                    <div className="poll-results">
                      <h4>Local demo results</h4>
                      {poll.options.map((option, index) => {
                        const count = getVoteCount(poll.id, index);
                        const percentage =
                          totalVotes === 0 ? 0 : (count / totalVotes) * 100;

                        return (
                          <div className="poll-result" key={option}>
                            <div>
                              <span>{option}</span>
                              <strong>{Math.round(percentage)}%</strong>
                            </div>
                            <div className="poll-progress">
                              <span style={{ width: `${percentage}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
