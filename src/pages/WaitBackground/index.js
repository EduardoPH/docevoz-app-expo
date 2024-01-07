import React, { useCallback, useRef } from "react";
import { Alert, BackHandler } from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useKeepAwake } from "expo-keep-awake";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Container, Center, Ilustration, Title } from "./styles";
import WaitImage from "../../../assets/wait.png";
import Requests from "../../classes/Requests";
import { GoBackButton } from "../../components/GoBackButton";
import Loader from "../../components/Loader";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";
import { Header, HeaderTitle } from "../FindBackground/styles";

const WaitBackground = () => {
	useKeepAwake();

	const { params = {} } = useRoute();
	const { navigate, goBack } = useNavigation();
	const { alreadyBuild } = useUser();

	const alreadyPressed = useRef(false);

	const abortController = useRef(new AbortController());

	async function buildSound() {
		if (alreadyPressed.current) return;

		let id = "";

		if (params.tele) {
			const file = await Requests.upload(params.tele);
			if (!file) {
				Alert.alert("Erro", "Ao fazer upload da mensagem customizada!");

				return goBack();
			}

			id = await Requests.createCustom(file);

			if (!id) {
				Alert.alert("Erro", "Ao fazer criar a mensagem customizada!");

				return goBack();
			}
		}

		alreadyPressed.current = true;

		const { songId, video } = params;
		const { url } = video;

		try {
			const custom = await Requests.buildSound(
				songId,
				id,
				url,
				abortController.current.signal
			);

			alreadyBuild.current = true;

			navigate("SoundBuilded", { ...params, custom });
		} catch (e) {
			console.log(e);
			console.log(e.response.error);

			Alert.alert("Erro", "Não foi possivel gerar o áudio! tente novamente mais tarde!");

			alreadyBuild.current = false;

			goBack();
		}
	}

	useFocusEffect(
		useCallback(() => {
			if (!alreadyBuild.current) {
				buildSound();

				const sub = BackHandler.addEventListener("hardwareBackPress", () => {
					abortController.current.abort();

					return false;
				});

				return () => {
					sub.remove();
				};
			} else {
				alreadyBuild.current = false;

				goBack();
			}
		}, [])
	);

	return (
		<Container>
			<Header>
				<GoBackButton
					onPress={() => {
						abortController.current.abort();
						alreadyBuild.current = false;
					}}
				/>

				<HeaderTitle>Montando áudio</HeaderTitle>
			</Header>

			<Center>
				<Ilustration
					resizeMode="contain"
					source={WaitImage}
					style={{
						marginBottom: wp("14%"),
					}}
				/>

				<Loader
					color="rgba(255, 255, 255, 0.7)"
					size={wp("15%")}
					circleSize={wp("12.5%")}
					animated
				/>

				<Title>Aguarde.. Esse processo pode demorar até 3 minutos</Title>
			</Center>
		</Container>
	);
};

export default WaitBackground;
