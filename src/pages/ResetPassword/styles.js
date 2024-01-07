import { TouchableOpacity, ScrollView } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const Feed = styled(ScrollView).attrs({
	contentContainerStyle: {
		alignItems: "center",
	},
})`
	background-color: ${({ theme }) => theme.colors.black["700"]};
	padding-top: ${wp("12%")}px;

`;

export const Title = styled.Text`
	font-size: ${wp("6%")}px;
	font-weight: bold;

	margin-bottom: ${wp("1%")}px;

	color: #fff;
`;

export const SubTitle = styled.Text`
	font-size: ${wp("3.8%")}px;
	font-weight: 500;

	color: #949599;
`;

export const Cancel = styled(TouchableOpacity).attrs({
	activeOpacity: 1,
})`
	margin-top: ${wp("3%")}px;
`;

export const CancelText = styled.Text`
	font-size: ${wp("4%")}px;
	font-weight: 500;
	letter-spacing: 0.5px;
	color: rgba(255, 255, 255, 0.8);
`;

export const Form = styled.View`
	width: ${wp("90%")}px;
	margin-top: ${wp("10%")}px;
`;

export const FormRow = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${wp("4%")}px;
`;
