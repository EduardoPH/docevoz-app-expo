import { TouchableOpacity } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const ButtonContainer = styled(TouchableOpacity)`
  width: ${wp("90%")}px;
	height: ${wp("12%")}px;
	margin-top: ${wp("1.1%")}px;
	border-radius: 5px;
  flex-direction: row;
	align-items: center;
	justify-content: center;
	background: #5a64e8;
	opacity: ${({ disabled }) => disabled ? 0.6 : 1};
`;

export const ButtonText = styled.Text`
  font-size: ${wp("4.3%")}px;
	font-weight: bold;
	color: #fff;
`;

export const LoadingWrapper = styled.View`
	margin-left: ${wp("3%")}px;
`;
