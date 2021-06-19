import formatWeeklyHour from "@psi/home/utils/formatWeeklyHour";

test("formatWeeklyHour util", () => {
  expect(formatWeeklyHour(234000)).toEqual("toda terça-feira às 17:00");
  expect(formatWeeklyHour(547200)).toEqual("todo sábado às 08:00");
});
