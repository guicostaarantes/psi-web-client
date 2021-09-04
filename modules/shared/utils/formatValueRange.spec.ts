import formatValueRange from "@psi/shared/utils/formatValueRange";

test("formatValueRange util", () => {
  expect(formatValueRange(0, 0)).toEqual("gratuito");
  expect(formatValueRange(10, 10)).toEqual("10 reais");
  expect(formatValueRange(20, 30)).toEqual("entre 20 e 30 reais");
});
