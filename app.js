import express from "express";
import parentRoute from "./routes/parent.route.js";
import childrenRoute from "./routes/children.route.js";

const app = express();

app.use(express.json());
app.use(parentRoute);
app.use(childrenRoute);

app.get("/", (req, res) => {
  res.send("welcome to parent child user system");
});

export default app;
