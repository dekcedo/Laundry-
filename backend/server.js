const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Tambahkan route users
app.use("/api/users", require("./routes/users")); // ⬅️ ini penting
app.use("/api", require("./routes/auth"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
