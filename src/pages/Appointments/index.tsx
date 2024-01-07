import React, { useCallback, useEffect } from "react";



import dayjs from "dayjs";
import { MarkedDates } from "react-native-calendars/src/types";
import { useTheme } from "styled-components";

import { useContent } from "../../hooks/useContent";
import { AppointmentsCalendar } from "./components/AppointmentsCalendar";
import { CalendarsWrapper, Feed, Header, PageTitle } from "./styles";
import { AppointmentStatus, appointmentsColors } from "./utils";
import Requests from "../../classes/Requests";
import { GoBackButton } from "../../components/GoBackButton";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

export function Appointments() {
  const { Shedules } = useContent();
  const { colors } = useTheme();
  const fetchSchedules = useCallback(async () => {
    Requests.getShedules(1);
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const markedDatesByStatus = useCallback((status: AppointmentStatus) => {
    const markedDates: MarkedDates = {};
    const schedulesData = Shedules[status]?.data ?? [];
    schedulesData.map(schedule => {
      const formattedDate = dayjs(schedule.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      markedDates[formattedDate] = {
        selected: true, marked: true, customStyles: {
          container: {
            backgroundColor: appointmentsColors[status],
          },
          text: {
            color: colors.black[700]
          }
        }
      };
    });
    return markedDates;
  }, []);

  console.log("Marked dates aproved:", JSON.stringify(markedDatesByStatus("aproved"), null, 2));

  return (
    <Feed onScroll={handleChangeStatusBarColor}>
      <GoBackButton />
      <Header>
        <PageTitle>
          Agendamentos
        </PageTitle>
      </Header>
      <CalendarsWrapper>
        <AppointmentsCalendar status="aproved" markedDates={markedDatesByStatus("aproved")} />
        <AppointmentsCalendar status="pending" markedDates={markedDatesByStatus("pending")} />
        <AppointmentsCalendar status="rejected" markedDates={markedDatesByStatus("rejected")} />
      </CalendarsWrapper>
    </Feed>
  );
}
