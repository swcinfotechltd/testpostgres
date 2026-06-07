import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/users", form);

    setForm({
      name: "",
      email: "",
    });

    loadUsers();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Prisma PostgreSQL Test App</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">Add User</button>
      </form>

      <hr />

      <h3>User List</h3>

      {users.map((u) => (
        <div key={u.id}>
          {u.id}. {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}

export default App;