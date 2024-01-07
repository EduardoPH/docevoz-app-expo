import dayjs from "dayjs";


export function dayGreeting() {
  const currentHour = dayjs().hour();

  if (currentHour >= 5 && currentHour < 12) {
    return "Bom dia";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}
