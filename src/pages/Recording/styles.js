import { Pressable } from "react-native";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";

export const Container = styled.View`
	width: ${wp("100%")}px;

	flex: 1;

	background: #000;
`;

export const Center = styled.View`
	align-items: center;
	justify-content: center;

	margin-top: ${wp("10%")}px;
`;

export const Footer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Submit = styled(Pressable)`
	width: ${wp("90%")}px;
	height: ${wp("14%")}px;

	border-radius: 10px;

	background: #a70404;

	align-items: center;
	justify-content: center;

	/* margin-top: ${wp("60%")}px; */
`;

export const SubmitText = styled.Text`
	color: #fff;

	font-weight: 500;
	font-size: ${wp("5%")}px;
`;

export const Trash = styled(FontAwesome).attrs({
	name: "trash",
	size: wp("7%"),
	color: "#fff",
})``;
