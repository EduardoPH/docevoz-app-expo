import { theme } from "../../styles/theme";

export type AppointmentStatus = "rejected" | "aproved" | "pending"

type AppointmentsColors = {
  [status in AppointmentStatus]: string;
};

export const appointmentsColors: AppointmentsColors = {
  rejected: theme.colors.red[800],
  aproved: theme.colors.green[800],
  pending: theme.colors.yellow[800]
};
