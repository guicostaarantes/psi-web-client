import valueBetween from "@psi/styleguide/utils/valueBetween";

test("valueBetween util", () => {
  expect(valueBetween({ value: 500, min: -100, max: 600 })).toBe(500);
  expect(valueBetween({ value: -100, min: 0, max: 600 })).toBe(0);
  expect(valueBetween({ value: -200, min: -1000, max: -600 })).toBe(-600);
});
