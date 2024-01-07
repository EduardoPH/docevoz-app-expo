import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard, FlatList } from "react-native";

import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { io } from "socket.io-client";

import {
	Container,
	Feed,
	FeedContent,
	Header,
	Arrow,
	HeaderTitle,
	Message,
	MessageContent,
	WrapperMessage,
	Footer,
	Input,
	Send,
	SendIcon,
	MessageLoading,
	Wrapper,
	Group,
	MessageHour,
	DeleteMessage,
	Trash,
} from "./styles";
import Requests, { baseURL } from "../../classes/Requests";
import CustomButton from "../../components/CustomButton";
import Image from "../../components/Image";
import Loader from "../../components/Loader";
import { Pause, Resume, ProgressBar, ProgressButton } from "../../components/Player/styles";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import events from "../../utils/events";

dayjs.locale(ptBr);
dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

const Avoiding = ({ children }) => {
	const height = useSharedValue(0);

	function handleKeyboardShow(e) {
		height.value = e.endCoordinates.height;
	}

	function handleKeyboardHide(e) {
		height.value = 0;
	}

	useEffect(() => {
		const showEvent = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
		const hideEvent = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

		return () => {
			showEvent.remove();
			hideEvent.remove();
		};
	});

	return (
		<Animated.View
			style={useAnimatedStyle(() => {
				return {
					transform: [{ translateY: -height.value }],
					backgroundColor: "#000",
				};
			})}
		>
			{children}
		</Animated.View>
	);
};

const ChatMessage = ({ message, index, groupIndex }) => {
	const [Song, setSong] = useState({
		isLoading: false,
		time: 0,
		isPaused: true,
	});

	const waiting = useRef(false);
	const alreadyLoading = useRef(false);

	const sound = useRef(new Audio.Sound());

	const seekWidth = useSharedValue(wp("3.5%"));
	const seekStyle = useAnimatedStyle(() => {
		return {
			width: seekWidth.value,
			height: seekWidth.value,

			borderRadius: seekWidth.value / 2,
		};
	});

	async function seek(v) {
		await sound.current.pauseAsync();
		await sound.current.setPositionAsync(v);
		await sound.current.playAsync();
	}

	async function togglePlay() {
		if (Song.isPaused) {
			events.emit("message-play", message.id);

			const { isLoaded } = await sound.current.getStatusAsync();

			if (isLoaded) {
				await sound.current.playAsync();

				setSong(s => ({
					...s,
					isLoading: false,
					isPaused: false,
				}));
			} else {
				loadSound();
			}
		} else {
			if (Song.isLoading) return;

			await sound.current.pauseAsync();

			setSong(s => ({
				...s,
				isPaused: true,
			}));
		}
	}

	async function loadSound() {
		if (alreadyLoading.current) return;

		alreadyLoading.current = true;
		waiting.current = true;

		setSong(s => ({
			...s,
			isLoading: true,
			isPaused: false,
		}));

		await sound.current.loadAsync({ uri: message.audioUrl }, undefined, true);
		sound.current.setOnPlaybackStatusUpdate(e => {
			if (e.isLoaded) {
				setSong(s => ({
					...s,
					time: e.positionMillis || 0,
				}));
			}
		});

		events.emit("message-sound-loaded", message.id);
	}

	useEffect(() => {
		if (message.audioUrl) {
			const sub = events.on("message-play", async id => {
				if (message.id != id) {
					waiting.current = false;

					const { isLoaded } = await sound.current.getStatusAsync();

					if (isLoaded) {
						await sound.current.pauseAsync();

						await sound.current.setStatusAsync({ positionMillis: 0 });
					}

					setSong(s => ({
						...s,
						isLoading: false,
						isPaused: true,
					}));
				}
			});

			const _sub = events.on("reset-message", async () => {
				waiting.current = false;

				setSong({
					isPaused: true,
					isLoading: false,
					time: 0,
				});

				const { isLoaded } = await sound.current.getStatusAsync();

				if (isLoaded) {
					await sound.current.pauseAsync();
					await sound.current.setPositionAsync(0);
				}
			});

			const __sub = events.on("message-sound-loaded", async id => {
				if (id == message.id && waiting.current) {
					await sound.current.playAsync();

					setSong(s => ({
						...s,
						isLoading: false,
						isPaused: false,
					}));
				}
			});

			return () => {
				sub();
				_sub();
				__sub;

				(async () => {
					const { isLoaded } = await sound.current.getStatusAsync();

					if (isLoaded) {
						await sound.current.pauseAsync();
					}
				})();
			};
		}
	}, []);

	return (
		<WrapperMessage
			key={message.id ? message.id : message.localId}
			isSupport={message.fromSupport}
			style={{
				...(index != 0 && { marginTop: wp("3%") }),
			}}
		>
			<Message isSupport={message.fromSupport}>
				{message.audioUrl && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<View
							style={{
								width: wp("60%"),

								flexDirection: "row",
								alignItems: "center",

								marginBottom: wp("2%"),
								marginTop: wp("2%"),

								marginLeft: wp("4%"),
							}}
						>
							<TouchableOpacity
								onPress={togglePlay}
								style={{
									width: wp("10%"),
									height: wp("10%"),

									borderRadius: wp("5%"),

									alignItems: "center",
									justifyContent: "center",

									backgroundColor: "#fff",
								}}
							>
								{Song.isLoading && (
									<Loader
										animated
										size={wp("6%")}
										circleSize={wp("5%")}
										strokeWidth={wp("0.64%")}
										color="#000"
									/>
								)}
								{!Song.isLoading && (Song.isPaused ? <Resume /> : <Pause />)}
							</TouchableOpacity>

							<View
								style={{
									width: wp("44%"),
									marginLeft: wp("3%"),
								}}
							>
								<ProgressBar
									minimumValue={0}
									maximumValue={message.duration / 0.001}
									value={Song.time}
									enabled={!Song.isLoading}
									onSlidingStart={() => {
										seekWidth.value = withSpring(wp("4.5%"));
									}}
									onSlidingComplete={async value => {
										seekWidth.value = withSpring(wp("3.5%"));

										seek(value[0]);
									}}
									renderThumbComponent={() => {
										return <ProgressButton style={seekStyle} />;
									}}
									// maximumTrackTintColor="rgba(255,255,255,.3)"
									maximumTrackTintColor="#ddd"
									minimumTrackTintColor="#fff"
								/>
							</View>
						</View>

						<CustomButton
							component={DeleteMessage}
							onPress={async () =>
								await Requests.deleteMessage(message.id, index, groupIndex)
							}
							loaderProps={{
								size: wp("6%"),
								circleSize: wp("5%"),
								strokeWidth: wp("0.64%"),
								color: "#fff",
							}}
						>
							<Trash />
						</CustomButton>
					</View>
				)}

				{message.imageUrl && (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Image
							uri={message.imageUrl}
							style={{
								width: wp("57%"),
								height: wp("50%"),
								margin: wp("3%"),
								borderRadius: 10,
							}}
						/>

						<CustomButton
							component={DeleteMessage}
							onPress={async () =>
								await Requests.deleteMessage(message.id, index, groupIndex)
							}
							loaderProps={{
								size: wp("6%"),
								circleSize: wp("5%"),
								strokeWidth: wp("0.64%"),
								color: "#fff",
							}}
						>
							<Trash />
						</CustomButton>
					</View>
				)}

				{message.content.length >= 1 && <MessageContent>{message.content}</MessageContent>}

				<MessageHour>{message.hour}</MessageHour>
			</Message>
		</WrapperMessage>
	);
};

