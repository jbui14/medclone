import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import karsonRoutes from "./routes/karsonRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Test route to verify server is accessible
app.get("/test", (req, res) => {
  res.json({ message: "Server is accessible!" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/karson", karsonRoutes);
app.use("/api/user", userRoutes);

// Handle the shared records route
app.get("/shared/:shareId", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Shared Medical Records</title>
      </head>
      <body>
        <h1>Shared Medical Records</h1>
        <p>Share ID: ${req.params.shareId}</p>
        <!-- You'll want to replace this with your actual shared records view -->
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
