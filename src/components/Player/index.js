import React, { useEffect, useState, useRef, useMemo } from "react";
import { View } from "react-native";


import { PanGestureHandler } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import Reanimated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	useAnimatedGestureHandler,
	runOnJS,
} from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";

import {
	Container,
	Progress,
	Background,
	Details,
	Column,
	SongVoice,
	Controls,
	Resume,
	Pause,
	Modal,
	ModalBackground,
	Header,
	Back,
	BackIcon,
	HeaderTitle,
	Space,
	ModalVoice,
	ProgressBar,
	ProgressButton,
	Times,
	Time,
	ModalControls,
	ModalButton,
	ModalPrevSong,
	ModalNextSong,
} from "./styles";
import Image1 from "../../../assets/1.jpeg";
import Image2 from "../../../assets/2.jpeg";
import Songs from "../../classes/Songs";
import { useSong } from "../../hooks/useSong";
import { useUser } from "../../hooks/useUser";
import events from "../../utils/events";
import AnimatedText from "../AnimatedText";
import Image from "../Image";
import Loader from "../Loader";
import { useTheme } from "styled-components";
import { transparentize } from "polished";


const Teste = Reanimated.createAnimatedComponent(PanGestureHandler);

function formatTime(secs) {
	const minutes = Math.floor(secs / 60);
	const hours = Math.floor(minutes / 60);
	const seconds = Math.floor(secs % 60);

	function format(num) {
		return String(num).padStart(2, "0");
	}

	if (hours > 0) {
		return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
	}

	return `${format(minutes)}:${format(seconds)}`;
}

const [limit, total] = [wp("4%"), wp("21%")];

