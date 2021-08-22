import formatHourFromFrequencyAndPhase from "@psi/shared/utils/formatHourFromFrequencyAndPhase";

test("formatHourFromFrequencyAndPhase util", () => {
  expect(formatHourFromFrequencyAndPhase(1, 234000)).toEqual(
    "aos sábados às 12:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 601200)).toEqual(
    "às quartas-feiras de semanas pares às 18:00",
  );
  expect(formatHourFromFrequencyAndPhase(2, 3600)).toEqual(
    "às quartas-feiras de semanas pares às 20:00",
  );
});
