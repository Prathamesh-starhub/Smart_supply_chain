import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputPage() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    priority: ""
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.source || !form.destination || !form.priority) {
      alert("Fill all fields");
      return;
    }

    navigate("/dashboard", { state: form });
  };

  return (
    <div style={styles.container}>
      <h1>Smart Supply Chain 🌱</h1>

      <input
        placeholder="Source"
        onChange={(e) => setForm({ ...form, source: e.target.value })}
        style={styles.input}
      />

      <input
        placeholder="Destination"
        onChange={(e) => setForm({ ...form, destination: e.target.value })}
        style={styles.input}
      />

      <select
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
        style={styles.input}
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={handleSubmit} style={styles.button}>
        Start Optimization 🚀
      </button>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white"
  },
  input: {
    margin: "10px",
    padding: "10px",
    width: "250px",
    borderRadius: "5px"
  },
  button: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }
};