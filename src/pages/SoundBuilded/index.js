import React, { useState, useRef, useEffect } from "react";
import { AppState, BackHandler, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";

Audio.setAudioModeAsync({
	playsInSilentModeIOS: true,
	staysActiveInBackground: true,
	interruptionModeIOS: InterruptionModeIOS.DoNotMix,
	interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
});

import FastImage from "react-native-fast-image";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";


import {
	Container,
	Title,
	Message,
	WrapperCover,
	MessageVoz,
	Sound,
	Center,
	SoundControl,
	Play,
	Pause,
	Submit,
	SubmitLabel,
} from "./styles";
import Songs from "../../classes/Songs";
import AnimatedText from "../../components/AnimatedText";
import { GoBackButton } from "../../components/GoBackButton";
import Loader from "../../components/Loader";
import { ProgressBar, ProgressButton } from "../../components/Player/styles";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import {
	Card,
	CardDetails,
	CardTitle,
	CardChannel,
	Header,
	HeaderTitle,
} from "../FindBackground/styles";


const SoundBuilded = () => {
	useKeepAwake();

	const { navigate, goBack } = useNavigation();
	const { params = {} } = useRoute();
	const { User } = useUser();

	const { video, song, custom, tele, teleDuration } = params;

	const config = useRef({ isPaused: true, isLoading: false });

	const sound = useRef(new Audio.Sound());
	const alreadyStartingLoading = useRef(false);
	const alreadyLoaded = useRef(false);

	const [CurrentSong, setCurrentSong] = useState({
		...song,
		duration: song
			? String(Number(song.withoutBackgroundDuration) + 40)
			: String(Number(teleDuration) + 40),
		time: 0,
		isPaused: true,
		isLoading: false,
	});

	const progressWidth = useSharedValue(wp("3.5%"));
	const progressStyle = useAnimatedStyle(() => ({
		width: progressWidth.value,
		height: progressWidth.value,
		borderRadius: progressWidth.value / 2,
	}));

	function handle(time) {
		const { isPaused } = config.current;

		if (isPaused) return;

		setCurrentSong(s => ({ ...s, time }));
	}

	async function play() {
		const { isPaused, isLoading } = config.current;
		if (isLoading) return;

		if (isPaused) {
			setCurrentSong(s => ({
				...s,
				isPaused: false,
				isLoading: !alreadyLoaded.current,
			}));

			config.current = { isPaused: false, isLoading: !alreadyLoaded.current };

			if (!alreadyLoaded.current) {
				if (alreadyStartingLoading.current) return;

				await Songs.destroy();

				alreadyStartingLoading.current = true;

				await sound.current.loadAsync({ uri: custom.audioUrl }, undefined, true);
				await sound.current.setProgressUpdateIntervalAsync(1000);

				alreadyLoaded.current = true;

				setCurrentSong(s => ({
					...s,
					isPaused: false,
					isLoading: false,
				}));

				config.current = { isPaused: false, isLoading: false };

				sound.current.setOnPlaybackStatusUpdate(e => {
					if (e.didJustFinish) {
						setCurrentSong(s => ({
							...s,
							time: 0,
							isPaused: true,
							isLoading: false,
						}));

						return;
					}

					handle(e.positionMillis | 0);
				});
			}

			await sound.current.playAsync();

			return;
		}

		setCurrentSong(s => ({ ...s, isPaused: true }));

		config.current.isPaused = true;

		await sound.current.pauseAsync();
	}

	useEffect(() => {
		const sub1 = AppState.addEventListener("change", async state => {
			if (!["active"].includes(state)) {
				const { isLoaded } = await sound.current.getStatusAsync();

				if (isLoaded) {
					await sound.current.pauseAsync();

					setCurrentSong(s => ({ ...s, isPaused: true }));
				}
			}
		});

		const sub = BackHandler.addEventListener("hardwareBackPress", async () => {
			const { isLoaded } = await sound.current.getStatusAsync();

			if (isLoaded) {
				await sound.current.pauseAsync();
				await sound.current.setPositionAsync(0);
			} else {
				await sound.current.unloadAsync();
			}

			setCurrentSong(s => ({ ...s, time: 0, isPaused: true }));

			return false;
		});

		return () => {
			sub.remove();
			sub1.remove();
		};
	}, []);

	return (
		<Container>
			<Header>
				<GoBackButton onPress={async () => {
					await sound.current.pauseAsync();
					await sound.current.setPositionAsync(0);
					setCurrentSong(s => ({ ...s, time: 0 }));
				}} />
				<HeaderTitle>Áudio completo</HeaderTitle>
			</Header>

			<Title>Fundo escolhido:</Title>

			<Card onPress={() => { }}>
				<View
					style={{
						width: wp("38%"),
						height: wp("22%"),

						borderRadius: 4,

						backgroundColor: "#777",
					}}
				>
					<FastImage
						style={{
							width: wp("38%"),
							height: wp("22%"),

							borderRadius: 4,
						}}
						source={{ uri: video.cover }}
					/>
				</View>

				<CardDetails>
					<CardTitle numberOfLines={2} ellipsizeMode="tail">
						{video.title}
					</CardTitle>

					<CardChannel>{video.channelName}</CardChannel>
				</CardDetails>
			</Card>

			<Title style={{ marginTop: wp("5%") }}>Mensagem escolhida:</Title>

			<Message>
				{!tele && (
					<WrapperCover>
						<FastImage
							source={{ uri: song.albumImage }}
							style={{
								width: wp("17%"),
								height: wp("15%"),

								borderRadius: 10,
							}}
						/>
					</WrapperCover>
				)}

				<View>
					<View style={{ width: wp("70%"), overflow: "hidden" }}>
						<AnimatedText
							text={tele ? "Telemensagem customizada!" : song.name}
							width={wp("70%")}
							style={{
								fontSize: wp("4.5%"),
								fontWeight: "700",

								marginBottom: wp("1%"),

								color: "#fff",
							}}
						/>
					</View>

					<MessageVoz>{tele ? `Voz de ${User.name}` : song.labelComplete}</MessageVoz>
				</View>
			</Message>

			<Title style={{ marginTop: wp("8%") }}>Resultado:</Title>

			<Sound>
				<Center>
					<SoundControl onPress={() => play()}>
						{CurrentSong.isPaused ? <Play /> : CurrentSong.isLoading ? null : <Pause />}

						{!CurrentSong.isPaused && CurrentSong.isLoading && (
							<Loader
								animated
								size={wp("8%")}
								circleSize={wp("8%")}
								strokeWidth={wp("0.64%")}
								color="#fff"
							/>
						)}
					</SoundControl>
				</Center>

				<View style={{ width: wp("90%") }}>
					<ProgressBar
						disabled={!CurrentSong.isPaused && CurrentSong.isLoading}
						minimumValue={0}
						maximumValue={Number(CurrentSong.duration) / 0.001}
						value={CurrentSong.time}
						onSlidingStart={async () => {
							if (alreadyLoaded.current) {
								config.current.isPaused = true;

								progressWidth.value = withSpring(wp("4.5%"));

								setCurrentSong(s => ({ ...s, isPaused: true }));

								await sound.current.pauseAsync();
							}
						}}
						onSlidingComplete={async value => {
							progressWidth.value = withSpring(wp("3.5%"));

							if (alreadyLoaded.current) {
								progressWidth.value = withSpring(wp("4.5%"));

								setCurrentSong(s => ({ ...s, isPaused: false, time: value[0] }));

								await sound.current.setPositionAsync(value[0]);
								await sound.current.playAsync();

								config.current.isPaused = false;
							}
						}}
						renderThumbComponent={() => <ProgressButton style={progressStyle} />}
						maximumTrackTintColor="rgba(255, 255, 255, .3)"
						minimumTrackTintColor="#fff"
					/>
				</View>
			</Sound>

			<Submit
				onPress={async () => {
					const { isLoaded } = await sound.current.getStatusAsync();

					if (isLoaded) {
						await sound.current.pauseAsync();
						await sound.current.setPositionAsync(0);
					}

					setCurrentSong(s => ({ ...s, isPaused: true, time: 0 }));

					navigate("Calendar", { ...params, customId: custom.id });
				}}
			>
				<SubmitLabel>Continuar</SubmitLabel>
			</Submit>
		</Container>
	);
};

export default SoundBuilded;
