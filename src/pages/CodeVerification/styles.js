// @ts-nocheck

import { TouchableOpacity, ScrollView } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

export const Container = styled.View`
	width: ${wp("100%")}px;
	height: ${hp("100%")}px;

	background: #000;
`;

export const Feed = styled(ScrollView).attrs({
	contentContainerStyle: {
		alignItems: "center",
		paddingTop: hp("2%"),
	},
})``;

export const Title = styled.Text`
	font-size: ${wp("6%")}px;
	font-weight: bold;

	line-height: ${wp("7.5%")}px;

	width: ${wp("58%")}px;

	text-align: center;

	color: #fff;
`;

export const Form = styled.View`
	width: ${wp("90%")}px;

	margin-top: ${wp("6%")}px;
`;

export const SubTitle = styled.Text`
	font-size: ${wp("4%")}px;
	font-weight: 500;

	margin-top: ${wp("2%")}px;

	color: #949599;
`;

export const Back = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("8%")}px;
	height: ${wp("8%")}px;

	justify-content: center;
`;

export const Arrow = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})`
	margin-top: ${wp("-0.5%")}px;
`;

export const Row = styled.View`
	width: ${wp("90%")}px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	flex-direction: row;
`;

export const Input = styled.TextInput`
	width: ${wp("90%")}px;
	height: ${wp("12%")}px;

	border-radius: 5px;

	font-size: ${wp("4%")}px;
	font-weight: 500;

	margin-bottom: ${wp("2%")}px;

	background-color: #212226;
	color: #949599;

	padding: 0 ${wp("5%")}px;
`;

export const Button = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("90%")}px;
	height: ${wp("12%")}px;

	margin-top: ${wp("1.1%")}px;

	border-radius: 5px;

	align-items: center;
	justify-content: center;

	color: #fff;
	background: #5a64e8;
`;

export const ButtonText = styled.Text`
	font-size: ${wp("4.3%")}px;
	font-weight: bold;

	color: #fff;
`;

export const SendSms = styled(TouchableOpacity)`
	margin-bottom: ${wp("2%")}px;
`;

export const SendSmsText = styled.Text`
	color: #6c8ba2;

	font-weight: 500;
	font-size: ${wp("4%")}px;
`;
