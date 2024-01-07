import React from "react";

import { useFocusEffect } from "@react-navigation/native";

import {
	Feed,
	Back,
	Arrow,
	Title,
	Card,
	CardDetails,
	CardSuccess,
	CardPending,
	CardTitle,
	CardHour,
	CardCreated,
	CardMessage,
} from "./styles";
import Requests from "../../classes/Requests";
import { useContent } from "../../hooks/useContent";
import { useNavigation } from "../../hooks/useNavigation";



const NotificationsPage = () => {
	const { Notifications, setNotifications } = useContent();
	const { goBack, navigate } = useNavigation();

	const onScroll = e => {
		const {
			contentOffset: { y },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		const percentage = contentSize.height * 0.4;
		const total = y + layoutMeasurement.height;

		if (total > percentage && Notifications.totalPages >= Notifications.page + 1) {
			Requests.getNotifications(Notifications.page + 1);
		}
	};

	function getIcon(item) {
		switch (item.type) {
			case "shedule-status":
				return item.shedule.alreadySent ? <CardSuccess /> : <CardPending />;

			case "shedule-created":
				return <CardCreated />;

			case "chat-message":
				return <CardMessage />;
		}
	}

	function onPress(item) {
		switch (item.type) {
			case "chat-message":
				navigate("Chat", { chatId: item.chatId });

				break;

			case "shedule-created":
			case "shedule-status":
				goBack();

				break;
		}
	}

	useFocusEffect(() => {
		if (Notifications.notReaded >= 1) {
			Requests.resetNotifications();

			setNotifications(s => ({
				...s,
				notReaded: 0,
			}));
		}
	});

	return (
		<Feed onScroll={onScroll} scrollEventThrottle={16}>
			<Back onPress={goBack}>
				<Arrow />
			</Back>

			<Title>Sua caixa de entrada</Title>

			{Notifications.data.map(item => {
				return (
					<Card key={item.id} onPress={() => onPress(item)}>
						{getIcon(item)}

						<CardDetails>
							<CardTitle>{item.title}</CardTitle>

							{["shedule-status", "shedule-created"].includes(item.type) && (
								<CardHour>
									{item.shedule.date} {item.shedule.hour}
								</CardHour>
							)}

							{["chat-message"].includes(item.type) && (
								<CardHour
									style={{ paddingRight: 10 }}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{item.subtitle}
								</CardHour>
							)}
						</CardDetails>
					</Card>
				);
			})}
		</Feed>
	);
};

export default NotificationsPage;
