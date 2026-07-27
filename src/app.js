import express from "express";

const tktn = express();

tktn.get("/", (req, res) => {
  res.send(
    "Did you notice what Just happened? You just ran into Luck!🤭 Welcome to TikerTurner.🍀 "
);
});

tktn.use(express.json());

// Routes
// tktn.use("/api/users", userRoutes);

export default tktn;