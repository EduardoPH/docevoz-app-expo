import React from "react";
import { FlatList } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import dayjs from "dayjs";

import { ScheduledSong } from "./components/ScheduledSong";
import { AppointmentsWrapper, DateTitle, Divider, Feed, Header, PageTitle } from "./styles";
import { GoBackButton } from "../../components/GoBackButton";
import { getRouteParams } from "../../utils/getRouteParams";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

type Status = "rejected" | "sent" | "pending"

interface IAppointmentProps {
  navigation: NavigationProp<any>;
  status: Status;
}

const pageTitle: Record<Status, string> = {
  rejected: "Pedidos rejeitados",
  sent: "Pedidos enviados",
  pending: "Pedidos pendentes",
};

interface AppointmentRouteState {
  status: Status;
  date: string;
  appointmentColor: string;
}

export function Appointment({ navigation }: IAppointmentProps) {
  const {
    date,
    appointmentColor,
    status
  } = getRouteParams<AppointmentRouteState>(
    navigation.getState(), "Appointment"
  );

  const formattedDate = dayjs(date).format("DD MMMM, YYYY");

  const scheduledSongs = [
    {
      title: "Testing big name of a song",
      recipient: "Recipient big name test",
    },
    {
      title: "Song 2",
      recipient: "Recipient 2",
    },
    {
      title: "Song 3",
      recipient: "Recipient 3",
    },
    {
      title: "Song 4",
      recipient: "Recipient 4",
    },
    {
      title: "Song 5",
      recipient: "Recipient 5",
    },
    {
      title: "Song 6",
      recipient: "Recipient 6",
    },
  ];

  const handleSelectSong = () => {
    navigation.navigate("AppointmentDetails", {
      status,
      date,
      appointmentColor
    });
  };

  return (
    <>
      <Feed onScroll={handleChangeStatusBarColor} nestedScrollEnabled>
        <Header>
          <GoBackButton light={false} />
          <PageTitle>{pageTitle[status]}</PageTitle>
        </Header>
        <AppointmentsWrapper>
          <DateTitle>{formattedDate}</DateTitle>
          <FlatList
            data={scheduledSongs}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item, index }) =>
              <ScheduledSong
                {...item}
                color={appointmentColor}
                onPress={handleSelectSong}
                style={{
                  marginHorizontal: 6
                }}
              />
            }
            keyExtractor={(song) => song.title}
            ItemSeparatorComponent={Divider}
            style={{ width: '100%', }}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          />
        </AppointmentsWrapper>
      </Feed>
    </>
  );
}
