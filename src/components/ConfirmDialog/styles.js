import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Modal = styled.View`
	width: ${wp("100%")}px;
	height: ${wp("50%")}px;

	padding: ${wp("5%")}px;

	background: #000;
`;

export const ModalText = styled.Text`
	font-size: ${wp("5%")}px;
	font-weight: bold;

	text-align: center;

	color: #fff;

	margin-bottom: ${wp("1%")}px;
`;

export const ModalButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
	width: ${wp("42%")}px;
	height: ${wp("13%")}px;

	border-radius: 10px;

	justify-content: center;
	align-items: center;

	background: darkred;
`;

export const ModalButtonText = styled.Text`
	color: #fff;

	font-size: ${wp("4.5%")}px;
	font-weight: bold;
`;

export const ButtonGroup = styled.View`
	width: ${wp("90%")}px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: ${wp("3%")}px;
`;
