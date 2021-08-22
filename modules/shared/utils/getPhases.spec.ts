import { frequencyValues } from "@psi/shared/constants/treatmentFrequencies";
import getPhases from "@psi/shared/utils/getPhases";

const {
  SEVEN_DAYS,
  FOURTEEN_DAYS_AB,
  FOURTEEN_DAYS_A,
  FOURTEEN_DAYS_B,
} = frequencyValues;

const HOUR_FORMAT = "HH:mm";

test("getPhases util", () => {
  // UTC is 5 hours ahead of jest timezone
  expect(getPhases(SEVEN_DAYS, "0", "01:00", HOUR_FORMAT)).toEqual([
    { frequency: 1, phase: 21600 },
  ]);
  expect(getPhases(FOURTEEN_DAYS_AB, "0", "01:00", HOUR_FORMAT)).toEqual([
    { frequency: 2, phase: 626400 },
    { frequency: 2, phase: 21600 },
  ]);
  expect(getPhases(FOURTEEN_DAYS_A, "0", "23:00", HOUR_FORMAT)).toEqual([
    { frequency: 2, phase: 705600 },
  ]);
  expect(getPhases(FOURTEEN_DAYS_B, "0", "23:00", HOUR_FORMAT)).toEqual([
    { frequency: 2, phase: 100800 },
  ]);
  expect(getPhases(FOURTEEN_DAYS_A, "6", "23:00", HOUR_FORMAT)).toEqual([
    { frequency: 2, phase: 619200 },
  ]);
  expect(getPhases(FOURTEEN_DAYS_B, "6", "23:00", HOUR_FORMAT)).toEqual([
    { frequency: 2, phase: 14400 },
  ]);

  // invalid hour values should return NaN to enforce correct use
  expect(getPhases(SEVEN_DAYS, "2", "09:60", HOUR_FORMAT)).toEqual([]);
  expect(getPhases(FOURTEEN_DAYS_AB, "4", "24:00", HOUR_FORMAT)).toEqual([]);
});
