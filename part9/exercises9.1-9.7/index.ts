import express = require("express");
import { parseAndCalculateBMI } from "./bmiCalculator";
import { parseExcerciseArguments } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = parseAndCalculateBMI(String(height), String(weight));
    res.json({ height, weight, bmi });
  } catch (error) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  try {
    res.json(parseExcerciseArguments(target, daily_exercises));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: String(error.message) });
  }
  
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});