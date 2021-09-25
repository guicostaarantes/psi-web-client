interface valueBetweenArgs {
  value: number;
  min: number;
  max: number;
}

const valueBetween = ({ value, min, max }: valueBetweenArgs): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export default valueBetween;
