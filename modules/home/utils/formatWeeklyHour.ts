const weekdays = [
  "o domingo",
  "a segunda-feira",
  "a terça-feira",
  "a quarta-feira",
  "a quinta-feira",
  "a sexta-feira",
  "o sábado",
];

const adjustment = 3 * 24 * 60 * 60;

const formatWeeklyHour = (weeklyHour: number) => {
  const date = new Date(1000 * (weeklyHour + adjustment));

  const day = date.getDay();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `tod${weekdays[day]} às ${hour}:${minute}`;
};

export default formatWeeklyHour;
