import { TouchableOpacity } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import styled, { css } from "styled-components/native";

export const WrapperInput = styled.View`
	width: ${wp("90%")}px;
	height: ${wp("12%")}px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

export const Input = styled.TextInput`
	width: ${wp("90%")}px;
	height: ${wp("12%")}px;
	border-radius: 5px;
	font-size: ${wp("4%")}px;
	font-weight: 500;
	background-color: #36393e;
	color: #949599;
	padding: 0 ${wp("5%")}px;
	${({ hasError }) => hasError && css`border: 1px solid #DC143C;`};
`;

export const EyeIcon = styled(Feather).attrs({
	name: "eye",
	size: wp("7%"),
	color: "#949599",
})``;

export const EyeCloseIcon = styled(Feather).attrs({
	name: "eye-off",
	size: wp("7%"),
	color: "#949599",
})``;

export const ShowButton = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})``;

export const ButtonWrapper = styled.View`
	position: absolute;
	top: ${wp("2.5%")}px;
	right: ${wp("4.5%")}px;
	z-index: 3;
`;
