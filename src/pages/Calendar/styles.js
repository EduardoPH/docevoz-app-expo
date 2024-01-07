
import { TouchableOpacity } from "react-native";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${getStatusBarHeight()}px;
`;

export const Header = styled.View`
	padding: ${hp("1%")}px ${wp("4%")}px;
`;

export const Button = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	width: ${wp("90%")}px;
	height: ${wp("15%")}px;

	align-items: center;
	justify-content: center;
`;

export const Wrapper = styled.View`
	position: absolute;
	left: ${wp("5%")}px;
	margin-bottom: ${wp("5%")}px;

	width: ${wp("90%")}px;
	height: ${wp("15%")}px;

	border-radius: 15px;

	background: #9d0208;
`;

export const ButtonText = styled.Text`
	font-size: ${wp("4.5%")}px;
	font-weight: bold;

	color: #fff;
`;
