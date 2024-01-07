import React, { useRef, useState } from "react";
import { Alert } from "react-native";

import { Audio } from "expo-av";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { RecordedAudio } from "./components/RecordedAudio";
import { RecordingAudioStatus } from "./components/RecordingAudioStatus";
import {
	Center,
	Footer,
	Submit,
	SubmitText,
	Trash,
} from "./styles";
import { GoBackButton } from "../../components/GoBackButton";
import { useNavigation } from "../../hooks/useNavigation";
import { Feed, Header, HeaderTitle } from "../FindBackground/styles";

const Recording = () => {
	const { navigate } = useNavigation();

	const [Config, setConfig] = useState({
		isPaused: true,
		isFinished: false,
		isStarted: false,
		uri: "",
		duration: 0,
		currentDuration: 0,
		metering: 0
	});
	const { uri, duration, isStarted, metering, isFinished } = Config;

	const recording = useRef(new Audio.Recording());
	const song = useRef(new Audio.Sound());

	async function recordPermission() {
		let { status } = await Audio.getPermissionsAsync();

		if (status != "granted") {
			({ status } = await Audio.requestPermissionsAsync());
		}

		if (status != "granted") {
			Alert.alert(
				"Erro",
				"É necessário aceitar para conseguir gravar uma telemensagem customizada!"
			);

			return false;
		}

		return true;
	}

	async function startRecord() {
		if (await recordPermission()) {
			try {
				await Audio.setAudioModeAsync({
					allowsRecordingIOS: true,
					playsInSilentModeIOS: true,

				});

				const { android, ios } = Audio.RecordingOptionsPresets.HIGH_QUALITY;

				await recording.current.prepareToRecordAsync({
					android,
					ios: {
						...ios,
						extension: ".mp4",
						outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
					},
					isMeteringEnabled: true
				});

				// recording.current.setProgressUpdateInterval(1000);
				recording.current.setOnRecordingStatusUpdate(
					({ durationMillis, isDoneRecording, isRecording, metering, }) => {
						if (isRecording || !isDoneRecording) {
							setConfig(s => ({
								...s,
								duration: durationMillis,
								metering,
							}));
						}
					}
				);
				await recording.current.startAsync();
			} catch (e) {
				Alert.alert("Error", e.message);
			}
			setConfig(s => ({ ...s, isStarted: true }));
		} else {
			Alert.alert("Erro", "Ao iniciar gravação, tente novamente mais tarde.");
		}
	}

	async function stopRecord() {
		const uri = recording.current.getURI();
		const { durationMillis } = await recording.current.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });

		if (uri) {
			setConfig(s => ({
				...s,
				...(durationMillis && { duration: durationMillis }),
				uri,
				isFinished: true,
			}));

			try {
				await song.current.unloadAsync();
				await song.current.loadAsync({ uri }, undefined, true);
			} catch (e) { }
		}
	}

	return (
		<Feed>
			<Header>
				<GoBackButton onPress={async () => {
					try {
						await song.current.stopAsync();
					} catch (error) { }
				}} />
				<HeaderTitle>Gravar mensagem</HeaderTitle>
			</Header>

			<Center>
				<RecordingAudioStatus
					isFinished={isFinished}
					isStarted={isStarted}
					metering={metering}
				/>
			</Center>

			<Center>
				<RecordedAudio config={Config} setConfig={setConfig} song={song} />
			</Center>

			<Footer>
				{uri ? (
					<>
						<Submit
							style={{ width: wp("65%"), backgroundColor: "darkgreen" }}
							onPress={async () => {
								try {
									await song.current.stopAsync();
								} catch (e) { }

								navigate("FindBackground", {
									tele: uri,
									teleDuration: duration * 0.001,
								});
							}}
						>
							<SubmitText>Continuar</SubmitText>
						</Submit>

						<Submit
							style={{ width: wp("20%") }}
							onPress={async () => {
								try {
									await song.current.stopAsync();
								} catch (e) { }

								recording.current = new Audio.Recording();

								setConfig({
									isPaused: true,
									isFinished: false,
									isStarted: false,
									uri: "",
									duration: 0,
									currentDuration: 0,
								});
							}}
						>
							<Trash />
						</Submit>
					</>
				) : (
					<Submit
						style={{ marginTop: wp("50%") }}
						onPress={() => {
							if (isStarted) {
								stopRecord();
								return;
							}
							startRecord();
						}}
					>
						<SubmitText>
							{isStarted ? "Finalizar gravação" : "Iniciar gravação"}
						</SubmitText>
					</Submit>
				)}
			</Footer>
		</Feed>
	);
};

export default Recording;
