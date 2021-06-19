import formatWeeklyHour from "@psi/home/utils/formatWeeklyHour";

test("formatWeeklyHour util", () => {
  expect(formatWeeklyHour(234000)).toEqual("toda terça-feira às 12:00");
  expect(formatWeeklyHour(601200)).toEqual("todo sábado às 18:00");
  expect(formatWeeklyHour(3600)).toEqual("todo sábado às 20:00");
});
