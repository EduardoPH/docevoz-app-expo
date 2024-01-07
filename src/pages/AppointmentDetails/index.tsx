import React from "react";

import { NavigationProp } from "@react-navigation/native";
import { darken, transparentize } from "polished";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "styled-components";

import { AppointmentInfoWrapper, AppointmentWrapper, Circle, Column, Content, DashedLine, DateBox, DateText, Feed, InfoText, MutedText, PageTitle, PersonText, PlayButton, Row, ShelveButton, ShelveButtonText, SongLabel, UserPlayButton, UserRecordWrapper } from "./styles";
import { GoBackButton } from "../../components/GoBackButton";
import { LineWithCircles } from "../../components/LineWithCircles";
import { getRouteParams } from "../../utils/getRouteParams";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

type Status = "rejected" | "sent" | "pending"

interface IAppointmentProps {
  navigation: NavigationProp<any>;
}

const pageTitle: Record<Status, string> = {
  rejected: "Pedidos rejeitados",
  sent: "Pedidos enviados",
  pending: "Pedidos pendentes",
};

interface AppointmentDetailsRouteState {
  status: Status;
  date: string;
  appointmentColor: string;
}

export function AppointmentDetails({ navigation }: IAppointmentProps) {
  const { date, appointmentColor, status } = getRouteParams<AppointmentDetailsRouteState>(
    navigation.getState(), "AppointmentDetails"
  );
  const { colors } = useTheme();

  const handleShelve = () => { };

  return (
    <>
      <Feed onScroll={handleChangeStatusBarColor} nestedScrollEnabled>
        <GoBackButton light={false} />
        <Content>
          <PageTitle>{pageTitle[status]}</PageTitle>
          <AppointmentWrapper>
            <DateBox color={appointmentColor}>
              <Row>
                <DateText>12h:00</DateText>
                <Column>
                  <PersonText>03h30m</PersonText>
                  <LineWithCircles
                    lastInnerCircleColor={appointmentColor}
                    lineColor={transparentize(0.7, colors.darkBlue[800])}
                  />
                </Column>
                <DateText>12h:03</DateText>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <PersonText>Doce Voz</PersonText>
                <DateText>Reação ao vivo</DateText>
                <PersonText>Yuri Antonio</PersonText>
              </Row>
            </DateBox>
            <AppointmentInfoWrapper>
              <Row style={{ justifyContent: "space-around" }}>
                <SongLabel>Aniversario Para Amigo</SongLabel>
                <PlayButton>
                  <FontAwesome5 name="play" color="#FFFFFF" />
                </PlayButton>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <MutedText>Criado por</MutedText>
                <MutedText>Data</MutedText>
              </Row>
              <Row>
                <InfoText>Yuri Antonio</InfoText>
                <InfoText>22 jun, 2023 as 8h:00 </InfoText>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <MutedText>Para</MutedText>
                <MutedText>Data</MutedText>
              </Row>
              <Row>
                <InfoText>Pedro Carlos</InfoText>
                <InfoText>26 jun, 2023 as 8h:00 </InfoText>
              </Row>
            </AppointmentInfoWrapper>
            <UserRecordWrapper>
              <Row>
                <Circle style={{ position: "absolute", left: -19 }} />
                <DashedLine />
                <Circle style={{ position: "absolute", right: -19 }} />
              </Row>
              <Row style={{ justifyContent: "center", marginTop: 30 }}>
                <UserPlayButton>
                  <PlayButton bgColor={colors.black[800]}>
                    <FontAwesome5 name="play" color="#FFFFFF" />
                  </PlayButton>
                </UserPlayButton>
              </Row>
            </UserRecordWrapper>
          </AppointmentWrapper>
          <ShelveButton
            onPress={handleShelve}
            bgColor={status === "pending" ? darken(0.07, appointmentColor) : appointmentColor}
          >
            <ShelveButtonText>
              Arquivar
            </ShelveButtonText>
          </ShelveButton>
        </Content>
      </Feed>
    </>
  );
}
