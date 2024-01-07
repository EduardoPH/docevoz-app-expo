import React, { createContext, useEffect, useState } from "react";

import events from "../utils/events";

export const SongContext = createContext({});

const value = { isPaused: true, id: "" };

const SongProvider = ({ children }) => {
	const [song, setSong] = useState(value);
	const [Duration, setDuration] = useState(0);

	useEffect(() => {
		const sub = events.on("song-toggle-playing", isPaused =>
			setSong(s => ({ ...s, isPaused }))
		);
		const _sub = events.on("song-changed", song => setSong(song));
		const __sub = events.on("song-stop", () => {
			setSong(value);

			setDuration(0);
		});
		const ___sub = events.on("user-deleted", () => setSong({}));

		return () => {
			sub();
			_sub();
			__sub();
			___sub();
		};
	}, []);

	return (
		<SongContext.Provider
			value={{
				song,
				setSong,
				Duration,
			}}
		>
			{children}
		</SongContext.Provider>
	);
};

export default SongProvider;
