import { parse, subMinutes } from "date-fns";

import treatmentFrequencies, {
  frequencyValues,
} from "@psi/shared/constants/treatmentFrequencies";

const secondsInOneDay = 24 * 60 * 60;
const secondsInOneWeek = 7 * secondsInOneDay;

const getPhases = (
  frequency: frequencyValues,
  weekday: string,
  startString: string,
  hourFormat: string,
) => {
  const result: { frequency: number; phase: number }[] = [];

  const { params } = treatmentFrequencies.find(
    (freq) => freq.value === Number(frequency),
  );

  const timezoneCompensation = 60 * new Date().getTimezoneOffset();

  for (const param of params) {
    const weekdayContribution = secondsInOneDay * Number(weekday);

    const frequencyContribution = param.phase;

    const phaseContribution =
      (Number(
        subMinutes(
          parse(startString, hourFormat, new Date()),
          new Date().getTimezoneOffset(),
        ),
      ) %
        (1000 * secondsInOneDay)) /
      1000;

    if (phaseContribution) {
      result.push({
        frequency: param.frequency,
        phase:
          (weekdayContribution +
            frequencyContribution +
            phaseContribution +
            timezoneCompensation) %
          (secondsInOneWeek * param.frequency),
      });
    }
  }

  return result;
};

export default getPhases;
