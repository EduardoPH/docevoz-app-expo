
import { Pressable } from "react-native";

import Reanimated from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

export const Container = styled.View`
	width: ${wp("100%")}px;
	flex: 1;

	padding: ${getStatusBarHeight}px ${wp("5%")}px 0;

	background: ${({theme}) => theme.colors.black[700]};
`;

export const Title = styled.Text`
	color: #fff;

	font-size: ${wp("5%")}px;
	font-weight: bold;

	margin-bottom: ${wp("5%")}px;
`;

export const Message = styled.View`
	flex-direction: row;
`;

export const WrapperCover = styled.View`
	margin-right: ${wp("3.5%")}px;
`;

export const MessageName = styled.Text`
	color: #fff;

	font-size: ${wp("4.5%")}px;
	font-weight: bold;

	margin-bottom: ${wp("1%")}px;
`;

export const MessageVoz = styled.Text`
	color: rgba(255, 255, 255, 0.8);

	font-size: ${wp("4%")}px;
`;

export const Sound = styled.View`
	width: ${wp("90%")}px;

	/* align-items: center; */

	margin-top: ${wp("6%")}px;
`;

export const SoundControl = styled(Pressable)`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;

	align-items: center;
	justify-content: center;

	margin-bottom: ${wp("4%")}px;
`;

export const Play = styled(Entypo).attrs({
	name: "controller-play",
	size: wp("7%"),
	color: "#fff",
})``;

export const Pause = styled(FontAwesome).attrs({
	name: "pause",
	size: wp("6%"),
	color: "#fff",
})``;

export const SoundBar = styled.View`
	width: ${wp("90%")}px;
	height: ${wp("2%")}px;

	justify-content: center;

	background: #ccc;

	border-radius: 10px;
`;

export const SoundProgress = styled(Reanimated.View)`
	width: ${wp("5%")}px;
	height: ${wp("2%")}px;

	background: red;

	position: absolute;

	border-radius: 10px;
`;

export const SoundCircle = styled(Reanimated.View)`
	width: ${wp("4%")}px;
	height: ${wp("4%")}px;

	border-radius: ${wp("2%")}px;

	position: absolute;

	background: yellow;
`;

export const Submit = styled(Pressable)`
	width: ${wp("90%")}px;
	height: ${wp("14%")}px;

	background: #600c14;

	border-radius: 10px;

	margin-top: ${wp("15%")}px;

	align-items: center;
	justify-content: center;
`;

export const SubmitLabel = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	color: #fff;
`;

export const Center = styled.View`
	width: ${wp("90%")}px;

	align-items: center;
`;
