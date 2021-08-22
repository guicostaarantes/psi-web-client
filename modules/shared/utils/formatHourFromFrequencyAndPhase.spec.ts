import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";

test("formatHourFromFrequencyAndPhase util", () => {
  expect(formatHourFromFrequencyAndPhase(1, 234000)).toEqual(
    "aos sábados às 12:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 601200)).toEqual(
    "às quartas-feiras de semanas A às 18:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 1206000)).toEqual(
    "às quartas-feiras de semanas B às 18:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 277140)).toEqual(
    "aos sábados de semanas B às 23:59",
  );
  expect(formatHourFromFrequencyAndPhase(2, 277200)).toEqual(
    "aos domingos de semanas A às 00:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 3600)).toEqual(
    "às quartas-feiras de semanas B às 20:00",
  );
});
