import React, { useRef, useState } from "react";
import { View } from "react-native";

import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
	Container,
	Header,
	WrapperInput,
	Input,
	Submit,
	SearchIcon,
	Feed,
	Title,
	HeaderTitle,
	Card,
	CardDetails,
	CardTitle,
	CardChannel,
	CardTitleLoading,
	CardChannelLoading,
	CardImageLoading,
	WrapperButtonAnimated,
	ClearButton,
	Close,
} from "./styles";
import Requests from "../../classes/Requests";
import CustomButton from "../../components/CustomButton";
import { GoBackButton } from "../../components/GoBackButton";

const FindBackground = ({navigation}) => {
	const { params = {} } = useRoute();

	const [q, setQ] = useState("");

	const pages = useRef({});

	const opacity = useSharedValue(0);
	const translateY = useSharedValue(wp("-15%"));

	const abortController = useRef(new AbortController());

	const [Results, setResults] = useState({
		q: "",
		nextPageToken: "",
		data: [],
	});

	const style = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			transform: [{ translateY: translateY.value }],
		};
	});

	async function search() {
		const { nextPageToken = "", data } = await Requests.getVideos(
			q,
			undefined,
			abortController.current.signal
		);

		pages.current = {};

		setResults({ nextPageToken, q, data });
	}

	async function loadByPage() {
		if (pages.current[Results.nextPageToken]) return;

		pages.current[Results.nextPageToken] = true;

		try {
			const { nextPageToken = "", data } = await Requests.getVideos(
				Results.q,
				Results.nextPageToken,
				abortController.current.signal
			);

			setResults(s => ({ nextPageToken, q, data: [...s.data, ...data] }));
		} catch (e) {
			pages.current[Results.nextPageToken] = false;
		}
	}

	const onScroll = e => {
		const {
			contentOffset: { y },
			layoutMeasurement,
			contentSize,
		} = e.nativeEvent;

		const percentage = contentSize.height * 0.6;
		const total = y + layoutMeasurement.height;

		if (total > percentage && Boolean(Results.nextPageToken)) {
			loadByPage();
		}
	};

	function clear() {
		setQ("");
		setResults({ q: "", nextPageToken: "", data: [] });

		translateY.value = withSpring(wp("-15%"));
		opacity.value = withSpring(0);
	}

	return (
		<Feed onScroll={onScroll} scrollEventThrottle={16}>
				<Header>
					<GoBackButton />
					<HeaderTitle>Adicionar fundo</HeaderTitle>
				</Header>

				<WrapperInput>
					<Input
						value={q}
						onChangeText={q => {
							if (q.trim().length >= 1) {
								opacity.value = withSpring(1);
								translateY.value = withSpring(0);
							} else {
								opacity.value = withSpring(0);
								translateY.value = withSpring(wp("-15%"));
							}

							setQ(q);
						}}
						placeholder="Pesquisar no youtube"
						placeholderTextColor="rgba(255, 255, 255, .8)"
					/>

					<WrapperButtonAnimated style={style}>
						<ClearButton onPress={clear}>
							<Close />
						</ClearButton>
					</WrapperButtonAnimated>

					<CustomButton
						component={Submit}
						loaderProps={{
							color: "#fff",
							size: wp("6.5%"),
							circleSize: wp("6.5%"),
						}}
						onPress={search}
					>
						<SearchIcon />
					</CustomButton>
				</WrapperInput>

				{Results.q.length >= 1 && (
					<>
						<Title>
							Resultados de: <Title style={{ fontWeight: "800" }}>{Results.q}</Title>
						</Title>

						{Results.data.map((item, index) => {
							return (
								<Card
									key={`${item.url}-${index}`}
									onPress={() => {
										abortController.current.abort();
										navigation?.navigate("WaitBackground", { ...params, video: item });
									}}
								>
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
											source={{ uri: item.cover }}
										/>
									</View>

									<CardDetails>
										<CardTitle numberOfLines={2} ellipsizeMode="tail">
											{item.title}
										</CardTitle>

										<CardChannel>{item.channelName}</CardChannel>
									</CardDetails>
								</Card>
							);
						})}

						{Boolean(Results.nextPageToken) &&
							[0, 1, 2].map(item => {
								return (
									<Card onPress={() => { }} key={Math.random().toString(36)}>
										<CardImageLoading />

										<CardDetails>
											<CardTitleLoading />

											<CardChannelLoading />
										</CardDetails>
									</Card>
								);
							})}
					</>
				)}
			</Feed>
	);
};

export default FindBackground;
