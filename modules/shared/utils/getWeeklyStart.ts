import { parse, subMinutes } from "date-fns";

const secondsInOneDay = 24 * 60 * 60;
const secondsInOneWeek = 7 * secondsInOneDay;

const getWeeklyStart = (
  weekday: string,
  startString: string,
  hourFormat: string,
) => {
  const weekdayContribution = secondsInOneDay * Number(weekday);

  const startContribution =
    (Number(
      subMinutes(
        parse(startString, hourFormat, new Date()),
        new Date().getTimezoneOffset(),
      ),
    ) %
      (1000 * secondsInOneDay)) /
    1000;

  const timezoneCompensation = 60 * new Date().getTimezoneOffset();

  return (
    (weekdayContribution + startContribution + timezoneCompensation) %
    secondsInOneWeek
  );
};

export default getWeeklyStart;
