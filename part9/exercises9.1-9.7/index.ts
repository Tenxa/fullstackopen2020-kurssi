import express from "express";
import { parseAndCalculateBMI } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = parseAndCalculateBMI(height, weight);
    res.send({ height, weight, bmi });
  } catch (error) {
    res.send({ error: "malformatted parameters"})
  }
  
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});