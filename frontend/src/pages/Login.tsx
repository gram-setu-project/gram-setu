
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar.";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Local development demo account only.
// Remove this shortcut before deployment.
if (
  import.meta.env.DEV &&
  email === "admin@gramsetu.local" &&
  password === "AdminDemo123!"
) {
  localStorage.setItem(
    "gramsetu-current-user",
    JSON.stringify({
      name: "Gram Setu Admin",
      email,
      role: "admin",
    })
  );
  window.dispatchEvent(new Event("gramsetu-auth-changed"));


  navigate("/admin");
  return;
}
    setError("");

    const users = JSON.parse(
      localStorage.getItem("gramsetu-users") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

const user = users.find(
  (item: { email: string; password: string }) =>
    item.email.trim().toLowerCase() === normalizedEmail &&
    item.password === password
);

    if (!user) {
      setError("Invalid email or password. Please register first.");
      return;
    }

    localStorage.setItem(
      "gramsetu-current-user",
      JSON.stringify({ name: user.name, email: user.email, role: user.role })
    );

    navigate(user.role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-icon"><LockKeyhole size={27} /></div>
          <span className="eyebrow">WELCOME TO GRAM SETU</span>
          <h1>Login to your account</h1>
          <p>Access village services and community updates.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="login-email">Email address</label>
            <div className="auth-input">
              <Mail size={18} />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="auth-input">
              <LockKeyhole size={18} />
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button className="primary-button auth-submit" type="submit">
              Login <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </section>
      </main>
        </>
  );
}
