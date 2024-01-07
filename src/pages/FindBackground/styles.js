import { Pressable } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import styled from "styled-components/native";

export const Feed = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingHorizontal: wp("5%"),
		paddingBottom: wp("10%"),
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${getStatusBarHeight()}px;
`;

export const Header = styled.View`
	margin-bottom: ${wp("8%")}px;

	flex-direction: row;

	align-items: center;
	justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
	font-size: ${wp("4.8%")}px;

	color: #fff;
`;

export const WrapperInput = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	overflow: hidden;
`;

export const Input = styled.TextInput`
	width: ${wp("73%")}px;
	height: ${wp("13%")}px;

	background: rgba(255, 255, 255, 0.3);

	border-radius: 10px;

	padding: 0 ${wp("12.5%")}px 0 ${wp("5%")}px;

	color: #fff;
`;

export const Submit = styled(Pressable)`
	width: ${wp("14%")}px;
	height: ${wp("13%")}px;

	border-radius: 10px;

	background: #9d0208;

	align-items: center;
	justify-content: center;
`;

export const SearchIcon = styled(AntDesign).attrs({
	name: "search1",
	size: wp("6.5%"),
	color: "#fff",
})``;

export const Title = styled.Text`
	font-size: ${wp("5%")}px;

	color: #fff;

	margin-top: ${wp("5%")}px;
	margin-bottom: ${wp("5%")}px;
`;

export const Card = styled(Pressable)`
	flex-direction: row;

	margin-bottom: ${wp("3.5%")}px;
`;

export const CardDetails = styled.View`
	margin-left: ${wp("3%")}px;

	width: ${wp("45%")}px;
`;

export const CardTitle = styled.Text`
	color: #fff;

	line-height: ${wp("6%")}px;
`;

export const CardChannel = styled.Text`
	color: rgba(255, 255, 255, 0.7);

	line-height: ${wp("6%")}px;
	margin-top: ${wp("1%")}px;
`;

export const CardImageLoading = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("38%")}px;
	height: ${wp("22%")}px;

	border-radius: 4px;
`;

export const CardTitleLoading = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("45%")}px;
	height: ${wp("6%")}px;

	border-radius: 5px;

	margin-bottom: ${wp("3%")}px;
`;

export const CardChannelLoading = styled(ShimmerPlaceHolder).attrs({
	LinearGradient: LinearGradient,
	shimmerColors: ["#777", "#999", "#777"],
})`
	width: ${wp("27%")}px;
	height: ${wp("6%")}px;

	border-radius: 5px;
`;

export const WrapperButtonAnimated = styled(Animated.View)`
	position: absolute;
	left: ${wp("63%")}px;

	z-index: 5;
`;

export const ClearButton = styled(Pressable)``;

export const Close = styled(AntDesign).attrs({
	name: "close",
	size: wp("7%"),
	color: "#fff",
})``;
