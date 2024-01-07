import React from "react";

import dayjs from "dayjs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { InfoRow, InfoText, MutedText, PlayButton, Row, ScheduleInfoWrapper, SectionLabel, SongImage } from "./styles";
import songImage from "../../assets/images/song-image.png";
import { Schedule } from "../../store/reducers/schedule";

interface IScheduleInfoProps {
  schedule: Schedule;
  compact?: boolean;
}

export function ScheduleInfo({ schedule, compact = false }: IScheduleInfoProps) {
  const { toName, name, date, hour, phone, toPhone, voice, createdAt, code } = schedule ?? {};

  const formattedDate = dayjs(date, "DD/MM/YYYY").format("DD MMMM YYYY");
  const formattedTime = dayjs(hour, "H:mm").format("HH[h]:mm");

  const formattedFullDate = `${formattedDate} as ${formattedTime}`;

  return (
    <ScheduleInfoWrapper>
      {!compact &&
        <>
          <SectionLabel>Revisar dados</SectionLabel>
          <SongImage source={songImage} />
          <Row style={{ marginBottom: 30 }}>
            <SectionLabel>Dia do amigo para amigo</SectionLabel>
            <PlayButton>
              <FontAwesome5 name="play" color="#FFFFFF" />
            </PlayButton>
          </Row>
          <InfoRow>
            <Row>
              <MutedText>Nome do destinatário</MutedText>
              <MutedText>Nome do receptor</MutedText>
            </Row>
            <Row>
              <InfoText>{name}</InfoText>
              <InfoText>{toName}</InfoText>
            </Row>
          </InfoRow>
          <InfoRow>
            <Row>
              <MutedText>Dia</MutedText>
              <MutedText>Hora</MutedText>
            </Row>
            <Row>
              <InfoText>{formattedDate}</InfoText>
              <InfoText>{hour}</InfoText>
            </Row>
          </InfoRow>
          <InfoRow>
            <Row>
              <MutedText>Telefone do destinatário</MutedText>
              <MutedText>Telefone do receptor</MutedText>
            </Row>
            <Row>
              <InfoText>{phone}</InfoText>
              <InfoText>{toPhone}</InfoText>
            </Row>
          </InfoRow>
          <InfoRow>
            <Row>
              <MutedText>Voz para ligação</MutedText>
            </Row>
            <Row>
              <InfoText>
                {voice}
              </InfoText>
            </Row>
          </InfoRow>
          <InfoRow>
            <Row>
              <MutedText>🎁 Código cartão presente</MutedText>
            </Row>
            <Row>
              <InfoText>
                {code}
              </InfoText>
            </Row>
          </InfoRow>
        </>
      }
      {compact &&
        <>
          <Row style={{ marginTop: 30, justifyContent: "space-around" }}>
            <SectionLabel>Dia do amigo para amigo</SectionLabel>
            <PlayButton>
              <FontAwesome5 name="play" color="#FFFFFF" />
            </PlayButton>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <MutedText>Criado por</MutedText>
            <MutedText>Data</MutedText>
          </Row>
          <Row>
            <InfoText>{name}</InfoText>
            <InfoText>{createdAt}</InfoText>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <MutedText>Para</MutedText>
            <MutedText>Data</MutedText>
          </Row>
          <Row>
            <InfoText>{toName}</InfoText>
            <InfoText>{formattedFullDate}</InfoText>
          </Row>
        </>
      }
    </ScheduleInfoWrapper>
  );
}
