import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Calendar, } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { useTheme } from "styled-components";

import { CalendarContainer, CalendarStatus, CalendarStatusRow } from "./styles";
import { AppointmentStatus, appointmentsColors } from "../../utils";
import { CalendarHeader } from "../CalendarHeader";
import { CalendarHeaderTitle } from "../styles";

interface IAppointmentsCalendarProps {
  status: AppointmentStatus
  markedDates: MarkedDates
}

export function AppointmentsCalendar({ status, markedDates }: IAppointmentsCalendarProps) {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const appointmentColor = appointmentsColors[status];

  return (
    <CalendarContainer>
      <CalendarStatusRow>
        <CalendarStatus color={appointmentColor}>
          Enviados
        </CalendarStatus>
        <CalendarStatus color={appointmentColor} size={40}>
          30
        </CalendarStatus>
      </CalendarStatusRow>
      <Calendar
        theme={{
          calendarBackground: "transparent",
          backgroundColor: "transparent",
          dayTextColor: colors.white[800],
          todayDotColor: appointmentColor,
          disabledArrowColor: colors.white[200],
          disabledDotColor: colors.white[200],
          textDisabledColor: colors.white[200],
          selectedDotColor: appointmentColor,
          selectedDayBackgroundColor: "transparent",
          dotColor: appointmentColor,
        }}
        renderHeader={(date) => <CalendarHeader date={date} />}
        renderArrow={(direction) => <CalendarHeaderTitle>{direction === "left" ? "<" : ">"}</CalendarHeaderTitle>}
        markingType="custom"
        markedDates={markedDates}
        enableSwipeMonths
        onDayPress={({ dateString }) => {
          navigate("Appointment", {
            date: dateString,
            appointmentColor,
            status
          });
        }}
      />
    </CalendarContainer>
  );
}
