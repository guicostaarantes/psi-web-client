export enum frequencyValues {
  "SEVEN_DAYS",
  "FOURTEEN_DAYS_AB",
  "FOURTEEN_DAYS_A",
  "FOURTEEN_DAYS_B",
}

const treatmentFrequencies = [
  {
    label: "A cada 7 dias",
    value: frequencyValues.SEVEN_DAYS,
    params: [{ frequency: 1, phase: 0 }],
  },
  {
    label: "A cada 14 dias (semanas A e B)",
    value: frequencyValues.FOURTEEN_DAYS_AB,
    params: [
      { frequency: 2, phase: 0 },
      { frequency: 2, phase: 604800 },
    ],
  },
  {
    label: "A cada 14 dias (semanas A)",
    value: frequencyValues.FOURTEEN_DAYS_A,
    params: [{ frequency: 2, phase: 0 }],
  },
  {
    label: "A cada 14 dias (semanas B)",
    value: frequencyValues.FOURTEEN_DAYS_B,
    params: [{ frequency: 2, phase: 604800 }],
  },
];

export default treatmentFrequencies;
