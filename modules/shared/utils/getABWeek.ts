import { startOfWeekDay } from "@psi/shared/constants/weekdayOptions";

const getABWeek = (date: Date) => {
  const timezoneCompensation = 60 * new Date().getTimezoneOffset();
  const timestamp = ((Number(date) / 1000) >> 0) - timezoneCompensation;

  const phaseSeconds = timestamp % (14 * 24 * 60 * 60);

  const phaseDay = (phaseSeconds / (24 * 60 * 60)) >> 0;

  return phaseDay >= startOfWeekDay && phaseDay < startOfWeekDay + 7
    ? "A"
    : "B";
};

export default getABWeek;
