import { ScrollView } from "react-native";

import {
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import styled from "styled-components/native";

export const FormRow = styled.View`
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

	margin-bottom: ${wp("4%")}px;
`;

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

	line-height: ${wp("7.5%")}px;

	color: #fff;
`;

export const Form = styled.View`
	width: ${wp("90%")}px;

	margin-top: ${wp("10%")}px;
`;

export const FormTitle = styled.Text`
	font-size: ${wp("3.5%")}px;
	font-weight: bold;

	margin-bottom: ${wp("2%")}px;

	color: #949599;
`;

export const Row = styled.View`
	width: ${wp("90%")}px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	flex-direction: row;
`;
