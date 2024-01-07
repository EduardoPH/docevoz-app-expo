// @ts-nocheck

import { TouchableOpacity } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";


export const Container = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("30%")}px;
	height: ${wp("12%")}px;

	border-radius: 5px;

	justify-content: center;

	font-size: ${wp("4%")}px;
	font-weight: 500;

	background-color: #212226;
	background-color: #36393e;

	color: #949599;

	padding: 0 ${wp("5%")}px;
`;

export const PlaceHolder = styled.Text`
	font-size: ${wp("4%")}px;
	font-weight: 500;

	margin-left: ${wp("2%")}px;

	color: #949599;
`;

export const Row = styled.View`
	flex-direction: row;

	align-items: center;
`;

export const FlagImage = styled.Image`
	width: ${wp("8%")}px;
	height: ${wp("6%")}px;

	border-radius: 5px;
`;

export const WrapperOptions = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("100%")}px;
	height: ${hp("100%")}px;

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.5);
`;

export const Options = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("80%")}px;
	/* height: ${wp("70%")}px; */

	border-radius: 5px;

	align-items: center;

	padding: ${wp("4%")}px;

	background-color: #fff;
	background-color: #000;
`;

export const Option = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("72%")}px;

	flex-direction: row;

	align-items: center;

	margin-bottom: ${wp("3%")}px;
`;

export const Title = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	margin-bottom: ${wp("4%")}px;

	color: #444;
	color: #fff;
`;

export const OptionText = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: 500;

	margin-left: ${wp("4%")}px;

	color: #444;
	color: #fff;
`;

export const OptionImage = styled.Image`
	width: ${wp("13%")}px;
	height: ${wp("9%")}px;

	border-radius: 5px;
`;
