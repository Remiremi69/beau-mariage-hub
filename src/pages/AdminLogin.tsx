import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate("/admin");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(26,22,18,0.60)", border: "1px solid rgba(201,169,110,0.20)",
    borderRadius: 2, padding: "14px 18px", fontFamily: "'Jost', sans-serif", fontWeight: 300,
    fontSize: 14, color: "#faf8f4", outline: "none",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.15) 0%, transparent 60%), linear-gradient(160deg, #0d0b08 0%, #1a1612 50%, #231e17 100%)" }}>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <div className="text-center mb-10">
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", marginBottom: 16 }}>
            Administration
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: 36, color: "#faf8f4" }}>
            Limen
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.45)", marginBottom: 6, display: "block" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="admin@limen-mariage.fr" required />
          </div>
          <div>
            <label style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(232,221,208,0.45)", marginBottom: 6, display: "block" }}>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
          </div>

          {error && (
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#ef4444", textAlign: "center" }}>{error}</p>
          )}

          <button type="submit" disabled={loading}
            style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase",
              background: "#c9a96e", color: "#1a1612", padding: "16px 20px", border: "none", borderRadius: 0,
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, marginTop: 8,
            }}>
            {loading ? "CONNEXION..." : "SE CONNECTER"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
