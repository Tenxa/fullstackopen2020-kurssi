
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
  }
}

const parseArguments = (args: Array<string>) => {
  let arr: number[] = [];
  args.splice(0, 2)
  args.forEach(e => {
    if (isNaN(Number(e))) {
      throw new Error("Provided values were not numbers!");
    } else {
      arr.push(Number(e))
    }
  });
  
  return calculateExercises(Number(arr.shift()), arr)
}

if (process.argv.length > 2) {
  console.log(parseArguments(process.argv))
}