const Chat = () => {
	const { User, setUser } = useUser();
	const { goBack } = useNavigation();
	const {
		params: { chatId },
	} = useRoute();

	const inputRef = useRef();
	const messageRef = useRef("");
	const alreadySent = useRef(false);
	const alreadyLoaded = useRef(false);

	const [MessageText, setMessageText] = useState("");

	const socket = useRef(io(baseURL));

	const [Messages, setMessages] = useState({
		page: 1,
		totalPages: 1,
		groups: [],
		isLoading: true,
	});

	function renderMessages() {
		if (Messages.isLoading) {
			return (
				<Feed>
					<FeedContent>
						{[1, 2, 3, 4].map(item => {
							return (
								<WrapperMessage
									key={item}
									isSupport={item % 2 != 0}
									style={{
										...(item != 1 && {
											marginTop: wp("3%"),
										}),
									}}
								>
									<MessageLoading
										LinearGradient={LinearGradient}
										shimmerColors={["#777", "#999", "#777"]}
									/>
								</WrapperMessage>
							);
						})}
					</FeedContent>
				</Feed>
			);
		}

		if (Messages.groups.length < 1) {
			return (
				<Feed>
					<FeedContent />
				</Feed>
			);
		}

		return (
			<FlatList
				data={Messages.groups}
				keyExtractor={item => item.date}
				onScroll={onScroll}
				scrollEventThrottle={16}
				inverted
				contentContainerStyle={{
					paddingTop: wp("5%"),
					paddingBottom: wp("6%"),
					paddingHorizontal: wp("5%"),
				}}
				renderItem={({ item: group, index: position }) => {
					return (
						<Wrapper key={group.date}>
							<Group>{group.formatedDate}</Group>

							{group.messages.map((message, index) => {
								return (
									<ChatMessage
										key={message.id}
										message={message}
										index={index}
										groupIndex={position}
									/>
								);
							})}
						</Wrapper>
					);
				}}
			/>
		);
	}

	function onScroll(e) {
		const {
			contentOffset: { y },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		const percentage = contentSize.height * 0.4;
		const total = y + layoutMeasurement.height;

		if (total > percentage && Messages.page + 1 <= Messages.totalPages) {
			Requests.getMessages(chatId, Messages.page + 1);
		}
	}

	async function sendMessage() {
		const localId = Math.random().toString(36);

		const now = dayjs();
		const date = now.format("DD/MM/YYYY");
		const formatedDate = now.format("LL");

		const message = {
			id: "",
			fromSupport: false,
			content: messageRef.current,
			hour: now.format("HH:mm"),
			localId,
		};

		if (!MessageText.trim()) {
			if (MessageText.length >= 1) {
				setMessageText("");
			}

			return;
		}

		if (alreadySent.current) return;

		alreadySent.current = true;

		setMessages(s => {
			const index = s.groups.findIndex(c => c.date == date);

			if (index != -1) {
				s.groups[index].messages.push(message);
			} else {
				s.groups.push({
					date,
					formatedDate,
					messages: [message],
				});
			}

			return { ...s };
		});

		setMessageText("");

		socket.current.emit("chat-message", {
			chatId,
			content: messageRef.current,
			userId: User.id,
			fromSupport: false,
			localId,
		});

		inputRef.current?.setNativeProps({ text: "" });
		messageRef.current = "";
	}

	useEffect(() => {
		const event = Notifications.addNotificationReceivedListener(e =>
			Notifications.dismissAllNotificationsAsync()
		);

		const sub = events.on("chat-loaded", (_chatId, page, data) => {
			setMessages(state => {
				if (state.groups.length >= 1) {
					for (let group of data.data) {
						const index = state.groups.findIndex(c => c.date === group.date);

						if (index != -1) {
							if (state.groups[index]) {
								state.groups[index].messages = [
									...group.messages,
									...state.groups[index].messages,
								];
							} else {
								state.groups[index].messages = group.messages;
							}
						} else {
							state.groups = [group, ...state.messages];
						}
					}

					return {
						...state,
						page,
						totalPages: data.totalPages,
						groups: [...state.groups],
					};
				}

				return {
					...state,
					totalPages: data.totalPages,
					page,
					groups: data.data,
					isLoading: false,
				};
			});
		});

		const _sub = events.on("chat-message-deleted", (id, index, groupIndex) => {
			setMessages(s => {
				s.groups[groupIndex].messages.splice(index, 1);

				socket.current.emit("chat-message-deleted", id, chatId, s.groups[groupIndex].date);

				return { ...s };
			});
		});

		socket.current.on("connect", () => {
			Requests.getMessages(chatId);

			socket.current.emit("chat-join", chatId);
			socket.current.on("chat-message-deleted", (id, chatid, date) => {
				console.log("message deleted");

				setMessages(s => {
					const index = s.groups.findIndex(c => c.date === date);

					if (index != -1) {
						const messageIndex = s.groups[index].messages.findIndex(c => c.id === id);

						if (messageIndex != -1) {
							s.groups[index].messages.splice(messageIndex, 1);
						}
					}

					return { ...s };
				});
			});
			socket.current.on("chat-message", data => {
				console.log(data);

				setMessages(state => {
					if (state.groups.length >= 1) {
						const index = state.groups.findIndex(c => c.date == data.date);

						let has = state.groups[index].messages.find(
							c => c.localId === data.localId
						);

						if (has) {
							state.groups[index].messages = state.groups[index].messages.map(
								item => {
									if (item.localId === data.localId) {
										return {
											...item,
											...data.message,
										};
									}

									return item;
								}
							);
						} else {
							state.groups[index].messages.push(data.message);
						}
					} else {
						const now = dayjs();
						const date = now.format("DD/MM/YYYY");
						const formatedDate = now.format("LL");

						state.groups.push({
							date,
							formatedDate,
							messages: [data.message],
						});
					}

					return { ...state };
				});
			});
		});

		return () => {
			socket.current.disconnect();

			event.remove();

			sub();
			_sub();
		};
	}, []);

	return (
		<Avoiding>
			<Container>
				<Header>
					<TouchableOpacity
						activeOpacity={1}
						onPress={() => {
							events.emit("reset-message");

							goBack();
						}}
					>
						<Arrow />
					</TouchableOpacity>

					<HeaderTitle>Suporte Doce Voz</HeaderTitle>
				</Header>

				{renderMessages()}

				<Footer>
					<Input
						multiline
						enabled={!Messages.isLoading && Messages.groups.length >= 1}
						ref={inputRef}
						onChangeText={text => {
							messageRef.current = text;

							setMessageText(text);
						}}
						placeholder="Digite sua mensagem"
						placeholderTextColor="#FFFFFF99"
					>
						<Text>{MessageText}</Text>
					</Input>

					<Send onPress={sendMessage}>
						<SendIcon />
					</Send>
				</Footer>
			</Container>
		</Avoiding>
	);
};

export default Chat;
