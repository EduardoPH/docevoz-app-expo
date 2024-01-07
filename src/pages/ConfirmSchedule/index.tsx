import React from "react";

import dayjs from "dayjs";
import { useModalize } from "react-native-modalize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "styled-components";

import { useReducerSchedule } from "../../store/hooks/schedule";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import { ButtonText, Container, EditScheduleButton, Header, SmallText, SubmitButton } from "./styles";
import Requests from "../../classes/Requests";
import { CreatedScheduleModal } from "../CreateSchedule/components/CreatedScheduleModal";
import { CancelButton } from "../../components/CancelButton";
import { ScheduleInfo } from "../../components/ScheduleInfo";

export function ConfirmSchedule() {
  const [{ schedule }, { updateSchedule, clearSchedule }] = useReducerSchedule();
  const { navigate, goBack } = useNavigation();
  const { colors } = useTheme();
  const { User } = useUser();
  const {
    ref: createdScheduleModalRef,
    open: openCreatedScheduleModal,
  } = useModalize();

  const { customId, songId, withReference, code, voice } = schedule ?? {};

  const handleCreateSchedule = async () => {
    const createdAt = dayjs().format("DD MMM, YYYY") + " as " + dayjs().format("H[h]:mm");
    const formattedSchedule = {
      ...schedule,
      ...(customId
        ? { customId: customId }
        : { songId: songId }),

      ...(User.ddd === "244"
        ? {
          ...(code && { code }),
          ...(withReference && { withReference }),
        }
        : { code }),
      office: User?.office
    };

    delete formattedSchedule.voice;
    delete formattedSchedule.createdAt;

    console.log(JSON.stringify(formattedSchedule, null, 2))

    updateSchedule(formattedSchedule);

    const scheduleCreated = await Requests.createSchedule(formattedSchedule);

    if (scheduleCreated) {
      openCreatedScheduleModal();
      return;
    }
  };

  const handleCancel = () => {
    navigate("Home");
    clearSchedule();
  };

  const handleEdit = () => {
    goBack();
  };

  return (
    <>
      <Container>
        <Header>
          <CancelButton style={{
            position: "relative",
            marginLeft: 0
          }}
            onPress={handleCancel}
          />
          <EditScheduleButton onPress={handleEdit}>
            <Ionicons name="ios-calendar" size={16} color="#222128" />
            <ButtonText>Editar</ButtonText>
          </EditScheduleButton>
        </Header>
        <ScheduleInfo schedule={schedule ?? {}} />
        <SmallText>
          Verifique cuidadosamente os dados fornecidos. Certifique-se de que todas as informações estejam corretas para evitar quaisquer problemas futuros
        </SmallText>
        <SubmitButton onPress={handleCreateSchedule} activeOpacity={0.9}>
          <ButtonText style={{ color: colors.white["800"] }}>
            Confirmar
          </ButtonText>
        </SubmitButton>
      </Container>
      <CreatedScheduleModal ref={createdScheduleModalRef} />
    </>
  );
}
