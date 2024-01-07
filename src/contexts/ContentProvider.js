import React, { useState, useEffect, createContext } from "react";

import Requests from "../classes/Requests";
import { useUser } from "../hooks/useUser";
import events from "../utils/events";

export const ContentContext = createContext({});

const ContentProvider = ({ children }) => {
	const { User, alreadyBuild } = useUser();

	const [Categories, setCategories] = useState({
		data: [],
		totalPages: 1,
		page: 1,
	});

	const [Notifications, setNotifications] = useState({
		data: [],
		totalPages: 1,
		page: 1,
	});

	const [Shedules, setShedules] = useState({
		count: { pending: 0, aproved: 0 },
		pending: {
			totalPages: 1,
			data: [],
		},
		aproved: {
			totalPages: 1,
			data: [],
		},
		messages: {
			totalPages: 1,
			data: [],
		},
	});

	useEffect(() => {
		if (User.token) {
			Requests.getShedules();
		}
	}, [User]);

	useEffect(() => {
		Requests.getCategories();

		const sub = events.on("categories-loaded", (data, page) => {
			setCategories(s => ({
				...s,
				...data,
				data: page > 1 ? [s.data, data.data].flat() : data.data,
				page,
			}));
		});

		const _sub = events.on("shedules-loaded", data => {
			const page = data.messages.page ?? 1;

			setShedules(s => ({
				...data,
				aproved: {
					...data.aproved,
					data: page > 1 ? [s.aproved.data, data.aproved.data].flat() : data.aproved.data,
				},
				pending: {
					...data.pending,
					data: page > 1 ? [s.pending.data, data.pending.data].flat() : data.pending.data,
				},
				messages: {
					...data.messages,
					page,
					data:
						page > 1
							? [s.messages.data, data.messages.data].flat()
							: data.messages.data,
				},
			}));
		});
		const __sub = events.on("shedule-created", data => {
			alreadyBuild.current = false;

			setShedules(s => ({
				...s,
				count: {
					...s.count,
					pending: s.count.pending + 1,
				},
				pending: {
					...s.pending,
					data: [...s.pending.data, data],
				},
				messages: {
					...s.messages,
					data: [...s.messages.data, data],
				},
			}));
		});

		const ___sub = events.on("shedule-removed", data => {
			setShedules(s => ({
				count: {
					aproved: data.alreadySent ? s.count.aproved - 1 : s.count.aproved,
					pending: !data.alreadySent ? s.count.pending - 1 : s.count.pending,
				},
				aproved: {
					...s.aproved,
					data: s.aproved.data.filter(c => c.id != data.id),
				},
				pending: {
					...s.pending,
					data: s.pending.data.filter(c => c.id != data.id),
				},
				messages: {
					...s.messages,
					data: s.messages.data.filter(c => c.id != data.id),
				},
			}));
		});
		const ____sub = events.on("shedule-updated", data => {
			setShedules(s => ({
				...s,
				count: {
					aproved: data.alreadySent ? s.count.aproved + 1 : s.count.aproved - 1,
					pending: data.alreadySent ? s.count.pending - 1 : s.count.pending + 1,
				},
				aproved: {
					...s.aproved,
					data: !data.alreadySent
						? s.aproved.data.filter(c => c.id != data.id)
						: [data, ...s.aproved.data],
				},
				pending: {
					...s.pending,
					data: data.alreadySent
						? s.pending.data.filter(c => c.id != data.id)
						: [data, ...s.pending.data],
				},
				messages: {
					...s.messages,
					data: s.messages.data.map(c =>
						c.id == data.id ? { ...c, alreadySent: data.alreadySent } : c
					),
				},
			}));

			events.emit("close-modal");
		});
		const _____sub = events.on("user-deleted", () => {
			setShedules({
				count: { pending: 0, aproved: 0 },
				pending: {
					totalPages: 1,
					data: [],
				},
				aproved: {
					totalPages: 1,
					data: [],
				},
				messages: {
					totalPages: 1,
					data: [],
				},
			});
		});

		const ______sub = events.on("notifications-loaded", data => {
			setNotifications(s => ({
				...s,
				...data,
				data: data.page > 1 ? [s.data, data.data].flat() : data.data,
				page: data.page,
			}));
		});

		const _______sub = events.on("albums-loaded", (id, page, data) => {
			setCategories(s => ({
				...s,
				data: s.data.map(item => {
					if (item.id === id) {
						return {
							...item,
							albums: {
								...data,
								page,
								data: [item.albums.data, data.data].flat(),
							},
						};
					}

					return item;
				}),
			}));
		});

		return () => {
			sub();
			_sub();
			__sub();
			___sub();
			____sub();
			_____sub();
			______sub();
			_______sub();
		};
	}, []);

	return (
		<ContentContext.Provider
			value={{
				Categories,
				setCategories,
				Shedules,
				setShedules,
				Notifications,
				setNotifications,
			}}
		>
			{children}
		</ContentContext.Provider>
	);
};

export default ContentProvider;
