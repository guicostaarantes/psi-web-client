export enum frequencyValues {
  "SEVEN_DAYS",
  "FOURTEEN_DAYS_TWO_TREATMENTS",
  "FOURTEEN_DAYS_EVEN_WEEKS",
  "FOURTEEN_DAYS_ODD_WEEKS",
}

const treatmentFrequencies = [
  {
    label: "A cada 7 dias",
    value: frequencyValues.SEVEN_DAYS,
    params: [{ frequency: 1, phase: 0 }],
  },
  {
    label: "A cada 14 dias (dois tratamentos)",
    value: frequencyValues.FOURTEEN_DAYS_TWO_TREATMENTS,
    params: [
      { frequency: 2, phase: 0 },
      { frequency: 2, phase: 604800 },
    ],
  },
  {
    label: "A cada 14 dias (semanas pares)",
    value: frequencyValues.FOURTEEN_DAYS_EVEN_WEEKS,
    params: [{ frequency: 2, phase: 0 }],
  },
  {
    label: "A cada 14 dias (semanas ímpares)",
    value: frequencyValues.FOURTEEN_DAYS_ODD_WEEKS,
    params: [{ frequency: 2, phase: 604800 }],
  },
];

export default treatmentFrequencies;
