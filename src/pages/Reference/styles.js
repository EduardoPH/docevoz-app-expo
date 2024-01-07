
import { Pressable } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "react-native-vector-icons/AntDesign";
import { css } from "styled-components";
import styled from "styled-components/native";


export const Container = styled.View`
	width: ${wp("100%")}px;
	height: ${hp("100%") - getStatusBarHeight()}px;

	background: #fff;
`;

export const Feed = styled.ScrollView``;

export const Background = styled.View`
	width: ${wp("110%")}px;
	height: ${wp("110%")}px;

	background: #1111;

	border-radius: ${wp("100%")}px;

	position: absolute;
	top: ${wp("-50%")}px;
	left: ${wp("-5%")}px;

	align-items: center;
`;

export const DoceVozLogo = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: ${wp("22%")}px;

	margin-top: ${wp("42%")}px;
`;

export const Title = styled.Text`
	margin-top: ${wp("75%")}px;

	font-size: ${wp("4%")}px;
	font-weight: bold;

	color: #000;

	margin-left: ${wp("5%")}px;
`;

export const RowItem = styled.View`
	margin-top: ${wp("4%")}px;
	margin-left: ${wp("5%")}px;

	width: ${wp("90%")}px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const RowText = styled.Text`
	font-size: ${wp("4%")}px;
	font-weight: ${props => (props.bold ? "800" : "400")};

	${props => props.bold && "color: #000;"}
`;

export const Line = styled.View`
	width: ${wp("100%")}px;
	height: 1px;

	background: #ebebeb;

	margin: ${wp("6%")}px 0 ${wp("4%")}px;
`;

export const CopyButton = styled(Pressable)`
	width: ${wp("22%")}px;
	height: ${wp("8%")}px;

	margin-left: ${wp("75%")}px;

	margin-top: ${wp("4%")}px;
	margin-bottom: ${wp("6%")}px;

	border-radius: 25px;

	align-items: center;
	justify-content: center;

	border: 2px solid #3c3c3c;
`;

export const Buttons = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;

	margin: ${wp("8%")}px 0 ${wp("4%")}px;
`;

export const Button = styled(Pressable)`
	padding: ${wp("3%")}px ${wp("8%")}px;

	border-radius: 30px;

	${props =>
		props.outline
			? css`
					border: 1px solid #1bd741;

					margin-left: ${wp("6%")}px;
			  `
			: css`
					background: #a1141e;
			  `}
`;

export const ButtonLabel = styled.Text`
	color: #fff;

	font-size: ${wp("4%")}px;
`;

export const Header = styled.View`
	width: ${wp("90%")}px;
	height: ${wp("10%")}px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin: 0 ${wp("5%")}px;
`;

export const Back = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})``;

export const BackIcon = styled(AntDesign).attrs({
	name: "arrowleft",
	size: wp("7%"),
})`
	color: ${props => (props.black ? "#000" : "#fff")};
`;

export const HeaderTitle = styled.Text`
	color: #fff;

	padding-top: ${wp("1%")}px;

	font-weight: 500;
	font-size: ${wp("4%")}px;
`;
