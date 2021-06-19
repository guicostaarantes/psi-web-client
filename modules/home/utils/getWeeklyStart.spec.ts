import getWeeklyStart from "@psi/home/utils/getWeeklyStart";

test("getWeeklyStart util", () => {
  expect(getWeeklyStart("0", "01:00", "HH:mm")).toEqual(21600);
  expect(getWeeklyStart("0", "23:00", "HH:mm")).toEqual(100800);
  expect(getWeeklyStart("6", "23:00", "HH:mm")).toEqual(14400);

  // invalid hour values should return NaN to enforce correct use
  expect(getWeeklyStart("2", "09:60", "HH:mm")).toEqual(NaN);
  expect(getWeeklyStart("4", "24:00", "HH:mm")).toEqual(NaN);
});
