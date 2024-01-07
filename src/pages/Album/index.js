import React, { useRef, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import { useRoute } from "@react-navigation/native";
import { transparentize } from "polished";
import { Modalize } from "react-native-modalize";
import Reanimated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	Extrapolate,
	runOnJS,
	interpolate,
} from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme } from "styled-components";

import {
	Row,
	Feed,
	BackButton,
	Arrow,
	WrapperImage,
	Gradient,
	AlbumName,
	Song,
	SongName,
	SongVoice,
	SongNameLoading,
	SongVoiceLoading,
	CartButton,
	CartIcon,
	Modal,
	ModalTitle,
	ModalButtons,
	ModalButton,
	ModalButtonText,
	Container,
} from "./styles";
import Requests from "../../classes/Requests";
import Songs from "../../classes/Songs";
import Image from "../../components/Image";
import { useNavigation } from "../../hooks/useNavigation";
import { useSong } from "../../hooks/useSong";
import events from "../../utils/events";

const height = hp("100%");
const AnimatedTouchable = Reanimated.createAnimatedComponent(TouchableOpacity);
const [from, to, width, album] = [
	wp("100%"),
	wp("20%"),
	wp("80%"),
	{
		name: "Olá",
		imageUrl:
			"https://d2ht75cqwgmis8.cloudfront.net/324051514501900304698355779492136790226051930356385166098005228215921211875383678477885868.png",
		id: "c37b6f66-c195-4220-8eee-a4070aa71751",
		songs: [],
	},
];

const Album = () => {
	const { goBack, navigate } = useNavigation();
	const { params = { album } } = useRoute();
	const { song, setSong } = useSong();
	const { colors } = useTheme();
	const modalRef = useRef(null);

	const [Album, setAlbum] = useState({
		...params.album,
		loaded: false,
	});

	const marginTop = useSharedValue(0);
	const scrollY = useSharedValue(0);
	const teste = useRef(0);

	const imageScale = useSharedValue(1);
	const imageMargin = useSharedValue(0);
	const imageHeight = useSharedValue(from);
	const imageOpacity = useSharedValue(from);

	const songStyle = useAnimatedStyle(() => ({ marginTop: marginTop.value }));

	const opacity = useSharedValue(0);

	const onScroll = useAnimatedScrollHandler(e => {
		const { contentOffset, contentSize, layoutMeasurement } = e;

		const percentage = contentSize.height;
		const total = contentOffset.y + layoutMeasurement.height;

		scrollY.value = contentOffset.y;

		if (percentage > total) {
			runOnJS(interpolation)(contentOffset.y);
		} else {
			if (height < percentage) {
				runOnJS(interpolation)(percentage);
			}
		}
	});

	const rowStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
	const imageStyle = useAnimatedStyle(() => ({ opacity: imageOpacity.value }));
	const imageWrapperStyle = useAnimatedStyle(() => ({
		width,
		marginTop: imageMargin.value,
		transform: [{ scale: imageScale.value }],
	}));
	const wrapperStyle = useAnimatedStyle(() => ({
		zIndex: 3,
		height: imageHeight.value,
		transform: [{ translateY: scrollY.value }],
	}));

	function interpolation(y) {
		imageScale.value = interpolate(y, [0, from / 3], [1, 0.6], Extrapolate.CLAMP);
		marginTop.value = interpolate(y, [0, from / 3], [0, from / 2.7], Extrapolate.CLAMP);

		imageHeight.value = interpolate(y, [0, from / 3], [from, to], Extrapolate.CLAMP);
		imageOpacity.value = interpolate(y, [0, from / 3], [1, 0], Extrapolate.CLAMP);
		opacity.value = interpolate(y, [0, from / 3], [0, 1], Extrapolate.CLAMP);

		teste.current = y;
	}

	useEffect(() => {
		if (song.id) {
			opacity.value = interpolate(teste.current, [0, from / 3], [0, 1], Extrapolate.CLAMP);

			console.log("a");
		}
	}, [song]);

	useEffect(() => {
		const sub = events.on("album-loaded", data => {
			// Songs.preload(data.songs);

			setAlbum({ ...data, loaded: true });
		});

		Requests.getAlbum(params.album.id);

		return () => {
			sub();
		};
	}, []);

	return (
		<Container>
			<Feed onScroll={onScroll} scrollEventThrottle={16}>
				<WrapperImage style={wrapperStyle}>
					<Row>
						<BackButton onPress={() => goBack()}>
							<Arrow />
						</BackButton>

						<AlbumName style={rowStyle}>{Album.name}</AlbumName>

						{song.id ? (
							<AnimatedTouchable
								activeOpacity={1}
								style={rowStyle}
								onPress={() => modalRef.current.open()}
							>
								<CartIcon />
							</AnimatedTouchable>
						) : (
							<View stlye={{ width: wp("5%"), height: wp("5%") }} />
						)}
					</Row>

					<Reanimated.View
						style={[imageWrapperStyle, { width: wp("100%"), height: wp("100%") }]}
					>
						<Image
							isAlbum
							animatedStyle={imageStyle}
							uri={Album.imageUrl}
							style={{ width: wp("100%"), height: wp("100%") }}
						/>
					</Reanimated.View>

					<Gradient
						style={{ top: 0, height: from / 3 }}
						colors={[colors.black["700"], transparentize(0.5, colors.black["700"]), "transparent"]}
					/>

					<Gradient
						style={{ bottom: 0, height: from / 3 }}
						colors={[colors.black["700"], transparentize(0.3, colors.black["700"]), "transparent"].reverse()}
					/>
				</WrapperImage>

				{!Album.loaded
					? [0, 1, 2, 3].map(item => {
						return (
							<Song key={`song-${item}`}>
								<View>
									<SongNameLoading />

									<SongVoiceLoading />
								</View>
							</Song>
						);
					})
					: Album.songs.map((item, index) => {
						return (
							<Song
								style={index == 0 ? songStyle : {}}
								key={item.id}
								onPress={() => Songs.playSong(item.id, index, Album)}
							>
								<View>
									<SongName
										style={{ ...(song.id == item.id && { color: "red" }) }}
									>
										{item.name}
									</SongName>

									<SongVoice>{item.labelComplete}</SongVoice>
								</View>

								{song.id === item.id && (
									<CartButton onPress={() => modalRef.current.open()}>
										<CartIcon />
									</CartButton>
								)}
							</Song>
						);
					})}
			</Feed>

			<Modalize ref={modalRef} modalHeight={hp("21.5%")}>
				<Modal>
					<ModalTitle>Deseja trocar o fundo do áudio?</ModalTitle>

					<ModalButtons>
						<ModalButton
							onPress={() => {
								modalRef.current.close();

								navigate("Calendar", { songId: song.id });
							}}
							style={{ borderWidth: 1, borderColor: "#fff" }}
						>
							<ModalButtonText>Continuar</ModalButtonText>
						</ModalButton>

						<ModalButton
							style={{ backgroundColor: "#fff" }}
							onPress={() => {
								modalRef.current.close();

								navigate("FindBackground", {
									songId: song.id,
									song: {
										...song,
										albumName: Album.name,
										albumImage: Album.imageUrl,
									},
								});
							}}
						>
							<ModalButtonText style={{ color: "#000" }}>Trocar</ModalButtonText>
						</ModalButton>
					</ModalButtons>
				</Modal>
			</Modalize>
		</Container>
	);
};

export default Album;
