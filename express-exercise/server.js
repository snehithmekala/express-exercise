const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/feedback", (req, res) => {
  const { name, feedback } = req.body ?? {};
  if (!name || !feedback) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }
  res.status(201).json({ success: true, user: name, feedback });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
