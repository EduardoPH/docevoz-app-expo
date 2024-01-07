import React, { useState } from "react";
import { Alert } from "react-native";

import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { CalendarList } from "react-native-calendars";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useTheme } from "styled-components";

import { Container, Wrapper, Button, ButtonText, Header } from "./styles";
import { useNavigation } from "../../hooks/useNavigation";
import { useSong } from "../../hooks/useSong";
import { GoBackButton } from "../../components/GoBackButton";
import { handleChangeStatusBarColor } from "../../utils/statusbarColor";

const Calendar = () => {
	const { params = { songId: "" } } = useRoute();
	const { navigate, goBack } = useNavigation();
	const { song } = useSong();
	const theme = useTheme();
	const [MarkedDate, setMarkedDate] = useState("");

	const bgColor = theme.colors.black["700"];

	return (
		<Container>
			<Header>
				<GoBackButton />
			</Header>

			<CalendarList
				markedDates={{ ...(Boolean(MarkedDate) && { [MarkedDate]: { selected: true } }) }}
				style={{ marginTop: hp("-1%") }}
				pastScrollRange={0}
				futureScrollRange={12}
				onScroll={handleChangeStatusBarColor}
				scrollEnabled={true}
				minDate={dayjs().format("YYYY-MM-DD")}
				current={dayjs().format("YYYY-MM-DD")}
				onDayPress={date => setMarkedDate(date.dateString)}
				theme={{
					backgroundColor: bgColor,
					calendarBackground: bgColor,
					textSectionTitleColor: "#fff",
					selectedDayBackgroundColor: "#9d0208",
					selectedDayTextColor: "#ffffff",
					todayTextColor: "#fff",
					dayTextColor: "#fff",
					textDisabledColor: "#666",
					dotColor: "#fff",
					selectedDotColor: "#ffffff",
					monthTextColor: "#fff",
					indicatorColor: "#000",
					textDayFontWeight: "400",
					textMonthFontWeight: "bold",
					textDayHeaderFontWeight: "300",
				}}
			/>

			<Wrapper
				style={{
					bottom: getStatusBarHeight() + hp(song.id ? 0 : "3%"),
				}}
			>
				<Button
					onPress={() => {
						if (MarkedDate) {
							navigate("CreateSchedule", {
								...params,
								date: dayjs(MarkedDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
							});

							return;
						}

						Alert.alert("Selecione um dia para continuar");
					}}
				>
					<ButtonText>Confirmar</ButtonText>
				</Button>
			</Wrapper>
		</Container>
	);
};

export default Calendar;
