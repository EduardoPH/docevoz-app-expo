import { TouchableOpacity } from "react-native";

import { Slider } from "@miblanchard/react-native-slider";
import Reanimated from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import styled, { css } from "styled-components/native";

const AnimatedTouchable = Reanimated.createAnimatedComponent(TouchableOpacity);

export const Container = styled(AnimatedTouchable).attrs({
	activeOpacity: 1,
})`
	width: ${wp("100%")}px;
	height: ${wp("20%")}px;

	background: rgb(40, 50, 54);

	/* margin-bottom: ${Platform.OS == "android" ? getStatusBarHeight() : 0}px; */

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: 0 ${wp("5%")}px;

	position: relative;
`;

export const Progress = styled(Reanimated.View)`
	height: ${wp("0.8%")}px;

	background: #600c14;

	position: absolute;
	top: 0;
	left: 0;
`;

export const Background = styled.Image`
	width: ${wp("100%")}px;
	height: ${wp("20%")}px;

	position: absolute;

	opacity: 0.2;
`;

export const Details = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Column = styled.View`
	margin-left: ${wp("3%")}px;
`;

export const SongName = styled.Text`
	font-size: ${wp("4%")}px;
	font-weight: 500;

	width: ${wp("65%")}px;

	z-index: 5;

	color: #fff;
`;

export const SongVoice = styled.Text`
	font-size: ${wp("3.5%")}px;
	font-weight: 500;

	width: ${wp("65%")}px;

	z-index: 5;

	color: rgba(255, 255, 255, 0.6);
`;

export const Controls = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;

	background: #fff;

	justify-content: center;
	align-items: center;

	z-index: 5;

	border-radius: ${wp("6%")}px;
`;

export const Pause = styled(FontAwesome).attrs({
	name: "pause",
	size: wp("4.2%"),
	color: "#000",
})``;

export const Resume = styled(FontAwesome).attrs({
	name: "play",
	size: wp("4.2%"),
	color: "#000",
})`
	margin-left: ${wp("1%")}px;
`;

export const ProgressButton = styled(Reanimated.View)`
	width: ${wp("3.5%")}px;
	height: ${wp("3.5%")}px;

	background: #fff;
`;

export const Modal = styled.View`
	width: ${wp("100%")}px;
	height: ${hp("100%")}px;

	padding: 0 ${wp("5%")}px;
`;

export const ModalBackground = styled(Reanimated.Image)`
	width: ${wp("100%")}px;
	height: ${hp("100%")}px;

	position: absolute;
`;

export const Header = styled.View`
	margin-top: ${hp("4%")}px;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Back = styled.TouchableOpacity.attrs({ activeOpacity: 1 })``;

export const BackIcon = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})``;

export const HeaderTitle = styled.Text.attrs({
	numberOfLines: 1,
	ellipsizeMode: "tail",
})`
	width: ${wp("40%")}px;

	text-align: center;

	font-weight: bold;
	font-size: ${wp("4.5%")}px;

	color: #fff;
`;

export const Space = styled.View`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;
`;

export const ModalName = styled.Text`
	font-weight: 600;
	font-size: ${wp("5.5%")}px;

	color: #fff;

	margin-top: ${hp("3%")}px;
`;

export const ModalVoice = styled.Text`
	font-weight: 600;
	font-size: ${wp("4%")}px;

	margin-top: ${hp("0.4%")}px;

	color: #ccc;
`;

export const ProgressBar = styled(Slider)``;

export const Times = styled.View`
	flex-direction: row;

	justify-content: space-between;
	align-items: center;
`;

export const Time = styled.Text`
	color: #ccc;

	font-weight: 600;
	font-size: ${wp("4%")}px;
`;

export const ModalControls = styled.View`
	flex-direction: row;

	margin-top: ${wp("5%")}px;

	align-items: center;
	justify-content: center;

	width: ${wp("90%")}px;
`;

export const ModalButton = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
	${props =>
		props.isPlay &&
		css`
			width: ${wp("15%")}px;
			height: ${wp("15%")}px;

			align-items: center;
			justify-content: center;

			background-color: #fff;

			margin: 0 ${wp("13%")}px;

			border-radius: ${wp("15%") / 2}px;
		`}
`;

export const ModalPrevSong = styled(Fontisto).attrs({
	name: "step-backwrad",
	size: wp("8%"),
	color: "#fff",
})``;

export const ModalNextSong = styled(Fontisto).attrs({
	name: "step-forward",
	size: wp("8%"),
	color: "#fff",
})``;