const Player = () => {
	const { song, setSong } = useSong();
	const { User } = useUser();
	const theme = useTheme()

	const opacity = useSharedValue(0);
	const zIndex = useSharedValue(-1);

	const progressWidth = useSharedValue(wp("3.5%"));
	const playerY = useSharedValue(total);

	const [Duration, setDuration] = useState(0);

	const style = useAnimatedStyle(() => ({ transform: [{ translateY: playerY.value }] }));
	const progressStyle = useAnimatedStyle(() => ({
		width: progressWidth.value,
		height: progressWidth.value,
		borderRadius: progressWidth.value / 2,
	}));

	const modalStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			zIndex: zIndex.valuue,
		};
	});

	const modalRef = useRef(null);

	useEffect(() => {
		const sub = events.on("song-duration", d => setDuration(d / 0.001));
		const _sub = events.on("song-loaded", id => {
			if (Songs.getCurrentId() === id) {
				setSong(s => ({
					...s,
					isPaused: false,
					isLoading: false,
				}));

				Songs.togglePause();
			}
		});

		return () => {
			sub();
			_sub();
		};
	}, []);

	useEffect(() => {
		if (song.id) {
			playerY.value = withSpring(0);
		}
	}, [song]);

	const onGesture = useAnimatedGestureHandler({
		onActive: e => {
			const { translationY } = e;

			playerY.value = 0 < translationY ? translationY : withSpring(0);
		},
		onFinish: e => {
			const { translationY } = e;
			if (translationY > 0) {
				if (translationY >= limit) {
					playerY.value = withSpring(total);

					runOnJS(Songs.destroy)();

					return;
				}
			}

			playerY.value = withSpring(0);
		},
	});

	if (song.id) {
		return (
			<View style={{backgroundColor: theme.colors.black[700]}}>
				<Teste onGestureEvent={onGesture} style={style}>
					<Container onPress={() => modalRef.current.open()}>
						<Progress
							style={{
								width: interpolate(
									Duration,
									[0, Number(song.duration) / 0.001],
									[0, wp("100%")]
								),
							}}
						/>

						<Background
							source={song.index % 2 == 0 ? Image1 : Image2}
							blurRadius={15}
						/>

						<Details>
							{song.album && (
								<Image
									uri={song.album.imageUrl}
									style={{
										width: wp("12%"),
										height: wp("12%"),

										borderRadius: 10,
									}}
								/>
							)}

							<Column style={{ width: wp("60%"), overflow: "hidden" }}>
								<AnimatedText
									text={song.name ? song.name : "Telemensagem customizada!"}
									width={wp("60%")}
									animated
									style={{
										fontSize: wp("4%"),
										fontWeight: "500",

										zIndex: 5,
										color: "#fff",
									}}
								/>

								<SongVoice>
									{song.labelComplete
										? song.labelComplete
										: `Voz de ${User.name}`}
								</SongVoice>
							</Column>
						</Details>

						<Controls onPress={() => Songs.togglePause()}>
							{song.isLoading && (
								<Loader
									animated
									size={wp("6%")}
									circleSize={wp("5%")}
									strokeWidth={wp("0.64%")}
									color="#000"
								/>
							)}
							{!song.isLoading && (song.isPaused ? <Resume /> : <Pause />)}
						</Controls>
					</Container>
				</Teste>

				<Modalize
					ref={modalRef}
					modalHeight={hp("100%") - getStatusBarHeight()}
					handlePosition="inside"
					scrollViewProps={{ scrollEnabled: false }}
					modalStyle={{ backgroundColor: "#000" }}
					handleStyle={{ backgroundColor: "#fff" }}
				>
					<Modal>
						{/* <ModalBackground source={{ uri: song.album.smallUrl }} blurRadius={100} /> */}
						{song.album && (
							<ModalBackground
								source={{ uri: song.album.imageUrl }}
								blurRadius={100}
							/>
						)}

						<Header>
							<Back onPress={() => modalRef.current.close()}>
								<BackIcon />
							</Back>

							<HeaderTitle>{song.album.name}</HeaderTitle>

							<Space />
						</Header>

						<Image
							uri={song.album.imageUrl}
							style={{
								width: wp("90%"),
								height: hp("42%"),

								borderRadius: 10,
								marginTop: hp("4%"),
							}}
						/>

						<View style={{ width: wp("90%"), overflow: "hidden" }}>
							<AnimatedText
								animated
								text={song.name ? song.name : "Telemensagem customizada!"}
								width={wp("90%")}
								style={{
									fontSize: wp("5.5%"),
									fontWeight: "600",
									marginTop: hp("3%"),

									color: "#fff",
								}}
							/>
						</View>

						<ModalVoice>
							{song.labelComplete ? song.labelComplete : `Voz de ${User.name}`}
						</ModalVoice>

						<ProgressBar
							minimumValue={0}
							maximumValue={Number(song.duration) / 0.001}
							value={Duration}
							onSlidingStart={() => {
								progressWidth.value = withSpring(wp("4.5%"));

								if (!song.isPaused) {
									Songs.togglePause();
								}
							}}
							onSlidingComplete={async value => {
								progressWidth.value = withSpring(wp("3.5%"));

								setDuration(value[0]);

								Songs.seek(value[0]);
							}}
							renderThumbComponent={() => <ProgressButton style={progressStyle} />}
							maximumTrackTintColor="rgba(255,255,255,.3)"
							minimumTrackTintColor="#fff"
						/>

						<Times>
							<Time>{formatTime(Duration * 0.001)}</Time>

							<Time>{formatTime(Number(song.duration))}</Time>
						</Times>

						<ModalControls>
							<ModalButton onPress={() => Songs.changeSong()}>
								<ModalPrevSong />
							</ModalButton>

							<ModalButton isPlay onPress={() => Songs.togglePause()}>
								{song.isLoading && (
									<Loader
										animated
										size={wp("6%")}
										circleSize={wp("5%")}
										strokeWidth={wp("0.64%")}
										color="#000"
									/>
								)}
								{!song.isLoading && (song.isPaused ? <Resume /> : <Pause />)}
							</ModalButton>

							<ModalButton onPress={() => Songs.changeSong(true)}>
								<ModalNextSong />
							</ModalButton>
						</ModalControls>
					</Modal>
				</Modalize>
			</View>
		);
	}

	return null;
};

export default Player;
