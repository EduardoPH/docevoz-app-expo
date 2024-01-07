import { Alert } from "react-native";

import dayjs from "dayjs";
import * as yup from "yup";

import Angola from "../../../assets/angola.png";
import Brasil from "../../../assets/brasil.webp";
import CaboVerde from "../../../assets/cabo-verde.png";
import Eua from "../../../assets/estados-unidos.png";
import Franca from "../../../assets/franca.webp";
import Moçambique from "../../../assets/moçambique.png";
import Portgual from "../../../assets/portugal.png";
import SaoTome from "../../../assets/sao-tome.webp";

const countriesDDD = [
  { label: "258", value: "258", icon: Moçambique },
  { label: "351", value: "351", icon: Portgual },
  { label: "244", value: "244", icon: Angola },
  { label: "55", value: "55", icon: Brasil },
  { label: "239", value: "239", icon: SaoTome },
  { label: "238", value: "238", icon: CaboVerde },
  { label: "33", value: "33", icon: Franca },
  { label: "1", value: "1", icon: Eua },
];

const radioOptions = [
  { label: "Masculina", value: "masculina" },
  { label: "Feminina", value: "feminina" },
];

function generateDatePieces(date: string) {
  const parsedDate = dayjs(date, "DD/MM/YYYY");

  const day = parsedDate.format("D");
  const month = parsedDate.format("MMMM");
  const year = parsedDate.format("YYYY");
  const weekDay = parsedDate.format("dddd");

  return {
    day,
    month,
    year,
    weekDay,
  };
}

interface CreateScheduleFormData {
  ddd: string;
  name: string;
  phone: string;
  code: string;
  withReference: boolean;
  toDDD: string;
  toName: string;
  toPhone: string;
  hour: string;
  voice: "feminina" | "masculina";
}

const createScheduleFormSchema = yup.object<any, CreateScheduleFormData>({
  name: yup.string().required("Nome do destinatário é obrigatório"),
  phone: yup.string().required("Número de telefone do destinario é obrigatório"),
  ddd: yup.string().required("DDD do destinatário é obrigatório"),
  toName: yup.string().required("Nome do receptor é obrigatório"),
  toPhone: yup.string().required("Número de telefone do receptor é obrigatório"),
  toDDD: yup.string().required("DDD do receptor é obrigatório"),
  hour: yup
    .string()
    .required("Horário é obrigatório."),
  code: yup.string().required("Código do cartão presente obrigatório"),
  voice: yup.string().required("Voz da ligação obrigatória"),
}).required();

function formatSelectedTime(selectedDate: string, selectedTime: string) {
  const [, hours] = selectedTime.split("T");
  const [hour, minute] = hours.split(":");

  const [dd, mm, yyyy] = selectedDate.split("/");

  let time = "";

  if (
    dayjs().date() === Number(dd) &&
    dayjs().month() == Number(mm) - 1 &&
    dayjs().year() === Number(yyyy)
  ) {
    const a = dayjs()
      .set("hour", Number(hour) + 1)
      .set("minute", Number(minute))
      .set("millisecond", 0);

    if (a.isAfter(dayjs().add(4, "minute"))) {
      time = `${Number(hour) + 1}:${minute}`;
    } else {
      Alert.alert(
        "Erro",
        "Hora não permitida, sua hora precisa ser 5 minutos a mais que a hora atual."
      );
      time = "";
    }
  } else {
    time = `${Number(hour) + 1}:${minute}`;
  }
  return time;
}


export {
  generateDatePieces,
  createScheduleFormSchema,
  formatSelectedTime,
  countriesDDD,
  radioOptions,
  type CreateScheduleFormData
};

