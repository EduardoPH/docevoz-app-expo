
import { Pressable, ScrollView, TouchableOpacity } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Reanimated from "react-native-reanimated";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

const TouchableAnimated = Reanimated.createAnimatedComponent(TouchableOpacity);

export const Container = styled.View`
	flex:1;
	background-color: ${({ theme }) => theme.colors.black["700"]};
`;

export const Feed = styled(Reanimated.createAnimatedComponent(ScrollView)).attrs(({ theme }) => ({
	contentContainerStyle: {
		paddingTop: wp("2%"),
		paddingBottom: wp("10%"),
		backgroundColor: theme.colors.black["700"]
	},
}
))`
`;

export const AlbumName = styled(Reanimated.Text).attrs({
	numberOfLines: 1,
	ellipsizeMode: "tail",
})`
	color: #fff;

	font-size: ${wp("4%")}px;
	font-weight: bold;

	padding-top: ${wp("0.5%")}px;

	width: ${wp("45%")}px;

	text-align: center;
`;

export const Row = styled.View`
	width: ${wp("96%")}px;

	position: absolute;
	top: ${hp("1.4%")}px;
	z-index: 4;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: ${`${wp("5%")}px ${wp("4%")}px`};
`;

export const BackButton = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;

	justify-content: center;
	align-items: center;
`;

export const Arrow = styled(AntDesign).attrs({
	name: "arrowleft",
	color: "#fff",
	size: wp("7%"),
})``;

export const WrapperImage = styled(Reanimated.View)`
	overflow: hidden;
`;

export const Gradient = styled(LinearGradient)`
	width: ${wp("100%")}px;
	position: absolute;
	left: 0;
	right: 0;
	z-index: 3;
`;

export const Song = styled(TouchableAnimated)`
	width: ${wp("100%")}px;
	min-height: ${wp("16%")}px;

	padding: 0 ${wp("5%")}px;

	flex-direction: row;

	justify-content: space-between;
	align-items: center;
`;

export const SongName = styled.Text.attrs({
	numberOfLines: 1,
	elipsizeMode: "tail",
})`
	font-size: ${wp("4.5%")}px;
	line-height: ${wp("6%")}px;

	width: ${wp("75%")}px;

	margin-bottom: ${wp("1%")}px;

	color: #fff;
`;

export const SongVoice = styled.Text`
	font-size: ${wp("4%")}px;

	line-height: ${wp("4.5%")}px;

	color: rgba(255, 255, 255, 0.6);
`;

export const SongNameLoading = styled(ShimmerPlaceholder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("50%")}px;
	height: ${wp("5%")}px;

	border-radius: 5px;

	margin-bottom: ${wp("2%")}px;
`;

export const SongVoiceLoading = styled(ShimmerPlaceholder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("30%")}px;
	height: ${wp("5%")}px;

	border-radius: 5px;
`;

export const CartIcon = styled(FontAwesome).attrs({
	name: "shopping-cart",
	color: "#fff",
	size: wp("5%"),
})`
	margin-left: ${wp("-0.6%")}px;
`;

export const CartButton = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("11%")}px;
	height: ${wp("10%")}px;

	/* background: #a70404; */
	/* background: #600c14; */
	background: red;

	align-items: center;
	justify-content: center;

	border-radius: 10px;
`;

export const Modal = styled.View`
	background: #000;

	height: ${hp("25%")}px;
`;

export const ModalTitle = styled.Text`
	font-size: ${wp("4.7%")}px;
	font-weight: bold;

	width: ${wp("80%")}px;

	text-align: center;

	margin-left: ${wp("10%")}px;

	color: #fff;

	text-align: center;

	margin-top: ${wp("4%")}px;
`;

export const ModalButtons = styled.View`
	width: ${wp("90%")}px;

	margin-left: ${wp("5%")}px;

	flex-direction: row;

	align-items: center;
	justify-content: space-between;
`;

export const ModalButton = styled(Pressable)`
	width: ${wp("90%") / 2.1}px;
	height: ${hp("7%")}px;

	margin-top: ${hp("2.5%")}px;

	border-radius: 15px;

	align-items: center;
	justify-content: center;
`;

export const ModalButtonText = styled.Text`
	font-size: ${wp("4.7%")}px;
	font-weight: bold;

	color: #fff;
`;
