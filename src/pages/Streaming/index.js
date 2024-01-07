import React, { useEffect, useRef } from "react";
import { Dimensions, Image, View } from "react-native";

import { useRoute } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Balls, Container, Content, DescStreaming, ImageBalls, ImageCover, ImageStreaming, Title, TitleStreaming } from "./styles";
import { useNavigation } from "../../hooks/useNavigation";
import events from "../../utils/events";
import { BtnBack } from "../Podcast/styles";

const { width, height } = Dimensions.get("screen");
var playing = null;

const Streaming = () => {

	const { goBack, navigate } = useNavigation();
	const { params = { data } } = useRoute();

	const l1 = useRef();
	const l2 = useRef();

	useEffect(() => {

		const sub = events.on("song-toggle-playing", data => {
			// Songs.preload(data.songs);

			if (!data) {
				l1.current.resume();
				l2.current.resume();
			} else {
				l1?.current?.pause();
				l2?.current?.pause();
			}


		});

		const sub2 = events.on("song-loaded", data => {
			// Songs.preload(data.songs);

			console.log("loaded");
			l1.current.resume();
			l2.current.resume();

		});

		return () => {
			sub();
			sub2();
		};

	}, []);

	return (
		<Container>

			<ImageCover source={require("../../assets/images/BG.png")} resizeMode={"contain"} />

			<BtnBack onPress={() => goBack()}>
				<Image source={require("../../assets/images/icon_back.png")} />
			</BtnBack>

			<Content>

				<Title>
					Ao Vivo
				</Title>

				<Balls>
					<ImageBalls source={require("../../assets/images/Avatar.png")} />
					{/* <ImagePlay source={require("../../assets/images/Play_.png")} /> */}
					<ImageStreaming source={{ uri: params.data.thumb }} />
				</Balls>

				<TitleStreaming>
					{params.data.title}
				</TitleStreaming>

				<DescStreaming>
					{params.data.description}
				</DescStreaming>

				<ScrollView horizontal>
					<View
						style={{
							position: "relative",
							width: width,
							display: "flex",
							flexDirection: "row"
						}}>

						<AnimatedLottieView
							ref={l2}
							resizeMode={"cover"}
							source={require("../../assets/lotties/player.json")}
							style={{ height: 100, width: width / 2 }}
							loop />

						<AnimatedLottieView
							ref={l1}
							resizeMode={"cover"}
							source={require("../../assets/lotties/player1.json")}
							style={{ height: 100, width: width / 2 }}
							loop />



					</View>
				</ScrollView>

			</Content>

		</Container>
	);
};

export default Streaming;
