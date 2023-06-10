const bodyCalculator = {
  bmi: (weight: number, height: number) => {
    // Function to calculate Body Mass Index weight in kg height in cm
    // Formula: weight (kg) / [height (m)]2
    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter * heightInMeter);
    return bmi.toFixed(2);
  },
  bsa: (weight: number, height: number) => {
    // Function to calculate Body Surface Area weight in kg height in cm
    // Formula: 0.007184 x Height(cm)0.725 x Weight(kg)0.425
    const bsa = 0.007184 * height ** 0.725 * weight ** 0.425;
    return bsa.toFixed(2);
  },
};

export default bodyCalculator;
