
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Mail, LockKeyhole } from "lucide-react";
import Navbar from "../components/Navbar.";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (name.trim().length < 2) {
  setError("Please enter your full name.");
  return;
}

if (password.length < 8) {
  setError("Password must contain at least 8 characters.");
  return;
}

    const normalizedEmail = email.trim().toLowerCase();

const users = JSON.parse(
  localStorage.getItem("gramsetu-users") || "[]"
);

if (
  users.some(
    (user: { email: string }) =>
      user.email.trim().toLowerCase() === normalizedEmail
  )
) {
  setError("An account with this email already exists.");
  return;
}

    const newUser = {
  name: name.trim(),
  email: normalizedEmail,
  password,
  role: "citizen",
};

    localStorage.setItem(
      "gramsetu-users",
      JSON.stringify([...users, newUser])
    );

    navigate("/login");
  }

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-icon"><UserRound size={27} /></div>
          <span className="eyebrow">JOIN YOUR COMMUNITY</span>
          <h1>Create an account</h1>
          <p>Register to access Gram Setu citizen services.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="register-name">Full name</label>
            <div className="auth-input">
              <UserRound size={18} />
              <input
                id="register-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                maxLength={80}
              />
            </div>

            <label htmlFor="register-email">Email address</label>
            <div className="auth-input">
              <Mail size={18} />
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <label htmlFor="register-password">Password</label>
            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="primary-button auth-submit" type="submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </section>
      </main>
    </>
  );
}
