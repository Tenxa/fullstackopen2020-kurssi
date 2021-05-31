
type RatingDescription = "Weak" | "Almost" | "Well done";

interface excersiceResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}



const calculateExercises = (target: number, exercises: Array<number>): excersiceResults => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(arg => arg > 0).length;
  const average = ((exercises.reduce((a, b) => a + b, 0)) / periodLength);

  let rating = 3;
  let ratingDescription: RatingDescription = "Well done";
  if (average - target < 0 && average - target >= -0.5) {
    rating = 2;
    ratingDescription = "Almost";
  }
  if (average - target < -0.5) {
    rating = 1;
    ratingDescription = "Weak";
  }
  const success = average >= target;

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating,
    ratingDescription,
    target,
    average: average,
  };
};


export const parseExcerciseArguments = (target: unknown, exercises: unknown[]) => {
  if (!target || exercises.length === 0 || !exercises) throw new Error("parameters missing");
  
  const parsedTarget = Number(target);
  const parsedExercises = exercises.map((e) => Number(e));

  if (Number.isNaN(parsedTarget) || parsedExercises.some((e) => isNaN(e))) throw new Error("malformatted parameters");
  
  return calculateExercises(parsedTarget, parsedExercises);
};

if (process.argv.length > 2) {
  const [, , target, ...exercises] = process.argv;
  console.log(parseExcerciseArguments(target, exercises));
}