import React, { useEffect } from "react";
import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
	setNotificationHandler,
	dismissAllNotificationsAsync,
	addNotificationResponseReceivedListener,
	addNotificationReceivedListener
} from "expo-notifications";
import { preventAutoHideAsync } from "expo-splash-screen";
import { LocaleConfig } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";

import { UserProvider } from "./src/hooks/useUser";
import Requests from "./src/classes/Requests";
import { Layout } from "./src/components/Layout";
import Player from "./src/components/Player";
import ContentProvider from "./src/contexts/ContentProvider";
import EventProvider from "./src/contexts/EventProvider";
import SongProvider from "./src/contexts/SongProvider";
import { AppRoutes } from "./src/routes";
import { store } from "./src/store";
import { theme } from "./src/styles/theme";
import events from "./src/utils/events";
import "dayjs/locale/pt-br";

preventAutoHideAsync();
setNotificationHandler({
	handleNotification: async notification => {
		console.log("a", notification);

		return {
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		};
	},
});

const NewApp = () => {
	useEffect(() => {
		dismissAllNotificationsAsync();
		addNotificationResponseReceivedListener(e => events.emit("notification"));

		addNotificationReceivedListener(() => {
			Requests.reset();
			Requests.getNotifications(1);
			Requests.getShedules(1);
		});
	}, []);

	return (
		<GestureHandlerRootView>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<Provider store={store}>
						<UserProvider>
							<ContentProvider>
								<SongProvider>
									<EventProvider>
										<Layout>
											<AppRoutes />
											<Player />
										</Layout>
									</EventProvider>
								</SongProvider>
							</ContentProvider>
						</UserProvider>
					</Provider>
				</NavigationContainer>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

registerRootComponent(NewApp);
export default NewApp;

LocaleConfig.locales["pt-br"] = {
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthNamesShort: [
		"Jan",
		"Fev",
		"Mar",
		"Abr",
		"Mai",
		"Jun",
		"Jul",
		"Ago",
		"Set",
		"Out",
		"Nov",
		"Dez",
	],
	dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
	dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
};
LocaleConfig.defaultLocale = "pt-br";
