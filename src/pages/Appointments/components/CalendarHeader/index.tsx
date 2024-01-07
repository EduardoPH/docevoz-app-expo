import React from "react";

import dayjs from "dayjs";

import { CalendarHeaderTitle } from "../styles";

interface ICalendarHeaderProps {
  date: any;
}

export function CalendarHeader({ date }: ICalendarHeaderProps) {
  const formattedDate = dayjs(date).format("MMMM YYYY");

  return (
    <CalendarHeaderTitle>
      {formattedDate}
    </CalendarHeaderTitle>
  );
}
