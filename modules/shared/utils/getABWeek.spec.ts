import getABWeek from "@psi/shared/utils/getABWeek";

test("getABWeek util", () => {
  expect(getABWeek(new Date(2021, 7, 21, 23, 59))).toBe("B");
  expect(getABWeek(new Date(2021, 7, 22))).toBe("A");
});
