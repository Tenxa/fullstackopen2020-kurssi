
interface bmiValues {
  height: number;
  weight: number;
}

const calculateBmi = (cm: number, kg: number): string => {
  const m = cm * 0.01;
  const squareM = m * m;
  const result = kg / squareM;
  const fixedRes = result.toFixed(2);

  switch (true) {
    case (result > 0 && result < 15):
      return `BMI: ${fixedRes}, Very severely underweight`;
    case (result >= 15 && result < 16):
      return `BMI: ${fixedRes}, Severely underweight`;
    case (result >= 16 && result < 18.5):
      return `BMI: ${fixedRes}, Underweight`;
    case (result >= 18.5 && result < 25):
      return `BMI: ${fixedRes}, Normal`;
    case (result >= 25 && result < 30):
      return `BMI: ${fixedRes}, Overweight`;
    case (result >= 30 && result < 35):
      return `BMI: ${fixedRes}, Obese Class I (Moderately obese)`;
    case (result >= 35 && result < 40):
      return `BMI: ${fixedRes}, Obese Class II (Severely obese)`;
    case (result >= 40):
      return `BMI: ${fixedRes}, Obese Class III (Very severely obese)`;
  }
}

const parseBmiArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
