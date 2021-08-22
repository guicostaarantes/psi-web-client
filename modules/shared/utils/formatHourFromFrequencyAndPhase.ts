const weekdays = [
  "aos domingos",
  "às segundas-feiras",
  "às terças-feiras",
  "às quartas-feiras",
  "às quintas-feiras",
  "às sextas-feiras",
  "aos sábados",
];

const formatHourFromFrequencyAndPhase = (frequency: number, phase: number) => {
  const date = new Date(1000 * phase);

  const day = date.getDay();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  let week = "";

  if (frequency === 2) {
    const timezoneCompensation = 60 * new Date().getTimezoneOffset();
    const secondsInOneDay = 24 * 60 * 60;

    const minimumWeekEven = 3 * secondsInOneDay + timezoneCompensation;
    const maximumWeekEven = 10 * secondsInOneDay + timezoneCompensation;

    const isAbsoluteWeekEven =
      phase >= minimumWeekEven && phase < maximumWeekEven;

    week = isAbsoluteWeekEven ? " de semanas A" : " de semanas B";
  }

  return `${weekdays[day]}${week} às ${hour}:${minute}`;
};

export default formatHourFromFrequencyAndPhase;
