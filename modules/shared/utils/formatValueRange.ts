const formatValueRange = (minimumPrice: number, maximumPrice: number) => {
  if (minimumPrice === maximumPrice) {
    if (minimumPrice === 0) {
      return "gratuito";
    }
    return `${minimumPrice} reais`;
  }
  return `entre ${minimumPrice} e ${maximumPrice} reais`;
};

export default formatValueRange;
