import React from "react";
import { Image } from "react-native";


import dayjs from "dayjs";

import { useReducerSchedule } from "../../../../store/hooks/schedule";
import { DateBox, DateText, Feed, PersonText, Row, ScheduleInfoWrapper, SuccessText } from "./styles";
import Calendar from "../../../../assets/images/calendar.png";
import { LineWithCircles } from "../../../../components/LineWithCircles";
import { ScheduleInfo } from "../../../../components/ScheduleInfo";
import { handleChangeStatusBarColor } from "../../../../utils/statusbarColor";

interface ICreatedScheduleProps { }

export function CreatedSchedule() {
  const [{ schedule }] = useReducerSchedule();

  const { hour, name, toName } = schedule ?? {};

  const formattedTime = dayjs(hour, "H:mm").format("HH[h]:mm");

  return (
    <>
      <Feed onScroll={handleChangeStatusBarColor} nestedScrollEnabled>
        <Image
          alt="Calendar image"
          source={Calendar}
        />
        <ScheduleInfoWrapper>
          <SuccessText>
            O seu agendamento
            foi criado com sucesso
          </SuccessText>
          <DateBox>
            <Row>
              <DateText>{formattedTime}</DateText>
              <LineWithCircles />
              <DateText>{formattedTime}</DateText>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <PersonText>{name}</PersonText>
              <PersonText>{toName}</PersonText>
            </Row>
          </DateBox>
          <ScheduleInfo schedule={schedule} compact />
        </ScheduleInfoWrapper>
      </Feed>
    </>
  );
}
