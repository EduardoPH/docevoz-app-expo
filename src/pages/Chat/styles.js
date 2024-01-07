// @ts-nocheck

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import styled, { css } from "styled-components/native";


export const Container = styled.View`
	width: ${wp("100%")}px;
	height: ${hp("100%")}px;

	background: #000;
`;

export const Feed = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingTop: wp("5%"),
		paddingBottom: wp("6%"),
		paddingHorizontal: wp("5%"),
	},
})``;

export const FeedContent = styled.View``;

export const Header = styled.View`
	padding: ${wp("5%")}px ${wp("5%")}px 0;

	width: 100%;

	flex-direction: row;
	justify-content: space-between;

	margin-bottom: ${wp("2%")}px;
`;

export const Arrow = styled(AntDesign).attrs({
	name: "arrowleft",
	size: wp("8%"),
	color: "#fff",
})``;

export const HeaderTitle = styled.Text`
	font-size: ${wp("4.5%")}px;
	letter-spacing: 0.5px;

	color: #fff;
`;

export const WrapperMessage = styled.View`
	align-items: baseline;

	width: ${wp("90%")}px;

	margin-bottom: ${wp("2%")}px;

	${props =>
		!props.isSupport &&
		css`
			align-items: flex-end;
		`}
`;

export const Message = styled.View`
	max-width: ${wp("80%")}px;
	min-width: ${wp("20%")}px;

	padding-bottom: ${wp("5.5%")}px;

	border-radius: 25px;

	background: #373e4e;

	${props =>
		props.isSupport &&
		css`
			background: #272a35;
		`}
`;

export const MessageContent = styled.Text`
	color: #fff;

	font-size: ${wp("3.5%")}px;
	line-height: ${wp("5.5%")}px;

	letter-spacing: 0.5px;

	margin: ${wp("3%")}px ${wp("4.5%")}px;
`;

export const Footer = styled.View`
	width: ${wp("100%")}px;
	min-height: ${wp("24%")}px;
	max-height: ${wp("40%")}px;

	padding-bottom: ${getStatusBarHeight()}px;

	align-items: center;

	background: #000;

	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const Input = styled.TextInput`
	width: ${wp("78%")}px;
	min-height: ${wp("10%")}px;
	max-height: ${wp("40%")}px;

	margin: ${wp("3%")}px 0;

	border-radius: 25px;

	line-height: 20px;

	border: 2px solid #fff;

	color: #fff;

	padding: ${wp("3%")}px;
`;

export const Send = styled.TouchableOpacity.attrs({ activeOpacity: 1 })`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;

	align-items: center;
	justify-content: center;

	margin-left: ${wp("4%")}px;

	border-radius: ${wp("5%")}px;

	background: #373e4e;
`;

export const SendIcon = styled(Feather).attrs({
	name: "send",
	size: wp("5%"),
	color: "#fff",
})`
	margin-left: ${wp("-.5%")}px;
`;

export const MessageLoading = styled(ShimmerPlaceholder)`
	width: ${wp("80%")}px;
	height: ${wp("15%")}px;

	border-radius: 25px;
`;

export const Center = styled.View`
	width: ${wp("90%")}px;
	height: ${wp("50%")}px;

	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	color: #fff;
`;

export const MessageHour = styled.Text`
	color: #fff;

	font-size: ${wp("3.4%")}px;

	position: absolute;
	bottom: ${wp("2%")}px;
	right: ${wp("4%")}px;
`;

export const Wrapper = styled.View`
	width: ${wp("90%")}px;

	align-items: center;
`;

export const Group = styled.Text`
	color: #fff;

	font-weight: 500;
	font-size: ${wp("4%")}px;

	letter-spacing: 0.5px;

	margin-bottom: ${wp("5%")}px;
`;

export const DeleteMessage = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: ${wp("10%")}px;
	height: ${wp("10%")}px;

	align-items: center;
	justify-content: center;

	margin-right: ${wp("2.5%")}px;

	border-radius: ${wp("5%")}px;

	background: #272a35;
`;

export const Trash = styled(Feather).attrs({
	name: "trash-2",
	size: wp("6%"),
	color: "red",
})``;
