import React, { useState, useEffect, useRef } from "react";
import { Keyboard, TouchableWithoutFeedback, Platform } from "react-native";

import { useRoute } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import {
	Container,
	Feed,
	Title,
	Back,
	Arrow,
	Row,
	Form,
	SubTitle,
	Input,
	Button,
	ButtonText,
	SendSms,
	SendSmsText,
} from "./styles";
import Requests from "../../classes/Requests";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";


const CodeVerification = () => {
	const { params = {} } = useRoute();

	const { User } = useUser();
	const { goBack } = useNavigation();

	const ddd = params.resetPassword ? params.resetPassword.ddd : User.ddd;
	const phone = params.resetPassword ? params.resetPassword.phone : User.phone;
	const type = params.resetPassword ? "resetPassword-verification" : "user-verification";

	const amount = useRef(0);

	const [Code, setCode] = useState("");
	const [Time, setTime] = useState(0);
	const [Disabled, setDisabled] = useState(false);

	function reSend() {
		if (Time != 0 || Disabled) return;

		setTime(59);

		Requests.resendCode({ type, ddd, phone }).catch(() => {});

		amount.current > 2 && setDisabled(true);
		amount.current += 1;
	}

	useEffect(() => {
		if (Time != 0) {
			setTimeout(() => setTime(s => s - 1), 1000);
		}
	}, [Time]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Container>
				<Feed>
					<Row>
						<Back onPress={goBack}>
							<Arrow />
						</Back>
					</Row>

					<Title>Insira seu código de confirmação</Title>
					<SubTitle>
						Um SMS foi envado para +{ddd} {phone}
					</SubTitle>

					<Form>
						<Input
							value={Code}
							onChangeText={text => setCode(text)}
							keyboardType={Platform.select({
								ios: "number-pad",
								android: "phone-pad",
							})}
							placeholder="Código de confirmação"
							placeholderTextColor="#949599"
						/>

						<SendSms
							onPress={reSend}
							style={{
								...(Disabled && {
									opacity: 0.7,
								}),
							}}
						>
							<SendSmsText>
								{Time === 0
									? "Reenviar código"
									: `Reenviar novamente em 00:${String(Time).padStart(2, "0")}`}
							</SendSmsText>
						</SendSms>

						<CustomButton
							component={Button}
							onPress={async () => {
								if (params.resetPassword) {
									await Requests.changePassword({
										code: Code,
										...(params.resetPassword ?? {}),
									});

									return;
								}

								await Requests.verifyRegisterCode(Code);
							}}
							loaderProps={{
								size: wp("6%"),
								circleSize: wp("5%"),
								strokeWidth: wp("0.64%"),
								color: "#fff",
							}}
						>
							<ButtonText>Confirmar</ButtonText>
						</CustomButton>
					</Form>
				</Feed>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default CodeVerification;
