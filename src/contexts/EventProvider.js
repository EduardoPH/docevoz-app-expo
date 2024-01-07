import React, { createContext, useEffect } from "react";

import MusicControl, { Command } from "react-native-music-control";

import Songs from "../classes/Songs";
import { useNavigation } from "../hooks/useNavigation";
import { useSong } from "../hooks/useSong";
import { useUser } from "../hooks/useUser";
import events from "../utils/events";

export const EventContext = createContext({});

const EventProvider = ({ children }) => {
	const { navigate, reset } = useNavigation();
	const { User, setUser } = useUser();
	const { setSong } = useSong();

	useEffect(() => {
		const sub = events.on("notification", () => {
			// Requests.reset();
			// Requests.getNotifications(1);
			// Requests.getShedules(1);

			if (User.id) {
				reset([
					{
						name: "Home",
						params: {},
					},
					{
						name: "Dashboard",
						params: {},
					},
					{
						name: "Notifications",
						params: {},
					},
				]);
			}
		});

		return () => {
			sub();
		};
	}, [User]);

	useEffect(() => {
		MusicControl.on(Command.play, Songs.togglePause);
		MusicControl.on(Command.pause, Songs.togglePause);
		MusicControl.on(Command.nextTrack, () => Songs.changeSong(true));
		MusicControl.on(Command.previousTrack, () => Songs.changeSong(false));
		MusicControl.on(Command.seek, value => {
			Songs.seek(Number(value));
		});
		MusicControl.on(Command.stop, () => {
			setSong({});
		});
		MusicControl.on(Command.closeNotification, () => {
			setSong({});

			MusicControl.stopControl();
		});

		const sub = events.on("userChanged", user => {
			user.phoneVerified ? reset("Home") : navigate("CodeVerification");
			// navigate('Calendar');

			setUser(user);
		});

		const _sub = events.on("userVerified", () => {
			reset("Home");

			setUser(s => ({ ...s, phoneVerified: true }));
		});

		const __sub = events.on("redirect", (to, params) => reset(to, params));

		return () => {
			sub();
			_sub();
			__sub();
		};
	}, []);

	return <EventContext.Provider value={{}}>{children}</EventContext.Provider>;
};

export default EventProvider;
